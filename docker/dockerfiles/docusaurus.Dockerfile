FROM node:trixie AS base

WORKDIR /app

# NOTE:
# Node.js 26+ images no longer bundle Yarn v1 (or Corepack), so install
# Corepack and let it provision the Yarn release pinned by the `packageManager`
# field in `package.json`. Priming the cache here means the runtime container
# doesn't need network access just to start.
COPY ./package.json ./
RUN npm install --global corepack@latest \
    && corepack enable yarn \
    && corepack install


FROM base AS install
RUN mkdir -p /temp/dev
COPY ./package.json ./yarn.lock ./.yarnrc.yml /temp/dev/
RUN cd /temp/dev && yarn install --immutable


FROM base AS prerelease
COPY --from=install /temp/dev/node_modules ./node_modules/
COPY ./ ./


EXPOSE 3000/tcp

# NOTE:
# Check in `package.json` file under `scripts` field for more details
CMD [ "yarn", "run", "dev" ]

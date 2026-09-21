import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'AI Orchestration',
    description: (
      <>
        CoSMIC coordinates specialised AI services rather than treating all
        requests identically. Requests are analysed and delegated to the
        most appropriate capability available within the platform.
      </>
    ),
  },
  {
    title: 'Retrieval-Augmented Generation',
    description: (
      <>
        CoSMIC combines large language models with organisational knowledge,
        allowing responses to be grounded in uploaded documents and shared
        knowledge repositories.
      </>
    ),
  },
  {
    title: 'Multi-Model Architecture',
    description: (
      <>
        Models can be hosted locally or accessed through external
        providers, including Hugging Face, Ollama, and OpenAI models. The
        routing model and response generation model can be configured
        independently.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
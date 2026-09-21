---
id: core-concepts-chess-services
title: Chess Services
sidebar_label: Chess Services
sidebar_position: 7
---

**How does CoSMIC predict chess moves?**

Chess requests are handled by Stockfish, a dedicated chess engine, rather than by a language model. The LLM is not involved in choosing the move — Stockfish calculates it directly, using a search depth of 20, running on 2 threads, with a minimum of 30 seconds of thinking time per move and a cap of 1,000,000 positions evaluated.

CoSMIC supports two ways of asking for a move:

- From a FEN position — a standard notation describing the current board state.
- From a sequence of moves — the game so far, written out move by move.

Either input is passed to Stockfish, which returns the strongest move it finds.
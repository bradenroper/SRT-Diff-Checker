# SRT Diff Checker
The SRT Diff Checker is a quick little tool built in NextJS to strip captioning metadata (from SRT files) to perform a content diff and highlight any differences. It was built as a convenience tool to verify that any auto-generated captions match a predefined transcript. This is helpful because many auto-generation tools may provide accurate and helpful timestamps but may also include innaccuracies in automatically transcribed audio.

This was a quick one-day project to help with a specific media workflow. Hope it's helpful to anyone with similar needs!

## Demo

A demo is available [on Vercel](https://srt-diff-checker.vercel.app/). A simple preview is also seen below.

![A preview showing the tool's ability to strip SRT metadata and reformate content, as well as its diff capabilities.](/docs/SRT-preview.png)


## Getting Started

If you would like to run the tool yourself or modify any functionalities, setup is as simple as running the NextJS dev server.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
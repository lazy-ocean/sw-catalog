This is a [Next.js](https://nextjs.org/) boilerplate to create SSR-d apps without breaking a sweat. 🥵

## Stack and tools

- **[Next.js](https://nextjs.org/)** with **TypeScript** integration: React web framework
- **[Jest](https://jestjs.io/)** + **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)**: unit and React components testing
- **[Prettier](https://prettier.io/docs/en/index.html)** + **[eslint](https://eslint.org/)**: coding in style
- **[Husky](https://github.com/typicode/husky)** + **[commitlint](https://github.com/conventional-changelog/commitlint)**: auto-linting commits with Husky for meeting the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/)
- **[css-modules](<[https://styled-components.com/](https://nextjs.org/docs/app/building-your-application/styling/css-modules)>)**: styling your app.

## Run locally

1. Clone this repo as a template

[![Use this template](https://img.shields.io/badge/Genereate-Use_this_template-2ea44f?style=for-the-badge)](https://github.com/lazy-ocean/next-js-boilerplate/generate)

See the [GitHub Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) for more info on using a template repo.

2. Install all dependencies:

```
$ npm install
# or
$ yarn
```

3. Initialize Husky

```
$ npm run prepare
# or
$ yarn husky install
```

4. Run the deployment server

```
$ npm run dev
# or
$ yarn dev
```

5. Your app is served at http://localhost:3000/

## Changelog

- **Nov-22-2023**: upgrade to Next.js 14.0.2, React 18.2.0, TypeScript 4.8.4, remove styled-components in favour of css modules
- **Jun-22-2023**: first version, Next.js 12, React 18.1.0, TypeScript 4.5.5

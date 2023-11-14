# Star Wars People Catalogue App

This is a Star Wars people catalogue table app, utilizing the **[Tanstack Table](https://tanstack.com/table/v8)** as a headless table API helper. Developed with Next.js v14 and RSC (React Server Components).

## Deploy

Deployed on Vercel ✨: https://sw-catalog.vercel.app/

## Features

- **Tanstack Table Integration**: Utilizes the Tanstack Table to manage tabular data.
- **Sorting and Filtering**: allows sorting across all table columns and adds a name-based search/filter feature, with state kept in the URL.
- **Performance Optimization**: table performance is optimized by leveraging React Server Components (RSC) and virtualization for rendering table rows on scroll (dynamically reusing DOM nodes in viewport without overpopulating the DOM tree).
- **Prefetched Data**: table data is prefetched on the server due to the limited and known dataset, so the performance is better compared to lazy loading, considering the absence of backend support for sorting and filtering via the API.
- **Modal Integration**: uses a native HTML dialog to display detailed homeplanet data for each person.

## Tech Stack

- **Next.js v14**: a fab framework for server-rendered React applications.
- **RSC (React Server Components)**: server-side rendering and great interactivity.
- **Tanstack Table**: efficient table data handling without breaking a sweat.
- **CSS modules**: more performant and reliant with SSR apps than CSS-in-JS.

## Run Locally

Follow these steps to run the application locally:

1. Clone this repository

2. Install all dependencies:

```bash
$ npm install
# or
$ yarn
```

3. Initialize Husky

```bash
$ npm run prepare
# or
$ yarn husky install
```

4. Run the deployment server

```bash
$ npm run dev
# or
$ yarn dev
```

5. Your app is served at http://localhost:3000/

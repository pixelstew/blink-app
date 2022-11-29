# Blink Exercise

## Getting Started

Install the dependencies...

```bash
cd blink-app
npm install
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

To run tests:

```bash
npm run test
or
npm run test:watch
```

## Key technologies

- `Next.js`
- `swr` This library is great for fetching data and managing the state of the
  data, allows for easy caching and revalidation of data and optimistic updates.
- `jest`
- `react-testing-library`
- `date-fns`
- `jest-axe` for accessibility testing

## Limitations/Next steps

If I had some more time, I would have done the following:

- Add more tests
- Add error handling
- Add more accessibility testing
- Add a better loading state
- Add more functionality to the API

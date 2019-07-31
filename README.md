# SDK for the ProPublica Congress API

An SDK for the [ProPublica Congress API](https://projects.propublica.org/api-docs/congress-api/), written in Typescript.

Currently a work-in-progress, but has a majority of the endpoints available.

## Usage

```js
const api = new CongressAPI('my_api_key');

const result = api.client.getVotesForDateRange(
  'Senate',
  new Date('2019-06-20'),
  new Date('2019-07-13')
);

result.then(res => console.log(res));

```

API subject to change.


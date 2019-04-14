import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

const client = new ApolloClient({
  uri: 'http://localhost:62222/graphql',
  headers: { 'x-api-key': 'abc' },
  fetch,
});

export default client;

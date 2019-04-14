import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:62222/graphql',
  headers: { 'x-api-key': 'abc' },
});

export default client;

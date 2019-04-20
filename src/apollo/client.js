import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';
import { graphqlServerConfig } from '../config';

const { endpoint, apiKeyHeaderName, apiKey } = graphqlServerConfig;
const client = new ApolloClient({
  uri: endpoint,
  headers: { [apiKeyHeaderName]: apiKey },
  fetch,
});

export default client;

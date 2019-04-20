/**
 * Note: this file is not using ES modules as it's used by node in gatsby-config.js
 */


const graphqlServerConfig = {
  endpoint: process.env.GATSBY_SERVER_GRAPHQL_ENDPOINT || 'http://localhost:62222/graphql',
  apiKey: process.env.GATSBY_SERVER_API_KEY || 'abc',
  apiKeyHeaderName: 'x-api-key',
};

module.exports = { graphqlServerConfig };

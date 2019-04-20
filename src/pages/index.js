import { graphql, Link } from 'gatsby';
import React from 'react';
import Form from '../components/Form';
import Image from '../components/image';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <Form {...data.api} />
    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query {
    api {
      regions {
        code
        name
      }
    }
  }
`;

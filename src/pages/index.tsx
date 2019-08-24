import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SubscriptionForm from '../components/SubscriptionForm';

const IndexPage = () => (
  <Layout>
    <SEO />
    <h1>Hello</h1>
    <p>Select the city/movie/cinema &amp; the date for which you want to be notified</p>
    <p>Hit Subscribe &amp; Allow Notifications!</p>
    <SubscriptionForm />
  </Layout>
);

export default IndexPage;

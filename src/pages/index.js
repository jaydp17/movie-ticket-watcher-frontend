import { graphql, Link } from 'gatsby';
import React from 'react';
import Form from '../components/Form';
import Image from '../components/image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { urlBase64ToUint8Array } from '../utils/helpers';
import { areNotificationsDisabled } from '../utils/permissions';

async function subscribeMovie({ regionCode, movieCode, cinemaCode }) {
  console.log({ regionCode, movieCode, cinemaCode });
  if (areNotificationsDisabled()) {
    alert('notifications are disabled!');
    return;
  }
  const registration = await navigator.serviceWorker.register('/sw.js');
  console.log('ServiceWorker registration successful with scope: ', registration.scope);
  const vapidPublicKey =
    'BCsVNqXbivH1MD3Sa2rRWqTyr-cmPG0cHfWni9cpY5lwDaVH41e5Om01yf9fsQVXVq8Y4Xe2nvwmDB6CWJsI8vY';
  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey,
  });
  console.log(subscription);
}

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <Form {...data.api} subscribeMovie={subscribeMovie} />
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

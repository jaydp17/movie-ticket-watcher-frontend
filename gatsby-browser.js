/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
export { wrapRootElement } from './src/apollo/wrap-root-element';

// export const registerServiceWorker = () => true;

export const onClientEntry = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    });
  }
};

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. Reload to display the latest version?`,
  );

  if (answer === true) {
    window.location.reload();
  }
};

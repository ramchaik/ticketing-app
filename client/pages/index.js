import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log('LandingPage -> currentUser', currentUser);

  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    // On Server
    // Base URL to hit a service from server (inside container) - http://SERVICE_NAME.NAMESPACE.svc.cluster.local
    // Need to add header of Req, so we can set cookie

    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers,
      }
    );

    return data;
  } else {
    // On Browser
    // base url handled by browser, made same as domain on browser

    const { data } = await axios.get('/api/users/currentuser');

    return data;
  }
};

export default LandingPage;

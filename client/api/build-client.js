import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // On Server
    // Base URL to hit a service from server (inside container) - http://SERVICE_NAME.NAMESPACE.svc.cluster.local
    // Need to add header of Req, so we can set cookie

    const BASE_URL =
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local';

    return axios.create({
      baseURL: BASE_URL,
      headers: req.headers,
    });
  } else {
    // On Browser

    return axios.create({
      baseURL: '/',
    });
  }
};

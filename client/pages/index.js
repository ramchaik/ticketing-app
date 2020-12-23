const LandingPage = ({ currentUser }) => {
  return (
    <h1>{currentUser ? 'YOU are signed in!!' : 'YOU are NOT signed in!!'}</h1>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;

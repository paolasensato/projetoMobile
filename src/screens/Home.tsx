import useUserStore from '../stores/userStore';

const Home = () => {
  const store = useUserStore();

  console.log(store.token);
  return <></>;
};

export default Home;

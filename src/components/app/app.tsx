import MainScreen from '../../pages/main-screen/main-screen.tsx';

type AppProps = {
  offersCount: number;
};

function App({ offersCount }: AppProps) {
  return (
    <MainScreen offersCount={offersCount}/>
  );
}

export default App;

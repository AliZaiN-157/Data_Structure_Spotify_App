import { useEffect } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { useStateProvider } from "./utils/StateProvider";

function App() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({
        type: "SET_TOKEN",
        token: token,
      });
    }
  }, [token, dispatch]);
  return <div className="App">{token ? <Spotify /> : <Login />}</div>;
}

export default App;

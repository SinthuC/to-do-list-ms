import "./App.css";
import { Toaster } from "react-hot-toast";
import Router from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Toaster />
      <Router />
    </Provider>
  );
}

export default App;

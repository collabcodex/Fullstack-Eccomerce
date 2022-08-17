import "../styles/globals.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import store from "../reducer";
import thunk from "redux-thunk";

const stores = createStore(store, applyMiddleware(thunk));

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={stores}>
      <div className="w-full min-h-screen bg-gray-200">
        <Component {...pageProps} />;
      </div>
    </Provider>
  );
}

export default MyApp;

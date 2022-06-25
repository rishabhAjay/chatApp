import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import thunk from "redux-thunk";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import themeReducer from "./features/theme";
import authReducer from "./features/auth";
import chatReducer from "./features/chat";
import alertReducer from "./features/alert";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);
const store = configureStore({
  //reducer takes the previous value of the states and actions to make changes to those states
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    chat: chatReducer,
    alert: alertReducer,
  },
  middleware: [thunk],
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

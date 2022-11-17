import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppComponent from "./app.component";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

const container = document.getElementById("root")!;
const root = createRoot(container);

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

root.render(
  <React.StrictMode>
    <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
      <Provider store={store}>
        <BrowserRouter>
          <AppComponent />
        </BrowserRouter>
      </Provider>
    </ThemeSwitcherProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your redux, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import { Layout } from "antd";
import { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./app.component.css";
import { HomeComponent } from "./components/home/home.component";
import { SignInComponent } from "./components/signin/sign-in.component";
import { isUserAuthenticated } from "./utils/auth-utils";

const { Content } = Layout;

// @ts-ignore
export const ProtectedRoute = ({ children }): ReactElement => {
  if (!isUserAuthenticated()) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }
  return children;
};

function AppComponent() {
  return (
    <Layout className="app">
      <Content className="app-content">
        <Routes>
          <Route path="/signin" element={<SignInComponent />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeComponent />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default AppComponent;

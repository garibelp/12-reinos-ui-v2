import { SignInComponent } from "./components/auth/sign-in.component";
import { Layout } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";

import "./app.component.css";
import { isUserAuthenticated, retrieveUser } from "./utils/auth-utils";
import { ReactElement } from "react";

const { Content } = Layout;

const Test = () => {
  console.log(retrieveUser());
  return <div>Logged</div>;
};

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
                <Test />
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

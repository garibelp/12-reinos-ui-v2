import { SignInComponent } from "./components/auth/sign-in.component";
import { Button, Layout } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";

import "./app.component.css";
import { isUserAuthenticated } from "./utils/auth-utils";
import { ReactElement } from "react";
import { logout } from "./api/requests/auth";

const { Content } = Layout;

const Test = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <p>Logged</p>
      <Button danger onClick={logout}>
        Logout
      </Button>
    </div>
  );
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

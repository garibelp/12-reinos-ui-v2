import { Layout } from "antd";
import { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./app.component.css";
import { CharacterDetailsComponent } from "./components/character-details/character-details.component";
import { CreateCharacterComponent } from "./components/create-character/create-character.component";
import { HomeComponent } from "./components/home/home.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { SignInComponent } from "./components/signin/sign-in.component";
import { hasRoles, isUserAuthenticated } from "./utils/auth-utils";
import { RolesEnum } from "./enum/roles.enum";
import { messageError } from "./shared/messages";

const { Content } = Layout;

// @ts-ignore
export const ProtectedRoute = ({
  children,
  roles,
}: {
  children: ReactElement;
  roles?: RolesEnum[];
}): ReactElement => {
  if (!isUserAuthenticated()) {
    // user is not authenticated
    return <Navigate to="/signin" />;
  }
  if (!hasRoles(roles)) {
    messageError("Permissao inválida! Redirecionando para página inicial");
    return <Navigate to="/home" />;
  }
  return children;
};

function AppComponent() {
  return (
    <Layout className="app">
      <Content className="app-content">
        <Routes>
          <Route path="/signin" element={<SignInComponent />} />
          <Route path="/signup" element={<SignUpComponent />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/character/create"
            element={
              <ProtectedRoute>
                <CreateCharacterComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/character/:id"
            element={
              <ProtectedRoute>
                <CharacterDetailsComponent />
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

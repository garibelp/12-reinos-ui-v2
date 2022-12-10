import { Layout } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";

import { CharacterDetailsComponent } from "./components/character-details/character-details.component";
import { CreateCharacterComponent } from "./components/create-character/create-character.component";
import { HomeComponent } from "./components/home/home.component";

import "./app.component.css";

const { Content } = Layout;

function AppComponent() {
  return (
    <Layout className="app">
      <Content className="app-content">
        <Routes>
          <Route path="/home" element={<HomeComponent />} />
          <Route
            path="/character/create"
            element={<CreateCharacterComponent />}
          />
          <Route
            path="/character/:id"
            element={<CharacterDetailsComponent />}
          />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default AppComponent;

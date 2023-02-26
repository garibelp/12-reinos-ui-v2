import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { SettingOutlined } from "@ant-design/icons";
import { useState } from "react";

import { SettingsComponent } from "./components/settings/settings.component";
import { isAdminUser, isGmUser } from "../../utils/auth-utils";
import { BaseCardComponent } from "../../shared/components/base-card/base-card.component";

import "./home.component.css";

export function HomeComponent() {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <BaseCardComponent
      leftButton={
        <Button
          type="primary"
          shape="circle"
          onClick={() => setShowSettings(true)}
          icon={<SettingOutlined />}
        />
      }
      cardBody={
        <>
          <SettingsComponent
            hidden={!showSettings}
            callback={() => setShowSettings(false)}
          />
          <Space align="center" direction="vertical" size="large">
            <Button
              className="home-button"
              type="primary"
              onClick={() => {
                navigate("/character/list");
              }}
            >
              Personagens
            </Button>
            <Button
              className="home-button"
              type="primary"
              onClick={() => {
                navigate("/campaign/list");
              }}
              disabled={!(isGmUser() || isAdminUser())}
            >
              Mesas
            </Button>
          </Space>
        </>
      }
    />
  );
}

import { Button, Card, Collapse } from "antd";

import { logout } from "../../api/requests/auth";
import { LogoComponent } from "../../shared/logo/logo.component";
import { ThemeSwitcherComponent } from "../../shared/theme-switcher/theme-switcher.component";

import "./home.component.css";

function HomeHeader() {
  return <LogoComponent className="home-card-logo" />;
}

export function HomeComponent() {
  return (
    <div>
      <Card className="home-card" title={<HomeHeader />}>
        <Collapse bordered={false}></Collapse>
        <Button type="primary" onClick={logout}>
          Logout
        </Button>
      </Card>
      <ThemeSwitcherComponent />
    </div>
  );
}

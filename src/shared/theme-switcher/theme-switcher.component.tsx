import { Card, Layout, Space, Switch } from "antd";
import { useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";

import "./theme-switcher.component.css";

const { Footer } = Layout;

export function ThemeSwitcherComponent() {
  const { switcher, themes, currentTheme } = useThemeSwitcher();
  const [isDarkMode, setIsDarkMode] = useState(() => currentTheme === "dark");

  function toggleTheme(isChecked: boolean) {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  }

  return (
    <Footer className="footer">
      <Card>
        <Space>
          Modo Batman
          <Switch checked={isDarkMode} onChange={toggleTheme} />
        </Space>
      </Card>
    </Footer>
  );
}

import { Button, Tooltip } from "antd";
import { ArrowLeftOutlined, FileAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { BaseCardComponent } from "../../shared/components/base-card/base-card.component";

import "./campaign-list.component.css";

export function CampaignListComponent() {
  const navigate = useNavigate();
  return (
    <BaseCardComponent
      leftButton={
        <Tooltip placement="bottom" title="Voltar">
          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              navigate("/home");
            }}
            icon={<ArrowLeftOutlined />}
          />
        </Tooltip>
      }
      rightButton={
        <Tooltip placement="bottom" title="Criar Mesa">
          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              navigate("/campaign/create");
            }}
            icon={<FileAddOutlined />}
          />
        </Tooltip>
      }
    />
  );
}

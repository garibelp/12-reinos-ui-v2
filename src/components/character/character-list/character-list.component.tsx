import { Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, FileAddOutlined } from "@ant-design/icons";

import { BaseCardComponent } from "../../../shared/components/base-card/base-card.component";
import { CharacterTableComponent } from "./components/character-table/character-table.component";

import "./character-list.component.css";

export function CharacterListComponent() {
  const navigate = useNavigate();
  return (
    <BaseCardComponent
      className="character-list"
      cardBody={<CharacterTableComponent />}
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
        <Tooltip placement="bottom" title="Criar Personagem">
          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              navigate("/character/create");
            }}
            icon={<FileAddOutlined />}
          />
        </Tooltip>
      }
    />
  );
}

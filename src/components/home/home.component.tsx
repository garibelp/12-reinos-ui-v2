import { FileAddOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCharactersPaginated } from "../../api/requests/character";
import {
  BasicCharacter,
  CharacterPaginated,
} from "../../interfaces/character.interface";
import { LogoComponent } from "../../shared/components/logo/logo.component";
import { SettingsComponent } from "./components/settings/settings.component";

import "./home.component.css";

const columns = [
  {
    title: "Personagem",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Nível",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Linhagem",
    dataIndex: "lineage",
    key: "lineage",
  },
];

function HomeHeader({
  showSettings,
  disabled,
}: {
  showSettings: () => void;
  disabled: boolean;
}) {
  const navigate = useNavigate();

  return (
    <Row>
      <Col span={6} className="add-button">
        <Button
          type="primary"
          shape="circle"
          onClick={showSettings}
          disabled
          icon={<SettingOutlined />}
        />
      </Col>
      <Col span={12}>
        <LogoComponent className="home-card-logo" />
      </Col>
      <Col span={6} className="add-button">
        <Tooltip placement="bottom" title="Criar Personagem">
          <Button
            type="primary"
            shape="circle"
            disabled={disabled}
            onClick={() => {
              navigate("/character/create");
            }}
            icon={<FileAddOutlined />}
          />
        </Tooltip>
      </Col>
    </Row>
  );
}

export function HomeComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [list, setList] = useState<BasicCharacter[]>([]);
  const [retrievedPages, setRetrievedPages] = useState<any>({});

  const pageSize = 10;

  function fetchListPaginated(page: number) {
    setLoading(true);
    if (retrievedPages[page] && retrievedPages[page].length > 0) {
      setList(retrievedPages[page]);
      setLoading(false);
    } else {
      getCharactersPaginated(pageSize, page)
        .then((r) => {
          const {
            data: { list: dataList, totalElements },
          }: { data: CharacterPaginated } = r;
          setTotalElements(totalElements);
          setList(dataList);
          setRetrievedPages({
            ...retrievedPages,
            [page]: dataList,
          });
        })
        .catch((ex) => {
          console.error(ex);
        })
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    fetchListPaginated(0);
  }, []);

  return (
    <div className="home-wrapper">
      <Card
        className="home-card"
        title={
          <HomeHeader
            disabled={totalElements > 4}
            showSettings={() => setShowSettings(true)}
          />
        }
        actions={[]}
      >
        <Table
          className="home-card-table"
          loading={loading}
          columns={columns}
          dataSource={list}
          rowKey="id"
          pagination={{
            hideOnSinglePage: true,
            position: ["bottomCenter"],
            size: "small",
            total: totalElements,
            pageSize,
            onChange: (page) => {
              fetchListPaginated(page - 1);
            },
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                const { id } = record;
                navigate(`/character/${id}`);
              },
            };
          }}
          scroll={{
            scrollToFirstRowOnChange: false,
            y: 300,
          }}
        />
        <SettingsComponent
          hidden={!showSettings}
          callback={() => setShowSettings(false)}
        />
      </Card>
    </div>
  );
}

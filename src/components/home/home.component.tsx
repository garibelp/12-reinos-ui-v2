import { FileAddOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Table, Tooltip } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../../api/requests/auth";
import { getCharactersPaginated } from "../../api/requests/character";
import { CharacterPaginated } from "../../interfaces/character-paginated.interface";
import { LogoComponent } from "../../shared/logo/logo.component";

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

function HomeHeader() {
  const navigate = useNavigate();

  return (
    <Row>
      <Col span={6} />
      <Col span={12}>
        <LogoComponent className="home-card-logo" />
      </Col>
      <Col span={6} className="add-button">
        <Tooltip placement="bottom" title="Criar Personagem">
          <Button
            type="primary"
            shape="circle"
            onClick={() => {
              navigate("/create");
            }}
            icon={<FileAddOutlined />}
          />
        </Tooltip>
      </Col>
    </Row>
  );
}

export function HomeComponent() {
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [list, setList] = useState<any[]>([]);

  const pageSize = 10;

  const fetchListPaginated = useCallback(
    (page: number, initialLoad = false) => {
      setLoading(true);
      getCharactersPaginated(pageSize, page)
        .then((r) => {
          const { data }: { data: CharacterPaginated } = r;
          setList([...list, ...data.list]);
          setCurrentPage(data.currentPage);
          if (initialLoad) setTotalElements(data.totalElements);
          setLoading(false);
        })
        .catch((ex) => {
          console.error(ex);
          setLoading(false);
        });
    },
    [setList, list]
  );

  useEffect(() => {
    fetchListPaginated(0, true);
  }, []);

  return (
    <div className="home-wrapper">
      <Card
        className="home-card"
        title={<HomeHeader />}
        actions={[
          <Button type="primary" onClick={logout}>
            Logout
          </Button>,
        ]}
      >
        <Table
          className="home-card-table"
          loading={loading}
          columns={columns}
          dataSource={list}
          rowKey="id"
          pagination={false}
          scroll={{
            scrollToFirstRowOnChange: false,
            y: 300,
          }}
        />
      </Card>
    </div>
  );
}

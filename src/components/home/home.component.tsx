import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useVT } from "virtualizedtableforantd4";

import { logout } from "../../api/requests/auth";
import { charactersPaginated } from "../../api/requests/character";
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
  return (
    <div>
      <LogoComponent className="home-card-logo" />
      <Button type="primary" shape="circle" icon={<PlusOutlined />} />
    </div>
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
      charactersPaginated(pageSize, page)
        .then((r) => {
          const { data }: { data: CharacterPaginated } = r;
          setList([...list, ...data.list]);
          setCurrentPage(data.currentPage);
          if (initialLoad) setTotalElements(data.totalElements);
        })
        .catch((ex) => {
          console.error(ex);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setList, list]
  );

  useEffect(() => {
    fetchListPaginated(0, true);
  }, []);

  const [vt] = useVT(
    () => ({
      onScroll: async ({ top, isEnd }) => {
        if (isEnd) {
          if (list && list.length < totalElements) {
            await fetchListPaginated(currentPage + 1);
          }
        }
      },
      scroll: {
        y: 300,
      },
      debug: false,
    }),
    [list]
  );

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
          components={vt}
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

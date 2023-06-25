import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

import {
  BasicCharacter,
  CharacterPaginated,
} from "../../../../../interfaces/character.interface";
import { getCharactersPaginated } from "../../../../../api/requests/character";
import { isAdminUser } from "../../../../../utils/auth-utils";

import "./character-table.component.css";

const columns = [
  {
    title: "Personagem",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Capítulo",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Linhagem",
    dataIndex: "lineage",
    key: "lineage",
  },
];

const adminColumns = [
  ...columns,
  {
    title: "Usuário",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "Ativo",
    dataIndex: "active",
    key: "active",
    render: (v: boolean) => (
      <div>
        {v ? (
          <CheckCircleOutlined style={{ color: "green" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "red" }} />
        )}
      </div>
    ),
  },
];

export function CharacterTableComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
      getCharactersPaginated(!isAdminUser(), pageSize, page)
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
    <Table
      className="character-table"
      loading={loading}
      columns={isAdminUser() ? adminColumns : columns}
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
  );
}

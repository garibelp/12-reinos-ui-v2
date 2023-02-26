import { Button, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, FileAddOutlined } from "@ant-design/icons";

import { getCharactersPaginated } from "../../api/requests/character";
import {
  BasicCharacter,
  CharacterPaginated,
} from "../../interfaces/character.interface";
import { isAdminUser } from "../../utils/auth-utils";
import { BaseCardComponent } from "../../shared/components/base-card/base-card.component";

import "./character-list.component.css";

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

export function CharacterListComponent() {
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
    <BaseCardComponent
      className="character-list"
      cardBody={
        <Table
          className="character-list-card-table"
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
      }
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

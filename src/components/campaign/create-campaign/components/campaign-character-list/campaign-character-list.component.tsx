import { CloseCircleOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Row, Col, Divider } from "antd";
import { Dispatch, SetStateAction, useState } from "react";

import { messageWarning } from "../../../../../shared/messages";
import { getCharactersPaginated } from "../../../../../api/requests/character";
import { BasicCharacter } from "../../../../../interfaces/character.interface";
import { SearchBarComponent } from "../../../../../shared/components/search-bar/search-bar.component";

export function CampaignCharacterListComponent({
  selectedList,
  setSelectedList,
}: {
  selectedList: BasicCharacter[];
  setSelectedList: Dispatch<SetStateAction<BasicCharacter[]>>;
}) {
  const [loading, setLoading] = useState(false);
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [searchList, setSearchList] = useState<BasicCharacter[]>([]);

  function handleItemRemoval(id: string) {
    setSelectedList(selectedList.filter((c) => c.id !== id));
  }

  function onSearch(value: string) {
    if (value.length < 4) {
      messageWarning("Necessário mínimo de 4 caracteres para busca");
    } else {
      setLoading(true);
      getCharactersPaginated(false, 10, 0, value)
        .then((res) => {
          const {
            data: { list },
          } = res;
          setSearchList(list);
        })
        .finally(() => setLoading(false));
    }
  }

  function handleSelect(value: string) {
    const char = searchList.find((s) => s.id === value);
    if (char) {
      setSelectedList(selectedList.concat(char));
    }
    setSearchBarVisible(false);
    setSearchList([]);
  }

  return (
    <>
      <SearchBarComponent
        setModalVisible={setSearchBarVisible}
        isModalVisible={isSearchBarVisible}
        loading={loading}
        onSearch={onSearch}
        selectedList={selectedList}
        handleSelect={handleSelect}
        searchList={searchList}
        setSearchList={setSearchList}
      />
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Button
            type="primary"
            onClick={() => {
              setSearchBarVisible(true);
            }}
          >
            Adicionar
          </Button>
        </Col>
        {selectedList.length > 0 && <Divider />}
        <Col span={24}>
          <List
            itemLayout="horizontal"
            dataSource={selectedList}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{item.name.charAt(0)}</Avatar>}
                  title={item.name}
                />
                <CloseCircleOutlined
                  style={{ fontSize: "25px", color: "red" }}
                  onClick={() => {
                    handleItemRemoval(item.id);
                  }}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
}

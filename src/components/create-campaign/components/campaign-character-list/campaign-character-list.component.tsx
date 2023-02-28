import { CloseCircleOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Modal, Select, Row, Col, Divider } from "antd";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

import { messageWarning } from "../../../../shared/messages";
import { getCharactersPaginated } from "../../../../api/requests/character";
import { BasicCharacter } from "../../../../interfaces/character.interface";

function CharacterSearchModal({
  setModalVisible,
  isModalVisible,
  selectedList,
  setSelectedList,
}: {
  setModalVisible: any;
  isModalVisible: boolean;
  selectedList: BasicCharacter[];
  setSelectedList: any;
}) {
  const [loading, setLoading] = useState(false);
  const [searchList, setSearchList] = useState<BasicCharacter[]>([]);

  const debounceSearch = useMemo(() => {
    return debounce(onSearch, 800);
  }, []);

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

  function handleSelect(value: any) {
    const char = searchList.find((s) => s.id === value);
    if (char) {
      setSelectedList(selectedList.concat(char));
    }
    handleClose();
  }

  function handleClose() {
    setModalVisible(false);
    setSearchList([]);
  }

  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  });

  return (
    <Modal
      closable={false}
      onCancel={() => handleClose()}
      open={isModalVisible}
      footer={null}
    >
      <Select
        showSearch
        value={null}
        style={{ width: "100%" }}
        placeholder="Buscar nome de personagem (Case-Sensitive)"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={debounceSearch}
        onChange={handleSelect}
        loading={loading}
        notFoundContent={null}
        options={searchList
          .filter((d) => selectedList.findIndex((v) => v.id === d.id) === -1)
          .map((d) => ({
            value: d.id,
            label: d.name,
          }))}
      />
    </Modal>
  );
}

export function CampaignCharacterListComponent({
  selectedList,
  setSelectedList,
}: {
  selectedList: BasicCharacter[];
  setSelectedList: Dispatch<SetStateAction<BasicCharacter[]>>;
}) {
  const [isModalVisible, setModalVisible] = useState(false);

  function handleItemRemoval(id: string) {
    setSelectedList(selectedList.filter((c) => c.id !== id));
  }

  return (
    <>
      <CharacterSearchModal
        setModalVisible={setModalVisible}
        isModalVisible={isModalVisible}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
      />
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Button
            type="primary"
            onClick={() => {
              setModalVisible(true);
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

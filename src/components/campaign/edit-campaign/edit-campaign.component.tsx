import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Divider, Popconfirm, Row, Tooltip } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined,
  UndoOutlined,
} from "@ant-design/icons";

import {
  messageError,
  messageSuccess,
  messageWarning,
} from "../../../shared/messages";
import { HttpStatusEnum } from "../../../enum/http-status.enum";
import {
  BasicCharacter,
  CampaignCharacterEdit,
} from "../../../interfaces/character.interface";
import {
  addSheets,
  getCampaignDetails,
  removeSheets,
} from "../../../api/requests/campaign";
import { BaseCardComponent } from "../../../shared/components/base-card/base-card.component";

import "./edit-campaign.component.css";
import { SearchBarComponent } from "../../../shared/components/search-bar/search-bar.component";
import { getCharactersPaginated } from "../../../api/requests/character";

export function EditCampaignComponent() {
  const navigate = useNavigate();
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [isSaveConfirmVisible, setSaveConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<CampaignCharacterEdit[]>([]);
  const [searchList, setSearchList] = useState<BasicCharacter[]>([]);
  const { id } = useParams<{ id: string | undefined }>();

  const hasChanges =
    characters.filter(
      (c) => (c.removedChar && c.initial) || (!c.initial && !c.removedChar)
    ).length > 0;

  function fetchCampaignDetails() {
    if (typeof id !== "string") {
      navigate("/campaign/list");
    }
    setLoading(true);
    // @ts-ignore
    getCampaignDetails(id)
      .then((r) => {
        const {
          data: { sheets },
        } = r;
        setCharacters(
          sheets.map((s) => ({
            ...s,
            removedChar: false,
            initial: true,
          }))
        );
      })
      .catch((ex) => {
        const {
          response: { status },
        } = ex;
        if (status === HttpStatusEnum.FORBIDDEN) {
          messageError("Operação não autorizada!");
        } else {
          messageError("ID inválido!");
        }
        navigate("/campaign/list");
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchCampaignDetails();
  }, []);

  function handleRedirect() {
    navigate(`/campaign/${id}`);
  }

  function handleSave() {
    const charsToRemove = characters
      .filter((c) => c.removedChar && c.initial)
      .map((c) => c.id);
    const charsToAdd = characters
      .filter((c) => !c.removedChar && !c.initial)
      .map((c) => c.id);

    Promise.all([
      id && charsToAdd.length > 0 && addSheets(id, charsToAdd),
      id && charsToRemove.length > 0 && removeSheets(id, charsToRemove),
    ])
      .then(() => {
        messageSuccess("Mesa atualizada com sucesso!");
        handleRedirect();
      })
      .catch((ex) => {
        messageError("Ocorreu um erro durante atualização de mesa: " + ex);
      });
  }

  function handleAddSelect(value: string) {
    const char = searchList.find((s) => s.id === value);
    if (char) {
      setCharacters(
        characters.concat({
          id: char.id,
          name: char.name,
          lineage: char.lineage,
          initial: false,
          removedChar: false,
        })
      );
    }
    setSearchBarVisible(false);
    setSearchList([]);
  }

  function handleRemove(id: string) {
    setCharacters(
      characters.map((c) => {
        if (c.id === id) {
          c.removedChar = true;
        }
        return c;
      })
    );
  }

  function handleUndoRemove(id: string) {
    setCharacters(
      characters.map((c) => {
        if (c.id === id) {
          c.removedChar = false;
        }
        return c;
      })
    );
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

  function EditCampaignBody() {
    const sheetRender = characters.map((c, i) => (
      <div className={`${i === characters.length - 1 && "last-element"}`}>
        <Row
          align="middle"
          key={`char-${c.id}`}
          className={`${c.removedChar && "disabled"}`}
        >
          <Col span={20}>
            {c.name} - {c.lineage}
          </Col>
          <Col span={4}>
            {!c.removedChar ? (
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => {
                  handleRemove(c.id);
                }}
              />
            ) : (
              <Button
                type="primary"
                shape="circle"
                icon={<UndoOutlined />}
                onClick={() => {
                  handleUndoRemove(c.id);
                }}
              />
            )}
          </Col>
        </Row>
        {i !== characters.length - 1 && <Divider />}
      </div>
    ));

    return (
      <>
        <Row
          align="middle"
          key="edit-campaign-add"
          justify="center"
          className="edit-campaign-add"
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSearchBarVisible(true);
            }}
          >
            Adicionar
          </Button>
        </Row>
        {sheetRender}
      </>
    );
  }

  return (
    <>
      <SearchBarComponent
        key="edit-campaign-search"
        setModalVisible={setSearchBarVisible}
        isModalVisible={isSearchBarVisible}
        loading={loading}
        onSearch={onSearch}
        selectedList={characters}
        handleSelect={handleAddSelect}
        searchList={searchList}
        setSearchList={setSearchList}
      />
      <BaseCardComponent
        className="edit-campaign-body"
        key="edit-campaign-body"
        leftButton={
          <Tooltip placement="bottom" title="Cancelar">
            <Button
              type="primary"
              shape="circle"
              danger
              onClick={handleRedirect}
              loading={loading}
              icon={<CloseOutlined />}
            />
          </Tooltip>
        }
        rightButton={
          <Tooltip placement="bottom" title="Salvar">
            <Popconfirm
              title="Salvar alterações?"
              open={isSaveConfirmVisible}
              okText="Confirmar"
              cancelText="Cancelar"
              cancelButtonProps={{ color: "red" }}
              okButtonProps={{ loading: loading }}
              onConfirm={handleSave}
              onCancel={() => {
                setSaveConfirmVisible(false);
              }}
            >
              <Button
                type="primary"
                shape="circle"
                onClick={() => {
                  setSaveConfirmVisible(true);
                }}
                loading={loading}
                disabled={!hasChanges}
                icon={<SaveOutlined />}
              />
            </Popconfirm>
          </Tooltip>
        }
        cardBody={<EditCampaignBody />}
      />
    </>
  );
}

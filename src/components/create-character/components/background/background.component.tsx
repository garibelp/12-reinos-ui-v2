import { Col, Form, Row, Select } from "antd";
import { useEffect, useState } from "react";

import { getBackgroundList } from "../../../../api/requests/background";
import BrainIcon from "../../../../assets/images/Brain.png";
import PersonIcon from "../../../../assets/images/Person.png";
import { ButtonColorsEnum } from "../../../../enum/button-colors.enum";
import { Background } from "../../../../interfaces/background.interface";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setBackgrounds } from "../../../../redux/slices/background.slice";
import { RootState } from "../../../../redux/store";
import { CircleButtonComponent } from "../../../../shared/circle-button/circle-button.component";
import { ExpandableDetailsComponent } from "../../../../shared/expandable-details/expandable-details.component";

import "./background.component.css";

const { Item } = Form;
const { Option } = Select;

export function BackgroundComponent({ hidden }: { hidden: boolean }) {
  const [loading, setLoading] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState<
    Background | undefined
  >(undefined);
  const [backgroundList, setBackgroundList] = useState<Background[]>([]);
  const backgroundRedux = useAppSelector(
    (state: RootState) => state.background
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);

    if (backgroundRedux.list.length > 0) {
      setBackgroundList(backgroundRedux.list);
      setLoading(false);
    } else {
      getBackgroundList()
        .then((r) => {
          const {
            data: { list },
          } = r;
          setBackgroundList(list);
          dispatch(setBackgrounds(list));
        })
        .catch((ex) => {
          console.error(ex);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  function retrieveOptions() {
    return backgroundList.map((bg) => {
      return <Option value={bg.id}>{bg.name}</Option>;
    });
  }

  function handleSelect(id: string) {
    setSelectedBackground(backgroundList.find((bg) => bg.id === id));
  }

  function renderDetails() {
    if (!selectedBackground || hidden) {
      return null;
    }
    return (
      <>
        <Row className="background-details">
          <CircleButtonComponent
            icon={BrainIcon}
            value={selectedBackground.mentalPoints}
            name="Energia Mental"
            backgroundColor={ButtonColorsEnum.BASE_GRAY}
          />
          <CircleButtonComponent
            icon={PersonIcon}
            value={selectedBackground.physicalPoints}
            name="Energia Física"
            backgroundColor={ButtonColorsEnum.BASE_GRAY}
          />
        </Row>
        <Row>
          <ExpandableDetailsComponent
            title={selectedBackground.advantage.name}
            description={selectedBackground.advantage.description}
          />
        </Row>
      </>
    );
  }

  return (
    <>
      <Row hidden={hidden}>
        <Col span={24}>
          <Item hidden={hidden} name="backgroundId">
            <Select
              style={{ width: "100%" }}
              loading={loading}
              disabled={loading}
              onSelect={handleSelect}
              placeholder="Selecionar antecedente"
            >
              {retrieveOptions()}
            </Select>
          </Item>
        </Col>
      </Row>
      {renderDetails()}
    </>
  );
}

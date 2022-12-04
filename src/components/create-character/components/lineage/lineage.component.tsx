import { Col, Form, Row, Select } from "antd";
import { useEffect, useState } from "react";
import {
  getDetailedLineage,
  getLineageList,
} from "../../../../api/requests/lineage";
import { IdName } from "../../../../interfaces/id-name.interface";
import { DetailedLineage } from "../../../../interfaces/lineage.interface";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  addDetailedLineage,
  setBasicLineages,
} from "../../../../redux/slices/lineage.slice";
import { RootState } from "../../../../redux/store";
import { ExpandableDetailsComponent } from "../../../../shared/components/expandable-details/expandable-details.component";

const { Item } = Form;
const { Option } = Select;

export function LineageComponent({
  hidden,
  setDisableNext,
}: {
  hidden: boolean;
  setDisableNext: Function;
}) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [lineageList, setLineageList] = useState<IdName[]>([]);
  const [selectedLineage, setSelectedLineage] = useState<
    DetailedLineage | undefined
  >(undefined);
  const lineageRedux = useAppSelector((state: RootState) => state.lineage);

  useEffect(() => {
    setLoading(true);
    setDisableNext(true);
    if (lineageRedux.list.length > 0) {
      setLineageList(lineageRedux.list);
      setLoading(false);
      setDisableNext(false);
    } else {
      getLineageList()
        .then((r) => {
          const {
            data: { list },
          } = r;
          setLineageList(list);
          dispatch(setBasicLineages(list));
        })
        .catch((ex) => {
          console.error(ex);
        })
        .finally(() => {
          setLoading(false);
          setDisableNext(false);
        });
    }
  }, []);

  function handleSelect(id: string) {
    setLoading(true);
    setDisableNext(true);
    const { detailedList } = lineageRedux;
    const lineage = detailedList.find((l) => l.id === id);
    if (lineage) {
      setSelectedLineage(lineage);
      setLoading(false);
      setDisableNext(false);
    } else {
      getDetailedLineage(id)
        .then((r) => {
          const { data } = r;
          dispatch(addDetailedLineage(data));
          setSelectedLineage(data);
        })
        .catch((ex) => {
          console.error(ex);
        })
        .finally(() => {
          setLoading(false);
          setDisableNext(false);
        });
    }
  }

  function retrieveOptions() {
    return lineageList.map((l) => (
      <Option key={l.id} value={l.id}>
        {l.name}
      </Option>
    ));
  }

  function renderDetails() {
    if (!selectedLineage || hidden) return null;

    return (
      <>
        <Row>
          <ExpandableDetailsComponent
            title={`Característica Positiva: ${selectedLineage.positiveTraitName}`}
            description={selectedLineage.positiveTraitDescription}
          />
        </Row>
        <Row style={{ paddingTop: "32px" }}>
          <ExpandableDetailsComponent
            title={`Característica Negativa: ${selectedLineage.negativeTraitName}`}
            description={selectedLineage.negativeTraitDescription}
          />
        </Row>
      </>
    );
  }

  return (
    <>
      <Row hidden={hidden}>
        <Col span={24}>
          <Item hidden={hidden} name="lineageId">
            <Select
              style={{ width: "100%" }}
              loading={loading}
              disabled={loading}
              onSelect={handleSelect}
              placeholder="Selecionar linhagem"
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

import { Form, Select } from "antd";
import { useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import { TransitionalInputComponent } from "../../../../shared/components/transactional-input/transitional-input.component";
import "./aptitudes.component.css";

const { Item } = Form;
const { Option } = Select;

export function AptitudesComponent({
  hidden,
  jobId,
}: {
  hidden: boolean;
  jobId: string | undefined;
}) {
  const detailedJobList = useAppSelector(
    (state: RootState) => state.job.detailedList
  );

  function retrieveOptions() {
    const selectedJob = detailedJobList.find((j) => j.id === jobId);
    if (!selectedJob) return null;
    return selectedJob.aptitudes.map((a) => (
      <Option key={a.id} value={a.id}>
        {" "}
        {a.name}
      </Option>
    ));
  }

  function renderDetails() {
    if (hidden) return null;
  }

  return (
    <>
      <Item
        name="name"
        hidden={hidden}
        rules={[
          {
            required: true,
            min: 5,
            max: 20,
            message: "Necessário preencher nome (Min. 5, Max. 20)!",
            type: "string",
          },
        ]}
      >
        <TransitionalInputComponent placeholder="Nome" />
      </Item>
      <Item
        hidden={hidden}
        name="aptitudeList"
        rules={[
          {
            required: true,
            min: 3,
            max: 3,
            message: "Necessário selecionar 3 aptidões!",
            type: "array",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Selecionar 3 aptidões">
          {retrieveOptions()}
        </Select>
      </Item>
      {renderDetails()}
    </>
  );
}

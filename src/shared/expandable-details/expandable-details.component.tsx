import { Card, Collapse } from "antd";
import { TextWithBreaklineComponent } from "../text-with-breakline/text-with-breakline.component";

import "./expandable-details.component.css";

const { Panel } = Collapse;

export function ExpandableDetailsComponent({
  title,
  description,
}: {
  title?: string;
  description: string;
}) {
  if (!title) {
    return (
      <Card className="details-card">
        {/*@ts-ignore*/}
        <TextWithBreaklineComponent text={description} />
      </Card>
    );
  }
  return (
    <Collapse
      bordered={false}
      expandIconPosition="end"
      className="details-card"
    >
      <Panel key="1" header={title}>
        {/*@ts-ignore*/}
        <TextWithBreaklineComponent text={description} />
      </Panel>
    </Collapse>
  );
}

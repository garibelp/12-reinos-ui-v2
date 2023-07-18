import { ReactNode } from "react";
import { Card, Collapse } from "antd";
import { TextWithBreaklineComponent } from "../text-with-breakline/text-with-breakline.component";

import "./expandable-details.component.css";

const { Panel } = Collapse;

export function ExpandableDetailsComponent({
  title,
  description,
}: {
  title?: string;
  description: string | ReactNode;
}) {
  const body =
    typeof description === "string" ? (
      <TextWithBreaklineComponent text={description} />
    ) : (
      description
    );
  if (!title) {
    return <Card className="details-card">{body}</Card>;
  }
  return (
    <Collapse
      bordered={false}
      expandIconPosition="end"
      className="details-card"
    >
      <Panel key="1" header={title}>
        {body}
      </Panel>
    </Collapse>
  );
}

import { WoundsComponent } from "./wounds/wounds.component";
import { Wound } from "../../../../../interfaces/wound.interface";

import "./notes.component.css";

interface Props {
  hidden: boolean;
  currentWound?: Wound;
  sheetId: string;
}

export function NotesComponent({ hidden, currentWound, sheetId }: Props) {
  if (hidden) return null;

  return (
    <>
      <WoundsComponent currentWound={currentWound} sheetId={sheetId} />
    </>
  );
}

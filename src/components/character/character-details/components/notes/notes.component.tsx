import { WoundsComponent } from "./wounds/wounds.component";
import { useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";

import "./notes.component.css";

interface Props {
  hidden: boolean;
  sheetId: string;
}

export function NotesComponent({ hidden, sheetId }: Props) {
  const { list } = useAppSelector((state: RootState) => state.character);
  const storeChar = list.find((c) => c.id === sheetId);

  if (hidden || !storeChar) return null;

  const { wound: currentWound } = storeChar;

  return (
    <>
      <WoundsComponent currentWound={currentWound} sheetId={sheetId} />
    </>
  );
}

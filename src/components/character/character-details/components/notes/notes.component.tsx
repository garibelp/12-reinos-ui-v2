import { useEffect, useState } from "react";
import { Button, Divider, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { EditFilled } from "@ant-design/icons";

import { WoundsComponent } from "./wounds/wounds.component";
import { useAppSelector } from "../../../../../redux/hooks";
import { RootState } from "../../../../../redux/store";
import { updateNotes } from "../../../../../api/requests/character";

import "./notes.component.css";
import { messageError, messageSuccess } from "../../../../../shared/messages";
import { useDispatch } from "react-redux";
import { updateStoreNotes } from "../../../../../redux/slices/character.slice";
import { ExpandableDetailsComponent } from "../../../../../shared/components/expandable-details/expandable-details.component";

interface Props {
  hidden: boolean;
  sheetId: string;
}

export function NotesComponent({ hidden, sheetId }: Props) {
  const dispatch = useDispatch();
  const { list } = useAppSelector((state: RootState) => state.character);
  const [notes, setNotes] = useState<string | undefined>(undefined);
  const [editNotesLoading, setEditNotesLoading] = useState(false);
  const [editNotesDisabled, setEditNotesDisabled] = useState(true);
  const storeChar = list.find((c) => c.id === sheetId);
  const {
    wound: currentWound,
    notes: storeNotes,
    bond,
    motivation,
  } = storeChar || {};

  useEffect(() => {
    setNotes(storeNotes);
  }, [storeNotes]);

  if (hidden || !storeChar) return null;

  function handleSave() {
    setEditNotesDisabled(true);
    setEditNotesLoading(true);
    updateNotes(sheetId, `${notes}`)
      .then(() => {
        messageSuccess("Notas salvas com sucesso!");
        dispatch(updateStoreNotes({ id: sheetId, notes }));
      })
      .catch(() => {
        messageError("Falha ao tentar salvar notas!");
      })
      .finally(() => {
        setEditNotesLoading(false);
      });
  }

  function handleCancel() {
    setNotes(storeNotes);
    setEditNotesDisabled(true);
  }

  return (
    <>
      <WoundsComponent currentWound={currentWound} sheetId={sheetId} />
      <Divider />
      <ExpandableDetailsComponent title="Vínculo" description={bond} />
      <Divider />
      <ExpandableDetailsComponent title="Motivação" description={motivation} />
      <Divider />
      <b>
        <p>Notas</p>
      </b>
      <TextArea
        disabled={editNotesDisabled || editNotesLoading}
        className="notes-text-area"
        rows={6}
        maxLength={1000}
        onChange={(e) => {
          setNotes(e.target.value);
        }}
        value={notes}
      />
      <div className="notes-footer">
        <Button
          hidden={!editNotesDisabled}
          type="primary"
          loading={editNotesLoading}
          icon={<EditFilled />}
          onClick={() => setEditNotesDisabled(false)}
        />
        <Button
          hidden={editNotesDisabled}
          type="primary"
          danger
          loading={editNotesLoading}
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button
          hidden={editNotesDisabled}
          type="primary"
          loading={editNotesLoading}
          disabled={storeNotes === notes}
          onClick={handleSave}
        >
          Salvar
        </Button>
      </div>
    </>
  );
}

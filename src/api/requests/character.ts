import { v4 as uuidv4 } from "uuid";
import {
  CharacterPaginated,
  CreateCharacter,
  DetailedCharacter,
  StoreCharacter,
  UpdateAttributePayload,
} from "../../interfaces/character.interface";
import aptitudeList from "../../mock/aptitudes.json";
import backgroundList from "../../mock/backgrounds.json";
import jobList from "../../mock/jobs.json";
import lineageList from "../../mock/lineages.json";

export function getCharactersPaginated(
  pageSize?: number,
  currentPage?: number
): Promise<{ data: CharacterPaginated }> {
  const charList = retrieveCharFromLocalStorage();

  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          data: {
            list: charList.map((c) => {
              return {
                id: c.id,
                name: c.name,
                level: c.level,
                lineage:
                  lineageList.list.find((l) => l.id === c.lineageId)?.name ||
                  "",
                userId: "",
                userName: "",
                active: true,
              };
            }),
            totalElements: charList.length,
            totalPages: 1,
            currentPage: currentPage || 0,
            pageSize: pageSize || 5,
          },
        }),
      100
    )
  );
}

export function createCharacter(
  payload: CreateCharacter
): Promise<{ data: { id: string } }> {
  const charList = retrieveCharFromLocalStorage();
  const bg = backgroundList.list.find((b) => b.id === payload.backgroundId);
  const job = jobList.list.find((j) => j.id === payload.jobId);
  let physical = 1;
  let mental = 1;
  if (job && bg) {
    physical = bg.physicalPoints + job.physicalPoints;
    mental = bg.mentalPoints + job.mentalPoints;
  }
  const id = uuidv4();
  charList.push({
    id,
    level: 1,
    mentalCurrent: mental,
    mentalTotal: mental,
    physicalCurrent: physical,
    physicalTotal: physical,
    heroismCurrent: 1,
    heroismTotal: 1,
    ...payload,
  });
  localStorage.setItem("characters", JSON.stringify(charList));
  return new Promise((res) => setTimeout(() => res({ data: { id } }), 100));
}

export function getCharacterDetails(
  id: string
): Promise<{ data: DetailedCharacter }> {
  const charList = retrieveCharFromLocalStorage();

  const storeChar = charList.find((c) => c.id === id);

  if (storeChar) {
    return new Promise((res) =>
      setTimeout(
        () =>
          res({
            data: {
              intelligence: storeChar.intelligence.toString(),
              cunning: storeChar.cunning.toString(),
              tenacity: storeChar.tenacity.toString(),
              celerity: storeChar.celerity.toString(),
              level: storeChar.level,
              mentalCurrent: storeChar.mentalCurrent,
              mentalTotal: storeChar.mentalTotal,
              physicalCurrent: storeChar.physicalCurrent,
              physicalTotal: storeChar.physicalTotal,
              heroismCurrent: storeChar.heroismCurrent,
              heroismTotal: storeChar.heroismTotal,
              // @ts-ignore
              lineage: lineageList.list.find(
                (l) => l.id === storeChar.lineageId
              ),
              // @ts-ignore
              background: backgroundList.list.find(
                (l) => l.id === storeChar.backgroundId
              ),
              // @ts-ignore
              job: jobList.list.find((j) => j.id === storeChar.jobId),
              // @ts-ignore
              aptitudes: storeChar.aptitudeList.map((id) =>
                aptitudeList.list.find((a) => a.id === id)
              ),
              active: true,
            },
          }),
        100
      )
    );
  }

  throw new Error("Character not found");
}

export function updateAttributes(
  id: string,
  payload: UpdateAttributePayload
): Promise<{ data: { message: string } }> {
  const charList = retrieveCharFromLocalStorage();
  charList.map((c) => {
    if (c.id === id) {
      c.mentalCurrent = payload.mentalCurrent;
      c.physicalCurrent = payload.physicalCurrent;
      c.heroismCurrent = payload.heroismCurrent;
    }
    return c;
  });
  localStorage.setItem("characters", JSON.stringify(charList));
  return new Promise((res) =>
    setTimeout(() => res({ data: { message: "updated" } }), 100)
  );
}

export function deleteCharacter(
  id: string
): Promise<{ data: { message: string } }> {
  const charList = retrieveCharFromLocalStorage();
  localStorage.setItem(
    "characters",
    JSON.stringify(charList.filter((c) => c.id !== id))
  );
  return new Promise((res) =>
    setTimeout(() => res({ data: { message: "deleted" } }), 100)
  );
}

function retrieveCharFromLocalStorage(): StoreCharacter[] {
  const storageChars = localStorage.getItem("characters");
  return storageChars ? JSON.parse(storageChars) : [];
}

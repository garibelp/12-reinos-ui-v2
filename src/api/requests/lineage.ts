import { IdName } from "../../interfaces/id-name.interface";
import { DetailedLineage } from "../../interfaces/lineage.interface";
import lineageList from "../../mock/lineages.json";

export function getLineageList(): Promise<{ data: { list: IdName[] } }> {
  return new Promise((res) =>
    setTimeout(
      () =>
        res({
          data: {
            list: lineageList.list.map((l) => {
              return { id: l.id, name: l.name };
            }),
          },
        }),
      100
    )
  );
}

export function getDetailedLineage(
  id: string
): Promise<{ data: DetailedLineage | undefined }> {
  return new Promise((res) =>
    setTimeout(
      () => res({ data: lineageList.list.find((l) => l.id === id) }),
      100
    )
  );
}

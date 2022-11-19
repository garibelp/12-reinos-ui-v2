import { IdName } from "./id-name.interface";
import { PaginatedSearch } from "./paginated-search.interface";

export interface BasicCharacter extends IdName {
  level: number;
  lineage: string;
  userId: string;
  userName: string;
  active: boolean;
}

export interface CharacterPaginated extends PaginatedSearch {
  list: BasicCharacter[];
}

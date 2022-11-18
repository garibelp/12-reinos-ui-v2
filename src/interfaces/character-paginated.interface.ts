import { PaginatedSearch } from "./paginated-search.interface";

export interface BasicCharacter {
  id: string;
  name: string;
  level: number;
  lineage: string;
  userId: string;
  userName: string;
  active: boolean;
}

export interface CharacterPaginated extends PaginatedSearch {
  list: BasicCharacter[];
}

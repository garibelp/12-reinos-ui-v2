import { CampaignCharacter } from "./character.interface";
import { IdName } from "./id-name.interface";
import { PaginatedSearch } from "./paginated-search.interface";

export interface CreateCampaign {
  name: string;
  notes: string;
  sheetList: string[];
}

export interface BasicCampaign extends IdName {}

export interface CampaignPaginated extends PaginatedSearch {
  list: BasicCampaign[];
}

export interface DetailedCampaign extends IdName {
  notes: string;
  sheets: CampaignCharacter[];
}

import { IdName } from "./id-name.interface";

export interface Wound extends IdName {
  diceRange: string;
  description: string;
}

export interface WoundList {
  list: Wound[];
}

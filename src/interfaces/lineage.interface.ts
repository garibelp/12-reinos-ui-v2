import { IdName } from "./id-name.interface";

export interface LineageList {
  list: IdName[];
}

export interface DetailedLineage extends IdName {
  description: string;
  size: string;
  language: string;
  maturity: string;
  positiveTraitName: string;
  positiveTraitDescription: string;
  negativeTraitName: string;
  negativeTraitDescription: string;
}

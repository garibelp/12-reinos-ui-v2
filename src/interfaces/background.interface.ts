import { IdName } from "./id-name.interface";

export interface Advantage extends IdName {
  description: string;
}

export interface Background extends IdName {
  physicalPoints: number;
  mentalPoints: number;
  advantage: Advantage;
}

export interface BackgroundList {
  list: Background[];
}

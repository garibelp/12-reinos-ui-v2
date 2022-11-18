export interface Advantage {
  id: string;
  name: string;
  description: string;
}

export interface Background {
  id: string;
  name: string;
  physicalPoints: number;
  mentalPoints: number;
  advantage: Advantage;
}

export interface BackgrounList {
  list: Background[];
}

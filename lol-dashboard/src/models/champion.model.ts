export interface Champion {
  id: number;
  key: string;
  name: string;
  title: string;
  tags: string[];
}

export interface ChampionResponse {
  type: string;
  version: string;
  data: { [key: string]: Champion };
}

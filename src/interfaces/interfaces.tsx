export interface Synagogue {
  latitude: number;
  longitude: number;
  _id: number;
  name: string;
  city: string;
  state: string;
  movement: string;
}

export interface ResultsContextInterface {
  results: Synagogue[];
  setResults(results: Synagogue[]): void;
}

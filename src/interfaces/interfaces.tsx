export interface Synagogue {
  latitude: number;
  longitude: number;
  _id: number;
  name: string;
  city: string;
  state: string;
  movement: string;
  phone: string;
  url: string;
  zip: string;
  address: string;
}

export interface ResultsContextInterface {
  results: Synagogue[];
  setResults(results: Synagogue[]): void;
}

export interface MapContextInterface {
  map: mapkit.Map;
  setMap(): void;
  updateMap(el: string): void;
}

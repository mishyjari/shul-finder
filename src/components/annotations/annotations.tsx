import { Synagogue } from '../../interfaces/interfaces';

interface Coords {
  latitude: number;
  longitude: number;
}

export const isInVisibleMapRect = (
  { latitude, longitude }: Coords,
  {
    eastLongitude,
    westLongitude,
    northLatitude,
    southLatitude,
  }: mapkit.BoundingRegion
): boolean => {
  return (
    latitude < northLatitude &&
    latitude > southLatitude &&
    longitude < westLongitude &&
    longitude > eastLongitude
  );
};

export const synagogueAnnotation = (
  synagogue: Synagogue
): mapkit.MarkerAnnotation => {
  const coords = new mapkit.Coordinate(synagogue.latitude, synagogue.longitude);
  const options = {
    title: synagogue.name,
    color: 'blue',
    subtitle: synagogue.movement,
    data: synagogue,
    animates: true,
    calloutEnabled: true,
    clusteringIdentifier: 'synagogue-cluster',
  };
  return new mapkit.MarkerAnnotation(coords, options);
};

export const userAnnotation = (
  coords: mapkit.Coordinate
): mapkit.MarkerAnnotation => {
  const options = {
    title: 'My Location',
    color: 'grey',
  };
  return new mapkit.MarkerAnnotation(coords, options);
};

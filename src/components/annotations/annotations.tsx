import { Synagogue } from '../../interfaces/interfaces';

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

import { Synagogue } from '../../interfaces/interfaces';
import MagenDavid from '../../assets/magen-david.png';
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
    Math.abs(latitude) < Math.abs(northLatitude) &&
    Math.abs(latitude) > Math.abs(southLatitude) &&
    Math.abs(longitude) < Math.abs(westLongitude) &&
    Math.abs(longitude) > Math.abs(eastLongitude)
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
    glyphImage: {
      1: MagenDavid,
      2: MagenDavid,
      3: MagenDavid,
    },
  };
  const annotation = new mapkit.MarkerAnnotation(coords, options);
  // annotation.addEventListener('select', () => {
  //   console.log(annotation.titleVisibility);
  // });
  return annotation;
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

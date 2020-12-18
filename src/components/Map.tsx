import * as React from 'react';
import { useEffect } from 'react';
import { ResultsContext } from '../contexts/ResultsContext';
import {
  Synagogue,
  ResultsContextInterface,
  MapContextInterface,
} from '../interfaces/interfaces';
import {
  synagogueAnnotation,
  isInVisibleMapRect,
} from './annotations/annotations';
// import ModalIntercept from './ModalIntercept';

require('apple-mapkit-js');

const Map = ({ updateMap, setMap, map }: MapContextInterface): JSX.Element => {
  useEffect(() => {
    updateMap('map-container');
    return () => setMap();
  }, []);

  const updateAnnotationsOnNewRegion = (
    context: ResultsContextInterface
  ): void => {
    map.annotations = [];
    const boundingRegion = map.region.toBoundingRegion();
    context.results
      .filter((synagogue: Synagogue) => {
        const idx = map.annotations.findIndex(
          annotation => annotation.data._id === synagogue._id
        );
        const { latitude, longitude } = synagogue;
        return (
          idx < 0 && isInVisibleMapRect({ latitude, longitude }, boundingRegion)
        );
      })
      .forEach((synagogue: Synagogue) => {
        try {
          const { latitude, longitude } = synagogue;

          if (isInVisibleMapRect({ latitude, longitude }, boundingRegion)) {
            const annotation: mapkit.MarkerAnnotation = synagogueAnnotation(
              synagogue
            );

            map.addAnnotation(annotation);
          }
        } catch (err) {
          console.log(err);
          console.log(synagogue);
        }
      });
  };

  return (
    <ResultsContext.Consumer>
      {(context: ResultsContextInterface) => {
        updateAnnotationsOnNewRegion(context);
        map.addEventListener('region-change-end', () =>
          updateAnnotationsOnNewRegion(context)
        );

        return <div id='map-container'></div>;
      }}
    </ResultsContext.Consumer>
  );
};

export default Map;

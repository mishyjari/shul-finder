import * as React from 'react';
import { useEffect, useState } from 'react';
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
import { Toast } from 'react-bootstrap';
import ModalIntercept from './ModalIntercept';

require('apple-mapkit-js');

const Map = ({ updateMap, setMap, map }: MapContextInterface): JSX.Element => {
  const [loadAnnotations, setLoadAnnotations] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (success: any) => {
        setLoadAnnotations(true);
      },
      (error: any) => {
        console.log(error);
      }
    );

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
        if (loadAnnotations) {
          updateAnnotationsOnNewRegion(context);
        }

        const dist = Math.floor(
          (map.visibleMapRect.size.height + map.visibleMapRect.size.width) *
            1000
        );

        map.addEventListener('region-change-end', () => {
          if (loadAnnotations || dist < 10) {
            updateAnnotationsOnNewRegion(context);
          }
        });

        return loadAnnotations ? (
          <div id='map-container'></div>
        ) : (
          <div id='map-container'>
            {dist >= 10 ? (
              <>
                <Toast>
                  <Toast.Header>
                    <strong>Location Services Disabled</strong>
                  </Toast.Header>
                  <Toast.Body>
                    Zoom in or use search to view map annotations.
                  </Toast.Body>
                </Toast>
                <ModalIntercept />
              </>
            ) : (
              <ModalIntercept />
            )}
          </div>
        );
      }}
    </ResultsContext.Consumer>
  );
};

export default Map;

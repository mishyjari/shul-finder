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
import InfoModal from './InfoModal';

require('apple-mapkit-js');

const Map = ({ updateMap, setMap, map }: MapContextInterface): JSX.Element => {
  const [loadAnnotations, setLoadAnnotations] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const toggleShowToast = () => setShowToast(!showToast);

  const [showInfo, setShowInfo] = useState({
    show: false,
    data: {
      latitude: 0,
      longitude: 0,
      _id: 0,
      name: '',
      city: '',
      state: '',
      movement: '',
      phone: '',
      url: '',
      zip: '',
      address: '',
    },
  });

  map.addEventListener('select', (e: any) => {
    if (map.selectedAnnotation!.memberAnnotations) {
      const coord = map.selectedAnnotation!.coordinate;
    }
  });

  // const toggleLoadAnnotations = () => setLoadAnnotations(!loadAnnotations);

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
            const annotation: any = synagogueAnnotation(synagogue);

            annotation.addEventListener('select', (e: any) => {
              setShowInfo({
                ...showInfo,
                show: false,
              });
              setShowInfo({
                show: true,
                data: e.target.data,
              });
            });

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
          <div id='map-container'>
            {showInfo.show ? <InfoModal {...showInfo.data} /> : null}
          </div>
        ) : (
          <div id='map-container'>
            {dist >= 10 ? (
              <>
                <Toast show={showToast} onClose={toggleShowToast}>
                  <Toast.Header>
                    <strong>Location Services Disabled</strong>
                  </Toast.Header>
                  <Toast.Body>
                    Zoom in or use search to view map annotations.
                  </Toast.Body>
                </Toast>
                <ModalIntercept toggleAnnotations={setLoadAnnotations} />
              </>
            ) : (
              <ModalIntercept toggleAnnotations={setLoadAnnotations} />
            )}
          </div>
        );
      }}
    </ResultsContext.Consumer>
  );
};

export default Map;

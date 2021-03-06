import React from 'react';
import _ from 'lodash';

import {mapStyles, apiKey} from './GoogleMapConfig';
import {Marker} from 'react-google-maps';

import markerImage from '../static/images/Ripple-1.5s-200px.svg';
import markerImageActive from '../static/images/Ripple-1.5s-200px-active.svg';

const {compose, withProps, withStateHandlers} = require('recompose');
const {withScriptjs, withGoogleMap, GoogleMap} = require('react-google-maps');

// block producer marker 는 cluster로 표시하고, 해당 turn에 생산하는 블록 프로듀서만 띄워주는 방식이 어떨까 합니다.

const publicPath = window.STATS_CONFIG.publicPath;

const StyledMapWithAnInfoBox = compose(
  withProps({
    googleMapURL : `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places&region=KR`,
    loadingElement : <div style={{height : '100%'}} />,
    containerElement : <div style={{height : '400px'}} />,
    mapElement : <div style={{height : '100%'}} />,
    center : {lat : 37.56, lng : 126.97}
  }),
  withStateHandlers(() => ({
    isOpen : false
  }), {
    onToggleOpen : ({isOpen}) => () => ({
      isOpen : !isOpen
    })
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={2}
    defaultOptions={{styles : mapStyles}}
    defaultCenter={props.center}
  >
    {
      props.p_nodes.map((node) => {
        if (_.isEmpty(node.producer.loc.coordinates)) {
          return null;
        }
        let icon = {
          url : `${publicPath}${markerImage}`,
          scaledSize : new window.google.maps.Size(200, 200),
          anchor : new window.google.maps.Point(100, 100),
          fillOpacity : 0.2
        };
        if (node.prod_name === props.head_block_producer) {
          icon = {
            url : `${publicPath}${markerImageActive}`,
            scaledSize : new window.google.maps.Size(80, 80),
            anchor : new window.google.maps.Point(40, 40)
          };
        }
        try {
          return (
            <Marker
              key={node.prod_name}
              position={
                {
                  lat : node.producer.loc.coordinates[0],
                  lng : node.producer.loc.coordinates[1]
                }
              }
              icon={icon}
            />
          );
        } catch (err) {
          return (
            null
          );
        }
      })
    }
    {/*
      props.f_nodes.map((node) => {
        if (_.isEmpty(node.producer.loc.coordinates)) {
          return null;
        }
        const visible = node.prod_name === props.head_block_producer;
        try {
          return (
            <Marker
              key={node.prod_name}
              position={
                {
                  lat : node.producer.loc.coordinates[0],
                  lng : node.producer.loc.coordinates[1]
                }
              }
              defaultIcon={{
                url : `${publicPath}${markerImage}`,
                scaledSize : new window.google.maps.Size(100, 100),
                anchor : new window.google.maps.Point(50, 50)
              }}
              defaultAnimation={node.prod_name === props.head_block_producer && window.google.maps.Animation.BOUNCE}
              visible={visible}
            />
          );
        } catch (err) {
          return (
            null
          );
        }
      })
      */
    }
  </GoogleMap>
);

export default StyledMapWithAnInfoBox;

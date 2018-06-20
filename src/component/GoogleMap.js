import React from 'react';
import _ from 'lodash';

import {mapStyles, apiKey} from './GoogleMapConfig';
import {Marker} from 'react-google-maps';
import markerImage from '../static/images/Ripple-1.5s-200px.gif';

const {compose, withProps, withStateHandlers} = require('recompose');
const {withScriptjs, withGoogleMap, GoogleMap} = require('react-google-maps');
// const {InfoBox} = reuire('react-g'react-google-maps/lib/components/addons/MarkerWithLabel'
// const demoFancyMapStyles = require('./demoFancyMapStyles.json');

//block producer marker 는 cluster로 표시하고, 해당 turn에 생산하는 블록 프로듀서만 띄워주는 방식이 어떨까 합니다.

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
        let animation=0;
        let icon = {
          path : 'M 0,0 -1,-2 V -43 H 1 V -2 z M 1,-40 H 30 V -20 H 1 z', // window.google.maps.SymbolPath.CIRCLE,
          // path : 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
          fillColor :'#2196F3',
          fillOpacity : 0.5,
          strokeColor: '#000',
          scale : 0.5
        }
        if (node.prod_name === props.head_block_producer) {
          icon = { url : `${publicPath}${markerImage}`, scaledSize : new window.google.maps.Size(100, 100), anchor : new window.google.maps.Point(50, 50)}
          // animation = window.google.maps.Animation.BOUNCE;
          //icon.scale = 0.7;
          //icon.fillOpacity = 0.7;
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
              animation={animation}
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

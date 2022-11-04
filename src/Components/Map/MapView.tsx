import React from "react";
import maplibregl from "maplibre-gl";
import { Map, NavigationControl, ScaleControl } from "react-map-gl";
import MapNode from "@components/Map/MapNode";

import "./MapView.css";
import { useSelector } from "react-redux";
import { selectAllDevices } from "@app/features/device/deviceSelectors";


export const MapView = () => {
  const devices = useSelector(selectAllDevices());

  return (
    <div className="relative w-full h-full">
      <Map
        mapStyle="https://raw.githubusercontent.com/hc-oss/maplibre-gl-styles/master/styles/osm-mapnik/v8/default.json"
        mapLib={maplibregl}
        attributionControl={false}
      >
        <ScaleControl maxWidth={144} position="bottom-right" unit="imperial" />
        <NavigationControl position="bottom-right" showCompass={false} />

        {devices.map(node => (<MapNode key={node.id} device={node} isBase={false} />))}
      </Map>
    </div>
  );
};
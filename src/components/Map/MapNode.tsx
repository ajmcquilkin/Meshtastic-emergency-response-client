import React, { useCallback, useEffect, useState } from "react";
import { Marker } from "react-map-gl";

import MapNodeIcon from "@components/Map/MapNodeIcon";
import type { INode } from "@features/device/deviceSlice";
import {
  getTimeSinceLastMessage,
  getNodeState,
  getHeadingFromNodeState,
  getColorClassFromNodeState,
} from "@utils/nodeUtils";

export interface IMapNodeProps {
  node: INode;
  onClick: (nodeId: number | null) => void;
  size?: "sm" | "med" | "lg";
  isBase?: boolean;
  isActive?: boolean;
}

const MapNode = ({
  node,
  onClick,
  size = "med",
  isBase = false,
  isActive = false,
}: IMapNodeProps) => {
  const [timeSinceLastMessage, setTimeSinceLastMessage] = useState(0);

  const nodeState = getNodeState(timeSinceLastMessage, isActive);
  const headingPrefix = getHeadingFromNodeState(nodeState, isBase);

  const colorClasses = getColorClassFromNodeState(nodeState);
  const iconRotation = !isBase ? node.data.position?.groundTrack ?? 0 : 0;

  const handleNodeClick = (e: mapboxgl.MapboxEvent<MouseEvent>) => {
    e.originalEvent.preventDefault();
    onClick(node.data.num);
  };

  const reloadTimeSinceLastMessage = useCallback(() => {
    setTimeSinceLastMessage(getTimeSinceLastMessage(node));
  }, [setTimeSinceLastMessage, node]);

  useEffect(() => {
    const intervalId = setInterval(reloadTimeSinceLastMessage, 1000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Marker
      latitude={(node.data.position?.latitudeI ?? 0) / 1e7}
      longitude={(node.data.position?.longitudeI ?? 0) / 1e7}
      onClick={handleNodeClick}
    >
      <div className="relative">
        <div
          className="absolute left-2/4 text-center whitespace-nowrap px-2 py-1 default-overlay text-xs"
          style={{ transform: "translate(-50%, -120%)" }}
        >
          {headingPrefix && (
            <span className={`font-bold ${colorClasses.text}`}>
              {headingPrefix}{" "}
            </span>
          )}
          <span className={`font-normal ${colorClasses.text}`}>
            {node.data.user?.longName ?? node.data.num}
          </span>
          {(nodeState === "warning" || nodeState === "error") && (
            <span className={`font-normal ${colorClasses.text}`}>
              {" "}
              ({timeSinceLastMessage} min)
            </span>
          )}
        </div>

        <div style={{ transform: `rotate(${iconRotation}deg)` }}>
          <MapNodeIcon
            size={size}
            state={nodeState}
            isBase={isBase}
            className="drop-shadow-lg"
          />
        </div>
      </div>
    </Marker>
  );
};

export default MapNode;

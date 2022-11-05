import { EventChannel, eventChannel } from "redux-saga";
import { call, put, take, takeEvery } from "redux-saga/effects";
import type { ISerialConnection, Types } from "@meshtastic/meshtasticjs";

import { deviceSliceActions } from "@features/device/deviceSlice";
import { sendTextAction } from "@features/device/deviceActions";

export type DeviceMetadataPacket = Types.DeviceMetadataPacket;
export type RoutingPacket = Types.RoutingPacket;
export type TelemetryPacket = Types.TelemetryPacket;
export type DeviceStatusPacket = Types.DeviceStatusEnum;
export type PositionPacket = Types.PositionPacket;
export type WaypointPacket = Types.WaypointPacket;
export type UserPacket = Types.UserPacket;
export type NodeInfoPacket = Types.NodeInfoPacket;
export type ChannelPacket = Types.ChannelPacket;
export type ConfigPacket = Types.ConfigPacket;
export type ModuleConfigPacket = Types.ModuleConfigPacket;
export type MessagePacket = Types.MessagePacket;

export type DeviceMetadataPacketChannel = EventChannel<DeviceMetadataPacket>;
export type RoutingPacketChannel = EventChannel<RoutingPacket>;
export type TelemetryPacketChannel = EventChannel<TelemetryPacket>;
export type DeviceStatusChannel = EventChannel<DeviceStatusPacket>;
export type PostionPacketChannel = EventChannel<PositionPacket>;
export type WaypointPacketChannel = EventChannel<WaypointPacket>;
export type UserPacketChannel = EventChannel<UserPacket>;
export type NodeInfoPacketChannel = EventChannel<NodeInfoPacket>;
export type ChannelPacketChannel = EventChannel<ChannelPacket>;
export type ConfigPacketChannel = EventChannel<ConfigPacket>;
export type ModuleConfigPacketChannel = EventChannel<ModuleConfigPacket>;
export type MessagePacketChannel = EventChannel<MessagePacket>;

export function* listenSendText(connection: ISerialConnection) {
  yield takeEvery(sendTextAction.type, handleSendText, connection);
}

export function* handleSendText(
  connection: ISerialConnection,
  action: ReturnType<typeof sendTextAction>
) {
  const { message, destination, wantAck, channel, callback } = action.payload;

  yield call(
    [connection, "sendText"],
    message,
    destination,
    wantAck,
    channel,
    callback
  );
}

function* handleSagaError(error: unknown) {
  yield put({ type: "GENERAL_ERROR", payload: error });
}

export const createDeviceMetadataPacketChannel = (
  connection: Types.ConnectionType
): DeviceMetadataPacketChannel => {
  return eventChannel((emitter) => {
    connection.onDeviceMetadataPacket.subscribe((packet) => {
      emitter(packet);
    });

    return () => null;
  });
};

export function* handleDeviceMetadataPacketChannel(
  deviceId: number,
  channel: DeviceMetadataPacketChannel
) {
  try {
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const packet: DeviceMetadataPacket = yield take(channel);
      yield put(deviceSliceActions.updateDeviceMetadata({ deviceId, packet }));
    }
  } catch (error) {
    yield call(handleSagaError, error);
  }
}

export const createRoutingPacketChannel = (
  connection: Types.ConnectionType
): RoutingPacketChannel => {
  return eventChannel((emitter) => {
    connection.onRoutingPacket.subscribe((packet) => {
      emitter(packet);
    });

    return () => null;
  });
};

export function* handleRoutingPacketChannel(
  deviceId: number,
  channel: RoutingPacketChannel
) {
  try {
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const packet: RoutingPacket = yield take(channel);
      console.log("routingPacket", deviceId, packet);
    }
  } catch (error) {
    yield call(handleSagaError, error);
  }
}

export const createTelemetryPacketChannel = (
  connection: Types.ConnectionType
): TelemetryPacketChannel => {
  return eventChannel((emitter) => {
    connection.onTelemetryPacket.subscribe((packet) => {
      emitter(packet);
    });

    return () => null;
  });
};

export function* handleTelemetryPacketChannel(
  deviceId: number,
  channel: TelemetryPacketChannel
) {
  try {
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const packet: TelemetryPacket = yield take(channel);
      console.log("telemetryPacket", deviceId, packet);
    }
  } catch (error) {
    yield call(handleSagaError, error);
  }
}

export const createDeviceStatusPacketChannel = (
  connection: Types.ConnectionType
): DeviceStatusChannel => {
  return eventChannel((emitter) => {
    connection.onDeviceStatus.subscribe((packet) => {
      emitter(packet);
    });

    return () => null;
  });
};

export function* handleDeviceStatusPacketChannel(
  deviceId: number,
  channel: DeviceStatusChannel
) {
  try {
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const packet: DeviceStatusPacket = yield take(channel);
      yield put(deviceSliceActions.updateDeviceStatus({ deviceId, packet }));
    }
  } catch (error) {
    yield call(handleSagaError, error);
  }
}

export const createPositionPacketChannel = (
  connection: Types.ConnectionType
): PostionPacketChannel => {
  return eventChannel((emitter) => {
    connection.onPositionPacket.subscribe((packet) => {
      emitter(packet);
    });

    return () => null;
  });
};

export function* handlePositionPacketChannel(
  deviceId: number,
  channel: PostionPacketChannel
) {
  try {
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const packet: PositionPacket = yield take(channel);
      yield put(deviceSliceActions.updateNodePosition({ deviceId, packet }));
    }
  } catch (error) {
    yield call(handleSagaError, error);
  }
}

export const createWaypointPacketChannel = (
  connection: Types.ConnectionType
): WaypointPacketChannel => {
  return eventChannel((emitter) => {
    connection.onWaypointPacket.subscribe((packet) => {
      emitter(packet);
    });

    return () => null;
  });
};

export function* handleWaypointPacketChannel(
  deviceId: number,
  channel: WaypointPacketChannel
) {
  try {
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const packet: WaypointPacket = yield take(channel);
      yield put(deviceSliceActions.addDeviceWaypoint({ deviceId, packet }));
    }
  } catch (error) {
    yield call(handleSagaError, error);
  }
}

// TODO myNodeInfo

export const createUserPacketChannel = (
  connection: Types.ConnectionType
): UserPacketChannel => {
  return eventChannel((emitter) => {
    connection.onUserPacket.subscribe((packet) => {
      emitter(packet);
    });

    return () => null;
  });
};

export function* handleUserPacketChannel(
  deviceId: number,
  channel: UserPacketChannel
) {
  try {
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const packet: UserPacket = yield take(channel);
      yield put(deviceSliceActions.updateNodeUser({ deviceId, packet }));
    }
  } catch (error) {
    yield call(handleSagaError, error);
  }
}

export const createNodeInfoPacketChannel = (
  connection: Types.ConnectionType
): NodeInfoPacketChannel => {
  return eventChannel((emitter) => {
    connection.onNodeInfoPacket.subscribe((packet) => {
      emitter(packet);
    });

    return () => null;
  });
};

export function* handleNodeInfoPacketChannel(
  deviceId: number,
  channel: NodeInfoPacketChannel
) {
  try {
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const packet: NodeInfoPacket = yield take(channel);
      yield put(deviceSliceActions.updateNodeInfo({ deviceId, packet }));
    }
  } catch (error) {
    yield call(handleSagaError, error);
  }
}

export const createChannelPacketChannel = (
  connection: Types.ConnectionType
): ChannelPacketChannel => {
  return eventChannel((emitter) => {
    connection.onChannelPacket.subscribe((packet) => {
      emitter(packet);
    });

    return () => null;
  });
};

export function* handleChannelPacketChannel(
  deviceId: number,
  channel: ChannelPacketChannel
) {
  try {
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const packet: ChannelPacket = yield take(channel);
      yield put(deviceSliceActions.addDeviceChannel({ deviceId, packet }));
    }
  } catch (error) {
    yield call(handleSagaError, error);
  }
}

export const createConfigPacketChannel = (
  connection: Types.ConnectionType
): ConfigPacketChannel => {
  return eventChannel((emitter) => {
    connection.onConfigPacket.subscribe((packet) => {
      emitter(packet);
    });

    return () => null;
  });
};

export function* handleConfigPacketChannel(
  deviceId: number,
  channel: ConfigPacketChannel
) {
  try {
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const packet: ConfigPacket = yield take(channel);
      yield put(deviceSliceActions.updateDeviceConfig({ deviceId, packet }));
    }
  } catch (error) {
    yield call(handleSagaError, error);
  }
}

export const createModuleConfigPacketChannel = (
  connection: Types.ConnectionType
): ModuleConfigPacketChannel => {
  return eventChannel((emitter) => {
    connection.onModuleConfigPacket.subscribe((packet) => {
      emitter(packet);
    });

    return () => null;
  });
};

export function* handleModuleConfigPacketChannel(
  deviceId: number,
  channel: ModuleConfigPacketChannel
) {
  try {
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const packet: ModuleConfigPacket = yield take(channel);
      yield put(
        deviceSliceActions.updateDeviceModuleConfig({ deviceId, packet })
      );
    }
  } catch (error) {
    yield call(handleSagaError, error);
  }
}

export const createMessagePacketChannel = (
  connection: Types.ConnectionType
): MessagePacketChannel => {
  return eventChannel((emitter) => {
    connection.onMessagePacket.subscribe((packet) => {
      emitter(packet);
    });

    return () => null;
  });
};

export function* handleMessageChannel(
  deviceId: number,
  channel: MessagePacketChannel
) {
  try {
    while (true) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const packet: MessagePacket = yield take(channel);
      yield put(deviceSliceActions.addDeviceMessage({ deviceId, packet }));
    }
  } catch (error) {
    yield call(handleSagaError, error);
  }
}

import type { Types } from "@meshtastic/meshtasticjs";
import { createAction } from "@reduxjs/toolkit";

export const createDeviceAction = createAction<number>("devices/create-device");

export type SendTextPayload = {
  message: string;
  destination: number;
  wantAck?: boolean;
  channel?: Types.ChannelNumber;
  callback?: (id: number) => Promise<void>;
};

export const sendTextAction =
  createAction<SendTextPayload>("devices/send-text");

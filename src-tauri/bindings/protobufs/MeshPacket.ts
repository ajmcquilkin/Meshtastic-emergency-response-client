// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { PayloadVariant } from "./PayloadVariant";

export interface MeshPacket { from: number, to: number, channel: number, id: number, rxTime: number, rxSnr: number, hopLimit: number, wantAck: boolean, priority: number, rxRssi: number, delayed: number, payloadVariant: PayloadVariant | null, }
import { userAgent } from "./engine-user-agent";

const webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

export const WEBKIT = !!webkit && +webkit[1];
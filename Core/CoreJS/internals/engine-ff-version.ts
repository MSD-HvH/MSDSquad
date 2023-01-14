import { userAgent } from './engine-user-agent';

const firefox = userAgent.match(/firefox\/(\d+)/i);

export const FF = !!firefox && +firefox[1];

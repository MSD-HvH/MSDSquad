import { IS_DENO } from './engine-is-deno';
import { IS_NODE } from './engine-is-node';

export const IS_BROWSER = !IS_DENO && !IS_NODE
  && typeof window == 'object'
  && typeof document == 'object';

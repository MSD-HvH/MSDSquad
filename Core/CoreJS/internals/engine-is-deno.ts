/* global Deno -- Deno case */
export const IS_DENO = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';

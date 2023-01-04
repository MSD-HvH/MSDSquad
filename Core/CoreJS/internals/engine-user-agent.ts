import { getBuiltIn } from "./get-built-in";

export const userAgent = getBuiltIn('navigator', 'userAgent') || '';
const documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
const IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

export default {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};

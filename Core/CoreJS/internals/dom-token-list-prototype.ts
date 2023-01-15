// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
import { createElement } from './document-create-element';

const classList = createElement('span').classList;

export const DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

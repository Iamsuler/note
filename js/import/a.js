console.log('a starting')
import {foo} from './b.js';
console.log('in b, foo:', foo);
export const bar = 2;
console.log('a done');
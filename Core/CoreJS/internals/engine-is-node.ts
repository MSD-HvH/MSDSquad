import { classofRaw } from './classof-raw';
import { global } from './global';

module.exports = classofRaw(global.process) == 'process';

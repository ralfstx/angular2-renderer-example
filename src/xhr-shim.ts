import {XHR} from '@angular/compiler/src/xhr';

export class XHRShim extends XHR {
  get(url: string): Promise<string> {
    throw new Error(`Cannot load ${url}, not implemented.`);
  }
}
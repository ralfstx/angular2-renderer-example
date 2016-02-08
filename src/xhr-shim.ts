import {XHR} from "angular2/src/compiler/xhr";

export class XHRShim extends XHR {
  get(url: string): Promise<string> {
    throw new Error(`Cannot load ${url}, not implemented.`);
  }
}
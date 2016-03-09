import {Parse5DomAdapter} from 'angular2/src/platform/server/parse5_adapter';
import {setRootDomAdapter} from 'angular2/src/platform/dom/dom_adapter';
import {Type} from 'angular2/src/facade/lang';

export class TabrisDomAdapter extends Parse5DomAdapter {
  static makeCurrent() { setRootDomAdapter(new TabrisDomAdapter()); }

  getXHR(): Type {
    console.log('getXHR!');
    return null;
  }

  hasProperty(element, name: string) {
    //TODO: actually check if the property exists.
    return true;
  }
}

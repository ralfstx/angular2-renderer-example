import {Parse5DomAdapter, } from '@angular/platform-server';
import {setRootDomAdapter} from '@angular/platform-browser/src/dom/dom_adapter';
import {Type} from '@angular/common/src/facade/lang';

export class CustomDomAdapter extends Parse5DomAdapter {
    static makeCurrent() { setRootDomAdapter(new CustomDomAdapter()); }

    getXHR(): Type {
        console.log('getXHR!');
        return null;
    }

    hasProperty(element:Element, name: string) {
        //TODO: actually check if the property exists.
        return true;
    }
}

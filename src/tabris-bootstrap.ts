import 'reflect-metadata';

// install zone.js without browser patches
(global => {
  global.HTMLElement = function() {};
  require('zone.js');
  delete global.HTMLElement;
})(global);

import {
  platform,
  ComponentRef,
  ExceptionHandler,
  Renderer,
  RootRenderer,
  APPLICATION_COMMON_PROVIDERS,
  PLATFORM_COMMON_PROVIDERS,
  provide,
  Provider
} from 'angular2/core';
import {COMPILER_PROVIDERS} from 'angular2/compiler';
import {XHR} from 'angular2/src/compiler/xhr';

import {XHRShim} from './xhr-shim';
import {TabrisDomAdapter} from './tabris-dom-adapter';
import {TabrisRenderer, TabrisRootRenderer} from './tabris-renderer';

export * from 'angular2/core';

export function bootstrap(appComponentType: any, tabrisProviders: Provider[] = null): Promise<ComponentRef> {

  TabrisDomAdapter.makeCurrent();

  let logger = {
    logGroup: () => {
      console.log('---');
    },
    logError: (error) => {
      console.error(error);
    },
    logGroupEnd: () => {
      console.log('---');
    }
  };
  let platformProviders = [
    PLATFORM_COMMON_PROVIDERS,
    provide(XHR, {useClass: XHRShim}),
    provide(ExceptionHandler, {useFactory: () => new ExceptionHandler(logger, true), deps: []})
  ];

  let appProviders = [
    APPLICATION_COMMON_PROVIDERS,
    COMPILER_PROVIDERS,
    TabrisRootRenderer,
    provide(RootRenderer, {useClass: TabrisRootRenderer}),
    TabrisRenderer,
    provide(Renderer, {useClass: TabrisRenderer})
  ];
  if (tabrisProviders) {
    appProviders.push(tabrisProviders);
  }

  return platform(platformProviders).application(appProviders).bootstrap(appComponentType);
}

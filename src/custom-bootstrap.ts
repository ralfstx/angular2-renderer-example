// import 'globals';
import "zone.js/dist/zone-node"

import 'reflect-metadata';
// var Promise = require('es6-promise').Promise;

// global.Zone = require('zone.js');


import {
   createPlatform,
   
   reflector,
   getPlatform,
    ApplicationRef,
    ComponentRef,
    ExceptionHandler,
    
    Renderer,
    RootRenderer,
    APPLICATION_COMMON_PROVIDERS,
    PLATFORM_COMMON_PROVIDERS,
    ReflectiveInjector,
    coreLoadAndBootstrap,
    provide,
    Provider
} from '@angular/core';
import {SanitizationService} from '@angular/core/src/security';
import {COMPILER_PROVIDERS} from '@angular/compiler';
import {ReflectionCapabilities} from '@angular/core/src/reflection/reflection_capabilities';
import {isPresent, Type, print} from '@angular/core/src/facade/lang';
import {XHR} from '@angular/compiler/src/xhr';

import {XHRShim} from './xhr-shim';
import {CustomDomAdapter} from './custom-dom-adapter';
import {CustomRenderer, CustomRootRenderer} from './custom-renderer';

export function customBootstrap(appComponentType: any, customProviders: Provider[] = null): Promise<ComponentRef<any>> {

  CustomDomAdapter.makeCurrent();

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
SanitizationService,
    CustomRootRenderer,
    provide(RootRenderer, {useClass: CustomRootRenderer}),
    CustomRenderer,
    provide(Renderer, {useClass: CustomRenderer})
  ];
  if (customProviders) {
      appProviders.push(customProviders);
  }
  
    var platform = getPlatform();    
    if (!isPresent(platform)) {
        platform = createPlatform(ReflectiveInjector.resolveAndCreate(platformProviders));
    }


    reflector.reflectionCapabilities = new ReflectionCapabilities();
    var appInjector = ReflectiveInjector.resolveAndCreate(appProviders, platform.injector);
    return coreLoadAndBootstrap(appInjector, appComponentType);
}


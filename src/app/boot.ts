import {customBootstrap} from '../custom-bootstrap';
import {AppComponent} from './app.components';
import { Logger } from './logger.service';
import { enableProdMode, provide } from '@angular/core';
console.log('BOOTSTRAPPING...');


customBootstrap(
    AppComponent,
    [
         provide(Logger, { useValue: Logger })
    ]
).then((appRef) => {
    console.log('ANGULAR BOOTSTRAP DONE.');
}, (err) => {
    console.log('ERROR BOOTSTRAPPING ANGULAR');
    var errorMessage = err.message + "\n\n" + err.stack;
    console.log(errorMessage);
});

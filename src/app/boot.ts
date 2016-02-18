import {customBootstrap} from 'tabris-ng';
import {AppComponent} from './app.components';
import * as tabris from 'tabris';

console.log('BOOTSTRAPPING...');

customBootstrap(AppComponent, []).then((appRef) => {
    console.log('ANGULAR BOOTSTRAP DONE.');
    tabris.ui.find("Page")[0].open();
}, (err) =>{
    console.log('ERROR BOOTSTRAPPING ANGULAR');
    var errorMessage = err.message + "\n\n" + err.stack;
    console.log(errorMessage);
});

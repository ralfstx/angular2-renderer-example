import {customBootstrap} from '../custom-bootstrap';
import {AppComponent} from './app.components';

console.log('BOOTSTRAPPING...');

customBootstrap(AppComponent, []).then((appRef) => {
    console.log('ANGULAR BOOTSTRAP DONE.');
}, (err) =>{
    console.log('ERROR BOOTSTRAPPING ANGULAR');
    var errorMessage = err.message + "\n\n" + err.stack;
    console.log(errorMessage);
});

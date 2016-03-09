let t0, t1;

t0 = Date.now();
import {bootstrap} from 'tabris-ng';
t1 = Date.now();
console.log(`loaded tabris-ng in ${t1 - t0} ms`);
import {AppComponent} from './app.components';
import * as tabris from 'tabris';

t0 = Date.now();
console.log('BOOTSTRAPPING...');

bootstrap(AppComponent, []).then((appRef) => {
  console.log('ANGULAR BOOTSTRAP DONE.');
  t1 = Date.now();
  console.log(`bootstrapped in ${t1 - t0} ms`);
  tabris.ui.find("Page")[0].open();
}, (err) =>{
  console.log('ERROR BOOTSTRAPPING ANGULAR');
  var errorMessage = err.message + "\n\n" + err.stack;
  console.log(errorMessage);
});

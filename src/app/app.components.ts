import {Component} from '@angular/core';
import {Logger} from './logger.service';

@Component({
    selector: 'my-app',
    template: '',
    providers: [Logger]
})
export class AppComponent {

    constructor(private logger: Logger) {
        this.logger.log(`Logged with dependency injection.`);
    }
}

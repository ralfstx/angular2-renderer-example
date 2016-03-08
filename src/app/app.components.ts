import {Component} from 'tabris-ng';

@Component({
  selector: 'my-app',
  template: `
    <Page topLevel="true" title="{{title}}">
      <Button centerX="0" centerY="0"
          font="24px Roboto"
          text="Native Widgets"
          (select)="onSelect()">
      </Button>
      <TextView top="prev() 16" centerX="0"
          font="bold 32px Roboto"
          [text]="label">
      </TextView>
    </Page>
  `
})
export class AppComponent {
  public title = 'Tabris.ng';
  public label = '';

  onSelect() {
    this.label = 'Totally Rock!';
  }
}

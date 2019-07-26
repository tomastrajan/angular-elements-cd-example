import { Component } from '@angular/core';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = 'tomastrajan';

  constructor() {
    console.log((window as any).Zone.current);
  }

}

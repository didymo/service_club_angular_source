import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Survey';
  activeIndex: number;
constructor() {
  this.activeIndex = 0;
  console.log(this.activeIndex);
}
}

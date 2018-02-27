import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  onTimeout() {
    return () => {
      console.log('Delegate on timeout function fired!');
    };
  }
}

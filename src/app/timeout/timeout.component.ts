import { Component, OnInit, Input } from '@angular/core';
import { TimeoutService } from './timeout.service';
import { TimeoutState } from './timeout-states.enum';

@Component({
  selector: 'app-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(document:mousemove)': 'onAction()',
    '(document:mousedown)': 'onAction()',
    '(document:keypress)': 'onAction()',
    '(document:DOMMouseScroll)': 'onAction()',
    '(document:mousewheel)': 'onAction()',
    '(document:touchmove)': 'onAction()',
    '(document:MSPointerMove)': 'onAction()'
  }
})
export class TimeoutComponent implements OnInit {
  @Input() delegate?: Function;
  constructor(private timeoutService: TimeoutService) {}
  inactive = false;

  ngOnInit(): void {
    this.setupTimeout();
  }

  timeout() {
    this.timeoutService.timeout();
    if (this.delegate) {
      this.delegate();
    }
  }

  onAction() {
    this.timeoutService.reset();
  }

  stayActive() {
    this.timeoutService.activate();
  }

  setupTimeout() {
    console.log('setup timeout');
    this.timeoutService.state$.subscribe(state => {
      switch (state) {
        case TimeoutState.INACTIVE:
          this.inactive = true;
          break;
        case TimeoutState.ACTIVE:
          this.inactive = false;
          break;
        case TimeoutState.TIMEDOUT:
          this.inactive = false;
          if (this.delegate) this.delegate();
          break;
      }
    });
    this.timeoutService.startTimer();
  }
}

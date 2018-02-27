import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TimeoutState } from './timeout-states.enum';

const ONE_SECOND_IN_MS = 1000;
const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const INACTIVE_THRESHOLD = ONE_MINUTE * 4;
const TIMEOUT_THRESHOLD = ONE_MINUTE;
declare global {
  interface Window {
    siteModule: { onIdleTimeOut: Function };
  }
}

@Injectable()
export class TimeoutService {
  private handle: number;
  private timer = 0;
  private isInFrame = window.top !== window.self;
  private state = new BehaviorSubject<TimeoutState>(TimeoutState.ACTIVE);
  state$ = this.state.asObservable();

  startTimer() {
    this.stopTimer();
    this.timer = 0;
    this.handle = window.setInterval(() => this.tick(), ONE_SECOND_IN_MS); // keep () => to ensure context of "this" is correct
    // console.log(`timer ${this.handle} started!`);
  }

  private tick() {
    this.timer++;
    // console.log(`timer: ${this.handle} tick!`);
    if (this.timer > TIMEOUT_THRESHOLD) {
      return this.timeout();
    }
    if (this.timer > INACTIVE_THRESHOLD) {
      return this.inactive();
    }
  }

  stopTimer() {
    // console.log(`timer: ${this.handle} stopped!`);
    window.clearInterval(this.handle);
  }

  activate() {
    const value = this.state.getValue();
    if (value === TimeoutState.TIMEDOUT) {
      return;
    }
    this.timer = 0;
    this.state.next(TimeoutState.ACTIVE);
    // console.log(`user activated state with timer ${this.handle}!`);
  }

  reset() {
    const value = this.state.getValue();
    if (value === TimeoutState.INACTIVE) {
      return;
    }
    if (value === TimeoutState.TIMEDOUT) {
      return;
    }
    this.timer = 0;
    this.state.next(TimeoutState.ACTIVE);
    // console.log(`timer ${this.handle} reset`);
  }

  inactive() {
    const value = this.state.getValue();
    if (value === TimeoutState.INACTIVE) {
      return;
    }
    // console.log(`entering inactive state with timer ${this.handle}`);
    this.state.next(TimeoutState.INACTIVE);
  }

  timeout() {
    const value = this.state.getValue();
    if (value === TimeoutState.TIMEDOUT) {
      return;
    }
    // console.log('initiating timeout!');
    this.stopTimer();
    this.timer = 0;
    this.state.next(TimeoutState.TIMEDOUT);
    if (this.isEmbedded()) {
      window.parent.siteModule.onIdleTimeOut();
    }
  }

  private isEmbedded() {
    const value =
      window.parent &&
      window.parent.siteModule &&
      window.parent.siteModule.onIdleTimeOut;
    // console.log(`is embedded: ${value}`);
    return value;
  }
}

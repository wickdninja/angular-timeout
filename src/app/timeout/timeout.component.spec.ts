/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TimeoutComponent } from './timeout.component';
import { TimeoutService, TimeoutState } from '.';

describe('TimeoutService', () => {
  it('should create an instance', () => {
    let service = new TimeoutService();
    expect(service).toBeTruthy();
  });

  it('state should be ACTIVE on timer start', () => {
    let service = new TimeoutService();
    service.state$.subscribe(state => {
      expect(state).toBe(TimeoutState.ACTIVE);
    });
    service.startTimer();
  });

  it('should TOTO', () => {
    let service = new TimeoutService();
    service.state$.subscribe(state => {
      expect(state).toBe(TimeoutState.ACTIVE);
    });
    service.startTimer();
  });
});

describe('Component: Timeout', () => {
  it('should create an instance', () => {
    let service = new TimeoutService();
    let component = new TimeoutComponent(service);
    expect(component).toBeTruthy();
  });
});

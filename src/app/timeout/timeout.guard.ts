import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TimeoutService } from './timeout.service';

@Injectable()
export class TimeoutGuard implements CanActivate {
  constructor(private timeoutService: TimeoutService) {}
  canActivate(): boolean {
    this.timeoutService.startTimer();
    return true;
  }
}

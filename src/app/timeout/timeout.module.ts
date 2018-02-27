import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeoutGuard } from './timeout.guard';
import { TimeoutComponent } from './timeout.component';
import { TimeoutService } from './timeout.service';

@NgModule({
  declarations: [TimeoutComponent],
  imports: [CommonModule],
  exports: [TimeoutComponent],
  providers: [TimeoutService, TimeoutGuard]
})
export class TimeoutModule {}

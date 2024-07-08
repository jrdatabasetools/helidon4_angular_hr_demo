import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './toast-service';

@Component({
  selector: 'app-toasts-container',
  standalone: true,
  imports: [NgbToastModule, NgTemplateOutlet],
  template: `
    <ng-template #toastTemplate></ng-template>
    @for (toast of toastService.toasts; track toast) {
			<ngb-toast [class]="toast.classname" [autohide]="true" [delay]="toast.delay || 5000" (hidden)="toastService.remove(toast)">
			  {{toast.info}}
				<ng-template [ngTemplateOutlet]="toast.template"></ng-template>
			</ngb-toast>
		}`,
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3',
    style: 'z-index: 1200',
  },
})
export class ToastContainer {
  toastService = inject(ToastService);
}

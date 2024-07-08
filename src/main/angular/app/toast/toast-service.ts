import { Injectable, TemplateRef, ViewChild } from '@angular/core';

export interface Toast {
  template: TemplateRef<any>;
  classname?: string;
  delay?: number;
  info?: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  @ViewChild('toastTemplate') toastTemplate!: TemplateRef<any>;
  toasts: Toast[] = [];

  showSave(info : string) {
    this.toasts.push({ template : this.toastTemplate, classname: 'bg-success text-light', delay: 5000, info : info });
  }

  showDelete(info : string) {
    this.toasts.push({ template : this.toastTemplate, classname: 'bg-error text-light', delay: 5000, info : info });
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}

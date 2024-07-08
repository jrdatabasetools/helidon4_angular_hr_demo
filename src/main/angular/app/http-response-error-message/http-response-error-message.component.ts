import {Component, inject, OnDestroy, TemplateRef, ViewChild} from '@angular/core';
import {HttpResponseErrorMessageService} from './http-response-error-message.service';
import {Subscription} from "rxjs";
import {ServerErrorMessage} from "../generated-services/pkg-employee-demo.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-http-response-error-message',
  standalone: true,
  imports: [],
  template: `
    <ng-template #errorMessage500 let-modal>
      <div class="modal-header">
        <h4 class="modal-title">{{subject}}</h4>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <p><b>Message:</b> {{message}}</p>
        <p><b>Sql-Error-Code:</b> {{sqlErrorCode}}</p>
        <p><b>Stacktrace:</b></p>
        <pre>{{stackTrace}}</pre>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="modal.close('Close click')">Close</button>
      </div>
    </ng-template>

    <ng-template #errorMessage let-modal>
      <div class="modal-header">
        <h4 class="modal-title">{{subject}}</h4>
        <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <p><b>Http-Status-Code:</b> {{httpStatusCode}}</p>
        <p><b>Http-Status:</b> {{message}}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="modal.close('Close click')">Close</button>
      </div>
    </ng-template>
  `
})
export class HttpresponseErrorMessage implements OnDestroy {
  @ViewChild('errorMessage') errorMessage!: TemplateRef<any>;
  @ViewChild('errorMessage500') errorMessage500!: TemplateRef<any>;

  private httpResponseErrorMessageSubscription: Subscription;
  private modalService = inject(NgbModal);

  subject?: string;
  message?: string;
  sqlErrorCode?: number;
  stackTrace?: string;
  httpStatusCode?: number;

  constructor(private httpResponseErrorMessageService: HttpResponseErrorMessageService) {
    this.httpResponseErrorMessageSubscription = httpResponseErrorMessageService.httpResonseErrorMessageObservable$.subscribe(
      httpResonseErrorMessage => {

        if (httpResonseErrorMessage.httpResponse.status === 500) {
          let serverErrorMessage: ServerErrorMessage = {...httpResonseErrorMessage.httpResponseError!};

          this.subject = httpResonseErrorMessage.subject;
          this.message = serverErrorMessage.message;
          this.sqlErrorCode = serverErrorMessage.sqlErrorCode;
          this.stackTrace = serverErrorMessage.stackTrace;

          console.log(this.subject + ":" + this.message);

          this.modalService.open(this.errorMessage500, {scrollable: true, size: 'xl'});
        } else {
          this.subject = httpResonseErrorMessage.subject;
          this.httpStatusCode = httpResonseErrorMessage.httpResponse.status;
          this.message = httpResonseErrorMessage.httpResponse.statusText;

          console.log(this.subject + ":" + this.message);

          this.modalService.open(this.errorMessage, {scrollable: true, size: 'lg'});
        }
      });
  }

  ngOnDestroy(): void {
    this.httpResponseErrorMessageSubscription.unsubscribe();
  }
}

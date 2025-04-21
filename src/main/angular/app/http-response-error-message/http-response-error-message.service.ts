import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class HttpResponseErrorMessageService {
  httpResonseErrorMessageSubject = new Subject<HttpResonseErrorMessage>();
  httpResonseErrorMessageObservable$ = this.httpResonseErrorMessageSubject.asObservable();
}

export interface HttpResonseErrorMessage {
  subject: string;
  httpResponse: HttpResponse<any>;
  httpResponseError: any;
}

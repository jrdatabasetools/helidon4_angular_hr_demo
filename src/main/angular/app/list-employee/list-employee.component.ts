import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {LoadEmployeeTO, PkgEmployeeDemoService, RecEmployees,} from '../generated-services/pkg-employee-demo.service';
import {SharedService} from "../shared/shared-service";
import {HttpResponseErrorMessageService} from "../http-response-error-message/http-response-error-message.service";

@Component({
    selector: 'app-list-employee',
    standalone: true,
    imports: [],
    templateUrl: './list-employee.component.html',
})
export class ListEmployeeComponent implements OnDestroy {
    cursorType = 'default';
    listEmployeeData?: RecEmployees[];
    private listEmployeesSubscription: Subscription;

    constructor(private pkgEmployeeDemoService: PkgEmployeeDemoService, private sharedService: SharedService, private httpResponseErrorMessageService: HttpResponseErrorMessageService) {
        this.listEmployeesSubscription = pkgEmployeeDemoService.listEmployeesObservable$.subscribe(
            pkgEmployeeDemoRecEmployees => {
                console.log("employee elements loaded (count:" + pkgEmployeeDemoRecEmployees?.length + ")");
                this.listEmployeeData = pkgEmployeeDemoRecEmployees;
            });
    }

    openEmployee(employeeId: number) {
        this.pkgEmployeeDemoService.loadEmployee(employeeId, 0).subscribe(
            response => {
                let employeeData: LoadEmployeeTO = {...response.body!};

                console.log("employee loaded (employeeId:" + employeeId + ")");

                console.log("employee loaded (id:" + employeeData.oEmployeeId + ")");

                this.listEmployeeData = [];
                this.pkgEmployeeDemoService.loadEmployeeSubject.next(employeeData);
                this.sharedService.showDetail();
            },
            error => {
                this.httpResponseErrorMessageService.httpResonseErrorMessageSubject.next({
                    subject: "Load Employee Failed",
                    httpResponse: error,
                    httpResponseError: error.error
                });
            }
        );
    }

    changeCursor(newCursor: string) {
        this.cursorType = newCursor;
    }

    ngOnDestroy() {
        this.listEmployeesSubscription.unsubscribe();
    }
}

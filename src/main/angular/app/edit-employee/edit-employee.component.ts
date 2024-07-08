import {Component, OnDestroy} from '@angular/core';
import {NgbAlertModule, NgbDatepickerModule, NgbDateStruct, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {JsonPipe} from '@angular/common';
import {Subscription} from "rxjs";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
    PkgEmployeeDemoService,
    RecDepartment,
    RecJob,
    RecJobHistory,
    RecManager,
} from '../generated-services/pkg-employee-demo.service';

import {ToastService} from '../toast/toast-service';
import {SharedService} from "../shared/shared-service";
import {HttpResponseErrorMessageService} from "../http-response-error-message/http-response-error-message.service";

@Component({
    selector: 'app-edit-employee',
    standalone: true,
    providers: [],
    imports: [FormsModule, ReactiveFormsModule, NgbDatepickerModule, NgbAlertModule, JsonPipe, NgbTooltipModule],
    templateUrl: './edit-employee.component.html',
})
export class EditEmployeeComponent implements OnDestroy {
    employeeIdValue?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    hireDate?: Date;
    hireDateModel?: NgbDateStruct;
    salary?: number;
    commissionPct?: number;
    jobId?: string;
    managerId?: number;
    departmentId?: number;
    jobs?: RecJob[];
    departments?: RecDepartment[];
    managers?: RecManager[];
    jobHistory?: RecJobHistory[];
    private loadEmployeeSubscription: Subscription;

    constructor(private pkgEmployeeDemoService: PkgEmployeeDemoService, private toastService: ToastService, private sharedService: SharedService, private httpResponseErrorMessageService: HttpResponseErrorMessageService) {
        this.loadEmployeeSubscription = pkgEmployeeDemoService.loadEmployeeObservable$.subscribe(
            employeeData => {
                this.employeeIdValue = employeeData.oEmployeeId;
                this.firstName = employeeData.oFirstName;
                this.lastName = employeeData.oLastName;
                this.email = employeeData.oEmail;
                this.phoneNumber = employeeData.oPhoneNumber;
                this.hireDate = new Date(employeeData.oHireDate);
                this.hireDateModel = {
                    year: this.hireDate.getFullYear(),
                    month: this.hireDate.getMonth() + 1,
                    day: this.hireDate.getDate()
                };

                this.salary = employeeData.oSalary;
                this.commissionPct = employeeData.oCommissionPct;
                this.jobId = employeeData.oJobId;
                this.managerId = employeeData.oManagerId;
                this.departmentId = employeeData.oDepartmentId;

                this.jobs = employeeData.oCJob;
                this.departments = employeeData.oCDepartment;
                this.managers = employeeData.oCManager;
                this.jobHistory = employeeData.oCJobHistory;

                console.log("show employee (id:" + employeeData.oEmployeeId + ")");
            });
    }

    back() {
        this.sharedService.showMaster();
    }

    saveEmployee() {
        this.pkgEmployeeDemoService.saveEmployee(this.employeeIdValue,
            this.firstName,
            this.lastName,
            this.email,
            this.phoneNumber,
            this.hireDateModel ? this.hireDateModel.year + "-" + this.hireDateModel.month + "-" + this.hireDateModel.day : "",
            this.salary,
            this.commissionPct,
            this.jobId,
            this.managerId,
            this.departmentId).subscribe(
            response => {
                // read and assign object list
                let storedEmployeeId: number = response.body!;

                console.log('Employee ' + this.firstName + " " + this.lastName + ' (id:' + storedEmployeeId + ') saved');
                this.toastService.showSave('Employee ' + this.firstName + " " + this.lastName + ' (id:' + storedEmployeeId + ') saved');
                this.sharedService.showMaster();
            },
            error => {
                this.httpResponseErrorMessageService.httpResonseErrorMessageSubject.next({
                    subject: "Save Employee Failed",
                    httpResponse: error,
                    httpResponseError: error.error
                });
            }
        );
    }

    deleteEmployee() {
        this.pkgEmployeeDemoService.removeEmployee(this.employeeIdValue).subscribe(
            response => {
                console.log('Employee ' + this.firstName + " " + this.lastName + ' (id:' + this.employeeIdValue + ') deleted');
                this.toastService.showDelete('Employee ' + this.firstName + " " + this.lastName + ' (id:' + this.employeeIdValue + ') deleted');
                this.sharedService.showMaster();
            },
            error => {
                this.httpResponseErrorMessageService.httpResonseErrorMessageSubject.next({
                    subject: "Delete Employee Failed",
                    httpResponse: error,
                    httpResponseError: error.error
                });
            }
        );
    }

    ngOnDestroy(): void {
        this.loadEmployeeSubscription.unsubscribe();
        this.toastService.clear();
    }
}

import {Component, OnInit} from '@angular/core';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';

import {
  RecEmployees,
  PkgEmployeeDemoService,
  GetCombosTO, LoadEmployeeTO
} from '../generated-services/pkg-employee-demo.service';

import {ListEmployeeComponent} from "../list-employee/list-employee.component"
import {SharedService} from "../shared/shared-service";
import {HttpResponseErrorMessageService} from "../http-response-error-message/http-response-error-message.service";

@Component({
  selector: 'app-search-employee',
  standalone: true,
  imports: [NgbDropdownModule, ListEmployeeComponent],
  templateUrl: './search-employee.component.html',
})
export class SearchEmployeeComponent implements OnInit {
  comboTO ?: GetCombosTO;

  constructor(private pkgEmployeeDemoService: PkgEmployeeDemoService, private sharedService: SharedService, private httpResponseErrorMessageService: HttpResponseErrorMessageService) {
  }

  ngOnInit() {
    this.getCombos();
  }

  getCombos() {
    this.pkgEmployeeDemoService.getCombos(0).subscribe(response => {
        this.comboTO = {...response.body!};

        console.log("load search combos [countries:" + this.comboTO?.oCCountries.length + "-jobs:" + this.comboTO?.oCJobs.length + "-departments:" + this.comboTO?.oCDepartments.length + "-regions:" + this.comboTO?.oCRegions.length + "-managers:" + this.comboTO?.oCManagers.length + "-localtions:" + this.comboTO?.oCLocations.length + "]")
      },
      error => {
        this.httpResponseErrorMessageService.httpResonseErrorMessageSubject.next({
          subject: "Initialize Combo Boxes Failed",
          httpResponse: error,
          httpResponseError: error.error
        });
      });
  }

  search(searchTerm: string, selectedJob: string, selectedManager: string, selectedDepartment: string, selectedLocation: string, selectedCountry: string, selectedRegion: string) {
    console.log("search parameter [searchTerm:" + searchTerm + "-job:" + selectedJob + "-manager:" + selectedManager + "-department:" + selectedDepartment + "-location:" + selectedLocation + "-country:" + selectedCountry + "-region:" + selectedRegion + "]");

    // empty list
    this.pkgEmployeeDemoService.listEmployeesSubject.next([]);

    this.pkgEmployeeDemoService.listEmployees(searchTerm, selectedJob, parseInt(selectedManager), parseInt(selectedDepartment), parseInt(selectedLocation), selectedCountry, parseInt(selectedRegion), 0).subscribe(
      response => {
        // read and assign object list
        let body: RecEmployees [] = {...response.body!};
        let listEmployeeData: RecEmployees [] = Object.values(body);

        // fill list
        this.pkgEmployeeDemoService.listEmployeesSubject.next(listEmployeeData);
      },
      error => {
        this.httpResponseErrorMessageService.httpResonseErrorMessageSubject.next({
          subject: "Search Employees Failed",
          httpResponse: error,
          httpResponseError: error.error
        });
      }
    );
  }

  addNewEmployee(): void {
    this.pkgEmployeeDemoService.loadEmployee(undefined, 0).subscribe(
      response => {
        let employeeData: LoadEmployeeTO = {...response.body!};

        console.log("loaded new employee combos");

        this.pkgEmployeeDemoService.listEmployeesSubject.next([]);
        this.pkgEmployeeDemoService.loadEmployeeSubject.next(employeeData);
        this.sharedService.showDetail();
      },
      error => {
        this.httpResponseErrorMessageService.httpResonseErrorMessageSubject.next({
          subject: "Init/Add Employee Failed",
          httpResponse: error,
          httpResponseError: error.error
        });
      }
    );
  }
}

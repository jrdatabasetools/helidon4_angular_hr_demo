import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';
import {SearchEmployeeComponent} from './search-employee/search-employee.component';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import {ToastContainer} from './toast/toasts-container.component';
import {SharedService} from './shared/shared-service';
import {HttpresponseErrorMessage} from './http-response-error-message/http-response-error-message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, SearchEmployeeComponent, ListEmployeeComponent, EditEmployeeComponent, ToastContainer, HttpresponseErrorMessage],
  templateUrl: './app.component.html',
})
export class AppComponent {
  showMaster: boolean = true;

  constructor(private sharedService: SharedService) {
    this.sharedService.getShowMaster().subscribe(showMaster => {
      this.showMaster = showMaster;
    });
  }
}

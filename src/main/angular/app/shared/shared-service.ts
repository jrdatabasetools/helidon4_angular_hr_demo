import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private state = new BehaviorSubject<boolean>(true);

  showMaster() {
    this.state.next(true);
  }

  showDetail() {
    this.state.next(false);
  }

  getShowMaster() {
    return this.state.asObservable();
  }
}

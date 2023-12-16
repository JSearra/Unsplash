import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

export class MockActivatedRoute {
  // Create a BehaviorSubject to simulate route parameter changes
  private paramMapSubject = new BehaviorSubject<ParamMap>(
    convertToParamMap({ id: '123' }) // Replace '123' with your desired route parameter value
  );

  // Expose paramMap as an Observable
  paramMap = this.paramMapSubject.asObservable();

  // Create a snapshot with route parameter data
  snapshot = {
    paramMap: this.paramMapSubject.getValue(),
  };
}

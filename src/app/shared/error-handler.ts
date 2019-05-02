// errors-handler.ts
import { ErrorHandler, Injectable } from '@angular/core';
import { SharedService } from '../shared.service';
@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private ss: SharedService) {}
  handleError(error: Error) {
    // Do whatever you like with the error (send it to the server?)
    // And log it to the console
    console.error(error);
  }
}

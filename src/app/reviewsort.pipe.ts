import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reviewsort'
})
export class ReviewsortPipe implements PipeTransform {
  transform(returnedArray: Array<any>, sorter: any): any {
    if (sorter === 1) {
      return returnedArray.sort(function(a, b) {
        if (a.star < b.star) {
          return -1;
        } else if (a.star > b.star) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    if (sorter === 5) {
      return returnedArray.sort(function(a, b) {
        if (a.star < b.star) {
          return 1;
        } else if (a.star > b.star) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    if (sorter !== 5 || sorter !== 1) {
      return returnedArray;
    }
  }
}

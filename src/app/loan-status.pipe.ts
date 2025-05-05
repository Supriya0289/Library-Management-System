import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loanStatus',
  standalone: true
})
export class LoanStatusPipe implements PipeTransform {
  transform(value: string): string {
    switch(value) {
      case 'ACTIVE': return 'Active';
      case 'OVERDUE': return 'Overdue';
      case 'RETURNED': return 'Returned';
      default: return value;
    }
  }
}
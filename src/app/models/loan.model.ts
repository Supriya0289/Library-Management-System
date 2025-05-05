// loan.model.ts
export interface Loan {
  id: number;
  bookId: number;
  userId: number;
  checkoutDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'ACTIVE' | 'OVERDUE' | 'RETURNED';
}
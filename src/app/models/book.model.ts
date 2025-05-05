// book.model.ts
export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  description?: string;
  availableCopies: number;
  publishedYear?: number;
}
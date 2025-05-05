// user.model.ts
export interface User {
    id: number;
    username: string;
    role: 'ADMIN' | 'USER';
    name?: string;
    email?: string;
  }
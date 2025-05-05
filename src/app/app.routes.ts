// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { AdminGuard } from './components/Guards/AdminGuard';
import { AuthGuard } from './components/Guards/AuthGuard';
import { HomeComponent } from './components/home/home/home.component';
import { AdminComponent } from './components/AdminD/admin/admin.component';
import { UserdashboardComponent } from './components/user/userdashboard/userdashboard.component';
import { BookFormComponent } from './components/AdminD/book-form/book-form.component';
import { BookListComponent } from './components/AdminD/book-list/book-list.component';
import { LoanListComponent } from './components/AdminD/loan-list/loan-list.component';
import { UserLoanListComponent } from './components/user/user-loan-list/user-loan-list.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Admin routes
  { 
    path: 'admin/dashboard', 
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'admin/books', 
    component: BookListComponent,
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'admin/books/add', 
    component: BookFormComponent,
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'admin/books/edit/:id', 
    component: BookFormComponent,
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'admin/users', 
    component: UserLoanListComponent,
    canActivate: [AuthGuard, AdminGuard] 
  },
  { 
    path: 'admin/loans', 
    component: LoanListComponent,
    canActivate: [AuthGuard, AdminGuard] 
  },
  
  // User routes
  { 
    path: 'user/dashboard', 
    component: UserdashboardComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'user/books', 
    component: BookListComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'user/loans', 
    component: UserLoanListComponent,
    canActivate: [AuthGuard] 
  },
  
  { path: '**', redirectTo: '' }
];
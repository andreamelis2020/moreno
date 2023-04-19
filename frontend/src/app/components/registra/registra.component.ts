import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-registra',
  templateUrl: './registra.component.html',
  styleUrls: ['./registra.component.scss']
})
export class RegistraComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  content?: string;

  public username: any = null;
  public email: any = null;
  public password: any = null;

  //per il button
  display: boolean;
  submitted: boolean;
  productDialog: boolean;

  
  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService, private userService: UserService,
    private router: Router, private breadcrumbService: BreadcrumbService, private http: HttpClient, private route: ActivatedRoute,
    private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Aggiungi Utente' }
    ]);
  }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
        this.router.navigateByUrl('/login');
      }
    );
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  openNew() {
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  addUtente() {
    //controlliamo se i campi delle select e del nome del comune sono vuoti, se non sono vuoti procedi con l'inserimento nel DB
    if (!this.username || !this.email || !this.password) {
      this.submitted = true;
    } else {
      this.authService.register(this.username, this.email, this.password).subscribe(
        data => {
          this.messageService.add({
            severity: 'success',
            summary: 'Creato',
            detail: 'Utente creato con successo',
            life: 2000
          });
          setTimeout(() => {
            this.router.navigateByUrl('gestioneUtenti');
          }, 2001);

        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
    }
  }
}

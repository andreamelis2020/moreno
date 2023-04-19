import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { Utenti, Ruoli, Permessi } from 'src/app/models/data.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { RuoloService } from 'src/app/services/ruolo.service';
import { PermessoService } from 'src/app/services/permesso.service';

@Component({
  selector: 'app-gestione-utenti',
  templateUrl: './gestione-utenti.component.html',
  styleUrls: ['./gestione-utenti.component.scss'],
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
  providers: [MessageService, ConfirmationService]

})

export class GestioneUtentiComponent implements OnInit {

  accountDialog: boolean;

  selectedPermessi: any = null;

  submitted: boolean;

  utenti: Utenti[];

  utente: Utenti;

  ruoli: Ruoli[];

  selezionaUtenti: Utenti[];

  cols: any[];

  //Array per caricare i dati dal Db - Ruoli
  public permessi: Permessi[];

  //Variabili per i contatori

  accountTotali = 0;
  accountPm = 0;
  accountAdmin = 0;

  accountSupervisor =0;
  accountOperatori = 0;
  accountAgenti = 0;
  
  content?: string;

    //Dati utente
    private roles: string[] = [];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username?: string;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService, private authService: AuthService,
    private tokenStorageService: TokenStorageService, private router: Router,
    private userService: UserService, private ruoliService: RuoloService, private permessiService: PermessoService) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard Account' }
    ]);
    this.permessiService.getData().subscribe((response: any) => {
      this.permessi = response;
      this.permessi.sort((a, b) => a.name.localeCompare(b.name));
      this.ruoliService.getData().subscribe((response: any) => {
        this.ruoli = response;
        this.userService.getData().subscribe((response: any) => {
          this.utenti = response;
          this.accountTotali = this.utenti.length;
          for (let i = 0; i < this.utenti.length; i++) {
            for (let j = 0; j < this.ruoli.length; j++) {
              if (this.utenti[i].id == this.ruoli[j].userId) {
                for (let z = 0; z < this.permessi.length; z++) {
                  if (this.permessi[z].id == this.ruoli[j].roleId) {
                    this.utenti[i].ruolo = this.permessi[z].name;
                    if (this.utenti[i].ruolo == "supervisor") {
                      this.accountSupervisor++;
                    }
                    if (this.utenti[i].ruolo == "operatore") {
                      this.accountOperatori++;
                    }
                    if (this.utenti[i].ruolo == "agente") {
                      this.accountAgenti++;
                    }
                  }
                }
              }
            }
          }
        })
      })
    })
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

    //dati accesso utente
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

  }

  openNew() {
    this.utente = {};
    this.submitted = false;
    this.accountDialog = true;
  }

  modificaAccount(utente: Utenti) {
    this.utente = { ...utente };
    this.accountDialog = true;
  }

  hideDialog() {
    this.accountDialog = false;
    this.submitted = false;
  }

  AggiornaAccount() {
    let utente = this.utente
    var idAccount = this.utente.id
    var nomeRuolo;

    this.submitted = true;

    if (this.selectedPermessi) {

      if (this.utente.id == 1) {
        this.confirmationService.confirm({
          message: "Mio caro <b>" + utente.username + "</b> non puoi modificare il ruolo del Capo di Fortnite! ",
          header: 'Il Capo non lo puoi modificare',
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: "OK",
          accept: () => {
          },
          rejectVisible: false

        });
      } else {
        nomeRuolo = this.selectedPermessi.name;

        this.utente.ruolo = this.selectedPermessi.name;
        this.ruoliService.getData().subscribe((response: any) => {
          this.ruoli = response;
          this.permessiService.getData().subscribe((response: any) => {
            this.permessi = response;
            for (let i = 0; i < this.ruoli.length; i++) {
              if (this.ruoli[i].userId == idAccount) {
                for (let j = 0; j < this.permessi.length; j++) {
                  if (nomeRuolo == this.permessi[j].name) {
                    this.ruoli[i].roleId = this.permessi[j].id;
                    this.ruoliService.editEntry(this.ruoli[i]).subscribe(response => {
                    }), err => {
                      console.log(err);
                    }
                  }
                }
              }
            }
          })
        })
      }
      this.selectedPermessi = "";
    }

    if (this.utente.username.trim()) {
      if (this.utente.id) {
        this.utenti[this.findIndexById(this.utente.id)] = this.utente;

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Account Aggiornato',
          life: 3000
        });
      }
    }

    this.utenti = [...this.utenti];
    this.accountDialog = false;
    this.utente = {};

  }

  eliminaAccount(utente: Utenti) {
    if (utente.id == 1) {
      this.confirmationService.confirm({
        message: "Mio caro <b>" + this.username + "</b> non puoi eliminare il Capo di Fortnite! ",
        header: 'Il Capo non lo puoi eliminare',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: "OK",
        accept: () => {
        },
        rejectVisible: false

      });
    } else {
      this.confirmationService.confirm({
        message: "Sei sicuro di voler eliminare l'account di " + utente.username + "?",
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.userService.eliminaAccount(utente.id).subscribe(response => {
          }), err => {
            console.log(err);
          }
          this.utenti[this.findIndexById(this.utente.id)] = this.utente;

          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Account Eliminato',
            life: 3000
          });
          this.userService.getData().subscribe((response: any) => {
            this.utenti = response;
          });
        }
      });
    }
    this.utenti = [...this.utenti];
    this.accountDialog = false;
    this.utente = {};
  }

  eliminaUtente() {
    this.confirmationService.confirm({
      message: "Sei sicuro di voler eliminare gli account selezionati?",
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let i = 0; i < this.selezionaUtenti.length; i++) {
          this.userService.eliminaAccount(this.selezionaUtenti[i].id).subscribe(response => {
          }), err => {
            console.log(err);
          }
        }
        this.utenti[this.findIndexById(this.utente.id)] = this.utente;

        this.messageService.add({
          severity: 'success',
          summary: 'Account eliminati con successo',
          detail: 'Account Eliminati',
          life: 3000
        });
        this.userService.getData().subscribe((response: any) => {
          this.utenti = response;
        });
      }
    });

    this.utenti = [...this.utenti];
    this.accountDialog = false;
    this.utente = {};
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.utenti.length; i++) {
      if (this.utenti[i].id == id) {
        index = i;
        break;
      }
    }
    return index;
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
    selector: 'app-menu',
    template: `
        <div class="menu">
            <ul class="layout-menu">
                <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    constructor(private tokenStorageService: TokenStorageService, private userService: UserService) { }

    //Dati utente
    private roles: string[] = [];
    isLoggedIn = false;
    showAdminBoard = false;
    showSupervisorBoard = false;
    showOperatoreBoard = false;
    showAgenteBoard = false;
    username?: string;

    model: any[];

    ngOnInit() {
        //dati accesso utente
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;

            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.showSupervisorBoard = this.roles.includes('ROLE_SUPERVISOR');
            this.showOperatoreBoard = this.roles.includes('ROLE_OPERATORE');
            this.showAgenteBoard = this.roles.includes('ROLE_AGENTE');
            this.username = user.username;
        }

        //Carica il menù per l'admin
        if (this.showAdminBoard) {
            this.model = [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/homepage'] },
                {
                    label: 'Utenti', icon: 'pi pi-fw pi-users', routerLink: ['/gestioneUtenti']
                },
                {
                    label: 'Contratti', icon: 'pi pi-fw pi-briefcase', routerLink: ['/contratti'],
                    items: [
                        { label: 'Nuovo contratto', icon: 'pi pi-fw pi-pencil', routerLink: ['/contratti/nuovoContratto'] },
                    ]
                },
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                {
                    label: 'UI Kit', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'], badge: 2,
                    items: [
                        { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                        { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                        { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                        { label: 'Invalid State', icon: 'pi pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                        { label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon' },
                        { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                        { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                        { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                        { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                        { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                        { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                        { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], preventExact: true },
                        { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                        { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                        { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                        { label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc'] }
                    ]
                },
                {
                    label: 'Prime Blocks', icon: 'pi pi-fw pi-prime', routerLink: ['/blocks'],
                    items: [
                        { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'] },
                        { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                    ]
                },
                {
                    label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['/utilities'],
                    items: [
                        { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['utilities/icons'] },
                        { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                    ]
                },
                {
                    label: 'Pages', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages'], badge: 8,
                    items: [
                        { label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud'] },
                        { label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar'] },
                        { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline'] },
                        { label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
                        { label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login'] },
                        { label: 'Invoice', icon: 'pi pi-fw pi-dollar', routerLink: ['/pages/invoice'] },
                        { label: 'Help', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/help'] },
                        { label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/error'] },
                        { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/notfound'] },
                        { label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/access'] },
                        { label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty'] }
                    ]
                },
                {
                    label: 'Hierarchy', icon: 'pi pi-fw pi-align-left',
                    items: [
                        {
                            label: 'Submenu 1', icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 1.1', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-align-left' },
                                        { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-align-left' },
                                        { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-align-left' },
                                    ]
                                },
                                {
                                    label: 'Submenu 1.2', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-align-left' }
                                    ]
                                },
                            ]
                        },
                        {
                            label: 'Submenu 2', icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 2.1', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-align-left' },
                                        { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-align-left' },
                                    ]
                                },
                                {
                                    label: 'Submenu 2.2', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-align-left' },
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    label: 'Buy Now', icon: 'pi pi-fw pi-shopping-cart', url: ['https://www.primefaces.org/store']
                },
                {
                    label: 'Documentation', icon: 'pi pi-fw pi-info-circle', routerLink: ['/documentation']
                }
            ];
        }

        //Carica il menù per il supervisor
        if (this.showSupervisorBoard) {
            this.model = [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                {
                    label: 'UI Kit', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'], badge: 2,
                    items: [
                        { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                        { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                        { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                        { label: 'Invalid State', icon: 'pi pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                        { label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon' },
                        { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                        { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                        { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                        { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                        { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                        { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                        { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], preventExact: true },
                        { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                        { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                        { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                        { label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc'] }
                    ]
                },
                {
                    label: 'Prime Blocks', icon: 'pi pi-fw pi-prime', routerLink: ['/blocks'],
                    items: [
                        { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'] },
                        { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                    ]
                },
                {
                    label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['/utilities'],
                    items: [
                        { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['utilities/icons'] },
                        { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                    ]
                },
                {
                    label: 'Pages', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages'], badge: 8,
                    items: [
                        { label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud'] },
                        { label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar'] },
                        { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline'] },
                        { label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
                        { label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login'] },
                        { label: 'Invoice', icon: 'pi pi-fw pi-dollar', routerLink: ['/pages/invoice'] },
                        { label: 'Help', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/help'] },
                        { label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/error'] },
                        { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/notfound'] },
                        { label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/access'] },
                        { label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty'] }
                    ]
                },
                {
                    label: 'Hierarchy', icon: 'pi pi-fw pi-align-left',
                    items: [
                        {
                            label: 'Submenu 1', icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 1.1', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-align-left' },
                                        { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-align-left' },
                                        { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-align-left' },
                                    ]
                                },
                                {
                                    label: 'Submenu 1.2', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-align-left' }
                                    ]
                                },
                            ]
                        },
                        {
                            label: 'Submenu 2', icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 2.1', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-align-left' },
                                        { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-align-left' },
                                    ]
                                },
                                {
                                    label: 'Submenu 2.2', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-align-left' },
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    label: 'Buy Now', icon: 'pi pi-fw pi-shopping-cart', url: ['https://www.primefaces.org/store']
                },
                {
                    label: 'Documentation', icon: 'pi pi-fw pi-info-circle', routerLink: ['/documentation']
                }
            ];
        }

        //Carica il menù per il operatore
        if (this.showOperatoreBoard) {
            this.model = [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                {
                    label: 'UI Kit', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'], badge: 2,
                    items: [
                        { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                        { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                        { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                        { label: 'Invalid State', icon: 'pi pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                        { label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon' },
                        { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                        { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                        { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                        { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                        { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                        { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                        { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], preventExact: true },
                        { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                        { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                        { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                        { label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc'] }
                    ]
                },
                {
                    label: 'Prime Blocks', icon: 'pi pi-fw pi-prime', routerLink: ['/blocks'],
                    items: [
                        { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'] },
                        { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                    ]
                },
                {
                    label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['/utilities'],
                    items: [
                        { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['utilities/icons'] },
                        { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                    ]
                },
                {
                    label: 'Pages', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages'], badge: 8,
                    items: [
                        { label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud'] },
                        { label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar'] },
                        { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline'] },
                        { label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
                        { label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login'] },
                        { label: 'Invoice', icon: 'pi pi-fw pi-dollar', routerLink: ['/pages/invoice'] },
                        { label: 'Help', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/help'] },
                        { label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/error'] },
                        { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/notfound'] },
                        { label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/access'] },
                        { label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty'] }
                    ]
                },
                {
                    label: 'Hierarchy', icon: 'pi pi-fw pi-align-left',
                    items: [
                        {
                            label: 'Submenu 1', icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 1.1', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-align-left' },
                                        { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-align-left' },
                                        { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-align-left' },
                                    ]
                                },
                                {
                                    label: 'Submenu 1.2', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-align-left' }
                                    ]
                                },
                            ]
                        },
                        {
                            label: 'Submenu 2', icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 2.1', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-align-left' },
                                        { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-align-left' },
                                    ]
                                },
                                {
                                    label: 'Submenu 2.2', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-align-left' },
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    label: 'Buy Now', icon: 'pi pi-fw pi-shopping-cart', url: ['https://www.primefaces.org/store']
                },
                {
                    label: 'Documentation', icon: 'pi pi-fw pi-info-circle', routerLink: ['/documentation']
                }
            ];
        }

        //Carica il menù per l'agente
        if (this.showAgenteBoard) {
            this.model = [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                {
                    label: 'UI Kit', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'], badge: 2,
                    items: [
                        { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                        { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                        { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                        { label: 'Invalid State', icon: 'pi pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                        { label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon' },
                        { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                        { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                        { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                        { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                        { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                        { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                        { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], preventExact: true },
                        { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                        { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                        { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                        { label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc'] }
                    ]
                },
                {
                    label: 'Prime Blocks', icon: 'pi pi-fw pi-prime', routerLink: ['/blocks'],
                    items: [
                        { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'] },
                        { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                    ]
                },
                {
                    label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['/utilities'],
                    items: [
                        { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['utilities/icons'] },
                        { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                    ]
                },
                {
                    label: 'Pages', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages'], badge: 8,
                    items: [
                        { label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud'] },
                        { label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar'] },
                        { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline'] },
                        { label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
                        { label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login'] },
                        { label: 'Invoice', icon: 'pi pi-fw pi-dollar', routerLink: ['/pages/invoice'] },
                        { label: 'Help', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/help'] },
                        { label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/error'] },
                        { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/notfound'] },
                        { label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/access'] },
                        { label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty'] }
                    ]
                },
                {
                    label: 'Hierarchy', icon: 'pi pi-fw pi-align-left',
                    items: [
                        {
                            label: 'Submenu 1', icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 1.1', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-align-left' },
                                        { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-align-left' },
                                        { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-align-left' },
                                    ]
                                },
                                {
                                    label: 'Submenu 1.2', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-align-left' }
                                    ]
                                },
                            ]
                        },
                        {
                            label: 'Submenu 2', icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 2.1', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-align-left' },
                                        { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-align-left' },
                                    ]
                                },
                                {
                                    label: 'Submenu 2.2', icon: 'pi pi-fw pi-align-left',
                                    items: [
                                        { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-align-left' },
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    label: 'Buy Now', icon: 'pi pi-fw pi-shopping-cart', url: ['https://www.primefaces.org/store']
                },
                {
                    label: 'Documentation', icon: 'pi pi-fw pi-info-circle', routerLink: ['/documentation']
                }
            ];
        }

    }
}

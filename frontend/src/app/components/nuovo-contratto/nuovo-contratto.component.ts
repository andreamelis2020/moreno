import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../app.breadcrumb.service';
import { Partners, Contratti, Campagne, Tipi_contratto, Tipi_offerta } from 'src/app/models/data.model';
import { PartnerService } from 'src/app/services/partner.service';
import { CampagnaService } from 'src/app/services/campagna.service';
import { TipoContrattoService } from 'src/app/services/tipo-contratto.service';
import { TipoOffertaService } from 'src/app/services/tipo-offerta.service';

@Component({
  selector: 'app-nuovo-contratto',
  templateUrl: './nuovo-contratto.component.html',
  styleUrls: ['./nuovo-contratto.component.scss']
})
export class NuovoContrattoComponent implements OnInit {


  selectedState: any = null;

  selectedCountryAdvanced: any[];
  filteredCountries: any[];
  countries: any[];

  //Carico i dati dal Db
  public listaPartners: Partners[]
  public listaCampagne: Campagne[]
  public listaTipiOfferta: Tipi_offerta[]
  public listaTipiContratto: Tipi_contratto[]

  filteredPartners: any[];

  public contratto: Contratti = {};
  tastoIndirizzoFornitura: boolean;
  tastoIndirizzoFatturazione: boolean;
  tastoDelega: boolean;

  uploadedFiles: any[] = [];

  submitted: boolean = false;

  dropdownItems = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
  ];

  constructor(public partnersServices: PartnerService, private campagneService: CampagnaService,
    private tipiContrattoService: TipoContrattoService, private tipiOffertaService: TipoOffertaService,
    private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: 'Nuovo Contratto' }
    ]);
    this.partnersServices.getData().subscribe((partnersTutto: any) => {
      this.listaPartners = partnersTutto;
      this.campagneService.getData().subscribe((campagneTutto: any) => {
        this.listaCampagne = campagneTutto;
        this.tipiContrattoService.getData().subscribe((tipiContrattoTutto: any) => {
          this.listaTipiContratto = tipiContrattoTutto;
          this.tipiOffertaService.getData().subscribe((tipiOffertaTutto: any) => {
            this.listaTipiOfferta = tipiOffertaTutto;
          });
        });
      });
    });

  }

  ngOnInit() {

  }

  filterCountry(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      const country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredCountries = filtered;
  }

  filterPartner(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.listaPartners.length; i++) {
      const partner = this.listaPartners[i].nome;
      if (partner.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(partner);
      }
    }
    this.filteredPartners = filtered;
  }

  public indirizzoFornitura(e) {
    this.tastoIndirizzoFornitura = e.checked;
    if (this.tastoIndirizzoFornitura) {
      this.contratto.indirizzo_fornitura = this.contratto.indirizzo_residenza
      this.contratto.num_fornitura = this.contratto.num_residenza
      this.contratto.comune_fornitura = this.contratto.comune_residenza
      this.contratto.prov_fornitura = this.contratto.prov_residenza
      this.contratto.cap_fornitura = this.contratto.cap_residenza
      document.getElementById("fornitura").style.display = "none"
      document.getElementById("fornitura2").style.display = "none"
    } else {
      this.contratto.indirizzo_fornitura = ""
      this.contratto.num_fornitura = ""
      this.contratto.comune_fornitura = ""
      this.contratto.prov_fornitura = ""
      this.contratto.cap_fornitura = ""
      document.getElementById("fornitura").style.display = "flex"
      document.getElementById("fornitura2").style.display = "flex"
    }
  }

  public indirizzoFatturazione(e) {
    this.tastoIndirizzoFatturazione = e.checked;
    if (this.tastoIndirizzoFatturazione) {
      this.contratto.indirizzo_fatturazione = this.contratto.indirizzo_residenza
      this.contratto.num_fatturazione = this.contratto.num_residenza
      this.contratto.comune_fatturazione = this.contratto.comune_residenza
      this.contratto.prov_fatturazione = this.contratto.prov_residenza
      this.contratto.cap_fatturazione = this.contratto.cap_residenza
      document.getElementById("fatturazione").style.display = "none"
      document.getElementById("fatturazione2").style.display = "none"
    } else {
      this.contratto.indirizzo_fatturazione = ""
      this.contratto.num_fatturazione = ""
      this.contratto.comune_fatturazione = ""
      this.contratto.prov_fatturazione = ""
      this.contratto.cap_fatturazione = ""
      document.getElementById("fatturazione").style.display = "flex"
      document.getElementById("fatturazione2").style.display = "flex"
    }
  }

  public delega(e) {
    this.tastoIndirizzoFatturazione = e.checked;
    if (this.tastoIndirizzoFatturazione) {
      this.contratto.indirizzo_fatturazione = this.contratto.indirizzo_residenza
      this.contratto.num_fatturazione = this.contratto.num_residenza
      this.contratto.comune_fatturazione = this.contratto.comune_residenza
      this.contratto.prov_fatturazione = this.contratto.prov_residenza
      this.contratto.cap_fatturazione = this.contratto.cap_residenza
      document.getElementById("delega").style.display = "flex"
      document.getElementById("delega2").style.display = "flex"
    } else {
      this.contratto.indirizzo_fatturazione = ""
      this.contratto.num_fatturazione = ""
      this.contratto.comune_fatturazione = ""
      this.contratto.prov_fatturazione = ""
      this.contratto.cap_fatturazione = ""
      document.getElementById("delega").style.display = "none"
      document.getElementById("delega2").style.display = "none"
    }
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  salvaContratto() {
    console.log("contratto: ", this.contratto)
    console.log("ciao")
    this.submitted = true;

    if (this.contratto.partner) {
      console.log("ok")

    } else {
    }

  }

}

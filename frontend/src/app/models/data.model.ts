import { Data } from "@angular/router";

export interface Utenti {
    id?: number;
    username?: string;
    email?: string;
    ruolo?: string;
}

export interface Ruoli {
    createdAt?: string;
    updatedAt?: string;
    roleId?: number;
    userId?: number;
}

export interface Permessi {
    id?: number;
    name?: string;
}

export interface Persone {
    id?: number;
    ruolo?: string;
    nome?: string;
    email?: string;
    cellulare?: string;
    cell_aziendale?: string;
    da_nascita?: string;
    da_assunz?: string;
    categoria?: string;
    costo_fisso_mese?: string;
    cc?: number;
    fr?: string;
    da_cessazione_rl?: string;
}

export interface Ccs {
    id?: number;
    cc?: number;
    des_cc?: string;
    cc_prd?: string;
    tipo_ripartizione?: string;
}

export interface Prestazioni {
    id?: number;
    ruolo?: string;
    da_prestazione?: string;
    cc?: number;
    ordine?: number;
    commessa?: number;
    h_lav?: number;
    h_straord?: number;
    h_fol?: number;
    h_fe_god?: number;
    h_perm_god?: number;
    h_fest?: number;
    h_ass_ingiust?: number;
    h_mal?: number;
    h_slm?: number;
    h_inf?: number;
    h_bg?: number;
    sigla_ass?: string;
    h_monte?: number;
    giorno?: string;
    mese?: string;
    anno?: string
}

export interface Attr_ordini {
    id?: number;
    n_ord?: number;
    cc?: number;
    imp_attrib?: number;
}

export interface Ordini {
    id?: number;
    num_ord?: number;
    des_ord?: string;
    cli?: number;
    de_cli?: string;
    offerta?: string;
    de_offerta?: string;
    ord_cli?: string;
    da_ord_cli?: string;
    fase_ord?: string;
    inizio_lav?: string;
    fine_lav?: string;
    ass_tecnit?: string;
    acq_tot?: number;
    prd_dir?: number;
    prd_mat?: number;
    prd_sub?: number;
    sal?: number;
    fatturato?: number;
    iter?: number;
    incassato?: number;
    data_cons_doc?: string;
    data_cons_cont?: string;
    data_cons_cart?: string;
    da_offerta?: string;
    da_ord_tecnit?: string;
    id_offerta?: string;
    cig?: string;
    cup?: string;
    soa?: string;
    id_accountmanager?: string;
    imp_accountmanager?: string;
    perc_accountmanager?: string;
    imp_residuo?: number;
    fine_lav_prev?: string;
    soa_desc?: string;
}

export interface Clienti {
    id?: number;
    cli?: number;
    des_cli?: string;
    stato?: string;
}

export interface Indennita {
    id?: number;
    ruolo?: string;
    da_indennita?: string;
    giorno_settimana?: string;
    festivo?: string;
    localita?: string;
    trasferta?: string;
    rimborso?: string;
    giornata_completa?: number;
    sel_copia?: string;
    premio?: string;
    targa?: string;
    ig?: boolean;
    ir?: boolean;
    it?: boolean;
}

export interface PersonaMeseDipendente {
    id?: number;
    ruolo?: string;
    nome?: string;
    data_completa?: string;
    giorno?: string;
    nome_giorno?: string;
    giorno_settimana?: string;
    ore?: number;
    str?: number;
    m_ore?: number;
    fol?: number;
    fg?: number;
    perm?: number;
    fest?: number;
    ass?: number;
    mal?: number;
    slm?: number;
    inf?: number;
    bh?: number;
    loc?: string;
    tras?: string;
    ir?: boolean;
    se_fest?: string;
    conteggio?: Contegggio;
    riepilogo?: RiepilogoAttribuzioni[];
    riepilogoOre?: RiepilogoOreTotali;
    riepilogoTicket?: RiepilogoTicket[];
    riepilogoIndennita?: RiepilogoIndennita[];
}

export interface RiepilogoAttribuzioni {
    cc?: number;
    ordine?: number;
    attr?: number;
    ore?: number;
}

export interface RiepilogoOreTotali {
    ore?: number;
    str?: number;
    m_ore?: number;
    fol?: number;
    fg?: number;
    perm?: number;
    fest?: number;
    ass?: number;
    mal?: number;
    slm?: number;
    inf?: number;
    bh?: number;
    loc?: string;
    tras?: string;
    reper?: number
}

export interface RiepilogoTicket {
    ticket?: string;
    qt?: number;
}

export interface RiepilogoIndennita {
    tipo?: string;
    euro?: number;
    ore?: number;
    totale?: number;

}

export interface Contegggio {
    totOre?: number;
    totMonteOre?: number;
    totStr?: number;
    totFol?: number;
    totFg?: number;
    totPerm?: number;
    totFest?: number;
    totAss?: number;
    totMal?: number;
    totSlm?: number;
    totInf?: number;
    totBancaOre?: number;
    totRep?: number;
}

export interface DataPrestazione {
    id?: number;
    da_indennita?: string;
    giorno_settimana?: string;
}

export interface DateSelezionate {
    ruolo?: string,
    da_indennita?: string;
    ore_lav?: number;
}

export interface Dipendenti {
    ruolo?: string;
    nome?: string;
    completo?: string;
}

export interface PrestazioniMeseDipendente {
    id?: number;
    ruolo?: string;
    nome?: string;
    gg_mese?: number;
    gg_compl?: number;
    gg_manc?: number;
    ore_lav?: number;
    ore_ass?: number;
    ore_str?: number;
    monte_ore?: number;
    ore_fol?: number;
    per_reg?: number;
}

export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: number;
    country?: Country;
    company?: string;
    date?: string;
    status?: string;
    representative?: Representative;
}

export interface Festivita {
    id?: number;
    da_fest?: string;
}

export interface ClientiVari {
    id?: number;
    de_cli?: string;
}

export interface Commesse {
    id?: number;
    ordine?: number;
    commessa?: number;
    cc?: number;
    des_commessa?: string;
    da_in_lav?: string | Date;
    da_fi_lav?: string | Date;
    prd_dir?: number;
    prd_mat?: number;
    prd_sub?: number;
}

export interface Soas {
    id?: number;
    class_soa?: string;
    de_class_soa?: string;
}

export interface Offerte {
    id?: number;
    cliente?: string;
    rich_offerta?: string;
    da_rich?: string | Date;
    off_tecnit?: string;
    da_off?: string | Date;
    de_lav?: string;
    da_in_prev?: string | Date;
    da_fi_prev?: string | Date;
    prd_corpo_prev?: number;
    prd_dir_prev?: number;
    prd_mat_prev?: number;
    ore_mand_prev?: number;
    cst_mand_prev?: number;
    cst_mat_prev?: number;
    cst_var_prev?: number;
    cpu?: string;
    momento?: string | Date;
    cst_gara?: number;
    cst_acc?: number;
    autore_offerta?: string;
}

export interface Tipo_Ordini {
    id?: number;
    iter?: string;
    des_iter?: string;
}

export interface Iter_Ordine {
    id?: number;
    ordine?: string;
    iter?: string;
    data_iter?: string | Date;
}

export interface Date_Iter {
    data_iter?: string | Date;
    descrizione?: string;
    iter?: string;
}

export interface Produzioni {
    id?: number;
    id_movimento?: number;
    mm_comp?: number;
    aa_comp?: number;
    ordine?: number;
    commessa?: number;
    cc?: number;
    prd_dir?: number;
    prd_mat?: number;
    prd_sub?: number;
    comp?: string;
    cod_sub?: string;
    prd_tot?: number;
}

export interface Incassi {
    id?: number;
    n_ord?: string;
    rif_banca?: string;
    imp_incasso?: number;
    da_incasso?: string | Date;
    rif_fatt?: string;
    note?: string;
}

export interface Fatture_Ordini {
    id?: number;
    n_ord?: string;
    n_fattura?: string;
    imp_fattura?: number;
    da_fattura?: string | Date;
    da_scad_fattura?: string | Date;
    note?: string;
    rif_sal?: number;
    incassato?: number;

}

export interface Fatture_Materiale {
    id?: number;
    fornitore?: string;
    fattura?: string;
    da_fattura?: string | Date;
    imponibile?: number;
    importo_fattura?: number;
    id_fattura_magazzino?: number;
}

export interface Fatture_Magazzino {
    id?: number;
    id_fattura?: number;
    fornitore?: string;
    n_fattura?: string;
    data_fattura?: string | Date;
    imponibile?: number;
    totale?: number;
}

export interface Fatture_Costi {
    id?: number;
    id_fattura?: number;
    n_fattura?: string;
    fornitore?: string;
    da_fattura?: string | Date;
    importo_fattura?: number;
    subappalto?: string;
    attribuzione_completa?: string;
    tipo_pagamento?: string;
    banca?: string;
    rif_pagamento?: string;
    da_ins?: string | Date;
    imponibile?: number;
}

export interface Lista_Ore_Ordini {
    competenza?: string;
    ore_lav?: number;
    straord?: number;
    fol?: number;
    monte_ore?: number;
    ore_totali?: number;
    mese?: string;
    anno?: string
}

export interface Attr_fatture {
    id?: number;
    id_fattura?: number;
    cc?: number;
    ordine?: string;
    commessa?: number;
    importo_attribuito?: number;
    cod_sub?: number;
    mm_comp?: number;
    aa_comp?: number
    targa?: string
}

export interface Lista_Costi_Imputati {
    competenza?: string;
    fornitore?: string;
    n_fatt?: string;
    da_fatt?: string | Date;
    imp_fatt?: number;
    imp_attr?: number;
}

export interface Consumi {
    id?: number;
    id_acq?: number;
    qta?: number;
    data_uscita?: string | Date;
    cc?: number;
    ordine?: string;
    commessa?: number;
    nota?: string;
    adesso?: string;
}

export interface Lista_Consumi {
    competenza?: string | Date;
    fornitore?: string;
    matricola?: string;
    des_matr?: string | Date;
    u_m?: string;
    qta?: number;
    prezzo?: number;
    valore?: number;
}

export interface Acq_Mat {
    id?: number;
    id_fattura?: number;
    matricola?: string;
    de_mat?: string;
    um?: string;
    qta_entrata?: number;
    qta_uscita?: number;
    prezzo?: number;
    data_entrata?: string | Date;
    zona?: string;
    scaffale?: string;
    colonna?: string;
    ripiano?: string;
    frazione?: string;
    barcode?: string;
}

export interface Automezzi {
    id?: number;
    id_automezzo?: string;
    targa?: string;
    matricola?: string;
    descrizione?: string;
    marca_mod?: string;
    ultimo_doc?: number;
    annullato?: string;
}

export interface Amo_Correlato {
    id?: number;
    cc?: number;
    persona?: string;
    ordine?: string;
    commessa?: number;
    des_commessa?: string;
    ore_lav?: number;
    ore_ass?: number;
    ore_tot?: number;
    ore_corr?: number;
    perc_ore?: number;
    costo_tot?: number;
    costo_corr?: number;
    targa?: string;
    anno?: number;
    mese?: number;
    mese_anno?: string;
}

export interface Lista_Amo_Correlato {
    competenza?: string;
    persona?: string;
    targa?: string;
    des_mezzo?: string;
    costo_corr?: number;
}

export interface Costi_Ripartiti {
    id?: number;
    mese?: number;
    anno?: number;
    cc?: number;
    ordine?: string;
    commessa?: number;
    prd_tot_mc?: number;
    prd_dir_mc?: number;
    prd_mat_mc?: number;
    prd_sub_mc?: number;
    costi_dir?: number;
    costi_sub?: number;
    costi_non_sub?: number;
    ore_tot?: number;
    costo_orario?: number;
    costo_ore?: number;
    prd_compl?: number;
    incid_prd?: number;
    ore_compl?: number;
    incid_ore?: number;
    ore_da_rip?: number;
    costo_ore_rip?: number;
    rip_5600?: string;
    costi_5600?: number;
    costi_Amm?: number;
    rip_5605?: string;
    costi_5605?: number;
    costi_varie?: number;
    rip_5610?: string;
    costi_5610?: number;
    costi_amo?: number;
    p_su_c?: number;
    costi_mag?: number;
    amo_corr?: number;
    costi_tot?: number;
    ore_tot2?: number;
}

export interface Lista_Risultati {
    competenza?: string;
    prd_tot?: number;
    fatt?: number;
    mag?: number;
    ore?: number;
    pers?: number;
    corr?: number;
    cst_dir?: number;
    p_c?: number;
    rip?: number;
    cst_tot?: number;
    p_c_comp?: number;
    data?: string;
    costi_dir?: number;
}

export interface Partners {
    id?: number;
    nome?: string;
}

export interface Contratti {
    id?: number;
    partner?: string;
    campagna?: string;
    tipo_offerta?: string;
    tipo_contratto?: string;
    lista?: string;
    nome_intestatario?: string;
    cognome_intestatario?: string;
    data_nascita_intestatario?: string;
    luogo_nascita_intestatario?: string;
    tipo_documento_intestatario?: string;
    ente_rilascio_intestatario?: string;
    numero_doc_intestatario?: string;
    data_rilascio_doc_intestatario?: string;
    data_scadenza_doc?: string;
    codice_fiscale_intestatario?: string;
    telefono_1_intestatario?: string;
    telefono_2_intestatario?: string;
    email_intestatario?: string;
    indirizzo_residenza?: string;
    num_residenza?: string;
    comune_residenza?: string;
    prov_residenza?: string;
    cap_residenza?: string;
    indirizzo_fornitura?: string;
    num_fornitura?: string;
    comune_fornitura?: string;
    prov_fornitura?: string;
    cap_fornitura?: string;
    indirizzo_fatturazione?: string;
    num_fatturazione?: string;
    comune_fatturazione?: string;
    prov_fatturazione?: string;
    cap_fatturazione?: string;
    titolarita_immobile?: string;
    fascia_reperibilita?: string;
    tipo_fatturazione?: string;
    mod_pagamento?: string;
    ente_pagamento?: string;
    nome_delega_pagamento?: string;
    cognome_delega_pagamento?: string;
    codice_fiscale_delega_pagamento?: string;
    note_operatore?: string;
    note_supervisor?: string;
    note_bo?: string;
    nome_file_1?: string;
    nome_file_2?: string;
    nome_file_3?: string;
    nome_file_4?: string;
    nome_file_5?: string;
    nome_file_6?: string;
    nome_file_7?: string;
    nome_file_8?: string;
    nome_file_9?: string;
    nome_file_10?: string;
    nome_file_11?: string;
}

export interface Campagne {
    id?: number;
    nome?: string;
}

export interface Tipi_offerta {
    id?: number;
    nome?: string;
}

export interface Tipi_contratto {
    id?: number;
    nome?: string;
}
app.factory('RicercaService', ['$http', '$q', '$sce', 'GeneralService', function ($http, $q, $sce, GeneralService) {
	var REST_SERVICE_ADVCONTENTSEARCH = GeneralService.getBaseURL() + "/api/plugins/advcontentsearch";
	var REST_SERVICE_JACMS = GeneralService.getBaseURL() + "/legacyapi/rs/it/jacms";
	self = this;
	var ammins_selected = [];
	var servizi_selected = [];
	var novita_selected = [];
	var docs_selected = [];
	var args_selected = [];

	var categoriaTab = "active";
	var argomentoTab = "";
	var opzioniTab = "";

	var ammins_chk = [];
	var servizi_chk = [];
	var novita_chk = [];
	var docs_chk = [];
	this.contentTypes ="";
	this.activeChk;
	this.dataInizio = null;
	this.dataFine = null;
	var argomenti = [];
	var categorie = [];
	this.cercatxt;
	var totalItems = "";
	var numberOfPages = "";
	var contents = [];
	var renderContent = [];
	var currentPage = 0;
	var pages = [];
	var text, page, tipiContenuto, csvCategories, sottosezione, order, dataScadenza, dataPubblicazioneInizio, dataPubblicazioneFine;
	text = page = tipiContenuto = csvCategories = sottosezione = order = dataScadenza = dataPubblicazioneInizio = dataPubblicazioneFine = "";

	var factory = {
		Init: Init,
		setArgomenti: setArgomenti,
		setCategorie: setCategorie,
		toggle: toggle,
		exists: exists,
		ammins_isIndeterminate: ammins_isIndeterminate,
		ammins_isChecked: ammins_isChecked,
		ammins_toggleAll: ammins_toggleAll,
		servizi_isIndeterminate: servizi_isIndeterminate,
		servizi_isChecked: servizi_isChecked,
		servizi_toggleAll: servizi_toggleAll,
		novita_isIndeterminate: novita_isIndeterminate,
		novita_isChecked: novita_isChecked,
		novita_toggleAll: novita_toggleAll,
		docs_isIndeterminate: docs_isIndeterminate,
		docs_isChecked: docs_isChecked,
		docs_toggleAll: docs_toggleAll,
		toggleAll: toggleAll,
		class_tutti: class_tutti,
		class_categorie: class_categorie,
		unchk: unchk,
		clean_date: clean_date,
		setActive: setActive,
		setContentTypes: setContentTypes,
                setUserToken: setUserToken,
		setArgsSelected: setArgsSelected,
		setCatSelected: setCatSelected,
		get_ammins_selected: get_ammins_selected,
		get_servizi_selected: get_servizi_selected,
		get_novita_selected: get_novita_selected,
		get_docs_selected: get_docs_selected,
		get_args_selected: get_args_selected,
		get_categoriaTab: get_categoriaTab,
		get_argomentoTab: get_argomentoTab,
		get_opzioniTab: get_opzioniTab,
		get_ammins_chk: get_ammins_chk,
		get_servizi_chk: get_servizi_chk,
		get_novita_chk: get_novita_chk,
		get_docs_chk: get_docs_chk,
		getCercatxt: getCercatxt,
		setCercatxt: setCercatxt,
		get_dataInizio: get_dataInizio,
		set_dataInizio: set_dataInizio,
		get_dataFine: get_dataFine,
		set_dataFine: set_dataFine,
		get_argomenti: get_argomenti,
		get_categorie: get_categorie,                
		selectedRicercaTxtItemChanged: selectedRicercaTxtItemChanged,
		chkCategoryCode: chkCategoryCode,
		getAutocompleteResults: getAutocompleteResults,
		getContents: getContents,
		getContent: getContent, 
		getTotalItems: getTotalItems,
		getNumberOfPages: getNumberOfPages,
		getRenderContent: getRenderContent,
		getContentsVar: getContentsVar,
		getCurrentPage: getCurrentPage,
		getPages: getPages,
		goToPage: goToPage,
		scrollTopPage: scrollTopPage,
		getAutocompleteIsOpened : getAutocompleteIsOpened
	};
	return factory;

	function Init(scope) {
		scope.RicercaService = this;
	}
	function setArgomenti(argomento, codice) {
		if (argomento != 'Argomenti')
			argomenti.push({name:argomento.replace("%", "'"),code:codice});
	}

	function setCategorie(categoria, codice, padre, padre2) {
		switch (padre) {
			case 'amministrazione':
				if (padre2){
					for (var i in ammins_chk){
						if (ammins_chk[i].code == padre2){
							ammins_chk[i].children.push({name:categoria,code:codice});
						}
					}
				}	
				else
					ammins_chk.push({name:categoria,code:codice,children:[]});
				break;
			case 'novita':
				if (padre2){
					for (var i in novita_chk){
						if (novita_chk[i].code == padre2){
							novita_chk[i].children.push({name:categoria,code:codice});
						}
					}
				}	
				else
					novita_chk.push({name:categoria,code:codice,children:[]});
				break;
			case 'servizi':
				if (padre2){
					for (var i in servizi_chk){
						if (servizi_chk[i].code == padre2){
							servizi_chk[i].children.push({name:categoria,code:codice});
						}
					}
				}	
				else
					servizi_chk.push({name:categoria,code:codice,children:[]});
				break;
			case 'documenti':
				if (padre2){
					for (var i in docs_chk){
						if (docs_chk[i].code == padre2){
							docs_chk[i].children.push({name:categoria,code:codice});
						}
					}
				}	
				else
					docs_chk.push({name:categoria,code:codice,children:[]});
				break;
		}
	}

	function toggle(item, list) {
		var idx = list.indexOf(item);
		if (idx > -1) {
			list.splice(idx, 1);
			for (var i in ammins_chk){
				if (item == ammins_chk[i].code){
					for (var y in ammins_chk[i].children) {
						list.splice(list.indexOf(ammins_chk[i].children[y].code), 1);
					}
				}
			}
			for (var i in novita_chk){
				if (item == novita_chk[i].code){
					for (var y in novita_chk[i].children) {
						list.splice(list.indexOf(novita_chk[i].children[y].code), 1);
					}
				}
			}
			for (var i in servizi_chk){
				if (item == servizi_chk[i].code){
					for (var y in servizi_chk[i].children) {
						list.splice(list.indexOf(servizi_chk[i].children[y].code), 1);
					}
				}
			}
			for (var i in docs_chk){
				if (item == docs_chk[i].code){
					for (var y in docs_chk[i].children) {
						list.splice(list.indexOf(docs_chk[i].children[y].code), 1);
					}
				}
			}
		} else {
			list.push(item);
			for (var i in ammins_chk){
				if (item == ammins_chk[i].code){
					for (var y in ammins_chk[i].children) {
						list.push(ammins_chk[i].children[y].code);
					}
				}
			}
			for (var i in novita_chk){
				if (item == novita_chk[i].code){
					for (var y in novita_chk[i].children) {
						list.push(novita_chk[i].children[y].code);
					}
				}
			}
			for (var i in servizi_chk){
				if (item == servizi_chk[i].code){
					for (var y in servizi_chk[i].children) {
						list.push(servizi_chk[i].children[y].code);
					}
				}
			}
			for (var i in docs_chk){
				if (item == docs_chk[i].code){
					for (var y in docs_chk[i].children) {
						list.push(docs_chk[i].children[y].code);
					}
				}
			}
		}
	};

	function exists(item, list) {
		return list.indexOf(item) > -1;
	};

	function ammins_isIndeterminate() {
		var ammins_chkLength = ammins_chk.length;
		for (var i in ammins_chk){
			ammins_chkLength += ammins_chk[i].children.length;
		}
		return (ammins_selected.length !== 0 && ammins_selected.length !== ammins_chkLength);
	};

	function ammins_isChecked() {
		var ammins_chkLength = ammins_chk.length;
		for (var i in ammins_chk){
			ammins_chkLength += ammins_chk[i].children.length;
		}
		return ammins_selected.length === ammins_chkLength;
	};

	function ammins_toggleAll() {
		var ammins_chkLength = ammins_chk.length;
		for (var i in ammins_chk){
			ammins_chkLength += ammins_chk[i].children.length;
		}
		if (ammins_selected.length === ammins_chkLength) {
			ammins_selected = [];
		} else if (ammins_selected.length === 0 || ammins_selected.length > 0) {
			ammins_selected = [];
			for (var i in ammins_chk){
				ammins_selected.push(ammins_chk[i].code);
				for (var y in ammins_chk[i].children) {
					ammins_selected.push(ammins_chk[i].children[y].code);
				}
			}
		}
	};

	function servizi_isIndeterminate() {
		var servizi_chkLength = servizi_chk.length;
		for (var i in servizi_chk){
			servizi_chkLength += servizi_chk[i].children.length;
		}
		return (servizi_selected.length !== 0 && servizi_selected.length !== servizi_chkLength);
	};

	function servizi_isChecked() {
		var servizi_chkLength = servizi_chk.length;
		for (var i in servizi_chk){
			servizi_chkLength += servizi_chk[i].children.length;
		}
		return servizi_selected.length === servizi_chkLength;
	};

	function servizi_toggleAll() {
		var servizi_chkLength = servizi_chk.length;
		for (var i in servizi_chk){
			servizi_chkLength += servizi_chk[i].children.length;
		}
		if (servizi_selected.length === servizi_chkLength) {
			servizi_selected = [];
		} else if (servizi_selected.length === 0 || servizi_selected.length > 0) {
			servizi_selected = [];
			for (var i in servizi_chk){
				servizi_selected.push(servizi_chk[i].code);
				for (var y in servizi_chk[i].children) {
					servizi_selected.push(servizi_chk[i].children[y].code);
				}
			}
		}
	};

	function novita_isIndeterminate() {
		var novita_chkLength = novita_chk.length;
		for (var i in novita_chk){
			novita_chkLength += novita_chk[i].children.length;
		}
		return (novita_selected.length !== 0 &&	novita_selected.length !== novita_chkLength);
	};

	function novita_isChecked() {
		var novita_chkLength = novita_chk.length;
		for (var i in novita_chk){
			novita_chkLength += novita_chk[i].children.length;
		}
		return novita_selected.length === novita_chkLength;
	};

	function novita_toggleAll() {
		var novita_chkLength = novita_chk.length;
		for (var i in novita_chk){
			novita_chkLength += novita_chk[i].children.length;
		}
		if (novita_selected.length === novita_chkLength) {
			novita_selected = [];
		} else if (novita_selected.length === 0 || novita_selected.length > 0) {
			novita_selected = [];
			for (var i in novita_chk){
				novita_selected.push(novita_chk[i].code);
				for (var y in novita_chk[i].children) {
					novita_selected.push(novita_chk[i].children[y].code);
				}
			}
		}
	};

	function docs_isIndeterminate() {
		var docs_chkLength = docs_chk.length;
		for (var i in docs_chk){
			docs_chkLength += docs_chk[i].children.length;
		}
		return (docs_selected.length !== 0 && docs_selected.length !== docs_chkLength);
	};

	function docs_isChecked() {
		var docs_chkLength = docs_chk.length;
		for (var i in docs_chk){
			docs_chkLength += docs_chk[i].children.length;
		}
		return docs_selected.length === docs_chkLength;
	};

	function docs_toggleAll() {
		var docs_chkLength = docs_chk.length;
		for (var i in docs_chk){
			docs_chkLength += docs_chk[i].children.length;
		}
		if (docs_selected.length === docs_chkLength) {
			docs_selected = [];
		} else if (docs_selected.length === 0 || docs_selected.length > 0) {
			docs_selected = [];
			for (var i in docs_chk){
				docs_selected.push(docs_chk[i].code);
				for (var y in docs_chk[i].children) {
					docs_selected.push(docs_chk[i].children[y].code);
				}
			}
		}
	};

	function toggleAll(filterType) {
		if (filterType == 'categorie') {
			ammins_selected = [];
			servizi_selected = [];
			novita_selected = [];
			docs_selected = [];
		}
		if (filterType == 'argomenti') {
			args_selected = [];
		}
		switch (filterType) {
			case 'categorie':
				ammins_selected = [];
				servizi_selected = [];
				novita_selected = [];
				docs_selected = [];
				break;
			case 'argomenti':
				args_selected = [];
				break;
			default:
				ammins_selected = [];
				servizi_selected = [];
				novita_selected = [];
				docs_selected = [];
				args_selected = [];
				this.activeChk = false;
				clean_date();
		}
	}

	function class_tutti(mode) {
		switch (mode) {
			case 'categorie':
				if (ammins_selected.length !== 0 || servizi_selected.length !== 0 || novita_selected.length !== 0 || docs_selected.length !== 0)
					return ""
				else
					return "active";
				break;
			default:
				if (ammins_selected.length !== 0 || servizi_selected.length !== 0 || novita_selected.length !== 0 || docs_selected.length !== 0 ||
						args_selected.length !== 0 || (this.activeChk != false && this.activeChk !== undefined) || (this.dataInizio != null && this.dataInizio !== undefined) || (this.dataFine != null && this.dataFine !== undefined))
					return ""
				else
					return "active";
				break;
		}
	}

	function class_categorie(selected, checked) {
		if (selected.length !== 0 &&
				selected.length !== checked.length)
			return "active"
		else if (selected.length === checked.length)
			return "active";
		else
			return "";
	}

	function unchk(item, list) {
		var idx = list.indexOf(item);
		if (idx > -1) {
			list.splice(idx, 1);
		}
	}

	function clean_date() {
		this.dataInizio = null;
		this.dataFine = null;
	}

	function setActive(tab) {
		switch (tab) {
			case 'argomenti':
				categoriaTab = "";
				argomentoTab = "active";
				opzioniTab = "";
				break;
			case 'opzioni':
				categoriaTab = "";
				argomentoTab = "";
				opzioniTab = "active";
				break;
			default:
				categoriaTab = "active";
				argomentoTab = "";
				opzioniTab = "";
		}
	}
	
	function setContentTypes(tipiContenuto) {
		this.contentTypes = "";
		if (tipiContenuto != ""){
			this.contentTypes = tipiContenuto;
		}
	}
        
        function setUserToken(utenteToken){
            if (utenteToken != ""){
                this.userToken = utenteToken;
            }
        }        

	function setArgsSelected(argomenti) {
		if (argomenti != ""){
			args_selected = argomenti.split(",");
		}
	}

	function setCatSelected(type, categorie) {
		if (categorie != "") {
			switch (type) {
				case 'amministrazione':
					ammins_selected = categorie.split(",");
					break;
				case 'servizi':
					servizi_selected = categorie.split(",");
					break;
				case 'novita':
					novita_selected = categorie.split(",");
					break;
				case 'documenti':
					docs_selected = categorie.split(",");
					break;
				default:
			}
		}

	}

	function get_ammins_selected() {
		return ammins_selected;
	}

	function get_servizi_selected() {
		return servizi_selected;
	}

	function get_novita_selected() {
		return novita_selected;
	}

	function get_docs_selected() {
		return docs_selected;
	}

	function get_args_selected() {
		return args_selected;
	}

	function get_categoriaTab() {
		return categoriaTab;
	}

	function get_argomentoTab() {
		return argomentoTab;
	}

	function get_opzioniTab() {
		return opzioniTab;
	}

	function get_ammins_chk() {
		return ammins_chk;
	}

	function get_servizi_chk() {
		return servizi_chk;
	}

	function get_novita_chk() {
		return novita_chk;
	}

	function get_docs_chk() {
		return docs_chk;
	}

	function getCercatxt(elem) {
		return this.cercatxt;
	}
	
	function setCercatxt(elem) {
		this.cercatxt = elem;
	}

	function get_dataInizio() {
		return this.dataInizio;
	}
	
	function set_dataInizio(elem) {
		this.dataInizio = elem;
	}

	function get_dataFine() {
		return this.dataFine;
	}
	
	function set_dataFine(elem) {
		this.dataFine = elem;
	}

	function get_argomenti() {
		return argomenti;
	}

	function get_categorie() {
		return categorie;
	}

	function selectedRicercaTxtItemChanged(item) {
		if (item !== undefined && item.contentName !== undefined) {
			this.cercatxt = item.contentName;
		}
		// Clear fields
		if (item === undefined) {
			this.cercatxt = "";
		}
	}
	
	function chkCategoryCode(categoryCode) {
		for(var i in ammins_chk) {
			if (categoryCode == ammins_chk[i].code)
				toggle(ammins_chk[i].code, ammins_selected);
		}
		for(var i in servizi_chk) {
			if (categoryCode == servizi_chk[i].code)
				toggle(servizi_chk[i].code, servizi_selected);
		}
		for(var i in novita_chk) {
			if (categoryCode == novita_chk[i].code)
				toggle(novita_chk[i].code, novita_selected);
		}
		for(var i in docs_chk) {
			if (categoryCode == docs_chk[i].code)
				toggle(docs_chk[i].code, docs_selected);
		}
	}
	
	function getAutocompleteResults(search) {
		var textSearch = '';
                var token = '';
		var deferred = $q.defer();
		if (this.contentTypes)
			tipiContenuto = "&filters[0].attribute=typeCode&filters[0].operator=eq&filters[0].allowedValues=" + this.contentTypes;
		else
			tipiContenuto = "";
		if (search)
			textSearch = '&filters[1].entityAttr=jacms:title&filters[1].operator=like&filters[1].value='+ search;
		
                if (this.userToken) {
                    token = this.userToken;
                    $http({
                            method: 'GET',
                            url: encodeURI(REST_SERVICE_ADVCONTENTSEARCH+"/contents.json?pageSize=9&text="+ tipiContenuto + textSearch),
                            headers: {Authorization: 'Bearer ' + this.userToken}
                    }).then(
                            function (response) {
                                    var searchList = [];
                                    for (var i in response.data.payload) {
                                            getContent(response.data.payload[i], 'list',token).then(
                                                    function(response) {
                                                            var content = {};
                                                            content.icon = $sce.trustAsHtml($(response.html).find('svg').prop('innerHTML'));
                                                            content.href = $(response.html).find('h4').find('a').prop('href');
                                                            for (var j in response.item.attributes.attribute){
                                                                    if (response.item.attributes.attribute[j].roles){
                                                                            if (response.item.attributes.attribute[j].roles.role.indexOf('jacms:title') != -1)
                                                                                    content.contentName = response.item.attributes.attribute[j].value;
                                                                            if (response.item.attributes.attribute[j].roles.role.indexOf('jpattributeextended:sottosezione') != -1)
                                                                                    content.category = response.item.attributes.attribute[j].value.value;
                                                                    }
                                                            }
                                                            searchList.unshift(content);
                                                    }, function(errResponse) {
                                                            console.error("Errore durante il caricamento del contenuto");
                                            });
                                    }
                                    searchList.push({searchButton: 'hidden'});
                                    searchList.push({searchButton: true});
                                    deferred.resolve(searchList);
                            },
                            function (errResponse) {
                                    console.error(errResponse);
                                    deferred.reject(errResponse);
                                    var searchList = [];
                            }
                    );
                    return deferred.promise;
                    
                } else {            
                    $http({
                            method: 'GET',
                            url: encodeURI(REST_SERVICE_ADVCONTENTSEARCH+"/contents.json?pageSize=9&text="+ tipiContenuto + textSearch)
                    }).then(
                            function (response) {
                                    var searchList = [];
                                    for (var i in response.data.payload) {
                                            getContent(response.data.payload[i], 'list').then(
                                                    function(response) {
                                                            var content = {};
                                                            content.icon = $sce.trustAsHtml($(response.html).find('svg').prop('innerHTML'));
                                                            content.href = $(response.html).find('h4').find('a').prop('href');
                                                            for (var j in response.item.attributes.attribute){
                                                                    if (response.item.attributes.attribute[j].roles){
                                                                            if (response.item.attributes.attribute[j].roles.role.indexOf('jacms:title') != -1)
                                                                                    content.contentName = response.item.attributes.attribute[j].value;
                                                                            if (response.item.attributes.attribute[j].roles.role.indexOf('jpattributeextended:sottosezione') != -1)
                                                                                    content.category = response.item.attributes.attribute[j].value.value;
                                                                    }
                                                            }
                                                            searchList.unshift(content);
                                                    }, function(errResponse) {
                                                            console.error("Errore durante il caricamento del contenuto");
                                            });
                                    }
                                    searchList.push({searchButton: 'hidden'});
                                    searchList.push({searchButton: true});
                                    deferred.resolve(searchList);
                            },
                            function (errResponse) {
                                    console.error(errResponse);
                                    deferred.reject(errResponse);
                                    var searchList = [];
                            }
                    );
                    return deferred.promise;                
                }
	}
	
	function getContents(pageNum){
		var indexFilter = 0;
		if (pageNum !== undefined) 
			page = "&page=" + pageNum;
		else {
			pageNum = '1';
			page = "&page=" + pageNum;
		}
		goToPage(pageNum);
		
		if (this.contentTypes){
			tipiContenuto = "&filters["+ indexFilter +"].attribute=typeCode&filters["+ indexFilter +"].operator=eq&filters["+ indexFilter +"].allowedValues=" + this.contentTypes;
			indexFilter ++;
		} else
			tipiContenuto = "";
		if (this.cercatxt !== undefined && this.cercatxt !== '') text = "&text=" + this.cercatxt + "*";
		
		if(this.orderBy === undefined)
			this.orderBy = "data_pubb";
		
		switch (this.orderBy) {
			case 'data_pubb':
				order = '&filters['+ indexFilter +'].entityAttr=jpattributeextended:datapubblicazione&filters['+ indexFilter +'].order=DESC';
				indexFilter ++;
				break;
			case 'titolo_asc':
				order = '&filters['+ indexFilter +'].entityAttr=titolo&filters['+ indexFilter +'].order=ASC';
				indexFilter ++;
				break;
			case 'titolo_desc':
				order = '&filters['+ indexFilter +'].entityAttr=titolo&filters['+ indexFilter +'].order=DESC';
				indexFilter ++;
				break;
		}
		
		if (ammins_selected.length > 0 || servizi_selected.length > 0 || novita_selected.length > 0 || docs_selected.length > 0) {
			sottosezione = "&filters["+ indexFilter +"].entityAttr=jpattributeextended:sottosezione";
			var indexAllowedValues = 0;
			for (var i in ammins_selected) {
				sottosezione += "&filters["+ indexFilter +"].allowedValues[" + indexAllowedValues + "]=" + ammins_selected[i];
				indexAllowedValues ++;
			}
			for (var i in servizi_selected) {
				sottosezione += "&filters["+ indexFilter +"].allowedValues[" + indexAllowedValues + "]=" + servizi_selected[i];
				indexAllowedValues ++;
			}
			for (var i in novita_selected) {
				sottosezione += "&filters["+ indexFilter +"].allowedValues[" + indexAllowedValues + "]=" + novita_selected[i];
				indexAllowedValues ++;
			}
			for (var i in docs_selected) {
				sottosezione += "&filters["+ indexFilter +"].allowedValues[" + indexAllowedValues + "]=" + docs_selected[i];
				indexAllowedValues ++;
			}
			indexFilter ++;
		}
		else
			sottosezione = "";
		
		if (args_selected.length > 0) 
			csvCategories = "&csvCategories[0]=" + String(args_selected);
		else
			csvCategories = "";
		
		if (this.activeChk){
			var now = new Date();
			dataScadenza = "&filters["+ indexFilter +"].entityAttr=jpattributeextended:dataScadenza&filters["+ indexFilter +"].operator=gt&filters["+ indexFilter +"].type=date&filters["+ indexFilter +"].value=" + new Date().toISOString().slice(0, 19).replace('T',' ');
			indexFilter ++;
		} else 
			dataScadenza = "";
		
		if (this.dataInizio != "" && this.dataInizio != undefined && this.dataInizio != null){
			var dInizio = this.dataInizio.split("/");
			dataPubblicazioneInizio = "&filters["+ indexFilter +"].entityAttr=jpattributeextended:datapubblicazione&filters["+ indexFilter +"].operator=gt&filters["+ indexFilter +"].type=date&filters["+ indexFilter +"].value=" + dInizio[2] + "-" + dInizio[1] + "-" + dInizio[0] + " 00:00:00";
			indexFilter ++;
		} else
			dataPubblicazioneInizio = "";
		
		if (this.dataFine != "" && this.dataFine != undefined && this.dataFine != null){
			var dFine = this.dataFine.split("/");
			dataPubblicazioneFine = "&filters["+ indexFilter +"].entityAttr=jpattributeextended:datapubblicazione&filters["+ indexFilter +"].operator=lt&filters["+ indexFilter +"].type=date&filters["+ indexFilter +"].value=" + dFine[2] + "-" + dFine[1] + "-" + dFine[0] + " 23:59:59";;
			indexFilter ++;
		} else
			dataPubblicazioneFine = "";
		
		var deferred = $q.defer();
                var token = '';
                if (this.userToken) {
                    token = this.userToken;
                    $http({
                            method: 'GET',
                            url: encodeURI(REST_SERVICE_ADVCONTENTSEARCH+"/contents.json?pageSize=15" + page + tipiContenuto + text + csvCategories + order + sottosezione + dataScadenza + dataPubblicazioneInizio + dataPubblicazioneFine),
                            headers: {Authorization: 'Bearer ' + this.userToken}
                    }).then(
                            function (response) {
                                    pages = [];
                                    contents = response.data.payload;
                                    totalItems = String(response.data.metaData.totalItems);
                                    numberOfPages = String(response.data.metaData.lastPage);
                                    for (i = 0; i < numberOfPages; i++) { 
                                            pages[i] = i+1;
                                    }
                                    for(var i in contents){
                                            getContent(contents[i], 'list',token).then(
                                                    function(response) {
                                                            renderContent[response.item.id] = $sce.trustAsHtml(response.html);
                                                    }, function(errResponse) {
                                                            console.error("Errore durante il caricamento del contenuto");
                                            });
                                    }
                            },
                            function (errResponse) {
                                    console.error(errResponse);
                                    deferred.reject(errResponse);
                            }
                    );
                    return deferred.promise;
                }else {
                    $http({
                            method: 'GET',
                            url: encodeURI(REST_SERVICE_ADVCONTENTSEARCH+"/contents.json?pageSize=15" + page + tipiContenuto + text + csvCategories + order + sottosezione + dataScadenza + dataPubblicazioneInizio + dataPubblicazioneFine)
                    }).then(
                            function (response) {
                                    pages = [];
                                    contents = response.data.payload;
                                    totalItems = String(response.data.metaData.totalItems);
                                    numberOfPages = String(response.data.metaData.lastPage);
                                    for (i = 0; i < numberOfPages; i++) { 
                                            pages[i] = i+1;
                                    }
                                    for(var i in contents){
                                            getContent(contents[i], 'list').then(
                                                    function(response) {
                                                            renderContent[response.item.id] = $sce.trustAsHtml(response.html);
                                                    }, function(errResponse) {
                                                            console.error("Errore durante il caricamento del contenuto");
                                            });
                                    }
                            },
                            function (errResponse) {
                                    console.error(errResponse);
                                    deferred.reject(errResponse);
                            }
                    );
                    return deferred.promise;
                }
	};
	
	function getContent(contentId, modelId,token){
		var deferred = $q.defer();
                if (token){
                    $http({
                            method: 'GET',
                            url: REST_SERVICE_JACMS+"/content.json?id=" + contentId + "&modelId=" + modelId,
                            headers: {Authorization: 'Bearer ' + token}
                    }).then(
                                    function (response) {
                                            deferred.resolve(response.data.response.result);
                                    },
                                    function (errResponse) {
                                            console.error(errResponse);
                                            deferred.reject(errResponse);
                                    }
                    );
                    return deferred.promise;
                }else {
                    $http({
                            method: 'GET',
                            url: REST_SERVICE_JACMS+"/content.json?id=" + contentId + "&modelId=" + modelId
                    }).then(
                                    function (response) {
                                            deferred.resolve(response.data.response.result);
                                    },
                                    function (errResponse) {
                                            console.error(errResponse);
                                            deferred.reject(errResponse);
                                    }
                    );
                    return deferred.promise;
                }
	};
	
	function getTotalItems() {
		return totalItems;
	}
	
	function getNumberOfPages() {
		return numberOfPages;
	}
	
	function getRenderContent(id) {
		return renderContent[id];
	}
	
	function getContentsVar(id) {
		if (id !== undefined)
			return contents[id];
		else
			return contents;
	}
	
	function getCurrentPage() {
		return currentPage;
	}
	
	function getPages() {
		return pages;
	}
	
	function goToPage(page) {
		currentPage = page-1;
		scrollTopPage();
	}
	
	function scrollTopPage(){
		angular.element('html, body').animate({
		   scrollTop: $("#main_container").offset().top
		}, 800)
	}
	
	function getAutocompleteIsOpened(){
		if (document.getElementById('cerca-txt')) {
			var isOpened = document.getElementById('cerca-txt').getAttribute('aria-expanded');
			if (isOpened == 'true')	return true;
			else false;
		}
	}

}]);
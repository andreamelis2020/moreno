app.controller('FiltriController', [ '$scope', 'FiltriService', 'GeneralService', 'RicercaService', '$location', '$anchorScroll', '$sce', '$timeout', '$q',
	function($scope, FiltriService, GeneralService, RicercaService, $location, $anchorScroll, $sce, $timeout, $q){
	$scope.contents = [];
	$scope.renderContent = [];
	$scope.renderContentSecondModel = [];
	$scope.calendar = [];
	$scope.orCategory = false;
	$scope.filters = "";
	$scope.fulltext = "";
	$scope.events = [];
	$scope.renderEventContent = [];
	$scope.categoryContent = [];
	$scope.dayName = [];
	$scope.loader = [];
	$scope.full = [];
	$scope.empty = false;
	$scope.argomenti = [];
	$scope.ammins_chk = [];
	$scope.servizi_chk = [];
	$scope.novita_chk = [];
	$scope.docs_chk = [];
	$scope.ammins_selected = [];
	$scope.servizi_selected = [];
	$scope.novita_selected = [];
	$scope.docs_selected = [];
	$scope.args_selected = [];
	$scope.categoriaTab = "active";
	$scope.argomentoTab = "";
	$scope.opzioniTab = "";
	$scope.active_chk = null;
	$scope.data_inizio = null;
	$scope.data_fine = null;
	$scope.categorie = [];
	$scope.cercatxt = "";
	$scope.General = GeneralService;
	$scope.searchParameters = {};
	const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];	
	$scope.setParameters = function (pageSize, maxElem, contentType, modelId, categoryCode, elemId, orCategory, filters, contents, userToken) {
		if(userToken !== undefined && userToken != '')
			FiltriService.userToken = userToken;
		$scope.pageSize = parseInt(pageSize);
		if (categoryCode != "")
			$scope.categorie = categoryCode;
		if (maxElem != "")
			$scope.maxElements =  parseInt(maxElem);
		if (contentType)
			$scope.contentType = contentType; 
		if (filters != "")
			$scope.filters = filters;
		if (orCategory == 'true')
			$scope.orCategory = true;
		if (contents && contents != 'multi') {
			$scope.setContents(contents);
		} else {
			if (contents == 'multi')
				$scope.getMultiContents($scope.contentType, categoryCode, elemId);
			else
				$scope.getContents(contentType, modelId, categoryCode, elemId);
		}
	}
	
	$scope.setCalendarParameters = function (day, finemese, nextMonth, pageSize, maxElem, userToken) {
		if(userToken !== undefined && userToken != '')
			FiltriService.userToken = userToken;
		$scope.oneMonth = true;
		$scope.day = day;
		$scope.finemese = finemese;
		$scope.days = finemese - day;
		for (i = 0; i <= $scope.days; i++) { 
			$scope.calendar[i] = i+parseInt($scope.day);
			$scope.full[$scope.calendar[i]] = true;
		}
		if ($scope.days <= 9) {
			$scope.oneMonth = false;
			var d = new Date();
			$scope.nextMonth = monthNames[d.getMonth()+1];
			$scope.daysOld = angular.copy($scope.days)+1;
			$scope.day = 1;
			$scope.finemese = 10 - $scope.days;
			$scope.days = $scope.finemese - $scope.day;
			for (i = 0; i <= $scope.days; i++) { 
				$scope.calendar[i+$scope.daysOld] = i+parseInt($scope.day);
				$scope.full[$scope.calendar[i+$scope.daysOld]] = true;
			}
		}
		$scope.pageSize = parseInt(pageSize);
		if (maxElem != "")
			$scope.maxElements =  parseInt(maxElem);
	}
	
        
	$scope.getContents = function (contentType, modelId, categoryCode, elemId, filters, date) {
		$scope.countEmpty = 0;
		if (filters != undefined)
			$scope.filters = filters;
		if ($scope.searchParameters) {
			for(var i in $scope.searchParameters){
				if ($scope.searchParameters[i] != null) {
					switch ($scope.searchParameters[i].type) {
						case 'date':
							if($scope.filters == "")
								$scope.filters += '(attributeFilter=true;key=' + i +';start='+ $scope.searchParameters[i].start +';end=' + $scope.searchParameters[i].end + ';)';
							else
								$scope.filters += '+(attributeFilter=true;key=' + i +';start='+ $scope.searchParameters[i].start +';end=' + $scope.searchParameters[i].end + ';)';
							break;
						case 'select':
							if($scope.filters == "")
								$scope.filters += '(attributeFilter=true;key=' + i +';value='+ $scope.searchParameters[i].key + ';)';
							else
								$scope.filters += '+(attributeFilter=true;key=' + i +';value='+ $scope.searchParameters[i].key + ';)';
							break;
						case 'boolean':
							if($scope.filters == "")
								$scope.filters += '(attributeFilter=true;key=' + i +';value='+ $scope.searchParameters[i].value + ';)';
							else
								$scope.filters += '+(attributeFilter=true;key=' + i +';value='+ $scope.searchParameters[i].value + ';)';
							break;
						case 'text':
							if (i != 'fulltext') {
								if($scope.filters == "")
									$scope.filters += '(attributeFilter=true;key=' + i +';value='+ $scope.searchParameters[i].value + ';likeOption=true;)';
								else
									$scope.filters += '+(attributeFilter=true;key=' + i +';value='+ $scope.searchParameters[i].value + ';likeOption=true;)';
							} else {
								$scope.fulltext = $scope.searchParameters[i].value;
							}
							break;
						default:
							if($scope.filters == "")
								$scope.filters += '(attributeFilter=true;key=' + i +';value='+ $scope.searchParameters[i] +';)';
							else
								$scope.filters += '+(attributeFilter=true;key=' + i +';value='+ $scope.searchParameters[i] +';)';
					}
				}
			}
		}
		$scope.currentPage = 0;
		$scope.pages = [];
		if (elemId) {
			setActive(elemId, $scope.oldElem);
			$scope.oldElem = elemId;
		}
		FiltriService.getContents(contentType, categoryCode, $scope.filters, $scope.fulltext, date).then(
			function(response) {
				$scope.events[date]=[];
				if(response == undefined){
					$scope.full[date] = false;
					$scope.countEmpty = $scope.countEmpty + 1;
				}
				if (response != undefined) {
					$scope.loader[date]= true;
					if (!Array.isArray(response)) {
						if (response.$){
							$scope.contents = [];
							$scope.contents[0] = response;
							$scope.events[date].push(response);
						}
					} else {
						if ($scope.maxElements >= response.length){
							$scope.contents = response;
							$scope.events[date] = response;
						} else {
							for (i = 0; i < $scope.maxElements; i++) {
								$scope.contents[i] = response[i];
								$scope.events[date] = response[i];
							}
						}
					}
					$scope.numberOfPages = Math.ceil($scope.contents.length/$scope.pageSize);
					for (i = 0; i < $scope.numberOfPages; i++) { 
						$scope.pages[i] = i+1;
					}
					if (date != undefined) {
						$scope.renderEventContent[date] = [];
						$scope.categoryContent[date] = [];
						for(var i in $scope.events[date]){
							FiltriService.getContent($scope.events[date][i].$, modelId).then(
								function(response) {
									$scope.renderEventContent[date][response.item.id] = $sce.trustAsHtml(response.html);
									$scope.loader[date]= false;
									$scope.categoryContent[date][response.item.id] = "";
									for(var i in response.item.categories.category){
										if(response.item.categories.category[i] != undefined)
											$scope.categoryContent[date][response.item.id] += response.item.categories.category[i];
									}
								}, function(errResponse) {
									$scope.loader[date]= false;
									console.error("Errore durante il caricamento del contenuto");
							});
						}
					}
				} else {
					$scope.contents = [];
				}
				if ($scope.countEmpty != $scope.calendar.length && contentType == 'EVN')
					$timeout(owlInit, 1000);
				else {
					$scope.empty = true;
				}
			}, function(errResponse) {
				$scope.contents = [];
				$scope.loader[date]= false;
			});
	}
	
	$scope.getMultiContents = function (contentTypes, categoryCode, elemId, filters, pageNum){
		var tipologia = '';
		var fulltext = '';
		if (contentTypes == undefined){
			if ($scope.searchParameters.type == 'contentType')
				contentTypes = $scope.searchParameters.key;
			else
				contentTypes = $scope.contentType;
		}
		if ($scope.searchParameters.type == 'tipologia')
			tipologia = $scope.searchParameters.key;
		if ($scope.searchParameters.type == 'fulltext')
			fulltext = $scope.searchParameters.key;
		if (filters != undefined)
			$scope.filters = filters;
		if (pageNum !== undefined) 
			page = "&page=" + pageNum;
		else {
			pageNum = 1;
			page = "&page=1";
		}
		$scope.pages = [];
		$scope.goToPage(pageNum-1); 
		if (elemId) {
			setActive(elemId, $scope.oldElem);
			$scope.oldElem = elemId;
		}
		FiltriService.getMultiContents($scope.pageSize, contentTypes, categoryCode, $scope.orCategory, $scope.filters, tipologia, fulltext, page).then(
			function(response) {
				$scope.contents = response.payload;
				$scope.totalItems = String(response.metaData.totalItems);
				$scope.numberOfPages = String(response.metaData.lastPage);
				for (i = 0; i < $scope.numberOfPages; i++) { 
					$scope.pages[i] = i+1;
				}
			}, function(errResponse) {
				$scope.contents = [];
		});
			
	};
	
	$scope.getContent = function (contentId, modelId) {
		if (contentId !== undefined) {
			$scope.renderContent[contentId] = [];
			if (modelId === undefined)
				modelId = 'list';
			FiltriService.getContent(contentId, modelId).then(
				function(response) {
					$scope.renderContent[response.item.id][modelId] = $sce.trustAsHtml(renderContent(response.html));
				}, function(errResponse) {
					console.error("Errore durante il caricamento del contenuto");
			});
		}
	}
	
	$scope.getTableHeader = function (contentId, modelId) {
		if (modelId === undefined)
			modelId = 'list';
		FiltriService.getContent(contentId, modelId).then(
			function(response) {
				$scope.tableHeader = [];
				var htmlObject = $(response.html);
				htmlObject.each( function () {
					var value = $(this).attr("data-thead");
					if (value)
						$scope.tableHeader.push(value);
				});
			}, function(errResponse) {
				console.error("Errore durante il caricamento del contenuto");
		});
	}
	
	function renderContent(htmlElement){
		var userAgent, ieReg, ie;
		userAgent = window.navigator.userAgent;
		ieReg = /msie|Trident.*rv[ :]*11\./gi;
		ie = ieReg.test(userAgent);			
		if (ie) {
			var htmlObject = $(htmlElement);
			var imgUrl = htmlObject.find('img').prop('src');
			if (imgUrl) {
				htmlObject.find( ".img-fit-cover" ).css('backgroundImage', 'url(' + imgUrl + ')').addClass('img-fit-ie');
				return htmlObject.prop('outerHTML');
			} else
				return htmlElement;
		} else
			return htmlElement;
		$timeout($scope.jQueryEvents, 1000);
	}
	
	function setActive(element, oldElement) {
		if(oldElement) {
			var oldElem = document.getElementById(oldElement);
			$(oldElem).removeClass("active");
		}
		if (element != "") {
			var elem = document.getElementById(element);
			$(elem).addClass("active");
		}
	}
	
	$scope.goToPage = function (page) {
		$scope.currentPage = page;
	}
	
	$scope.goToFirstPage = function () {
		$scope.currentPage = 0;
	}
	
	$scope.refreshPage = function () {
		$scope.currentPage = 1;
		$timeout($scope.goToFirstPage, 1000);
	}
	
	$scope.getFilterDay = function (day, month, year) {
		var monthInt = parseInt(month)-1;
		var date = new Date(year,monthInt,day);
		$scope.dayName[day] = date.toLocaleString(undefined, {weekday: 'short'});
		return "(attributeFilter=true;key=data_iniz;start="+ day +"/"+ month +"/"+ year+";end="+ day +"/"+ month +"/"+ year+")"
	}
	
	$scope.setContents = function (contents) {
		$scope.contents = contents.replace(/=/g, '":"');
		$scope.contents = $scope.contents.replace(/}/g, '"}');
		$scope.contents = $scope.contents.replace(/contentId/g, '"contentId').replace(/modelId/g, '"modelId');
		$scope.contents = $scope.contents.replace(/, "/g, '", "');
		$scope.contents = JSON.parse($scope.contents);
		if ($scope.pageSize != 0)
			$scope.numberOfPages = Math.ceil($scope.contents.length/$scope.pageSize);
		else
			$scope.numberOfPages = 1;
		$scope.pages = [];
		$scope.currentPage = 0;
		for (i = 0; i < $scope.numberOfPages; i++) { 
			$scope.pages[i] = i+1;
		}
		for(var i in $scope.contents){
			FiltriService.getContent($scope.contents[i].contentId, $scope.contents[i].modelId).then(
				function(response) {
					$scope.renderContent[response.item.id] = $sce.trustAsHtml(response.html);
				}, function(errResponse) {
					console.error("Errore durante il caricamento del contenuto");
			});
		}
	}
	
	function owlInit(){
		var owl = $('#owl-calendario');
		owl.owlCarousel({
			nav:false,
                        navElement:'a',
			startPosition: 0,
			autoPlay:false,
			responsiveClass:true,
			responsive:{
				0:{
					items:1,
				},
				576: {
					items:2,
				},
				768: {
					items:3,
				},
				991: {
					items:4,
				},
			}
		});
	}
	
	$scope.setArgomenti = function (argomento, codice) {
		if (argomento != 'Argomenti')
			$scope.argomenti.push({name:argomento.replace("%", "'"),code:codice});
	}

	$scope.setCategorie = function (categoria, padre) {
		switch (padre) {
			case 'amministrazione':
				ammins_chk.push(categoria);
				break;
			case 'novita':
				novita_chk.push(categoria);
				break;
			case 'servizi':
				servizi_chk.push(categoria);
				break;
			case 'documenti':
				docs_chk.push(categoria);
				break;
		}
	}
	
	$scope.getArgomentiList = function () {
		var argomenti = "";
		if ($scope.categorie)
			argomenti = $scope.categorie;
		for(var i in $scope.args_selected){
			var lastChar = argomenti[argomenti.length -1];
			if (lastChar === undefined || lastChar == ',')
				argomenti += $scope.args_selected[i].code + "";
			else
				argomenti += ',' + $scope.args_selected[i].code;
		}
		for(var i in $scope.ammins_selected){
			if (argomenti == '')
				argomenti += $scope.ammins_selected[i].code + "";
			else
				argomenti += ',' + $scope.ammins_selected[i].code;
		}
		for(var i in $scope.servizi_selected){
			if (argomenti == '')
				argomenti += $scope.servizi_selected[i].code + "";
			else
				argomenti += ',' + $scope.servizi_selected[i].code;
		}
		for(var i in $scope.novita_selected){
			if (argomenti == '')
				argomenti += $scope.novita_selected[i].code + "";
			else
				argomenti += ',' + $scope.novita_selected[i].code;
		}
		for(var i in $scope.docs_selected){
			if (argomenti == '')
				argomenti += $scope.docs_selected[i].code + "";
			else
				argomenti += ',' + $scope.docs_selected[i].code;
		}
		return argomenti;
	}
	
	$scope.cleanSearchParameter = function(key) {
		if (key == 'all')
			$scope.searchParameters = {};
		else
			delete $scope.searchParameters[key];
	}
	
	$scope.toggle = function(item, list) {
		var idx = list.indexOf(item);
		if(item.code && list.length > 0){
			for (var i in list){
				if (list[i].code == item.code)
					idx = i;
			}
		}
		if (idx > -1) {
			list.splice(idx, 1);
			setActive('', item.code);
		}
		else {
			list.push(item);
			setActive(item.code);
		}
	};

	$scope.exists = function(item, list) {
		return list.indexOf(item) > -1;
	};

	$scope.ammins_isIndeterminate = function() {
		return ($scope.ammins_selected.length !== 0 && $scope.ammins_selected.length !== $scope.ammins_chk.length);
	};

	$scope.ammins_isChecked = function() {
		return $scope.ammins_selected.length === $scope.ammins_chk.length;
	};

	$scope.ammins_toggleAll = function() {
		if ($scope.ammins_selected.length === $scope.ammins_chk.length) {
			$scope.ammins_selected = [];
		} else if ($scope.ammins_selected.length === 0 || $scope.ammins_selected.length > 0) {
			$scope.ammins_selected = $scope.ammins_chk.slice(0);
		}
	};

	$scope.servizi_isIndeterminate = function() {
		return ($scope.servizi_selected.length !== 0 && $scope.servizi_selected.length !== $scope.servizi_chk.length);
	};

	$scope.servizi_isChecked = function() {
		return $scope.servizi_selected.length === $scope.servizi_chk.length;
	};

	$scope.servizi_toggleAll = function() {
		if ($scope.servizi_selected.length === $scope.servizi_chk.length) {
			$scope.servizi_selected = [];
		} else if ($scope.servizi_selected.length === 0 || $scope.servizi_selected.length > 0) {
			$scope.servizi_selected = $scope.servizi_chk.slice(0);
		}
	};

	$scope.novita_isIndeterminate = function() {
		return ($scope.novita_selected.length !== 0 && $scope.novita_selected.length !== $scope.novita_chk.length);
	};

	$scope.novita_isChecked = function() {
		return $scope.novita_selected.length === $scope.novita_chk.length;
	};

	$scope.novita_toggleAll = function() {
		if ($scope.novita_selected.length === $scope.novita_chk.length) {
			$scope.novita_selected = [];
		} else if ($scope.novita_selected.length === 0 || $scope.novita_selected.length > 0) {
			$scope.novita_selected = $scope.novita_chk.slice(0);
		}
	};

	$scope.docs_isIndeterminate = function() {
		return ($scope.docs_selected.length !== 0 && $scope.docs_selected.length !== $scope.docs_chk.length);
	};

	$scope.docs_isChecked = function() {
		return $scope.docs_selected.length === $scope.docs_chk.length;
	};

	$scope.docs_toggleAll = function() {
		if ($scope.docs_selected.length === $scope.docs_chk.length) {
			$scope.docs_selected = [];
		} else if ($scope.docs_selected.length === 0 || $scope.docs_selected.length > 0) {
			$scope.docs_selected = $scope.docs_chk.slice(0);
		}
	};

	$scope.toggleAll = function(filterType) {
		if(filterType == 'categorie') {
			$scope.ammins_selected = [];
			$scope.servizi_selected = [];
			$scope.novita_selected = [];
			$scope.docs_selected = [];
		}
		if(filterType =='argomenti') {
			$scope.args_selected = [];
		}
		switch(filterType) {
		  case 'categorie':
			$scope.ammins_selected = [];
			$scope.servizi_selected = [];
			$scope.novita_selected = [];
			$scope.docs_selected = [];
			break;
		  case 'argomenti':
			$scope.args_selected = [];
			break;
		  default:
			$scope.ammins_selected = [];
			$scope.servizi_selected = [];
			$scope.novita_selected = [];
			$scope.docs_selected = [];
			$scope.args_selected = [];
			$scope.active_chk = null;
			$scope.clean_date();
		}
	}

	$scope.class_tutti = function(mode){
		$scope.searchParametersLength = 0;
		if ($scope.searchParameters)
			$scope.searchParametersLength = Object.keys($scope.searchParameters).length;
		switch(mode) {
		  case 'categorie':
			if($scope.ammins_selected.length !== 0 || $scope.servizi_selected.length !== 0 || $scope.novita_selected.length !== 0 || $scope.docs_selected.length !== 0 || $scope.searchParametersLength !== 0 || $scope.searchParameters !== undefined)
				return ""
			else 
				return "active";
			break;
		  default:
			if($scope.ammins_selected.length !== 0 || $scope.servizi_selected.length !== 0 || $scope.novita_selected.length !== 0 || $scope.docs_selected.length !== 0 || $scope.args_selected.length !== 0 || $scope.active_chk != null || $scope.data_inizio != null || $scope.data_fine != null || $scope.searchParametersLength !== 0)
				return ""
			else 
				return "active";
			break;
		}
	}

	$scope.class_categorie = function(selected, checked){
		if(selected.length !== 0 &&	selected.length !== checked.length)
			return "active"
		else if(selected.length === checked.length)
			return "active";
		else
			return "";
	}

	$scope.unchk = function(item, list) {
		var idx = list.indexOf(item);
		if (idx > -1) {
			list.splice(idx, 1);
		}
	}

	$scope.clean_date = function() {
		$scope.data_inizio = null;
		$scope.data_fine = null;
	}
	
	$scope.setActive = function(tab) {
		switch(tab) {
			case 'argomenti':
				$scope.categoriaTab = "";
				$scope.argomentoTab = "active";
				$scope.opzioniTab = "";
				break;
			case 'opzioni':
				$scope.categoriaTab = "";
				$scope.argomentoTab = "";
				$scope.opzioniTab = "active";
				break;
			default:
				$scope.categoriaTab = "active";
				$scope.argomentoTab = "";
				$scope.opzioniTab = "";
		}
	}
	
	$scope.setArgsSelected = function(argomenti) {
		if(argomenti != "")
			$scope.args_selected = argomenti.split(",");
	}
	
	$scope.setCatSelected = function(type, categorie) {
		if(categorie != "") {
			switch(type) {
				case 'amministrazione':
					$scope.ammins_selected = categorie.split(",");
				break;
				case 'servizi':
					$scope.servizi_selected = categorie.split(",");
				break;
				case 'novita':
					$scope.novita_selected = categorie.split(",");
				break;
				case 'documenti':
					$scope.docs_selected = categorie.split(",");
				break;
				default:
			}
		}
	}

	$scope.selectedRicercaTxtItemChanged = function(item) {
		if (item !== undefined && item.contentName !== undefined) {
			cercatxt = item.contentName;
		}
		// Clear fields
		if (item === undefined) {
			cercatxt = "";
		}
	}
	
	$scope.listLengthWithoutElem = function(list, elem1, elem2) {
		var listLength = list.length;
		if (list.indexOf(elem1) != -1)
			listLength --;
		if (list.indexOf(elem2) != -1)
			listLength --;
		return listLength;
	}
	
	$scope.scrollTo = function(elemId){
		angular.element('html, body').animate({
		   scrollTop: $('#'+elemId).offset().top
		}, 800)
	}
}]);

app.filter('startFrom', function() {
	return function(input, start) {
		start = +start; //parse to int
		return input.slice(start);
	}
});
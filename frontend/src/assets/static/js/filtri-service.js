app.factory('FiltriService', ['$http', '$q', 'GeneralService', function($http, $q, GeneralService){
	var REST_SERVICE_JACMS = GeneralService.getBaseURL() + "/legacyapi/rs/it/jacms";
	var REST_SERVICE_ADVCONTENTSEARCH = GeneralService.getBaseURL() + "/api/plugins/advcontentsearch";
	
	var factory = {
		getContents : getContents,
		getMultiContents : getMultiContents,
		getContent : getContent
	};
	return factory;
	function getContents(contentType, categoryCode, filters, ftext){
		var category = "";
		var filter = "";
		var fulltext = "";
		if (categoryCode != undefined && categoryCode !=''){
			var categorie = categoryCode.split(',');
			if(categorie.length > 1 && categorie[1] != '' && categorie.indexOf('evd') == -1 )
				category = "&categories=" + categoryCode + "&orClauseCategoryFilter=true";
			else
				category = "&categories=" + categoryCode;			
		}
		if (filters != "" && filters != undefined)
			filter = "&filters=" + filters.replace(/\+/g, "%2B");
		if (ftext != "" && ftext != undefined)
			fulltext = "&fulltext=" + ftext
		var deferred = $q.defer();
		var headers = "";
		if (this.userToken) {
			$http({
				method: 'GET',
				url: REST_SERVICE_JACMS+"/contentsExtended.json?contentType=" + contentType + category + filter + fulltext,
				headers: {Authorization: 'Bearer ' + this.userToken}
			}).then(
				function (response) {
					deferred.resolve(response.data.response.result.items.item);
				},
				function (errResponse) {
					console.error(errResponse);
					deferred.reject(errResponse);
				}
			);
			return deferred.promise;
		} else {
			$http({
				method: 'GET',
				url: REST_SERVICE_JACMS+"/contentsExtended.json?contentType=" + contentType + category + filter + fulltext
			}).then(
				function (response) {
					deferred.resolve(response.data.response.result.items.item);
				},
				function (errResponse) {
					console.error(errResponse);
					deferred.reject(errResponse);
				}
			);
			return deferred.promise;
		}
	};
	
	function getMultiContents(pageSize,contentTypes, categoryCode, orCategory, filters, tipologia, fulltext, page){
		var text, tipiContenuto, csvCategories, sottosezione, ordinamento;
		text = tipiContenuto = csvCategories = sottosezione = ordinamento = "";
		var indexFilter = 0;
		
		if (contentTypes){
			tipiContenuto = "&filters["+ indexFilter +"].attribute=typeCode&filters["+ indexFilter +"].operator=eq&filters["+ indexFilter +"].allowedValues=" + contentTypes;
			indexFilter ++;
		} else
			tipiContenuto = "";

		if (filters != undefined && filters != ''){
			var filtri = [];
			var filtro = [];
			filtri = filters.split('+');
			for (var i in filtri) {
				filtro = filtri[i].substring(1, filtri[i].length-1).split(';');
				for (var j in filtro){
					if (filtro[j].indexOf('key') != -1)
						ordinamento += '&filters['+ indexFilter +'].entityAttr=' + filtro[j].substring(filtro[j].lastIndexOf('=') + 1);
					if (filtro[j].indexOf('order') != -1)
						ordinamento += '&filters['+ indexFilter +'].order=' + filtro[j].substring(filtro[j].lastIndexOf('=') + 1);
					if (filtro[j].indexOf("operator") != -1)
						ordinamento += '&filters['+ indexFilter +'].operator=' + filtro[j].substring(filtro[j].lastIndexOf('=') + 1);
					if (filtro[j].indexOf("type") != -1)
						ordinamento += '&filters['+ indexFilter +'].type=' + filtro[j].substring(filtro[j].lastIndexOf('=') + 1);
					if (filtro[j].indexOf("value") != -1)
						ordinamento += '&filters['+ indexFilter +'].value=' + filtro[j].substring(filtro[j].lastIndexOf('=') + 1);
				}
				indexFilter ++;
			}
		}
		if (tipologia != '') {
			var indexAllowedValues = 0;
			sottosezione = "&filters["+ indexFilter +"].entityAttr=jpattributeextended:sottosezione&filters["+ indexFilter +"].value="+ tipologia;
			indexFilter ++;
		}
		if (categoryCode != undefined && categoryCode.toString() != ''){
			var indexCategories = 0;
			if (orCategory)
				csvCategories = "&csvCategories[0]=" + categoryCode;
			else {
				var categorie = [];
				categorie = categoryCode.split(',');
				for (var i in categorie) {
					if (categorie[i] != '') {
						csvCategories += "&csvCategories["+ indexCategories +"]=" + categorie[i];
						indexCategories ++;
					}
				}
			}
		}
		else
			csvCategories = "";	
		if (fulltext)
			text = "&text=" + fulltext;
		var deferred = $q.defer();
		var headers = "";
		if (this.userToken) {
			$http({
				method: 'GET',
				url: encodeURI(REST_SERVICE_ADVCONTENTSEARCH+"/contents.json?pageSize="+ pageSize + page + tipiContenuto + text + csvCategories + ordinamento + sottosezione),
				headers: {Authorization: 'Bearer ' + this.userToken}
			}).then(
				function (response) {
					deferred.resolve(response.data);
				},
				function (errResponse) {
					console.error(errResponse);
					deferred.reject(errResponse);
				}
			);
			return deferred.promise;
		} else {
			$http({
				method: 'GET',
				url: encodeURI(REST_SERVICE_ADVCONTENTSEARCH+"/contents.json?pageSize="+ pageSize + page + tipiContenuto + text + csvCategories + ordinamento + sottosezione)
			}).then(
				function (response) {
					deferred.resolve(response.data);
				},
				function (errResponse) {
					console.error(errResponse);
					deferred.reject(errResponse);
				}
			);
			return deferred.promise;
		}
	};
	
	function getContent(contentId, modelId){
		var deferred = $q.defer();
		var headers = "";
		if (this.userToken){
			$http({
				method: 'GET',
				url: REST_SERVICE_JACMS+"/content.json?id=" + contentId + "&modelId=" + modelId,
				headers: {Authorization: 'Bearer ' + this.userToken}
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
		} else {
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
}]);
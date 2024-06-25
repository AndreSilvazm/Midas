function getParameterByName(name, url) {if (!url) url = window.location.href;url = url.toLowerCase(); name = name.replace(/[\[\]]/g, "\\$&");var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),results = regex.exec(url);if (!results) return null;if (!results[2]) return '';return decodeURIComponent(results[2].replace(/\+/g, " "));}

app.controller('FavoritosController', function($rootScope, $scope, $http, $location) {
    $rootScope.varMostraFavorito = false;
    $rootScope.cleanFavoritos   = function () { localStorage.removeItem('favoritos'); $rootScope.favoritos = $rootScope.getFavoritos(); };
    $rootScope.getFavoritos     = function () {
        return (localStorage.favoritos != undefined && localStorage.favoritos != "") ? JSON.parse(localStorage.favoritos) : [];
    };
$rootScope.mostraFavorito = function () {$rootScope.varMostraFavorito = $rootScope.favoritos.hasOwnProperty('imoveis') && $rootScope.isMaiorQue($rootScope.favoritos.imoveis, 0);var x = $("[data-mostra-favorito]");if($rootScope.varMostraFavorito){ $('#btn-favoritos-container').show();x.removeClass('ng-hide'); } else { x.addClass('ng-hide'); }};

    $rootScope.addFavoritos     = function (codigoImovel) {var _favoritos = $rootScope.getFavoritos();var _cadastrar = true;if(!_favoritos.hasOwnProperty('imoveis')) _favoritos = {imoveis: {}, idioma: {}};
       // console.log(codigoImovel + '|' + _favoritos.imoveis.hasOwnProperty(codigoImovel));       

        if(!_favoritos.imoveis.hasOwnProperty(codigoImovel)){
            var data = { codigo: codigoImovel };
            $http.post( '/favoritos', data).then( function (response) {
                var data = response.data;
                var imovel = data.imovel;
                var idioma = $("html").attr('lang');
                if(data != false){
                    var codigoImovel = imovel.codigo;
                    _favoritos.imoveis[codigoImovel] = imovel;
                    _favoritos.idioma = idioma;
                    localStorage.favoritos = JSON.stringify(_favoritos);
                    $rootScope.favoritos = $rootScope.getFavoritos();                    
                }                
            }, function (err) { console.log(err); });
        } else {
            _cadastrar = false;
            delete _favoritos.imoveis[codigoImovel];
            localStorage.favoritos = JSON.stringify(_favoritos);
            $rootScope.favoritos = $rootScope.getFavoritos();
        }

        /// Exibir icone de favoritos no mobile        
        if( _cadastrar && _isMobile ) {
            console.log(_isMobile);
            $('#btn-favoritos-container').show();
            $('#btn-fav-' + codigoImovel).effect("transfer",{ to: '#btn-favoritos' }, 1000, function() {
                console.log( $("#btn-favoritos-container").position().left + "px" );
                $('#txt-favoritos')
                    .css( "left", $("#btn-favoritos-container").position().left + "px")
                    .show()
                    .animate({"margin-left": "-90px"}, 'fast')
                    .delay(3000)
                    .animate({"margin-left": "0px"}, 'fast')
                    .hide("fast");
            });
        } else {
            $('#btn-favoritos').effect("transfer",{ to: '#btn-fav-' + codigoImovel }, 1000, function() {
                $('#txt-favoritos').css('left', '0px').hide();
            });
            if( !($rootScope.favoritos.hasOwnProperty('imoveis') && $rootScope.isMaiorQue($rootScope.favoritos.imoveis, 0)) ) {
                $('#btn-favoritos-container').hide(1100);
            }
        }
        ///

        //var count = Object.keys($rootScope.favoritos.imoveis).length;
        //console.log('Qtd.: ' + count);
        
        //console.log($rootScope.favoritos);

        var favBtn = document.getElementById("fav-checkbox");

        if(!favBtn.checked){
            favBtn.click();
            var unclick = setTimeout(function(){
                favBtn.click();
                clearInterval(unclick);
            }, (5 * 1000) );
        }

        $rootScope.mostraFavorito();

    };

    $rootScope.alteraTraducao = function () {
        var trocouLingua = false;
        //console.log([$rootScope.favoritos.idioma, $rootScope.favoritos.idioma != null, $rootScope.favoritos.idioma != undefined]);
        if($rootScope.favoritos.idioma != null && $rootScope.favoritos.idioma != undefined) {
          //  console.log([$rootScope.favoritos.idioma, $("html").attr('lang')]);
            if($rootScope.favoritos.idioma != $("html").attr('lang')) trocouLingua = true;
        }
        var _favoritos = {imoveis: {}};
        if(trocouLingua) {
            //console.log("Lingua Trocada para: " + $("html").attr('lang'));
            var collFavoritos = $rootScope.favoritos;
            $rootScope.cleanFavoritos();
            var codigos = [];
            for(var codigoImovel in collFavoritos.imoveis)
                codigos.push(codigoImovel);

            if(codigos.length > 0){
                var data = {codigo: codigos};
                $http.post('/favoritos', data).then( function (response) {
                    var data = response.data;
                    if(data != false){
                        for(imovel in data){
                            var codigoImovel = data[imovel].imovel.codigo;
                            _favoritos.imoveis[codigoImovel] = data[imovel].imovel;
                        }
                        _favoritos.idioma = $("html").attr('lang');
                        localStorage.favoritos = JSON.stringify(_favoritos);
                        $rootScope.favoritos = $rootScope.getFavoritos();
                    }
                }), function (err) { console.log(err); }
            }

        }
    };

    $rootScope.$watch('favoritos', function(n, o) {
        $rootScope.mostraFavorito();
    });

    $rootScope.favoritos = $rootScope.getFavoritos();

    $rootScope.alteraTraducao();
});
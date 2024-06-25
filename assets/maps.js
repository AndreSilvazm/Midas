function addPlacesMarker(places,placeType,placeTypeName,map,options){for(var i=0,place;place=places[i];i++){var image={url:place.icon,size:new google.maps.Size(30,30),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(17,34),scaledSize:new google.maps.Size(20,20)};placeTitle=place.name+' ('+placeTypeName+')';var marker=new google.maps.Marker({map:map,icon:image,title:placeTitle,position:place.geometry.location});options.nearby[placeType].push(marker);}
for(var i=0;i<options.nearby[placeType].length;i++)
options.nearby[placeType][i].setMap(map);}
function GMaps_imovelInfoBasic(options){var html=null;if(options.markerType=='B'){html="O Imóvel pertence ao bairro <b>"+options.address.neighborhood+"</b>"+"<br><label class='labelMapa'>*Endereço completo não informado</label>";}else if(options.markerType=='L'){html="O Imóvel encontra-se no logradouro <b>"+options.address.shortAddress+"</b>"+"<br><label class='labelMapa'>*Endereço completo não informado</label>";}
return html;}
function GMaps_infoWindow(map,marker,options,type){var contentString=null;if(type=='imovelInfoBasic')contentString=GMaps_imovelInfoBasic(options);if(contentString==null)return false;var infowindow=new google.maps.InfoWindow({content:contentString});marker.html=contentString;marker.addListener('click',function(){infowindow.open(map,marker);});if(typeof marker.enterOpen!='undefined'&&marker.enterOpen==true){infowindow.open(map,marker);}}
function GMaps_returnIcon(options){var urlIcon=false;if(options.markerType=='B'){urlIcon="/geral/img/icon-bairro.png";}else if(options.markerType=='L'){urlIcon="/geral/img/icon-logradouro.png";}
return urlIcon;}
/*function GMaps_addMaker(map,options,index){var markerOptions={};markerOptions['position']={lat:parseFloat(options.latitude),lng:parseFloat(options.longitude)};if(typeof options.title!='undefined')markerOptions['title']=options.title;if(typeof options.animation!='undefined')markerOptions['animation']=options.animation;if(typeof options.draggable!='undefined')markerOptions['draggable']=options.draggable;if(typeof options.enterOpen!='undefined')markerOptions['enterOpen']=options.enterOpen;if((typeof options.markerType!='undefined')&&(options.markerType=='B'||options.markerType=='L'))markerOptions['icon']=GMaps_returnIcon(options);var marker=new google.maps.Marker(markerOptions);if(map.draggable){marker.addListener('dragend',function(event){var lat=event.latLng.lat();var lng=event.latLng.lng();var nll="("+lat+","+lng+")";document.getElementById(map.elementLatId).value=nll;});}
if(typeof options.showImovelInfo!='undefined'&&options.showImovelInfo==true)GMaps_infoWindow(map,marker,options,'imovelInfoBasic');marker.setMap(map);}*/
/*function GMaps_API(options,mapElement){var myLatLng={lat:parseFloat(options.center.latitude),lng:parseFloat(options.center.longitude)};var mapOptions={};options.nearby=[];mapOptions['scrollwheel']=typeof options.scrollwheel!='undefined'?options.scrollwheel:true;mapOptions['zoom']=typeof options.zoom!='undefined'?options.zoom:13;mapOptions['center']=typeof myLatLng!='undefined'?myLatLng:{};mapOptions['mapTypeId']=typeof options.mapTypeId!='undefined'?eval(options.mapTypeId):eval("google.maps.MapTypeId.ROADMAP");mapOptions['draggable']=typeof options.draggable!='undefined'?options.draggable:true;mapOptions['elementLatId']=typeof options.elementLatId!='undefined'?options.elementLatId:'';var map=new google.maps.Map(mapElement,mapOptions);map.addListener('click',function(){map.set('scrollwheel',!map.get('scrollwheel'));map.set('draggable',!map.get('draggable'));});if(typeof options.placeService!='undefined'&&options.placeService==true){$("#placeService input").on('click',function(){var checked=$(this).is(':checked');var placeType=$(this).val();var placeTypeName=$(this).data('place-type-name');if(checked){if(typeof options.nearby[placeType]=='undefined')options.nearby[placeType]=[];if(options.nearby[placeType].length==0){var request={location:new google.maps.LatLng(parseFloat(options.center.latitude),parseFloat(options.center.longitude)),radius:'100',query:placeType};var service=new google.maps.places.PlacesService(map);service.textSearch(request,function(results,status){if(status==google.maps.places.PlacesServiceStatus.OK)
addPlacesMarker(results,placeType,placeTypeName,map,options);});}}else{if(typeof options.nearby[placeType]!='undefined'){for(var i=0;i<options.nearby[placeType].length;i++){options.nearby[placeType][i].setMap(null);}
delete options.nearby[placeType];}}});}
for(var i in options.markers){options.markers[i]['draggable']=mapOptions['draggable'];GMaps_addMaker(map,options.markers[i],i);}}*/
function GMaps_Iframe(options,mapElement){mapElement.insertAdjacentHTML('beforeend','<iframe src="https://www.google.com/maps/embed/v1/place?q='+options.markers[0].address.fullAddressURL+'&key='+options.mapsKey+'" width="100%" height="320" frameborder="0" style="border:0" allowfullscreen></iframe>');}
function GMaps(options){options=JSON.parse(options);var hasLatLng=(typeof options.center!='undefined'&&(typeof options.center.latitude!='undefined'&&options.center.latitude!=null)&&(typeof options.center.longitude!='undefined'&&options.center.longitude!=null))?true:false;var mapElement=document.getElementById(options.elementId);if($(mapElement).hasClass('mapa-oculto')){$(mapElement).on('click',function(){$(mapElement).removeClass('mapa-oculto');$(mapElement).unbind('click');if(typeof options.iframe=='undefined'||hasLatLng==true){GMaps_API(options,mapElement);}else{GMaps_Iframe(options,mapElement);}});}else{if(typeof options.iframe=='undefined'||hasLatLng==true){GMaps_API(options,mapElement);}else{GMaps_Iframe(options,mapElement);}}}
/*function updateImovelMapaOptions(nLatLng)
{var nLatLng=nLatLng.replace('(','').replace(')','').split(',');var jsonEncode=JSON.parse(imovel_mapa_options);var lat=nLatLng[0];var lng=nLatLng[1];jsonEncode['center']['latitude']=lat;jsonEncode['center']['longitude']=lng;jsonEncode['markers'][0]['latitude']=lat;jsonEncode['markers'][0]['longitude']=lng;GMaps(JSON.stringify(jsonEncode));}*/
//if(typeof imovel_mapa_options!="undefined"){GMaps(imovel_mapa_options);}
//if(typeof imovel_mapa_options_aba!="undefined"){GMaps(imovel_mapa_options_aba);}
//if(typeof empreendimento_mapa_options!="undefined"){GMaps(empreendimento_mapa_options);}
window.elementor = document.querySelector("#usaLatitudeLongitudeMapa");
function GMaps_addMaker(map, options, index){
    var markerOptions = {};

    markerOptions['position'] = {
        lat: parseFloat(options.latitude),
        lng: parseFloat(options.longitude)
    };

    if (typeof options.title != 'undefined')         markerOptions['title']      = options.title;
    if (typeof options.animation != 'undefined')     markerOptions['animation']  = options.animation;
    if (typeof options.draggable != 'undefined')     markerOptions['draggable']  = options.draggable;
    if (typeof options.enterOpen != 'undefined')     markerOptions['enterOpen']  = options.enterOpen;

    if( (typeof options.markerType != 'undefined') && (options.markerType == 'B' || options.markerType == 'L') ) markerOptions['icon']       = GMaps_returnIcon(options);


    var marker = new google.maps.Marker(markerOptions);

    if(map.draggable) {
        marker.addListener('dragend', function(event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            var nll = "(" + lat + "," + lng + ")";
            document.getElementById(map.elementLatId).value = nll;
        });
    }

    if(typeof options.showImovelInfo != 'undefined' && options.showImovelInfo == true) GMaps_infoWindow(map, marker, options, 'imovelInfoBasic');

    marker.setMap(map);
}
function GMaps_API(options, mapElement){
    var myLatLng = {lat: parseFloat(options.center.latitude), lng: parseFloat(options.center.longitude)};

    var mapOptions = {};

    options.nearby = [];

    mapOptions['scrollwheel']   = typeof options.scrollwheel    != 'undefined'     ? options.scrollwheel       : true;
    mapOptions['zoom']          = typeof options.zoom           != 'undefined'     ? options.zoom              : 13;
    mapOptions['center']        = typeof myLatLng               != 'undefined'     ? myLatLng                  : {};
    mapOptions['mapTypeId']     = typeof options.mapTypeId      != 'undefined'     ? eval(options.mapTypeId)   : eval("google.maps.MapTypeId.ROADMAP");
    mapOptions['draggable']     = typeof options.draggable      != 'undefined'     ? options.draggable         : true;
    mapOptions['elementLatId']     = typeof options.elementLatId      != 'undefined'     ? options.elementLatId         : '';

    var map = new google.maps.Map(mapElement, mapOptions);

    map.addListener('click', function() {
        map.set('scrollwheel', !map.get('scrollwheel'));
        map.set('draggable',   !map.get('draggable'));
    });

    if(typeof options.placeService != 'undefined' && options.placeService == true){
        $("#placeService input").on('click', function() {
            var checked     = $(this).is(':checked');
            var placeType   = $(this).val();
            var placeTypeName   = $(this).data('place-type-name');
            if(checked) {
                if(typeof options.nearby[placeType] == 'undefined') options.nearby[placeType] = [];
                if(options.nearby[placeType].length == 0){
                    var request = {location: new google.maps.LatLng(parseFloat(options.center.latitude), parseFloat(options.center.longitude)), radius: '100', query: placeType};
                    var service = new google.maps.places.PlacesService(map);
                    service.textSearch(request, function(results, status){
                        if (status == google.maps.places.PlacesServiceStatus.OK)
                            addPlacesMarker(results, placeType, placeTypeName, map, options);
                    });
                }

            } else {
                if(typeof options.nearby[placeType] != 'undefined'){
                    for(var i = 0; i < options.nearby[placeType].length; i++){
                        options.nearby[placeType][i].setMap(null);
                    }
                    delete options.nearby[placeType];
                }
            }

        });
    }

    if(typeof options.markers !='undefined'){
        GMaps_addMaker(map,  options.markers[0], 0);

        // for (var i in options.markers) {
        //     console.log(options.markers);
        //   options.markers[i]['draggable'] = mapOptions['draggable'];
        //     GMaps_addMaker(map,  options.markers[i], i);
        // }
    }
    if (typeof markers !='undefined'){
        var auxMarkers = [];
        for (var i = 0; i < markers.length; i++) {
            auxMarkers['latitude']=  markers[i][0];
            auxMarkers['longitude']=  markers[i][1];
            GMaps_addMaker(map,  auxMarkers, i);

        }
    }

}

var Dmarket;
function LMaps_addMaker(options,mymap) {
    var obj = JSON.parse(options);
    console.log("mapas");
    console.log([obj, mymap]);

    var iconUrl = GMaps_returnIcon(obj.markers[0]);
    //se não tiver incone setado, irá criar o marcador com o ícone default
    if(iconUrl===false){
        var marker = L.marker([obj.markers[0].latitude, obj.markers[0].longitude],{title: obj.markers[0].title, draggable:obj.draggable}).addTo(mymap).on('mouseout', function(e) {
            if (elementor)
                elementor.value="S";
        }).on('mouseup', function (e){
            var latitudeLongitude = "("+e.latlng.lat+","+e.latlng.lng+")";
            if($("#latitudeLongitude").val()!=latitudeLongitude){
                if($("#latitudeLongitude").length){
                    var latlng = $("#latitudeLongitude");
                }else if($("#latLng").length){
                    var latlng = $("#latLng");
                }
                if(latlng) {
                    var confirm = () => {
                        latlng.val(latitudeLongitude);
                    };
                    var cancelar = () => {
                        ltnLgt = latlng.val().split(',');
                        latitude = ltnLgt[0].replace('(', '').trim();
                        longitude = ltnLgt[1].replace(')', '').trim();
                        marker.setLatLng(new L.LatLng(latitude, longitude));
                        try {
                            mymap.setView([latitude, longitude], 16);
                        }catch (e) {}
                    }
                    exibeModalConfirm("Atenção", "Você ajustou a posição do imóvel no mapa. Clique no botão salvar para manter essa alteração.", "warning", confirm, cancelar)
                }
            }
        });
        Dmarket=marker;
    }
    else{
        var myIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: [97, 95],
        });
        var marker = L.marker([obj.markers[0].latitude, obj.markers[0].longitude],{title: obj.markers[0].title, icon: myIcon, draggable:obj.draggable}).addTo(mymap);
        marker.bindPopup(GMaps_imovelInfoBasic(obj.markers[0])).openPopup();
        Dmarket=marker;
    }

    
   /* var markerOptions = {};
    markerOptions['position'] = {
        lat: parseFloat(options.latitude),
        lng: parseFloat(options.longitude)
    };
    if (typeof options.title != 'undefined')         markerOptions['title']      = options.title;
    if (typeof options.animation != 'undefined')     markerOptions['animation']  = options.animation;
    if (typeof options.draggable != 'undefined')     markerOptions['draggable']  = options.draggable;
    if (typeof options.enterOpen != 'undefined')     markerOptions['enterOpen']  = options.enterOpen;

    if( (typeof options.markerType != 'undefined') && (options.markerType == 'B' || options.markerType == 'L') ) markerOptions['icon']       = GMaps_returnIcon(options);*/

}
function updateImovelMapaOptions(nLatLng)
{
    var nLatLng = nLatLng.replace('(','').replace(')','').split(',');
    var jsonEncode = JSON.parse(imovel_mapa_options);
    var lat = nLatLng[0];
    var lng = nLatLng[1];
    jsonEncode['center']['latitude']    = lat;
    jsonEncode['center']['longitude']   = lng;
    jsonEncode['markers'][0]['latitude']=lat;
    jsonEncode['markers'][0]['longitude'] = lng;
    if(tipoMapa=='Google') GMaps(JSON.stringify(jsonEncode));
    if(tipoMapa=='Leaflet') LMaps(JSON.stringify(jsonEncode));
}

var mymap = [];
var mylatln;
var tentativas = 0;

function LMaps(options,index,repete=true) {
    try {
    var obj = JSON.parse(options);
    var pos=0;
    if(obj.removeBefore === true ){ //parametro removebefore
        mymap.forEach(function(item,index){
            if (item._container.id  == obj.elementId) {
                item.remove();
                pos=index;
            }
        });
    }
    if(index===undefined) index=pos;
    if(repete){
        mymap[index] = L.map(obj.elementId).setView([obj.center['latitude'], obj.center['longitude']], obj.zoom);
    } else{
        if(!mymap[index]) {
            mymap[index] = L.map(obj.elementId).setView([obj.center['latitude'], obj.center['longitude']], obj.zoom);
        }
    }   
    
    try {
        // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibG9pbmZvaWRlaWFzIiwiYSI6ImNqeWlvYWpvaTBjZ20zbG8zd2l1NWtvYTQifQ.6UWWHlNIkrsLMF6rSEIjYA', {
        //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        //     maxZoom: 18,
        //     id: 'mapbox.streets'
        // }).addTo(mymap[index]);
    } catch (error) {
        
    }
    L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'

    }).addTo(mymap[index]);
    //console.log(obj.markers.length);

    // for ( var i=0; i < obj.markers.length; ++i ) {
    //     console.log('cheguei aqui');
    //     LMaps_addMaker(options);
    // }
    //testa se os marcadores vem/nãovem da página de mapa/mapa-1/widget
    if (typeof obj.markers != "undefined"){
        LMaps_addMaker(options,mymap[index]);
    }
    else{
        for (var i = 0; i < markers.length; i++) {
            var a = markers[i];
            var marker = L.marker(new L.LatLng(a[0], a[1]), {
                title: ''
            });
        }
        if(!mymap[index])
            mymap[index] = L.map(obj.elementId).setView([obj.center['latitude'], obj.center['longitude']], obj.zoom);
        
        /* try {
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibG9pbmZvaWRlaWFzIiwiYSI6ImNqeWlvYWpvaTBjZ20zbG8zd2l1NWtvYTQifQ.6UWWHlNIkrsLMF6rSEIjYA', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets'
        }).addTo(mymap[index]);
        } catch (error) {
            console.log('Deu Zebra 2')
        } */
        
        L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'

        }).addTo(mymap[index]);
        //console.log(obj.markers.length);

        // for ( var i=0; i < obj.markers.length; ++i ) {
        //     console.log('cheguei aqui');
        //     LMaps_addMaker(options);
        // }
        //testa se os marcadores vem/nãovem da página de mapa/mapa-1/widget
        if (typeof obj.markers != "undefined"){
            LMaps_addMaker(options,mymap[index]);
        }
        else{
            desenharMarkers(mymap[index]);
            
        }
    }
    }catch(error) {
        console.log(error.message)
        if (error.message === 'Map container is already initialized.' && tentativas === 0) {
            tentativas++
            mymap[index].off();
            mymap[index].remove();
            LMaps(options,index);
            tentativas = 0;
        }
    }

}
//  if(typeof imovel_mapa_options_aba!="undefined"){
//     if(tipoMapa=='Google') GMaps(imovel_mapa_options);
//     if(tipoMapa=='Leaflet') LMaps(imovel_mapa_options);
// }
// if(typeof empreendimento_mapa_options!="undefined"){
//     if(tipoMapa=='Google') GMaps(empreendimento_mapa_options);
//     if(tipoMapa=='Leaflet') LMaps(empreendimento_mapa_options);
// },

$(document).ready(function(){
    try {
        desenharMapas();
    } catch(error) {
        console.log('[Maps] error: ',error.message)
    }
});

function desenharMarkers(map){
    for (var i = 0; i < markers.length; i++) {
        var a = markers[i];
        if (map._container.id == "mapa-pontos-interesse" && a[2]){
            if((a[2].match(/imovel.svg/g) || []).length>0) {
                var iconCategoria = L.icon({
                    iconUrl: a[2],
                    iconSize: [40, 40], // size of the icon
                    popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
                });
            }else{
                var iconCategoria = L.icon({
                    iconUrl: a[2],
                    iconSize: [25, 25], // size of the icon
                    popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
                });
            }
            if(a[3]){
                var marker = L.marker(new L.LatLng(a[0], a[1]), {
                    iconDefault: a[2], icon: iconCategoria, id: i}).bindPopup(a[3]);
                marker = adicionarEfeitoHoverPopup(marker);
            }else{
                var marker = L.marker(new L.LatLng(a[0], a[1]), {
                    title: '', icon: iconCategoria});
            }
        }else{
            var marker = L.marker(new L.LatLng(a[0], a[1]));
            if(a[2].title){
                marker.bindPopup(a[2].title);
                marker = adicionarEfeitoHoverPopup(marker);
            }
        }
        map.addLayer(marker);
    }
}
function adicionarEfeitoHoverPopup(marker){
    marker.on('mouseover', function (e) {
        this.openPopup();
    });
    marker.on('mouseout', function (e) {
        this.closePopup();
    });
    return marker;
}

function filial_getMaps(){
    if(document.querySelector("#filial") != null){
        setInterval(function(){
            var jsonEncode = JSON.parse(imovel_mapa_options);
            if(Dmarket.getLatLng().lat != jsonEncode['markers'][0]['longitude'] && Dmarket.getLatLng().lng !=jsonEncode['markers'][0]['longitude']){
                var mylatln = {lat: Dmarket.getLatLng().lat, lng: Dmarket.getLatLng().lng}
            }else{
                var mylatln = {lat: mymap[0].getCenter().lat, lng: mymap[0].getCenter().lng}
            }
            //document.querySelector("#latLng").value="("+mylatln.lat+","+mylatln.lng+")";
        }, 3000);
    }
}
filial_getMaps();

function desenharMapas(){
    try {
        if (typeof mapas != "undefined") {
            //console.log(mapas)
            // mapas.shift();
            mapas.forEach(function (item, index) {
                //console.log([item, index]);
                if (tipoMapa == 'Google') GMaps(item);
                if (tipoMapa == 'Leaflet') LMaps(item, index);
            });

        }
    }catch (e) {
        console.log('[desenharMapas] error:', e.message)
    }
}

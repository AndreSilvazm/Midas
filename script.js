let _mapa = null;
function _callBackImgErrorFallback() {
    this.removeEventListener('error', _callBackImgErrorFallback);
    var s = this.getAttribute('fallback-src');
    if ((typeof s === 'string') && (s.indexOf('{a:') < 0)) this.setAttribute('src', s);
}

function execCall(el, falback, retry) {
    el.removeEventListener('error', _callBackImgErrorFallback2);
    const fallbackSrc = el.getAttribute(falback);

    if (!fallbackSrc) {
        return execCall(el, 'fallback-src', false)
    }

    const isValidFallbackSrc = (typeof fallbackSrc === 'string') && (fallbackSrc.indexOf('{a:') < 0);

    if (isValidFallbackSrc) {
        const newImage = document.createElement('img');

        newImage.addEventListener('load', () => {
            el.setAttribute('src', fallbackSrc);
        });

        newImage.addEventListener('error', () => {
            if (retry) {
                return execCall(el, 'fallback-src', false)
            }
            el.setAttribute('src', 'logoTopo.png');
        });

        newImage.src = fallbackSrc;
    }
}

function _callBackImgErrorFallback2(el) {
    execCall(el, 'data-imagem-src', true)
}

const _LoadJS = {
    jsToLoad: [],
    push: function (obj) {
        this.jsToLoad.push(obj);
    },
    onLoadJS: function () {
        if (this.jsToLoad.length == 0) return false;
        var x = document.getElementsByTagName('head')[0];
        while (this.jsToLoad.length > 0) {
            atributos = this.jsToLoad.pop();
            var s = document.createElement('script');
            for (atr in atributos) {
                if (atr == 'text') {
                    s.text = atributos[atr]; continue;
                }
                s.setAttribute(atr, atributos[atr] ? atributos[atr] : null);
            }
            x.appendChild(s);
        }
        return true;
    },
    ajustarImgSrc: function () {
        if (typeof angular !== "undefined") return true;
        document.querySelectorAll('img[ng-src]').forEach(function (e, k, a) {
            var s = e.getAttribute('ng-src');
            if ((typeof s === 'string') && (s.indexOf('{a:') < 0)) e.setAttribute('src', s);
        });
        document.querySelectorAll('img[fallback-src]').forEach(function (e, k, a) {
            e.addEventListener('error', _callBackImgErrorFallback);
        });
    },
    simularWindowEvento: function (event) {
        if (typeof event === 'string') {
            window.dispatchEvent(new Event(event));
            return;
        }
        window.dispatchEvent(event);
    },
    simularDocumentEvento: function (event) {
        if (typeof event === 'string') {
            document.dispatchEvent(new Event(event));
            return;
        }
        document.dispatchEvent(event);
    },
    lazyLoad: function () {
        params = document.location.search;
        if (params == '') {
            params = '?';
        } else {
            params = params + '&';
        }
        $.get('/' + params + 'lazyload=lazy', function (data, status) {
            if (status == 'success') {
                try {
                    if (typeof angular !== "undefined") {
                        data = angular.element($('#conteudo-lazy')).scope().compileHtml(data);
                    }
                    $(data).insertBefore($('#conteudo-lazy'));
                    $('#conteudo-lazy').remove();
                    _LoadJS.lazyLoadProcessar();
                } catch (error) {
                    _LoadJS.lazyLoadProcessar();
                }
            }
        });
    },
    lazyLoadProcessar: function () {
        setTimeout(() => {
            _LoadJS.simularWindowEvento('load');
            _LoadJS.ajustarImgSrc();
            finishLoadImageLinks();
            const loadBusca = document.querySelector('#my-load-busca-principal'); if (loadBusca) loadBusca.remove();
            $('.carousel-noticia').flickity({ fullscreen: false, lazyLoad: 1, pageDots: false });
            /// Informa Lazy
            let evt = new CustomEvent('IIPageFullyLoadedLazy', {
                status: 'loaded'
            });
            _LoadJS.simularWindowEvento(evt);
            _LoadJS.simularDocumentEvento(evt);
        }, 300);
    }
};

function _loadBusca() { setTimeout(() => { const loadBusca = document.querySelector('#my-load-busca-principal'); if (loadBusca) loadBusca.remove() }, 2700); }
_loadBusca();
function finishLoadImage() { try { var loadImage = document.querySelectorAll('#my-load-image'); if (loadImage.length == 0) return false; loadImage.forEach(element => element.remove()); var visible = document.querySelectorAll('#destaques-scripts'); visible.forEach(element => element.style.visibility = 'visible'); document.querySelector('#loading-all').remove(); _loadBusca(); } catch (err) { } } function finishLoadImageLinks() { try { var loadImage = document.querySelectorAll('#my-load-image-links'); if (loadImage.length == 0) return false; loadImage.forEach(element => element.remove()); var visible = document.querySelectorAll('.item-links,.links-scripts'); visible.forEach(element => element.style.visibility = 'visible'); document.querySelector('#loading-all').remove(); } catch (err) { } } function finishLoadImageMosaico() { try { var loadImage = document.querySelectorAll('#my-load-image-mosaico'); if (loadImage.length == 0) return false; loadImage.forEach(element => element.remove()); var visible = document.querySelectorAll('#mosaico-scripts'); visible.forEach(element => element.style.visibility = 'visible'); document.querySelector('#loading-all').remove(); } catch (err) { } }
setTimeout(finishLoadImageLinks, 6000);
_loadBusca();

var tipoMapa = 'Leaflet';

var mapas = [];
'use strict';

; (function (global) {
    /**
    * Gestion de la navegacion SPA
    */
    function Navigator() {
        var ANIMATION_TIME = 1500,
            PATH_HOMEPAGE = '/Slides/_presentation.html',
            ID_HOMEPAGE = 'presentation',
            ID_CONTAINER = 'l-container',
            ROUTE_REGEX = /\/.*\/.*\/(.*?)\.html/,
            SEPARATOR = '#';

        var navigator = {},
            opts = arguments[0] || {},
            pageObj = {},
            container = document.getElementById(ID_CONTAINER);

        /**
        * Redirige a la home
        */
        navigator.toHome = function (push) {
            this.to(PATH_HOMEPAGE, push);
        }

        /**
        * Navega a la siguiente slide
        */
        navigator.next = function () {
            var path = opts.page.getAttribute('data-href');
            this.to(path);
        }

        /**
        * Navega a una determinada slide
        */
        navigator.to = function (path, push) {
            _getFileContent(path, function (output) {
                var custom = document.createElement('custom');
                custom.innerHTML = output;
                container.innerHTML = output;
                container.scrollTop = 0;

                _updateActualPage(path, push);
            });
        }

        /**
        * Redirige a una determinada url
        */
        navigator.redirect = function (url) {
            if (url.indexOf(SEPARATOR) === -1) {
                global.Menu.fullSize();
                navigator.toHome(false);
            } else {
                var route = url.split(SEPARATOR)[1],
                    path = document.querySelector('.menu [data-href*="' + route + '"]').getAttribute('data-href');

                global.Menu.collapse();
                navigator.to(path, false);
            }
        }

        /**
        * Comprueba si esta en la Home
        */
        navigator.isHome = function () {
            return opts.page !== null && opts.page.id === ID_HOMEPAGE;
        }

        /**
        * Carga el contenido de la Slide
        */
        function _getFileContent(fileName, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && this.status == 200) {
                    callback(this.responseText);
                }
            }
            xhr.open('GET', fileName, true);
            xhr.send();
        }

        /**
        * Actualiza el objeto con la pagina actual
        */
        function _updateActualPage(path, push) {
            opts.page = container.firstElementChild;
            global.Menu.activeItem(path);
            _urlNavBar(path, push);
        }

        /**
        * Actualiza la url en el navegador
        */
        function _urlNavBar(path, push) {
            var title = opts.page.getAttribute('data-title'),
                route = path !== PATH_HOMEPAGE ? SEPARATOR + path.match(ROUTE_REGEX)[1] : '/';

            if (push === undefined || push) {
                window.history.pushState(pageObj, title, route);
            }
            document.title = title;
        }

        /**
        * Controles del navegador
        */
        function _onHashChange(event) {
            var url = event.newURL;

            navigator.redirect(url);
        }


        /**
        * Inicializa la pagina activa
        */
        function _init() {
            if (opts.page === undefined) {
                opts.page = document.querySelector('section.is-active');
            } else if (typeof opts.page === 'string') {
                opts.page = document.querySelector(opts.page);
            }

            window.onhashchange = _onHashChange;
        }

        _init();

        return navigator;
    }

    global.Navigator = Navigator;
})(window);
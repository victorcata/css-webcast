'use strict';

; (function (global) {
    /**
    * Gestion del menu lateral
    */
    var Menu = function () {
        var LABEL_BEGIN = 'Empezar',
            LABEL_NEXT = 'Siguiente';

        var obj = {},
            el = document.getElementById('l-menu'),
            btn = el.querySelector('#navigation');

        obj.collapse = function () {
            el.classList.add('is-collapsed');
        }

        obj.fullSize = function () {
            el.classList.remove('is-collapsed');
        }


        obj.activeItem = function (item) {
            if (typeof item == 'string') item = document.querySelector('[data-href="' + item + '"]');

            if (item === null) return;
            removePrevActive(item);

            item.parentElement.parentElement.classList.add('is-active');
            item.classList.add('is-active');
        }

        function removePrevActive(item) {
            var active = el.querySelector('.submenu .is-active');

            if (active !== null) {
                active.classList.remove('is-active');
                if (active.parentElement.parentElement !== item.parentElement.parentElement) {
                    active.parentElement.parentElement.classList.remove('is-active');
                }
            }
        }

        return obj;
    };

    global.Menu = Menu();
})(window);

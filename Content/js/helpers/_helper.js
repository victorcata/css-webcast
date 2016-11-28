'use strict';

(function (global) {
    Object.prototype.slideUp = function (duration) {
        duration = duration || 300;

        var el = this;
        if (el.style.height === '') {
            el.style.height = el.offsetHeight + 'px';
            getBoxModelProps(el);
            el.style.display = 'block';
            el.style.transition = 'all ' + duration + 'ms ease';
        }

        resetBoxModelProps(el);
        setTimeout(function () {
            el.removeAttribute('style');
        }, duration);
    }

    Object.prototype.slideDown = function (duration) {
        duration = duration || 300;

        var el = this,
            height = getHiddenElementHeight(el);

        getBoxModelProps(el);
        resetBoxModelProps(el);
        el.style.display = 'block';
        el.style.transition = 'all ' + duration + 'ms ease';
        setTimeout(function () {
            el.style.height = height + 'px';
            el.style.removeProperty('padding-top');
            el.style.removeProperty('padding-bottom');
            el.style.removeProperty('border-top');
            el.style.removeProperty('border-bottom');
            el.style.removeProperty('display');
        }, 0);
    }

    Object.prototype.toggleSlide = function (duration) {
        this.offsetParent === null ? this.slideDown(duration) : this.slideUp(duration);
    }

    /**
    * Obtiene la altura de un elemento oculto. Primero hay que mostrarlo.
    */
    function getHiddenElementHeight(el) {
        var height = 0;
        el.style.display = 'block'
        height = el.offsetHeight;
        el.style.display = 'none';

        return height;
    }

    /**
    * Pone a 0 todas las propiedades de la caja
    */
    function resetBoxModelProps(el) {
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
        el.style.borderTop = 0;
        el.style.borderBottom = 0;
    }

    /**
    * Estilos CSS de un elemento
    */
    function getBoxModelProps(el) {
        var styles = window.getComputedStyle(el);
        return {
            paddingTop: parseInt(styles.getPropertyValue('padding-top')),
            paddingBottom: parseInt(styles.getPropertyValue('padding-bottom')),
            borderTop: parseInt(styles.getPropertyValue('border-top-width')),
            borderBottom: parseInt(styles.getPropertyValue('border-bottom-width'))
        }
    }
})(window);
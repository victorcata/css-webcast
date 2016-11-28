'use strict';

; (function () {
    var navigation = new Navigator({ page: '#slide0' });
    var btnNavigate = document.getElementById('navigation'),
        navSubItems = document.querySelectorAll('.submenu > li'),
        navItems = document.querySelectorAll('.menu > li'),
        btnPrev = document.getElementById('prev'),
        btnNext = document.getElementById('next'),
        btnSlide = document.querySelectorAll('.is-slider button'),
        btnTop = document.getElementById('top');

    function navigateHome() {
        navigation.toHome();
        Menu.fullSize();
    }

    function navigate() {
        if (navigation.isHome()) Menu.collapse();
        navigation.next();
    }

    function navigateTo() {
        var path = this.getAttribute('data-href');

        if (navigation.isHome()) Menu.collapse();

        navigation.to(path);
    }

    function toggleSubmenu() {
        var sActive = document.querySelector('.submenu .is-active'),
            actual = null;

        if (sActive !== null) actual = sActive.parentElement.parentElement;

        if (this.classList.contains('is-active')) return;

        var activos = document.querySelectorAll('.menu > .is-active');
        for (var i = 0; i < activos.length; i++) {
            if (activos[i] !== actual) {
                var a = activos[i];
                if (a.querySelector('.submenu') !== null) {
                    a.querySelector('.submenu').slideUp();
                    setTimeout(function () {
                        a.classList.remove('is-active');
                    }, 300);
                }
            }
        }

        this.classList.add('is-active');
        if (this.querySelector('.submenu') !== null) {
            this.querySelector('.submenu').slideDown();
        }
    }

    var idInterval = 0;
    function prevSlide() {
        var slider = this.nextElementSibling;
        var slider = this.nextElementSibling,
            movLeft = slider.children[0].offsetWidth;

        var to = slider.scrollLeft - movLeft;
        if (to < 0) to = 0;
        if (idInterval !== 0) clearInterval(idInterval);
        idInterval = setInterval(function () {
            slider.scrollLeft -= 1;

            if (slider.scrollLeft <= to) {
                clearInterval(idInterval);
                idInterval = 0;
            }
        }, 0);
    }

    function nextSlide() {
        var slider = this.previousElementSibling,
            movLeft = slider.children[0].offsetWidth;

        if (idInterval !== 0) clearInterval(idInterval);
        var to = slider.scrollLeft + movLeft;
        idInterval = setInterval(function () {
            slider.scrollLeft += 1;

            if (slider.scrollLeft >= to) {
                clearInterval(idInterval);
                idInterval = 0;
            }
        });

    }

    function goTop() {
        var container = document.getElementById('l-container');

        function scrollTop() {
            if (container.scrollTop <= 0) return;
            setTimeout(function () {
                container.scrollTop -= 20;
                scrollTop();
            }, 0);
        }

        scrollTop();
    }

    function onScroll() {
        var btn = document.getElementById('top');
        if (this.scrollTop > 0 && btn === null) {
            var btn = document.createElement('button');
            btn.id = 'top';
            btn.onclick = goTop;
            this.appendChild(btn);
        } else if (this.scrollTop <= 50 && btn !== null) {
            btn.parentElement.removeChild(btn);
        }
    }

    function _events() {
        // Subitem
        for (var i = 0; i < navSubItems.length; i++) {
            navSubItems[i].addEventListener('click', navigateTo, false);
        }

        // Item
        for (var i = 0; i < navItems.length; i++) {
            navItems[i].addEventListener('click', toggleSubmenu, false);
        }

        document.getElementById('l-container').addEventListener('scroll', onScroll, false);
    }

    window.onload = function () {
        (window.location.href.indexOf('#') > -1) ? navigation.redirect(window.location.href) : navigation.toHome(false);
    }

    window.NavigateTo = navigateTo;
    window.NavigateHome = navigateHome;
    window.SlidePrev = prevSlide;
    window.SlideNext = nextSlide;

    _events();
})();

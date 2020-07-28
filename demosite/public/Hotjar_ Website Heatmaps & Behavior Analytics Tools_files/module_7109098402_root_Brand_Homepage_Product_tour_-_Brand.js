var module_4863336 = (function () {
    var __hs_messages = {};
    i18n_getmessage = function () {
        return hs_i18n_getMessage(__hs_messages, hsVars['language'], arguments);
    };
    i18n_getlanguage = function () {
        return hsVars['language'];
    };
    (function () {

        let $prodTour = $('.product-tour-switcher');

        function initDefer() {

            setTimeout(function () {

                var imgDefer = $prodTour[0].querySelectorAll('img[data-src-trigger]:not(.deferred-img)');
                if (imgDefer.length) {
                    for (var i = 0; i < imgDefer.length; i++) {
                        imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src-trigger'));
                        imgDefer[i].className += ' ' + 'deferred-img';
                    }
                }
            }, 800);
        }

        function initDeferMobile($parent) {

            setTimeout(function () {

                var imgDefer = $prodTour[0].querySelectorAll('img[data-src-trigger-mobile]:not(.deferred-img)');
                if (imgDefer.length) {
                    for (var i = 0; i < imgDefer.length; i++) {
                        imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src-trigger-mobile'));
                        imgDefer[i].className += ' ' + 'deferred-img';
                    }
                }
            }, 800);
        }

        function goToItem($targetSwitcher, targetItemNum) {

            $targetSwitcher.find('.product-tour-menu-item, .product-tour-switcher-images > div').removeClass('active');
            $targetSwitcher.find('[data-item="' + targetItemNum + '"]').addClass('active');
        }

        function autoScrollTour() {

            let targetItemNum = parseInt($prodTour.find('.product-tour-menu-item.active').attr('data-item')) + 1;

            if (targetItemNum > $prodTour.find('.product-tour-menu-item').length) {
                targetItemNum = 1;
            }

            goToItem($prodTour, targetItemNum);
        }

        var tourTimer;

        $(window).on("load", function () {

            initDefer();

            tourTimer = setInterval(autoScrollTour, 5000);
        });

        $(document).ready(function () {

            let $switcherMenuItems = $prodTour.find('.product-tour-menu-item');
            let $switcherDots = $prodTour.find('.product-tour-menu-icon');

            $switcherMenuItems.on('click', function (evt) {

                if (!$(this).hasClass('active')) {

                    let $targetSwitcher = $(this).parents('.product-tour-switcher');
                    let targetItemNum = $(this).attr('data-item');

                    clearInterval(tourTimer);
                    tourTimer = null;

                    goToItem($targetSwitcher, targetItemNum);
                }
            });

            $switcherDots.on('click', function (evt) {

                if (!$(this).parent().hasClass('active')) {

                    let $targetSwitcher = $(this).parents('.product-tour-switcher');
                    let targetItemNum = $(this).parent().attr('data-item');

                    clearInterval(tourTimer);
                    tourTimer = null;

                    goToItem($targetSwitcher, targetItemNum);
                }
            });
        });

    })();
})();

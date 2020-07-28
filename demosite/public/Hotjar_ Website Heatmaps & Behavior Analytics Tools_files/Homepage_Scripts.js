function initDefer(eventType) {

    var targetTop = window.pageYOffset + window.innerHeight;

    if (window.innerWidth < 650) {

        var imgDefer = document.querySelectorAll('img[data-src-mobile].no-defer:not(.deferred-img)');
        for (var i = 0; i < imgDefer.length; i++) {
            if (targetTop >= imgDefer[i].getBoundingClientRect().top) {
                imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src-mobile'));
                imgDefer[i].className += ' ' + 'deferred-img';
            }
        }

        var imgDeferBg = document.querySelectorAll('div[data-src-mobile].no-defer:not(.deferred-img), span[data-src-mobile].no-defer:not(.deferred-img)');
        var style = "background-image: url({url})";
        for (var i = 0; i < imgDeferBg.length; i++) {
            if (targetTop >= imgDeferBg[i].getBoundingClientRect().top) {
                imgDeferBg[i].setAttribute('style', style.replace("{url}", imgDeferBg[i].getAttribute('data-src-mobile')));
                imgDeferBg[i].className += ' ' + 'deferred-img';
            }
        }
    }
    else {

        var imgDefer = document.querySelectorAll('img[data-src].no-defer:not(.deferred-img)');
        for (var i = 0; i < imgDefer.length; i++) {
            if (targetTop >= imgDefer[i].getBoundingClientRect().top) {
                imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
                imgDefer[i].className += ' ' + 'deferred-img';
            }
        }

        var imgDeferBg = document.querySelectorAll('div[data-src].no-defer:not(.deferred-img), span[data-src].no-defer:not(.deferred-img)');
        var style = "background-image: url({url})";
        for (var i = 0; i < imgDeferBg.length; i++) {
            if (targetTop >= imgDeferBg[i].getBoundingClientRect().top) {
                imgDeferBg[i].setAttribute('style', style.replace("{url}", imgDeferBg[i].getAttribute('data-src')));
                imgDeferBg[i].className += ' ' + 'deferred-img';
            }
        }
    }

    setTimeout(function () {

        var targetTop = window.pageYOffset + window.innerHeight;

        if (window.innerWidth < 650) {

            var imgDefer = document.querySelectorAll('img[data-src-mobile]:not(.deferred-img)');
            for (var i = 0; i < imgDefer.length; i++) {
                if (targetTop >= imgDefer[i].getBoundingClientRect().top) {
                    imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src-mobile'));
                    imgDefer[i].className += ' ' + 'deferred-img';
                }
            }

            var imgDeferBg = document.querySelectorAll('div[data-src-mobile]:not(.deferred-img), span[data-src-mobile]:not(.deferred-img)');
            var style = "background-image: url({url})";
            for (var i = 0; i < imgDeferBg.length; i++) {
                if (targetTop >= imgDeferBg[i].getBoundingClientRect().top) {
                    imgDeferBg[i].setAttribute('style', style.replace("{url}", imgDeferBg[i].getAttribute('data-src-mobile')));
                    imgDeferBg[i].className += ' ' + 'deferred-img';
                }
            }
        }
        else {

            var imgDefer = document.querySelectorAll('img[data-src]:not(.deferred-img)');
            for (var i = 0; i < imgDefer.length; i++) {
                if (targetTop >= imgDefer[i].getBoundingClientRect().top) {
                    imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src'));
                    imgDefer[i].className += ' ' + 'deferred-img';
                }
            }

            var imgDeferBg = document.querySelectorAll('div[data-src]:not(.deferred-img), span[data-src]:not(.deferred-img)');
            var style = "background-image: url({url})";
            for (var i = 0; i < imgDeferBg.length; i++) {
                if (targetTop >= imgDeferBg[i].getBoundingClientRect().top) {
                    imgDeferBg[i].setAttribute('style', style.replace("{url}", imgDeferBg[i].getAttribute('data-src')));
                    imgDeferBg[i].className += ' ' + 'deferred-img';
                }
            }
        }

    }, eventType == 'load' ? 2000 : 0);
}

function toggleMobileImages(eventType) {

    if (window.innerWidth < 650) {

        var mobileImg = document.querySelectorAll('img[data-src-mobile].no-defer:not(.mobile-img)');
        for (var i = 0; i < mobileImg.length; i++) {
            mobileImg[i].setAttribute('src', mobileImg[i].getAttribute('data-src-mobile'));
            mobileImg[i].className += ' mobile-img';
        }

        var mobileBg = document.querySelectorAll('div[data-src-mobile].no-defer:not(.mobile-img), span[data-src-mobile].no-defer:not(.mobile-img)');
        var style = "background-image: url({url})";
        for (var i = 0; i < mobileBg.length; i++) {
            mobileBg[i].setAttribute('style', style.replace("{url}", mobileBg[i].getAttribute('data-src-mobile')));
            mobileBg[i].className += ' mobile-img';
        }
    }
    else {

        var mobileImg = document.querySelectorAll('img[data-src-mobile].no-defer');
        for (var i = 0; i < mobileImg.length; i++) {
            mobileImg[i].setAttribute('src', mobileImg[i].getAttribute('data-src'));
            mobileImg[i].className = mobileImg[i].className.replace(' mobile-img', '');
        }

        var mobileBg = document.querySelectorAll('div[data-src-mobile].no-defer, span[data-src-mobile].no-defer');
        var style = "background-image: url({url})";
        for (var i = 0; i < mobileBg.length; i++) {
            mobileBg[i].setAttribute('style', style.replace("{url}", mobileBg[i].getAttribute('data-src')));
            mobileBg[i].className = mobileBg[i].className.replace(' mobile-img', '');
        }
    }

    setTimeout(function () {

        if (window.innerWidth < 650) {

            var mobileImg = document.querySelectorAll('img[data-src-mobile]:not(.mobile-img)');
            for (var i = 0; i < mobileImg.length; i++) {
                mobileImg[i].setAttribute('src', mobileImg[i].getAttribute('data-src-mobile'));
                mobileImg[i].className += ' mobile-img';
            }

            var mobileBg = document.querySelectorAll('div[data-src-mobile]:not(.mobile-img), span[data-src-mobile]:not(.mobile-img)');
            var style = "background-image: url({url})";
            for (var i = 0; i < mobileBg.length; i++) {
                mobileBg[i].setAttribute('style', style.replace("{url}", mobileBg[i].getAttribute('data-src-mobile')));
                mobileBg[i].className += ' mobile-img';
            }
        }
        else {

            var mobileImg = document.querySelectorAll('img[data-src-mobile]');
            for (var i = 0; i < mobileImg.length; i++) {
                mobileImg[i].setAttribute('src', mobileImg[i].getAttribute('data-src'));
                mobileImg[i].className = mobileImg[i].className.replace(' mobile-img', '');
            }

            var mobileBg = document.querySelectorAll('div[data-src-mobile], span[data-src-mobile]');
            var style = "background-image: url({url})";
            for (var i = 0; i < mobileBg.length; i++) {
                mobileBg[i].setAttribute('style', style.replace("{url}", mobileBg[i].getAttribute('data-src')));
                mobileBg[i].className = mobileBg[i].className.replace(' mobile-img', '');
            }
        }

    }, (eventType == 'load' || eventType == 'ready') ? 2000 : 0);
}

function moveHeaderImages() {

    if ($('body').hasClass('brandHomePh8')) {

        let $headerImage = $('.brand-header-image:not(.no-switch)');

        if (window.outerWidth < 1180) {

            if (!$headerImage.parent('.brand-header-text-wrapper').length) {

                let $tempImage = $headerImage.detach();

                $('.brand-header-text-wrapper .sectionH1').after($tempImage);
            }
        }
        else {

            if ($headerImage.parent('.brand-header-text-wrapper').length) {

                let $tempImage = $headerImage.detach();

                $('.brand-header-text-wrapper').after($tempImage);
            }
        }
    }

}

window.onload = function (evt) {
    initDefer(evt.type);
    toggleMobileImages(evt.type);
}
window.onscroll = function (evt) {
    initDefer(evt.type);
}

window.onresize = function (evt) {
    toggleMobileImages(evt.type);
    moveHeaderImages();
}


moveHeaderImages();

$(document).ready(function (evt) {

    toggleMobileImages('ready');

    /* Feature slider */

    var $featuresliderImage = $('body.brandHome .featureslider .featureslider--feature');

    var featureArrowsHTML = `
    <div class="feature-arrow prev-feature-arrow"></div>
    <div class="feature-arrow next-feature-arrow"></div>
  `;

    $featuresliderImage.append(featureArrowsHTML);

    var $featureSliderArrows = $('body.brandHome .featureslider .featureslider--feature .feature-arrow');
    var $featureBoxes = $('body.brandHome .featureslider .hs_cos_wrapper_type_widget_container > div:not(.featureslider--feature)');
    var $featureImages = $('body.brandHome .featureslider .hs_cos_wrapper_type_widget_container > .featureslider--feature .featureslider--feature--imagewrapper > img');

    var featurePaginationHTML = `
    <div class="feature-pagination">
    <div>
    ${ $.map($featureBoxes, (item, i) => `
    <div class="feature-bullet ${i == 0 ? 'active' : ''}" data-bullet="${i}"><div></div></div>
    `.trim()).join('')}
    </div>
    </div>
  `;

    $featuresliderImage.append(featurePaginationHTML);

    var $featureSliderBullets = $('body.brandHome .featureslider .featureslider--feature .feature-bullet');

    $featureSliderArrows.on('click', function (e) {

        let $currentBox = $featureBoxes.filter('.active'),
            isFirstBox = !$currentBox.prev().length,
            isLastBox = $currentBox.next().hasClass('featureslider--feature'),
            $targetBox;

        $featureBoxes.removeClass('active');

        if ($(this).hasClass('prev-feature-arrow')) {

            if (isFirstBox) {
                $targetBox = $featuresliderImage.prev();
            }
            else {
                $targetBox = $currentBox.prev();
            }
        }
        else {

            if (isLastBox) {
                $targetBox = $featureBoxes.filter(':first-child');
            }
            else {
                $targetBox = $currentBox.next();
            }

        }

        $targetBox.addClass('active').addClass('active');

        $featureSliderBullets.removeClass('active');
        $featureImages.removeClass('active').addClass('inactive');
        $featureSliderBullets.filter('[data-bullet="' + $featureBoxes.index($targetBox) + '"]').addClass('active');
        $featureImages.filter(':nth-child(' + (parseInt($featureBoxes.index($targetBox)) + 1) + ')').addClass('active');
    });

    $featureSliderBullets.on('click', function (e) {

        let $targetBox = $featureBoxes.filter(':nth-child(' + (parseInt($(this).attr("data-bullet")) + 1) + ')');
        let $targetImage = $featureImages.filter(':nth-child(' + (parseInt($(this).attr("data-bullet")) + 1) + ')');

        $featureBoxes.removeClass('active');
        $featureImages.removeClass('active').addClass('inactive');
        $featureSliderBullets.removeClass('active');

        $($targetBox).addClass('active');
        $targetImage.addClass('active');
        $(this).addClass('active');
    });

    $featureBoxes.on('click', function () {

        $featureSliderBullets.removeClass('active');
        $featureSliderBullets.filter('[data-bullet="' + $featureBoxes.index($(this)) + '"]').addClass('active');
    });

    /* Testimonials pagination */

    var $testimonialsPagination = $('body.brandHome .testimonialSlider .slick-dots').detach();

    $('body.brandHome .testimonialSlider').append($testimonialsPagination);

    $('.scroll-down').click(function () {
        if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {
            window.scrollTo(0, $('.brand-logos').offset().top);
        } else {
            $('html, body').animate({scrollTop: $('.brand-logos').offset().top}, 'slow');
        }
        return false;
    });

});

document.addEventListener("DOMContentLoaded", function () {

    if (window.innerWidth > 650) {

        let $testimoanialSlider = document.querySelector('.testimonialSliderWrapper.full-width-bg'),
            $slide1 = $testimoanialSlider.querySelector('.slideInner.slide1 .videoContent'),
            slide1Video = '<div class="wistia_embed wistia_async_cqlgj3f2jc popover=true popoverAnimateThumbnail=true" style="display:inline-block;height:40px;width:60px">&nbsp;</div>',
            $slide2 = $testimoanialSlider.querySelector('.slideInner.slide2 .videoContent'),
            slide2Video = '<div class="wistia_embed wistia_async_h1tpzc0q6k popover=true popoverAnimateThumbnail=true" style="display:inline-block;height:40px;width:60px">&nbsp;</div>',
            $slide3 = $testimoanialSlider.querySelector('.slideInner.slide3 .videoContent'),
            slide3Video = '<div class="wistia_embed wistia_async_7q25vetsln popover=true popoverAnimateThumbnail=true" style="display:inline-block;height:40px;width:60px">&nbsp;</div>',
            $slide4 = $testimoanialSlider.querySelector('.slideInner.slide4 .videoContent'),
            slide4Video = '<div class="wistia_embed wistia_async_zogtzf66ny popover=true popoverAnimateThumbnail=true" style="display:inline-block;height:40px;width:60px">&nbsp;</div>',
            $slide5 = $testimoanialSlider.querySelector('.slideInner.slide5 .videoContent'),
            slide5Video = '<div class="wistia_embed wistia_async_vei6gi94u3 popover=true popoverAnimateThumbnail=true" style="display:inline-block;height:40px;width:60px">&nbsp;</div>'

        if (!("insertAdjacentHTML" in document.createElementNS("http://www.w3.org/1999/xhtml", "_"))) {

            $slide1.innerHTML = slide1Video;
            $slide2.innerHTML = slide2Video;
            $slide3.innerHTML = slide3Video;
            $slide4.innerHTML = slide4Video;
            $slide5.innerHTML = slide5Video;
        }
        else {

            $slide1.insertAdjacentHTML('beforeend', slide1Video);
            $slide2.insertAdjacentHTML('beforeend', slide2Video);
            $slide3.insertAdjacentHTML('beforeend', slide3Video);
            $slide4.insertAdjacentHTML('beforeend', slide4Video);
            $slide5.insertAdjacentHTML('beforeend', slide5Video);
        }
    }


    $('.testimonialSlider').slick({
        fade: true,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 6000,
        dots: true,
        arrows: false
    });
});

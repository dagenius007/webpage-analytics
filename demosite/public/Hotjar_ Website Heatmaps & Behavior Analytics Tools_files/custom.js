/* CTA Adblocker Fallback / Quickload */
$('.all--btn').find('.hs-cta-wrapper').each(function () {
    var thisText = ($(this).find('a img').attr('alt') || "").trim();
    if (thisText != "") {
        $(this).find('a img').remove();
        $(this).find('a').html(thisText);
    }
});

// Read querystring value.
function getParameterByName(name, url) {
    var url = window.location.href,
        regex,
        results;

    name = name.replace(/[\[\]]/g, "\\$&");
    regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Create a cookie.
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toUTCString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Delete a cookie.
function deleteCookie(name) {
    createCookie(name, "", -1);
}

// Read a cookie value by name.
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// A loading state is used specifically for optimizely full-page tests.
// Check custom.css for details on how to use this.
function injectLoadingState() {
    var loadingState = $('<div id="loading-state"><div class="spinner spinner-md"></div><br />Loading...</div>'),
        bodyWrapper = $('.body-container-wrapper'),
        footerWrapper = $('footer');

    bodyWrapper.before(loadingState);
    bodyWrapper.hide();
    footerWrapper.hide();
}

// Destory a loading state and reset the page.
function destroyLoadingState() {
    var loadingState = $('#loading-state'),
        bodyWrapper = $('.body-container-wrapper'),
        footerWrapper = $('footer');

    loadingState.remove();
    bodyWrapper.show();
    footerWrapper.show();
}

/* Ease To */
function easeTo(elementSelector) {
    $('html, body').animate({
        scrollTop: $(elementSelector).offset().top - $('header').height() - 20
    }, 600);
}

/* IM Slider */
function imsliderAuto() {

}

function imslider(d, thisThing) {
    var slide = $(thisThing).closest('.imslider').find('.hs_cos_wrapper_type_widget_container');
    var curSlide = $(slide).find(">div.active").index();
    if (!$(slide).hasClass('imslider--transition')) {
        $(slide).addClass('imslider--transition');
        $(slide).find(">div").removeClass('active');

        if (d == "prev") {
            if (curSlide - 1 < 0) {
                curSlide = $(slide).find('>div').length - 1;
                $(slide).addClass('no--transition');
                $(slide).css({
                    'left': (-100 * curSlide) + "%"
                });
                curSlide--;
                $(slide)[0].offsetHeight;
                $(slide).removeClass('no--transition');
            } else {
                curSlide = curSlide - 1
            }
        }
        else if (d == "next") {
            if (curSlide + 1 > $(slide).find('>div').length - 1) {
                curSlide = 0;
                $(slide).addClass('no--transition');
                $(slide).css({
                    'left': (-100 * curSlide) + "%"
                });
                curSlide++;
                $(slide)[0].offsetHeight;
                $(slide).removeClass('no--transition');
            } else {
                curSlide = curSlide + 1
            }
        }

        $(slide).find('>div:eq(' + curSlide + ')').addClass('active');
        $(slide).css({
            'left': (-100 * curSlide) + "%"
        });
        setTimeout(function () {
            $(slide).removeClass('imslider--transition');
            imsliderAuto();
        }, 500);
    }
}

function imsliderSize() {
    $('.imslider').each(function () {
        var imsliderLength = $(this).find('.hs_cos_wrapper_type_widget_container > div').length;
        if (imsliderLength > 1) {
            var imsliderHeight = 0;
            $(this).find('.hs_cos_wrapper_type_widget_container > div, .hs_cos_wrapper_type_widget_container > div > div').css({
                'height': ''
            });
            $(this).find('.hs_cos_wrapper_type_widget_container > div').each(function () {
                if ($(this).outerHeight() > imsliderHeight) {
                    imsliderHeight = $(this).outerHeight();
                }
            });
            $(this).css({
                'height': imsliderHeight + 'px'
            });
            $(this).find('.hs_cos_wrapper_type_widget_container > div > div').css({
                'height': imsliderHeight + 'px'
            });
        }
    });
}

$(document).ready(function () {
    $('.imslider').each(function () {
        if ($(this).find('.hs_cos_wrapper_type_widget_container > div').length > 1) {
            $(this).find('.hs_cos_wrapper_type_widget_container').append($(this).find('.hs_cos_wrapper_type_widget_container > div:eq(0)').clone());
            var imsliderLength = $(this).find('.hs_cos_wrapper_type_widget_container > div').length;

            $(this).find('.hs_cos_wrapper_type_widget_container > div:eq(0)').addClass('active');
            $(this).find('.hs_cos_wrapper_type_widget_container > div').css({
                'display': 'block',
                'width': (100 / imsliderLength) + '%'
            });
            $(this).find('.hs_cos_wrapper_type_widget_container').css({
                'position': 'absolute',
                'width': (100 * imsliderLength) + '%'
            });
            $(this).append("<div class='imslider--prev'></div><div class='imslider--next'></div><div class='imslider--auto'></div>");
            imsliderSize();
            imsliderAuto();
        }
    });
    if ($('.imslider').length > 0) {
        $('body').find('.imslider .imslider--prev').click(function () {
            imslider("prev", $(this));
        });
        $('body').find('.imslider .imslider--next').click(function () {
            imslider("next", $(this));
        });
        $(window).resize(function () {
            imsliderSize();
        });
        $(window).on("load", function () {
            imsliderSize();
        });
    }
});

/* Feature Slider */
function featureslider(d, thisThing) {
    var slide = $(thisThing).closest('.featureslider').find('.hs_cos_wrapper_type_widget_container');
    slide.find('>div').removeClass('active');
    slide.find('>div:eq(' + d + ')').addClass('active');
    slide.closest('.featureslider').find('.featureslider--feature img').removeClass('active');
    slide.closest('.featureslider').find('.featureslider--feature img:eq(' + d + ')').removeClass('inactive').addClass('active');
    setTimeout(function () {
        slide.closest('.featureslider').find('.featureslider--feature img').addClass('inactive');
        slide.closest('.featureslider').find('.featureslider--feature img:eq(' + d + ')').removeClass('inactive');
    }, 500);
}

function featuresliderSize() {
    $('.featureslider').each(function () {
        var fsh = 20 + $(this).closest('.featureslider--wrapper').find('.featureslider--content').outerHeight(true) + ($(this).closest('.featureslider--wrapper').find('.featureslider--uppercontent').length > 0 ? $(this).closest('.featureslider--wrapper').find('.featureslider--uppercontent').outerHeight(true) + 20 : 0); // Starting value is equal to difference in top + bottom padding of active item box vs. inactive box
        var fsc = 0;
        $(this).find('.featureslider--item').each(function () {
            fsh += $(this).find('h3').height() + 30; // Add top + bottom padding of items
            if ($(this).find('p').outerHeight(true) > fsc) {
                fsc = $(this).find('p').outerHeight(true)
            }
        });
        if ($(this).closest('.featureslider--wrapper').find('.featureslider--uppercontent').length > 0) {
            $(this).find('.featureslider--feature').css('margin-top', (-1 * ($(this).closest('.featureslider--wrapper').find('.featureslider--uppercontent').outerHeight(true) + 20)) + 'px');
            $(this).closest('.featureslider--wrapper').css('min-height', (((fsh + fsc) > ($(this).find('.featureslider--feature--spacer').height() + 35) ? (fsh + fsc) : ($(this).find('.featureslider--feature--spacer').height() + 35)) + 120) + 'px');
        }
        else {
            $(this).closest('.featureslider--wrapper').css('min-height', (((fsh + fsc) > ($(this).find('.featureslider--feature--spacer').height() + 35) ? (fsh + fsc) : ($(this).find('.featureslider--feature--spacer').height() + 35))) + 'px');
        }
        $(this).find('.featureslider--feature').css('opacity', '1');
    });
}

$(document).ready(function () {
    $('.featureslider').each(function () {
        $(this).find('.hs_cos_wrapper_type_widget_container').append("<div class='featureslider--feature'><div class='featureslider--feature--browserbar'><div class='featureslider--feature--browserbar--menu'><div></div><div></div><div></div></div><div class='featureslider--feature--browserbar--nav'><div></div><div></div><div></div></div></div><div class='featureslider--feature--imagewrapper'></div></div>");
        $(this).find('.hs_cos_wrapper_type_widget_container > .hs_cos_wrapper_type_custom_widget').each(function () {
            $(this).closest('.hs_cos_wrapper_type_widget_container').find('.featureslider--feature--imagewrapper').append("<img class='inactive' src='" + ($(this).find('.featureslider--item--image:eq(0) img').attr('src')) + "' alt=\"" + ($(this).find('.featureslider--item--image:eq(0) img').attr('alt')) + "\" />");
        });
        $(this).find('.featureslider--feature').append("<img class='featureslider--feature--spacer' alt='Hotjar features' src='https://static-cms.hotjar.com/original_images/heatmaps-0.jpg' />");
        //$(this).find('.featureslider--feature img:eq(0)').removeClass('inactive').addClass('active');
        $(this).find('.hs_cos_wrapper_type_widget_container > div:eq(0)').addClass('active');
        $(this).find('.hs_cos_wrapper_type_widget_container > div.hs_cos_wrapper_type_custom_widget').click(function () {
            featureslider($(this).index(), $(this));
        });
    });
    if ($('.featureslider').length > 0) {
        $(window).on("load", function () {
            featuresliderSize();
        });
        $(window).resize(function () {
            featuresliderSize();
        });
    }
});
$(window).on("load", function () {
    $('.featureslider').each(function () {
        $(this).find('.featureslider--feature img:eq(0)').removeClass('inactive').addClass('active');
    });
});

/* Toggles */
function sizeToggles() {
    $('.toggle--wrapper.active').each(function () {
        $(this).find('.toggle--content--wrapper').css('max-height', $(this).find('.toggle--content').outerHeight(true) + 'px');
    });
}

$('.toggle--wrapper').each(function () {
    $(this).find('.toggle--label').click(function () {
        if ($(this).closest('.toggle--wrapper').hasClass('active')) {
            $(this).closest('.toggle--wrapper').removeClass('active');
            $(this).closest('.toggle--wrapper').find('.toggle--content--wrapper').css('max-height', '');
        }
        else {
            $(this).closest('.toggle--wrapper').addClass('active');
            $(this).closest('.toggle--wrapper').find('.toggle--content--wrapper').css('max-height', $(this).closest('.toggle--wrapper').find('.toggle--content').outerHeight(true) + 'px');
        }
    });
});
$(window).resize(function () {
    sizeToggles();
});
$(window).on("load", function () {
    sizeToggles();
});

/* GUIDE */
function idOf(c) {
    return (c >= 26 ? idOf((c / 26 >> 0) - 1) : '') + 'abcdefghijklmnopqrstuvwxyz'[c % 26 >> 0].toUpperCase();
}

$(document).ready(function () {
    if ($('body').hasClass('guide')) {
        if ($('html').hasClass('sectionBulletsLetters')) {
            var sectionBulletType = "letters";
        } else {
            sectionBulletType = "numbers";
        }
        for (i = 0; i < $('.guide--section--header').length; i++) {
            $('#pagination').append("<p><a>" + (sectionBulletType == "numbers" ? i + 1 : idOf(i)) + ". " + (($('.guide--section--header:eq(' + i + ')').closest('.hs_cos_wrapper_type_custom_widget').find('.guide--section--header--paginationtextoverride').length > 0) ? $('.guide--section--header:eq(' + i + ')').closest('.hs_cos_wrapper_type_custom_widget').find('.guide--section--header--paginationtextoverride').text() + "</a>" : ($('.guide--section--header:eq(' + i + ')').html() + "</a>" + ($('.guide--section--header:eq(' + i + ')').closest('.hs_cos_wrapper_type_custom_widget').find('.guide--section--header--description').length > 0 ? " – " + $('.guide--section--header:eq(' + i + ')').closest('.hs_cos_wrapper_type_custom_widget').find('.guide--section--header--description').html() : ""))) + "</p>");
            $('.guide--section--header:eq(' + i + ')').prepend("<span class='guide--section--header--prefix'><span>" + (sectionBulletType == "numbers" ? i + 1 : idOf(i)) + "</span></span>");
            $('.guide--section--header:eq(' + i + ')').attr("id", "section" + (sectionBulletType == "numbers" ? i + 1 : idOf(i))).attr('rel', (sectionBulletType == "numbers" ? i + 1 : idOf(i)));
            $('#pagination a:eq(' + i + ')').attr('onclick', "easeTo('.guide--section--header:eq(" + (i) + ")');return false;").attr('href', '#section' + (sectionBulletType == "numbers" ? i + 1 : idOf(i)));
        }
        var gCount = 0;
        var cCount = 0;
        $('.guide--list, .guide--section--header, .guide--section--quicklinks').each(function () {
            if ($(this).hasClass('guide--list')) {
                gCount++;
                console.log(sectionBulletType);
                $(this).prepend("<span class='guide--list--prefix " + ((gCount >= 10) && (sectionBulletType == "letters") ? 'guide--list--prefix--double' : '') + "'><span>" + ((sectionBulletType == "numbers") ? idOf(gCount - 1) : gCount) + "</span></span>");
                $(this).attr("id", "section" + (sectionBulletType == "numbers" ? cCount : idOf(cCount - 1)) + "-" + ((sectionBulletType == "numbers") || ($(this).hasClass('guide--list')) ? gCount : idOf(gCount - 1))).attr('rel', (sectionBulletType == "numbers" ? cCount : idOf(cCount - 1)));
            }
            if ($(this).hasClass('guide--section--quicklinks')) {
                $(this).attr("id", "section" + (sectionBulletType == "numbers" ? cCount : idOf(cCount - 1)) + "-links").attr('rel', (sectionBulletType == "numbers" ? cCount : idOf(cCount - 1)));
            }
            else if ($(this).hasClass('guide--section--header')) {
                gCount = 0;
                cCount++;
            }
        });
        if ($('body').find('#pagination').length > 0) {
            $('.guide--section--quicklinks').each(function () {
                var gRel = $(this).attr('rel');
                var gCount = 0;
                $('.guide--list[rel="' + gRel + '"]').each(function () {
                    gCount++;
                    $('.guide--section--quicklinks[rel="' + gRel + '"]').append("<p><a href='#section" + gRel + "-" + gCount + "' onclick=\"easeTo('#section" + gRel + "-" + gCount + "');return false;\">" + (sectionBulletType == "numbers" ? idOf(gCount - 1) : gCount) + ". " + $(this).find(">h3").html() + "</a></p>");
                });
            });
        }
        if (window.location.hash) {
            if ($(window.location.hash).length > 0) {
                easeTo(window.location.hash);
            }
        }
    }
});

/* Featureslider - Modal */
$(document).ready(function () {
    if ($('body').find('.modal--featureslider--pool').length > 0) {
        function modalFeaturesliderSize() {
            var mfs = 0;
            $('#modal--featureslider').find('.modal--featureslider--slider--slide').each(function () {
                thisHeight = $(this).height();
                console.log(thisHeight);
                if (thisHeight > mfs) {
                    mfs = thisHeight;
                }
            });
            console.log(mfs);
            $('#modal--featureslider').find('.modal--featureslider--slider').css('height', mfs + 'px');
        }

        function modalFeaturesliderTo(slideNum) {
            $('#modal--featureslider').find('.modal--featureslider--nav li, .modal--featureslider--slider--slide').removeClass('active');
            $('#modal--featureslider .modal--featureslider--slider--slide').each(function () {
                $(this).css('left', (110 * ($(this).index() - slideNum)) + '%');
            });
            $('#modal--featureslider').find('.modal--featureslider--nav li:eq(' + slideNum + '), .modal--featureslider--slider--slide:eq(' + slideNum + ')').addClass('active');
        }

        var slideLength = $('.modal--featureslider--pool').find('.feature--item').length;
        $('body').append("<div id='modal--featureslider'><div class='modal--featureslider--close'>x</div><div class='modal--featureslider--nav'></div><div class='modal--featureslider--underlay'></div><div class='modal--featureslider--vcenter'></div><div class='modal--featureslider--content'><div class='modal--featureslider--slider'></div></div></div>");
        $('#modal--featureslider').find('.modal--featureslider--close, .modal--featureslider--underlay').click(function () {
            $('body').removeClass('modal--featureslider');
        });
        $('.modal--featureslider--pool').find('.feature--item').each(function () {
            $('#modal--featureslider .modal--featureslider--slider').append("<div class='modal--featureslider--slider--slide' style='left:" + (110 * $(this).parent().index() + "%") + "'><img class='modal--featureslider--slider--slide--image' src='" + $(this).find('.feature--item--image img').attr('src') + "' alt='" + $(this).find('.feature--item--image img').attr('alt') + "' /><div class='modal--featureslider--slider--slide--content'><h3>" + $(this).find('h3').text() + "</h3><p>" + $(this).find('p').text() + "</p><p><a href='https://insights.hotjar.com/register?c=9608979a1794f1dcd695e31752a15b64&signup_source=getresponse-landingpage&signup_source=homepage-feature-overlay-funnels' class='btn btn--small btn--red'>Try it for free</a></p></div></div>");
            $('#modal--featureslider .modal--featureslider--nav').append("<li></li>");
        });
        $('#modal--featureslider .modal--featureslider--nav').find('li').click(function () {
            modalFeaturesliderTo($(this).index());
        });
        $('#modal--featureslider .modal--featureslider--nav').find('li:eq(0)').addClass('active')
        $('#modal--featureslider .modal--featureslider--slider').find('.modal--featureslider--slider--slide:eq(0)').addClass('active');
        $('.modal--featureslider--pool').find('.feature--item').click(function () {
            $('#modal--featureslider').addClass('no--transition');
            $('#modal--featureslider')[0].offsetHeight;
            modalFeaturesliderTo($(this).parent().index());
            $('#modal--featureslider').removeClass('no--transition');
            $('body').addClass('modal--featureslider');
            modalFeaturesliderSize();
        });
        $('modal--featureslider--pool').find('a').click(function (e) {
            return false;
            e.preventDefault();
        });
        $('#modal--featureslider').find('.modal--featureslider--slider--slide').click(function () {
            if (!$(this).hasClass('active')) {
                modalFeaturesliderTo($(this).index());
            }
        });
        $(window).resize(function () {
            modalFeaturesliderSize();
        });
    }
});

/* Image Slider */
$(document).ready(function () {
    if ($('body').find('.imageslider').length > 0) {
        function imageslider(thisThing, slideNum) {
            var curSlide = $(thisThing).closest('.imageslider').find('.imageslider--nav li.active').index();
            if (slideNum == "prev") {
                if (curSlide - 1 < 0) {
                    curSlide = $(thisThing).closest('.imageslider').find('.imageslider--nav li').length - 1;
                }
                else {
                    curSlide--;
                }
            }
            else if (slideNum == "next") {
                if (curSlide + 1 > $(thisThing).closest('.imageslider').find('.imageslider--nav li').length - 1) {
                    curSlide = 0;
                }
                else {
                    curSlide++;
                }
            }
            else {
                curSlide = slideNum;
            }
            $(thisThing).closest('.imageslider').find('.imageslider--nav li, .hs_cos_wrapper_type_widget_container > div').removeClass('active');
            $(thisThing).closest('.imageslider').find('.imageslider--nav li:eq(' + curSlide + '), .hs_cos_wrapper_type_widget_container > div:eq(' + curSlide + ')').addClass('active');
        }

        $('.imageslider').each(function () {
            $(this).append("<ul class='imageslider--nav'></ul><div class='imageslider--prev'><i class='fa fa-chevron-left'></i></div><div class='imageslider--next'><i class='fa fa-chevron-right'></i></div>");
            $(this).find('.imageslider--slide').each(function () {
                $(this).closest('.imageslider').find('.imageslider--nav').append("<li></li>")
            });
            $(this).find('.imageslider--nav li:eq(0),.imageslider--slide:eq(0)').addClass('active');
        });
        $('.imageslider').find('.imageslider--nav li').click(function () {
            imageslider($(this), $(this).index());
        });
        $('.imageslider').find('.imageslider--prev').click(function () {
            imageslider($(this), "prev");
        });
        $('.imageslider').find('.imageslider--next').click(function () {
            imageslider($(this), "next");
        });
    }
});


/* Language Select / Change */
$(document).ready(function () {
    if ($('body').find('#lang-select').length > 0) {
        var browserLanguage = navigator.language,
            lanugageCookieName = 'hjSiteLang',
            language = readCookie(lanugageCookieName);

        // Show the relevant content for the chosen language.
        function setLanguage(lang) {
            $('[data-lang]').hide();

            $('#lang-select').val(lang);
            $('[data-lang="' + lang + '"]').show();

            // Store this in value in a cookie.
            createCookie(lanugageCookieName, lang, 365);
        }

        // Change handler for language dropdown.
        $('#lang-select').on('change', function () {
            if (this.value !== '') {
                setLanguage(this.value)
            }
        });

        // Set the default language.
        if (language) {
            setLanguage(language)
        } else {
            // If no cookie is available, set the language based on browser language.
            if (browserLanguage.indexOf('de') > -1) {
                language = 'de';
            } else {
                language = 'en'
            }

            $('#lang-select').val(language);
            setLanguage(language)
        }
    }
});

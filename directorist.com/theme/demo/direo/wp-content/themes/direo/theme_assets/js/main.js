(function ($) {
    "use strict";
    //single listing
    var single_listing = $(".atbd_single_listing");
    var slWidth = single_listing.width();
    if (slWidth <= 300) {
        single_listing.addClass("rs_fix");
    }

    //mobile menu fix
    $(".menu-item.menu-item-has-children").on("click", function () {
        $(this).toggleClass("active");
    });

    // enable bootstrap tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // testimonial-carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        dots: false,
        nav: true,
        navText: ['<span class="i la la-long-arrow-left"></span>', '<span class="i la la-long-arrow-right"></span>']
    });

    var rtl = direo_rtl.rtl === "true" ? true : false;
    $(".listing-carousel").owlCarousel({
        items: 5,
        rtl: rtl,
        nav: true,
        navText: ['<span class="la la-long-arrow-left"></span>', '<span class="la la-long-arrow-right"></span>'],
        dots: true,
        margin: 30,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 1
            },
            575: {
                items: 2
            },
            767: {
                items: 3
            },
            991: {
                items: 4
            },
            1191: {
                items: 5
            }
        }
    });


    // logo carousel
    $(".logo-carousel").owlCarousel({
        items: 5,
        nav: false,
        dots: false,
        margin: 100,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            575: {
                items: 3
            },
            767: {
                items: 3
            },
            991: {
                items: 5
            }
        }
    });

    //setting css bg image as inline in html
    $(".bg_image_holder").each(function () {
        var $this = $(this);
        var imgLink;
        if ($this.children().attr("data-lazy-src")) {
            imgLink = $this.children().attr("data-lazy-src");
        } else if ($this.children().attr("data-src")) {
            imgLink = $this.children().attr("data-src");
        } else {
            imgLink = $this.children().attr("src");
        }
        //console.log(imgLink);
        $this.css({
            "background-image": "url(" + imgLink + ")",
            "opacity": "1"
        }).children().attr('alt', imgLink)
    });


    /* FAQ Accordion */
    $('p.dac_body').hide();
    $('.dacc_single > h3 > a').on("click", function (e) {
        var $this = $(this);
        $this.parent().next().slideToggle();
        $this.parent().parents(".dacc_single").siblings(".dacc_single").children("p.dac_body").slideUp();
        $this.toggleClass("active");
        $this.parent().parents(".dacc_single").siblings(".dacc_single").children("h3").children("a").removeClass("active");
        e.preventDefault();
    });

    //counter
    $(".count_up").counterUp({
        time: 1000
    });

    /* offcanvas menu */
    var oc_menu = $(".offcanvas-menu__contents");
    $(".offcanvas-menu__user").on("click", function (e) {
        oc_menu.addClass("active");
        e.preventDefault();
    });
    $(".offcanvas-menu__close").on("click", function (e) {
        oc_menu.removeClass("active");
        e.preventDefault();
    });

    //Video Popup
    $('.video-iframe').magnificPopup({
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: function (url) {
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if (!m || !m[1]) return null;
                        return m[1];
                    },
                    src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: function (url) {
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if (!m || !m[5]) return null;
                        return m[5];
                    },
                    src: '//player.vimeo.com/video/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src'
        },
        mainClass: 'mfp-fade'
    });

    //blog single page
    //Style for category, if assigned category is more than 4
    var cats = $(".post-meta li:nth-child(3) a");
    if (cats.length > 3) {
        $(".post-meta li:nth-child(3)").addClass("order-3");
    }

    //body class in `listing with map` page
    $("#listing-listings_with_map").parent().parents("body").addClass("atbdp_listings_map_page");


    //all listing sort status
    if ($(".view-mode .action-btn")) {
        var CurrentUrl = document.URL;
        var CurrentUrlEnd = CurrentUrl.split('/').filter(Boolean).pop();
        $(".view-mode .action-btn").each(function () {
            var ThisUrl = $(this).attr('href');
            var ThisUrlEnd = ThisUrl.split('/').filter(Boolean).pop();
            if (ThisUrlEnd === CurrentUrlEnd) {
                $(this).addClass('active');
            }
        });
    }


    var acbtn = $(".view-mode .action-btn:first-child");
    if (acbtn.siblings().hasClass("active") === true) {
        acbtn.removeClass("active");
    }
    if ($(".view-mode .action-btn").hasClass("active") === true) {
        $(".view-mode .action-btn").siblings().removeClass("ab-grid ab-list ab-map");
    }


    $(".atbd_add_listing_wrapper label").has("input").append("<span class='cf-select'></span>");

    $("#signup_modal").find(".container-fluid, .row, .col-md-8.offset-md-2").removeClass();
    $("#signup_modal").find(".add_listing_title").remove();

    $(".recover-pass-form").hide();
    $(".recover-pass-link").on("click", function (e) {
        e.preventDefault();
        $(".recover-pass-form").slideToggle().show();
    });

    //woocommerce checkout confirm address fields collapse option
    $(".woocommerce-columns address").hide();
    $(".woocommerce-column .woocommerce-column__title").on("click", function () {
        $(this).toggleClass("active");
        $(this).next().slideToggle().show();
    });

    $('body').on('change', '#at_biz_dir-categories', function (e) {
        var clearInt = setInterval(function () {

            if ($('.atbdp-checkbox-list label .cf-select').length > 0) {
                clearInterval(clearInt)
            }
            $(".atbd_add_listing_wrapper label").has("input").append("<span class='cf-select'></span>");
        }, 100);
    });

    //fixing widgets select options long sentence
    var maxLength = 30;
    $('.widget select > option').text(function (i, text) {
        if (text.length > maxLength) {
            return text.substr(0, maxLength) + '...';
        }
    });

    //set widget social icon background from it's color property
    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    }

    function hex2rgba(hex, opacity) {
        //extract the two hexadecimal digits for each color
        var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
        var matches = patt.exec(hex);
        //convert them to decimal
        var r = parseInt(matches[1], 16);
        var g = parseInt(matches[2], 16);
        var b = parseInt(matches[3], 16);
        //create rgba string
        var rgba = "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
        //return rgba color
        return rgba;
    }

    var s_icon = $('.social-list li span.instagram i');
    s_icon.each(function () {
        var si_color = $(this).css('color');
        var si_color_hex = rgb2hex(si_color);
        $(this).css('background', hex2rgba(si_color_hex, 0.1));
    });

    var ci_color = $("#category-style-two #directorist.atbd_wrapper .atbd_all_categories .atbd_category_single figure figcaption .cat-box .icon span");
    ci_color.each(function () {
        var ci_color_value = $(this).css("color");
        var ci_color_hex = rgb2hex(ci_color_value);
        $(this).parent(".icon").css('background', hex2rgba(ci_color_hex, 0.1));
    });

    var fi_color = $(".feature-box-wrapper li .icon span");
    fi_color.each(function () {
        var fi_color_value = $(this).css("color");
        var fi_color_hex = rgb2hex(fi_color_value);
        $(this).parent(".icon").css('background', hex2rgba(fi_color_hex, 0.1));
    });

    //remove image from category style two
    $("#category-style-two .atbd_category_single figure img").remove();

    $('.atbdp_mark_as_fav').each(function () {
        $(this).on('click', function () {
            var data = {
                'action': 'atbdp-favourites-all-listing',
                'post_id': $(this).data('listing_id')
            };
            $.post(atbdp_search_listing.ajax_url, data, function (response) {
                if(response === "login_required"){
                    $("#login_modal").modal();
                }
            });

        })
    });

    //remove favorite
    $(".romove_saved_item .atbdp_mark_as_fav").on("click", function () {
       $(this).parents().parent("tr").fadeOut();
    });


})(jQuery);
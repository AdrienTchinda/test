(function ($) {
    jQuery(document).ready(function ($) {

        /*$.each($("input[name='view_as']:checked"), function(){
            view_as = $(this).val();
        });*/

        var nonce_get = $('#bdlm-search-area').attr('data-nonce');

        $("body").on("click", '.map-view-grid', function () {
            var $radios = $('input:radio[name=view_as]');
            $radios.filter('[value=list]').prop('checked', false);
            if($radios.is(':checked') === false) {
                $radios.filter('[value=grid]').prop('checked', true);
            }
            var display_header = $('#display_header').val();
            var header_title = $('#header_title').val();
            var show_pagination = $('#show_pagination').val();
            var listings_per_page = $('#listings_per_page').val();
            var location_slug = $('#location_slug').val();
            var category_slug = $('#category_slug').val();
            var key = $('#search_q').val();
            var location = $('.bdas-location-search').val();
            var category = $('.bdas-category-search').val();
            var open_now = [];
            var price = [];
            var custom_field = {};
            var website = $('#website').val();
            var phone = $('#phone').val();
            var address = $('#address').val();
            var zip_code = $('#zip_code').val();
            var email = $('#email').val();
            var miles = $('#atbd_rs_value').val();
            var cityLat = $('#cityLat').val();
            var cityLng = $('#cityLng').val();
            var tag = "";
            var search_by_rating = "";
            var view_as = "";
            //var view_as = $("#view_as option:selected").val();
            $('input[name^="price"]').each(function (index, el) {
                price.push($(el).val())
            });
            $.each($("input[name='open_now']:checked"), function () {
                open_now.push($(this).val());
            });
            $.each($("input[name='in_tag']:checked"), function () {
                tag = $(this).val();
            });
            $.each($("input[name='search_by_rating']:checked"), function () {
                search_by_rating = $(this).val();
            });
            $.each($("input[name='view_as']:checked"), function () {
                view_as = $(this).val();
            });

            $('[name^="custom_field"]').each(function (index, el) {
                var test = $(el).attr('name');
                var type = $(el).attr('type');
                var post_id = test.replace(/(custom_field\[)/, '').replace(/\]/, '');
                if('radio' === type) {
                    $.each($("input[name='custom_field["+post_id+"]']:checked"), function () {
                        value = $(this).val();
                        custom_field[post_id] = value;
                    });
                } else if ('checkbox' === type) {
                    post_id = post_id.split('[]')[0];
                    $.each($("input[name='custom_field["+post_id+"][]']:checked"), function () {
                        var checkValue = [];
                        value = $(this).val();
                        checkValue.push(value);
                        custom_field[post_id] = checkValue;
                    });
                } else {
                    var value = $(el).val();
                    custom_field[post_id] = value;
                }
            });
            var sort_by = $(this).val();
            $(".bdmv-columns-two .bdmv-search .bdmv-listing").remove();
            $.ajax({
                url: bdrr_submit.ajax_url,
                type: "POST",
                data: {
                    action: "ajax_search_listing",
                    view_as: view_as,
                    display_header: display_header,
                    header_title: header_title,
                    show_pagination: show_pagination,
                    listings_per_page: listings_per_page,
                    location_slug: location_slug,
                    category_slug : category_slug,
                    key: key,
                    location: location,
                    category: category,
                    custom_field: custom_field,
                    price: price,
                    open_now: open_now,
                    website: website,
                    phone: phone,
                    address: address,
                    zip_code: zip_code,
                    email: email,
                    miles: miles,
                    cityLat: cityLat,
                    cityLng: cityLng,
                    tag: tag,
                    search_by_rating: search_by_rating,
                    sort_by: sort_by,
                    nonce_get: nonce_get,
                },
                success: function (html) {
                    $(".bdmv-map-listing").remove();
                    $(".ajax-search-result").show();
                    $(".ajax-search-result").empty();
                    $(".ajax-search-result").append(html);
                    var _listing = $('.bdmv-columns-two .bdmv-listing');
                    $('.bdmv-columns-two .bdmv-search').append(_listing);
                    $('.map-view-grid').addClass('active');
                    $('.map-view-list').removeClass('active');
                }
            });
        });
        $("body").on("click", '.map-view-list', function () {
            var $radios = $('input:radio[name=view_as]');
            $radios.filter('[value=grid]').prop('checked', false);
            if($radios.is(':checked') === false) {
                $radios.filter('[value=list]').prop('checked', true);
            }
            var display_header = $('#display_header').val();
            var header_title = $('#header_title').val();
            var show_pagination = $('#show_pagination').val();
            var listings_per_page = $('#listings_per_page').val();
            var location_slug = $('#location_slug').val();
            var category_slug = $('#category_slug').val();
            var key = $('#search_q').val();
            var location = $('.bdas-location-search').val();
            var category = $('.bdas-category-search').val();
            var open_now = [];
            var price = [];
            var custom_field = {};
            var website = $('#website').val();
            var phone = $('#phone').val();
            var address = $('#address').val();
            var zip_code = $('#zip_code').val();
            var email = $('#email').val();
            var miles = $('#atbd_rs_value').val();
            var cityLat = $('#cityLat').val();
            var cityLng = $('#cityLng').val();
            var tag = "";
            var search_by_rating = "";
            var view_as = "";
            //var view_as = $("#view_as option:selected").val();
            $('input[name^="price"]').each(function (index, el) {
                price.push($(el).val())
            });
            $.each($("input[name='open_now']:checked"), function () {
                open_now.push($(this).val());
            });
            $.each($("input[name='in_tag']:checked"), function () {
                tag = $(this).val();
            });
            $.each($("input[name='search_by_rating']:checked"), function () {
                search_by_rating = $(this).val();
            });
            $.each($("input[name='view_as']:checked"), function () {
                view_as = $(this).val();
            });
            $('[name^="custom_field"]').each(function (index, el) {
                var test = $(el).attr('name');
                var type = $(el).attr('type');
                var post_id = test.replace(/(custom_field\[)/, '').replace(/\]/, '');
                if('radio' === type) {
                    $.each($("input[name='custom_field["+post_id+"]']:checked"), function () {
                        value = $(this).val();
                        custom_field[post_id] = value;
                    });
                } else if ('checkbox' === type) {
                    post_id = post_id.split('[]')[0];
                    $.each($("input[name='custom_field["+post_id+"][]']:checked"), function () {
                        var checkValue = [];
                        value = $(this).val();
                        checkValue.push(value);
                        custom_field[post_id] = checkValue;
                    });
                } else {
                    var value = $(el).val();
                    custom_field[post_id] = value;
                }
            });
            var sort_by = $(this).val();
            $(".bdmv-columns-two .bdmv-search .bdmv-listing").remove();
            $.ajax({
                url: bdrr_submit.ajax_url,
                type: "POST",
                data: {
                    action: "ajax_search_listing",
                    view_as: view_as,
                    display_header: display_header,
                    header_title: header_title,
                    show_pagination: show_pagination,
                    listings_per_page: listings_per_page,
                    location_slug: location_slug,
                    category_slug : category_slug,
                    key: key,
                    location: location,
                    category: category,
                    custom_field: custom_field,
                    price: price,
                    open_now: open_now,
                    website: website,
                    phone: phone,
                    address: address,
                    zip_code: zip_code,
                    email: email,
                    miles: miles,
                    cityLat: cityLat,
                    cityLng: cityLng,
                    tag: tag,
                    search_by_rating: search_by_rating,
                    sort_by: sort_by,
                    nonce_get: nonce_get,
                },
                success: function (html) {
                    $(".bdmv-map-listing").remove();
                    $(".ajax-search-result").show();
                    $(".ajax-search-result").empty();
                    $(".ajax-search-result").append(html);
                    var _listing = $('.bdmv-columns-two .bdmv-listing');
                    $('.bdmv-columns-two .bdmv-search').append(_listing);
                    $('.map-view-list').addClass('active');
                    $('.map-view-grid').removeClass('active');
                }
            });
        });
        //ajax pagination
        /* $("body").on("click", ".bdmv-filter-pagination-ajx ul li span.haspaglink",function () {
             var $this = jQuery(this);
             var skeyword 			= 	$this.data('skeyword');
             var pageno              = $(this).data('pageurl');
             var display_header = $('#display_header').val();
             var header_title = $('#header_title').val();
             var show_pagination = $('#show_pagination').val();
             var listings_per_page = $('#listings_per_page').val();
             var key = $('#search_q').val();
             var location = $('.bdas-location-search').val();
             var category = $('.bdas-category-search').val();
             var open_now = [];
             var price = [];
             var custom_field = {};
             var website = $('#website').val();
             var phone = $('#phone').val();
             var address = $('#address').val();
             var zip_code = $('#zip_code').val();
             var email = $('#email').val();
             var miles = $('#atbd_rs_value').val();
             var cityLat = $('#cityLat').val();
             var cityLng = $('#cityLng').val();
             var tag = "";
             var search_by_rating = "";
             var view_as = "";
             var sort_by = $("#sort_by option:selected").val();
             $(".ajax-search-result").addClass('loading');
             $(".bdmv-map-listing").addClass("loading");
             $('input[name^="price"]').each(function (index, el) {
                 price.push($(el).val())
             });
             $.each($("input[name='open_now']:checked"), function () {
                 open_now.push($(this).val());
             });
             $.each($("input[name='in_tag']:checked"), function () {
                 tag = $(this).val();
             });
             $.each($("input[name='search_by_rating']:checked"), function () {
                 search_by_rating = $(this).val();
             });
             $.each($("input[name='view_as']:checked"), function () {
                 view_as = $(this).val();
             });
             $('[name^="custom_field"]').each(function (index, el) {
                 var test = $(el).attr('name');
                 var type = $(el).attr('type');
                 var post_id = test.replace(/(custom_field\[)/, '').replace(/\]/, '');
                 if('radio' === type) {
                     $.each($("input[name='custom_field["+post_id+"]']:checked"), function () {
                         value = $(this).val();
                         custom_field[post_id] = value;
                     });
                 } else if ('checkbox' === type) {
                     post_id = post_id.split('[]')[0];
                     $.each($("input[name='custom_field["+post_id+"][]']:checked"), function () {
                         var checkValue = [];
                         value = $(this).val();
                         checkValue.push(value);
                         custom_field[post_id] = checkValue;
                     });
                 } else {
                     var value = $(el).val();
                     custom_field[post_id] = value;
                 }
             });
             $(".bdmv-columns-two .bdmv-search .bdmv-listing").remove();
             $.ajax({
                 url: bdrr_submit.ajax_url,
                 type: "POST",
                 data: {
                     action: "ajax_search_listing",
                     view_as: view_as,
                     display_header: display_header,
                     header_title: header_title,
                     show_pagination: show_pagination,
                     listings_per_page: listings_per_page,
                     key: key,
                     location: location,
                     category: category,
                     custom_field: custom_field,
                     price: price,
                     open_now: open_now,
                     website: website,
                     phone: phone,
                     address: address,
                     zip_code: zip_code,
                     email: email,
                     miles: miles,
                     cityLat: cityLat,
                     cityLng: cityLng,
                     tag: tag,
                     search_by_rating: search_by_rating,
                     sort_by: sort_by,
                     skeyword : skeyword,
                     pageno : pageno,
                     nonce_get: nonce_get,
                 },
                 success: function (html) {
                     $(".ajax-search-result").removeClass('loading');
                     $(".bdmv-map-listing").remove();
                     $(".ajax-search-result").show();
                     $(".ajax-search-result").empty();
                     $(".ajax-search-result").append(html);
                     var _listing = $('.bdmv-columns-two .bdmv-listing');
                     $('.bdmv-columns-two .bdmv-search').append(_listing);
                 }
             });
         });*/

    });
})(jQuery);


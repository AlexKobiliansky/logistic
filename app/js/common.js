$(document).ready(function(){

    $('.sm').smartmenus();


    //*** mobile-mnu customization *****//
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-wrapper"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        setTimeout(function(){
            $('.mmenu-btn').addClass('is-active')
        }, 300);

    });

    $('#close-mnu').click(function(e){
        e.preventDefault();
        API.close();
    });

    API.bind( "close:start", function() {
        setTimeout(function() {
            $('.mmenu-btn').removeClass( "is-active" );
        }, 300);
    });
    //***** end mobile-mnu customization *****//



    /*slider counters functionality*/

        var $slider = $('#intro-slider');
        var $slides = $slider.find('.slide');
        var $totalSlides = $slides.length;
        var $info = $('#intro-count .cur');
        var $progress = $('#intro-progressbar .progress');


            $('#intro-count .total').text($totalSlides);





            $slider.on('changed.owl.carousel', function (e) {
                var currentItem = e.item.index + 1;
                $info.text(currentItem);

                $progress.css('width', (currentItem/$totalSlides)*100 + '%');
            });

            $slider.on('initialize.owl.carousel', function (e) {
                var currentItem = e.item.index + 3;
                $info.text(currentItem);
            });

    /*end slider counters functionality*/


    $('.intro-slider').owlCarousel({
        loop:false,
        nav: true,
        items: 1,
        margin: 30,
        dots: false,
        navText: ["",""],
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        mouseDrag: false,
    });


    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });


    function heightses() {

        if ($(window).width()>=768) {
            $('.service-item-title').height('auto').matchHeight({byRow: true});
            $('.service-item-desc').height('auto').matchHeight({byRow: true});
        }
    }

    $(window).resize(function() {
        heightses();
    });
    heightses();


    //***** FORMS *****//
    $('.form-select, .redirect-select').styler();

    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });



    $('.redirect-form').each(function(){
        var th = $(this);
        var select = th.find('.jq-selectbox.redirect-select');
        var link;

        select.change(function(){
            var selectedItem = th.find('.jq-selectbox__dropdown li.sel');
            link = selectedItem.data('link');

        });

        th.submit(function(e){
            e.preventDefault();
            window.location.replace(link);
        });
    });




    //E-mail Ajax Send
    $(".contact-form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
    //***** end FORMS *****//
});

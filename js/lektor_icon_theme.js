(function () {

    'use strict';


    // Fullsize Error Page Background
    var fullHeight = function() {
        $('#error-page').css('height', $(window).height() - $('.js-sticky').height() - $('#fh5co-footer').outerHeight());
    };

    var setFullHeight = function() {
        fullHeight();
        $(window).on('resize', fullHeight);
    };


    // Offcanvas layout for "hamburger" mobile menu
    var offcanvasMenu = function() {
        $('body').prepend('<div id="fh5co-offcanvas"></div>');
        $('body').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle" aria-label="Toggle for hamburger menu"><i></i></a>');

        $('.fh5co-main-nav .fh5co-menu-1 a, .fh5co-main-nav .fh5co-menu-2 a').each(function(){

            var $this = $(this);

            $('#fh5co-offcanvas').append($this.clone());
        });
        // $('#fh5co-offcanvas').append
    };


    // Top navbar stickiness
    var mainMenuSticky = function() {

        var sticky = $('.js-sticky');
        var $section = $('.fh5co-main-nav');

        sticky.css('height', sticky.height());
        $(window).on('resize', function(){
            sticky.css('height',  $section.height());
        });

        $section.waypoint(function(direction) {

            if (direction === 'down') {

                    $section.css({
                        'position' : 'fixed',
                        'top' : 0,
                        'width' : '100%',
                        'z-index' : 99999
                    }).addClass('fh5co-shadow');;
            }
        }, {
            offset: '0px'
        });
    };


    // Mobile "burger" menu
    var burgerMenu = function() {

        $('body').on('click', '.js-fh5co-nav-toggle', function(event){

            var $this = $(this);

            if( $('body').hasClass('offcanvas-visible') ) {
                $('body').removeClass('offcanvas-visible fh5co-overflow');
                $this.removeClass('active');
            } else {
                $('body').addClass('offcanvas-visible fh5co-overflow');
                $this.addClass('active');
            }
            event.preventDefault();
        });
    };


    // Click outside of offcanvas sidebar to close it
    var mobileMenuOutsideClick = function() {

        $(document).on('click', function (e) {
        var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {

            if ( $('body').hasClass('offcanvas-visible') ) {

                $('body').removeClass('offcanvas-visible');
                $('.js-fh5co-nav-toggle').removeClass('active');
            }
        }
        });
    };



    // Document on load
    $(function(){
        offcanvasMenu();
        mainMenuSticky();
        setFullHeight();
        burgerMenu();
        mobileMenuOutsideClick();
    });

}());

(function () {

    'use strict';


    var isMSIE = function() {
        var is_ie = /MSIE|Trident/.test(window.navigator.userAgent);
        return is_ie;
    }


    var heroHeight = function() {
        if ($(window).width() >= 752) {
            $('.js-fullheight-home').css('height', $(window).height() - $('.js-sticky').height());
        } else {
            $('.js-fullheight-home').css('height', $(window).height() / 2);
        }
    };

    var setHeroHeight = function() {
        heroHeight();
        $(window).on('resize', heroHeight);
    };


    // Loading animation
    var loaderPage = function() {
        $(".fh5co-loader").fadeOut("slow");
    };


    // Show and hide tab content and images on click in the mission section
    var fh5coTabs = function() {
        $('.fh5co-tabs li a').on('click', function(event) {
            event.preventDefault();
            var $this = $(this),
                tab = $this.data('tab');
            $('.fh5co-tabs li').removeClass('active');
            $this.closest('li').addClass('active');
            $this.closest('.fh5co-tabs-container').find('.fh5co-tab-content').removeClass('active');
            $this.closest('.fh5co-tabs-container').find('.fh5co-tab-content[data-tab-content="' + tab + '"]').addClass('active');
            $this.closest('.body-section').find('.tab-image').removeClass('active');
            $this.closest('.body-section').find('.tab-image[data-tab-content="' + tab + '"]').addClass('active');
        });
    }


    var gridAutoHeight = function() {
        $('.fh5co-grid-item').css('height', $('.fh5co-2col-inner').outerHeight()/2);

        $(window).on('resize', function(){
            $('.fh5co-grid-item').css('height', $('.fh5co-2col-inner').outerHeight()/2);
        });
    }


    // Equalize heights of cards in team/services section for proper layout
    var cardsEvenHeight = function() {
        $('.body-section .container').each(function() {
            if ($(this).find('.card-inner').length && $(this).find('.card-outer').first().width() <= $(this).width() / 2.0) {
                var cardHeightMax = 0;
                $(this).find('.card-inner').each(function() {
                    var cardHeight = $(this).height()
                    if (cardHeight > cardHeightMax) {cardHeightMax = cardHeight; }
                });
            }
            $(this).find('.card').each(function() {
                var cardHeight = $(this).find('.card-inner').height()
                $(this).find('.card-spacer').height(cardHeightMax - cardHeight);
            });
        });
    }


    var setCardsEvenHeight = function() {
        $(window).on('load', cardsEvenHeight);
        $(window).on('resize', cardsEvenHeight);
        // For IE11, which doesn't work with load
        window.setTimeout(cardsEvenHeight, 2000);
        window.setTimeout(cardsEvenHeight, 5000);
    };


    // Parallax
    var parallax = function() {

        var vertical_offset_const = !isMSIE() * 51
        $(window).stellar({horizontalScrolling: false, verticalOffset: (vertical_offset_const + $('.fh5co-main-nav').height()), responsive: false});
    };


    // Hide the sidebar if user scrolls the page
    var scrolledWindow = function() {

        $(window).on('scroll', function(){

            var scrollPos = $(this).scrollTop();


           if ( $('body').hasClass('offcanvas-visible') ) {
            $('body').removeClass('offcanvas-visible');
            $('.js-fh5co-nav-toggle').removeClass('active');
           }
        });

        $(window).on('resize', function() {
            if ( $('body').hasClass('offcanvas-visible') ) {
            $('body').removeClass('offcanvas-visible');
            $('.js-fh5co-nav-toggle').removeClass('active');
           }
        });
    };


    // Just like it says on the tin
    var goToTop = function() {

        $('.js-gotop').on('click', function(event){

            event.preventDefault();

            $('html, body').animate({
                scrollTop: $('html').offset().top
            }, 500, 'easeInOutExpo');

            return false;
        });

        $(window).on('scroll', function(){

            var $win = $(window);
            if ($win.scrollTop() > 200) {
                $('.js-top').addClass('active');
            } else {
                $('.js-top').removeClass('active');
            }
        });
    };


    // Page Nav
    var clickMenu = function() {
        var topVal = ( $(window).width() < 769 ) ? 0 : 58;

        $(window).on('resize', function(){
            topVal = ( $(window).width() < 769 ) ? 0 : 58;
        });
        $('.fh5co-main-nav a:not([class="external"]), #fh5co-offcanvas a:not([class="external"]), a.fh5co-content-nav:not([class="external"])').on('click', function(event){
            var section = $(this).data('nav-section');

                if ( $('div[data-section="' + section + '"]').length ) {

                    $('html, body').animate({
                        scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal
                    }, 500, 'easeInOutExpo');

                    event.preventDefault();
               }
        });
    };


    // Reflect scrolling in navigation
    var navActive = function(section) {

        $('.fh5co-main-nav a[data-nav-section], #fh5co-offcanvas a[data-nav-section]').removeClass('active');
        $('.fh5co-main-nav, #fh5co-offcanvas').find('a[data-nav-section="'+section+'"]').addClass('active');
    };


    // A section to scroll to on the mainpage
    var navigationSection = function() {

        var $section = $('div[data-section]');

        $section.waypoint(function(direction) {
            if (direction === 'down') {
                navActive($(this.element).data('section'));
            }

        }, {
            offset: '150px'
        });

        $section.waypoint(function(direction) {
            if (direction === 'up') {
                navActive($(this.element).data('section'));
            }
        }, {
            offset: function() { return -$(this.element).height() + 155; }
        });
    };



    // Document on load
    $(function() {
        setHeroHeight();
        loaderPage();
        fh5coTabs();
        // gridAutoHeight();

        parallax();
        scrolledWindow();
        goToTop();
        clickMenu();
        navigationSection();
        setCardsEvenHeight();
    });

}());
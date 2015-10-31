// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

$(document).ready(function () {

    jQuery(window).trigger('resize').trigger('scroll');

    //SCROLL TO ANCHOR
    function scroll_if_anchor(href) {
        href = typeof(href) == "string" ? href : $(this).attr("href");
        var fromTop = 50;
        if (href.indexOf("#") == 0) {
            var $target = $(href);
            if ($target.length) {
                var time = 1000;
                $('html, body').animate({scrollTop: $target.offset().top - fromTop}, time);
                if (history && "pushState" in history) {
                    history.pushState({}, document.title, window.location.pathname + href);
                    return false;
                }
            }
        }
    }
    // Intercept all anchor clicks
    $("body").on("click", ".anchor", scroll_if_anchor);
    $window = $(window);


//GALLERY THUMBS BG
    function thumbsBgA() {
        $(".gallery-wrapper li a").each(function () {
            var imgID = this.href;
            $(this).parent('li').css('backgroundImage', 'url(' + imgID + ')');
        });
    }

    window.onload = thumbsBgA;

    function thumbsA() {
        $(".gallery-thumb").each(function () {
            var imgID = this.href;
            $(this).css('backgroundImage', 'url(' + imgID + ')');
        });
    }
    window.onload = thumbsA;

//Scroll MONITOR
    $('.s-monitor').each(function (i, element) {

        //var offsetTop = $(this).data('top');
        //var offsetBottom = $(this).data('bottom');
        if ($(element).get(0).hasAttribute("data-bottom")){
           var offsetBottom = $(this).data('bottom');
        }
        else{
           var offsetBottom = 200
        }
        if ($(element).get(0).hasAttribute("data-top")){
            var offsetTop = $(this).data('top')
        }
        else{
            var offsetTop = 200
        }
        var watcher = scrollMonitor.create(element, {top: offsetTop, bottom: offsetBottom});
        var action = $(this).data('animated');
        var delay = $(this).data('delay');
        //console.log(delay.length);
        //watcher.lock();

        watcher.enterViewport(function () {
            //console.log(this + ' ' + action + ' ' + 'I have entered the viewport');
            if ($(element).get(0).hasAttribute("data-delay")){
                $(element).css('animation-delay', delay + 's')
            }
            $(element).addClass(action);
            watcher.destroy
        });
        watcher.exitViewport(function () {
            //console.log(this + ' ' + action + ' ' + 'I have left the viewport');
            $(element).removeClass(action);
            watcher.destroy
        });
    });

//COUNTER
    var date = new Date();
    date.setDate(date.getDate() + 1);
    $(".daynow").text(date.getDate());
    var month = date.getMonth();
    switch(month) {
        case 0:
        {
            $(".monthnow").text(' января');
            break;
        }
        case 1:
        {
            $(".monthnow").text(' февраля');
            break;
        }
        case 2:
        {
            $(".monthnow").text(' марта');
            break;
        }
        case 3:
        {
            $(".monthnow").text(' апреля');
            break;
        }
        case 4:
        {
            $(".monthnow").text(' мая');
            break;
        }
        case 5:
        {
            $(".monthnow").text(' июня');
            break;
        }
        case 6:
        {
            $(".monthnow").text(' июля');
            break;
        }
        case 7:
        {
            $(".monthnow").text(' августа');
            break;
        }
        case 8:
        {
            $(".monthnow").text(' сентября');
            break;
        }
        case 9:
        {
            $(".monthnow").text(' октября');
            break;
        }
        case 10:
        {
            $(".monthnow").text(' ноября');
            break;
        }
        case 11:
        {
            $(".monthnow").text(' декабря');
            break;
        }
    }

    dateEnd = date;
    //console.log(dateEnd);

    /*
        var tomorrow = moment().endOf('day').valueOf() + 1;
        var now = moment().valueOf();
        var interval = (tomorrow - now) / 1000;
        var clock = $('#top-clock').FlipClock(interval, {
            clockFace: 'HourlyCounter',
            countdown: true,
            language: 'ru'
        });
    */

//CENTERED MODAL
    $(".start-modal").click(function () {
        var d_tar = $(this).attr('data-target');
        $(d_tar).show();
        var modal_he = $(d_tar).find('.modal-dialog .modal-content').height();
        var win_height = $(window).height();
        var marr = win_height - modal_he;
        $('.modal-dialog').css('margin-top', marr / 2);
    });

    //MAIL FORM
    $("form").submit(function () {
        var formID = $(this).attr("id");
        $.ajax({
            type: "POST",
            url: "mail.php", //mail script
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            alert('отработала' + ' - ' + formID);
            $('#' + formID).trigger("reset");
        });
        //console.log($(this));
        var parent = $(this).parents('.modal');
        var modalID = parent.attr("id");

        if ($('#' + modalID).hasClass('in')) {
            $('#' + modalID).modal('hide');
            return false;
        } else {
            return false;
        }
    });

});
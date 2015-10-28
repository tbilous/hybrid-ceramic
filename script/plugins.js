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
//GALLERY THUMBS BG
/*
    function thumbsBgA() {
        $(".gallery-wrapper li a").each(function () {
            var imgID = this.href;
            $(this).parent('li').css('backgroundImage', 'url(' + imgID + ')');
        });
    }

    window.onload = thumbsBgA;
*/

//TREE FAQ
/*
    $(function () {
        $('.tree li:has(ul)').addClass('parent_li well tree-patent-well').find(' > span').attr('title', 'Collapse this branch');
        $('.tree li.parent_li > span').on('click', function (e) {
            var children = $(this).parent('li.parent_li').find(' > ul > li');
            if (children.is(":visible")) {
                children.hide('fast');
                $(this).attr('title', 'Expand this branch').find(' > i').addClass("fa-plus").removeClass('fa-minus');
            } else {
                children.show('fast');
                $(this).attr('title', 'Collapse this branch').find(' > i').addClass('fa-minus').removeClass("fa-plus");
            }
            e.stopPropagation();
        });
    });*/
//SPY MENU
// Cache selectors
    var lastId,
        topMenu = $("#top-menu"),
        topMenuHeight = topMenu.outerHeight() + 15,
    // All list items
        menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });

// Bind click handler to menu items
// so we can get a fancy scroll animation
    menuItems.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

// Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href=#" + id + "]").parent().addClass("active");
        }
    });

//Scroll MONITOR
/*
    $('.s-monitor').each(function (i, element) {

        var offsetTop = $(this).data('top');
        var offsetBottom = $(this).data('bottom');
        var watcher = scrollMonitor.create(element, {top: offsetTop, bottom: offsetBottom});
        var action = $(this).data('animated');
        //watcher.lock();

        watcher.enterViewport(function () {
            //console.log(this + ' ' + action + ' ' + 'I have entered the viewport');
            $(element).addClass(action)
        });
        watcher.exitViewport(function () {
            //console.log(this + ' ' + action + ' ' + 'I have left the viewport');
            $(element).removeClass(action)
        });
    });
*/

//COUNTER
/*
    var tomorrow = moment().endOf('day').valueOf() + 1;
    var now = moment().valueOf();
    var interval = (tomorrow - now) / 1000;
    var clock = $('#top-clock').FlipClock(interval, {
        clockFace: 'HourlyCounter',
        countdown: true,
        language: 'ru'
    });
    var clock = $('#middle-clock').FlipClock(interval, {
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
        if ($('#orderModal').hasClass('in')) {
            $('#orderModal').modal('hide');
            return false;
        } else {
            return false;
        }
    });



});
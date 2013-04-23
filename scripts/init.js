var s = skrollr.init({
    forceHeight: false
}),
    _duration = 1000;

$(function() {
    $(".next-button").bind("click", function() {
        var _viewHeight = 900,
            _scrollTop = s.getScrollTop();
        var _to = Math.ceil((_scrollTop + 1) / _viewHeight);
        s.animateTo(_viewHeight * _to, {
            duration: _duration
        });
    });

    $(".top-button").bind("click", function() {
        s.animateTo(0, {
            duration: _duration
        });
    });

    var layers = $('.main');
    var activeLayer = 0;
    var animateUpSettings = {
        duration: _duration,
        done: function() {
            document.body.style.overflow = 'auto';
            location.hash = '#' + layers[activeLayer].id;
        }
    };
    var animateDownSettings = {
        duration: _duration,
        easing: 'sqrt',
        done: animateUpSettings.done
    };
    var nav = $('.menu'),
        links = $('.menu li');
    nav.bind('click', function(event) {
        var target = event.target;
        if (target.tagName !== 'LI') {
            return;
        }

        var id = target.className;
        var snapEl = document.getElementById(id);

        if (!snapEl) {
            return;
        }

        document.body.style.overflow = 'hidden';

        var snapPos = s.relativeToAbsolute(snapEl, 'top', 'top');

        //Down
        if (snapPos > s.getScrollTop()) {
            s.animateTo(snapPos, animateDownSettings);
        }
        //Up
        else {
            s.animateTo(snapPos, animateUpSettings);
        }

        //correct the index of the last layer
        for (var i = 0; i < links.length; i++) {
            if (target === links[i]) {
                activeLayer = i;
                break;
            }
        }

        if (event.preventDefault) {
            event.preventDefault();
        }

        event.returnValue = false;

        return false;
    });

});
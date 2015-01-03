/*
 * Scrolline.js - Create an indication bar line of scroll position
 * Basic usage : $.scrolline();
 * ---
 * Version: 1.0
 * Based on the fabulous Scrolline.js by Anthony Ly (http://anthonyly.com) and refactored by Alex Bondarev (http://alexbondarev.com)
 * Released under the MIT Licence
 */

(function($, window, document, undefined) {
    function Scrolline(options) {
        this.options = $.extend({}, {
            direction: 'horizontal',
            position: 'top',
            reverse: false,
            includeInitialScreen: true,
            autoReinitialise: false,
            autoReinitialiseIntervalTime: 1000,
            styles: {
                backColor: '#ecf0f1',
                frontColor: '#2ecc71',
                opacity: 1,
                weight: 5,
                zIndex: 10
            },
            onScrollEnd: function() {}
        }, options);

        this.$back = $('<div />', {
            css: {
                transform: "translateZ(0)",
                margin: 0,
                padding: 0,
                overflow: 'hidden',
                position: 'fixed'
            }
        }).appendTo('body').hide();
        this.$front = $('<div />', {
            css: {
                margin: 0,
                padding: 0,
                overflow: 'hidden',
                position: 'absolute'
            }
        }).appendTo(this.$back);

        this.waitForFinalEvent = (function () {
            var timers = {};
            return function (callback, ms, uniqueId) {
                if (!uniqueId) {
                    uniqueId = "Don't call this twice without a uniqueId";
                }
                if (timers[uniqueId]) {
                    clearTimeout(timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, ms);
            };
        })();

        this.init();
    }

    Scrolline.prototype = {
        init: function() {
            this.$window = $(window);
            this.$document = $(document);

            if( this.options.direction != 'vertical' ) this.options.direction = 'horizontal';
            if( this.options.direction == 'vertical' && this.options.position != 'right' ) this.options.position = 'left';
            if( this.options.direction == 'horizontal' && this.options.position != 'bottom' ) this.options.position = 'top';

            this.calculateDimensions();
            this.setBack();
            this.setFront();
        },

        calculateDimensions: function(){
            this.windowHeight = this.$window.height();
            this.initialOffset = this.options.includeInitialScreen ? this.options.direction === 'horizontal' ? this.windowHeight : this.$window.width() : 0;
            this.maxScrollTop = this.$document.height() - this.windowHeight + this.initialOffset;
        },

        setBack: function(){
            this.backStyles = {
                backgroundColor: this.options.styles.backColor,
                zIndex: this.options.styles.zIndex
            };

            if( this.options.direction === 'horizontal' ){
                this.backStyles.width = '100%';
                this.backStyles.height = this.options.styles.weight;
                this.backStyles.left = 0;

                if(this.options.position == 'bottom') {
                    this.backStyles.bottom = 0;
                } else {
                    this.backStyles.top = 0;
                }
            } else {
                this.backStyles.width = this.options.styles.weight;
                this.backStyles.height = '100%';
                this.backStyles.top = 0;

                if(this.options.position == 'right') {
                    this.backStyles.right = 0;
                } else {
                    this.backStyles.left = 0;
                }
            }

            this.$back.css(this.backStyles).show();
        },

        setFront: function(){
            this.frontProperty = 'width';
            this.frontStyles = {
                backgroundColor: this.options.styles.frontColor
            };

            if( this.options.direction === 'horizontal' ){
                this.frontStyles.height = this.options.styles.weight;
                this.frontStyles.top = 0;

                if( this.options.reverse ) {
                    this.frontStyles.right = 0;
                } else {
                    this.frontStyles.left = 0;
                }
            } else {
                this.frontStyles.width = this.options.styles.weight;
                this.frontStyles.left = 0;
                this.frontProperty = 'height';

                if( this.options.reverse ) {
                    this.frontStyles.bottom = 0;
                } else {
                    this.frontStyles.top = 0;
                }
            }

            this.$front.css(this.frontStyles);

            this.addListeners();
        },

        addListeners: function() {
            var self = this;

            this.$window
                .on('scroll.scrolline load.scrolline orientationchange.scrolline', function(){
                    self.updateFront();
                })
                .on('resize.scrolline', function(){
                    self.calculateDimensions();

                    self.waitForFinalEvent(function(){
                        self.updateFront();
                    }, 160, 'scrolline');
                });
        },

        updateFront: function(){
            this.$front.css(this.frontProperty, ( this.initialOffset + this.$window.scrollTop() ) * 100 / this.maxScrollTop + '%');
        }
    };

    $.extend({
        scrolline: function (options) {
            window.Scrolline = new Scrolline(options);
        }
    });
})(jQuery, window, document);
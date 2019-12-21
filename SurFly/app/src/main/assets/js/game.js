"use strict";

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var Game =
    /*#__PURE__*/
    function () {
        function Game() {
            _classCallCheck(this, Game);

            this.canvas = document.getElementById("gameCanvas");

            HTMLWidth = window.innerWidth;
            HTMLHeight = window.innerHeight;
            displayWidth = Android.getDisplayWidth();
            displayHeight = Android.getDisplayHeight();
            kWidth = displayWidth / HTMLWidth;
            kHeight = displayHeight / HTMLHeight;

            var ctx = this.canvas.getContext("2d");

            var image = new Image;
            image.onerror = function() {
                ctx.font = '50px "ShowcardGothic"';
                ctx.textBaseline = 'top';
               // ctx.fillText('Hello!', 20, 10);
            };
            image.src = link.href;




            // this.canvas.getContext("2d").font = '50px ShowcardGothic';



            // this.canvas.width=1920;//horizontal resolution (?) - increase for better looking text
            // this.canvas.height=1080;//vertical resolution (?) - increase for better looking text

            this.canvas.style.width = "" + window.innerWidth + "px";//actual width of canvas
            this.canvas.style.height = "" + window.innerHeight + "px"; //actual height of canvas

            this.canvas.width = displayWidth;
            this.canvas.height = displayHeight;

            // this.canvas.style.width = "" + 2260 + "px";//actual width of canvas
            // this.canvas.style.height = "" + 1080 + "px"; //actual height of canvas
            //
            // this.canvas.width = Android.ge
            // HTMLWidth() ;
            // this.canvas.height = Android.ge
            // HTMLHeight() ;


            var ctx = this.canvas.getContext("2d");
            ctx.mozImageSmoothingEnabled = false;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.msImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled = false;

            this.setScene(MenuScene);
        }

        _createClass(Game, [{
            key: "update",
            value: function update() {
                if (this.activeScene !== undefined) this.activeScene.update();
            }
        }, {
            key: "render",
            value: function render() {
                if (this.activeScene !== undefined) this.activeScene.render();
            }
        }, {
            key: "setScene",
            value: function setScene(Scene) {
                if (this.activeScene !== undefined) this.activeScene.endLoop();
                this.activeScene = new Scene(this.canvas, this);


            }
        }]);

        return Game;
    }();
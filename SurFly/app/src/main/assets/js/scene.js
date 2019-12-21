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

var Scene =
    /*#__PURE__*/
    function () {
        function Scene(canvas, game) {
            _classCallCheck(this, Scene);

            this.canvas = canvas;
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.backgroundPicture = new Image();

            var scene = this;

            this.backgroundPicture.onload = function () {

                //console.log()
                //ctx.drawImage(this, 0, -(canvas.width * this.height / this.width - canvas.height) / 2, canvas.width, canvas.width * this.height / this.width);
                scene.render();
            };
            this.backgroundPicture.src = "background2.png";


            this.game = game;
            this.sceneRenderFlag = true;

            //this.startLoop();
            //console.log("SETGG");

        }

        _createClass(Scene, [{
            key: "update",
            value: function update() {
            }
        }, {
            key: "render",
            value: function render() {
                var ctx = this.canvas.getContext("2d");
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                ctx.drawImage(this.backgroundPicture, 0, -(this.canvas.width * this.backgroundPicture.height / this.backgroundPicture.width - this.canvas.height) / 2, this.canvas.width, this.canvas.width * this.backgroundPicture.height / this.backgroundPicture.width);
            }
        }, {
            key: "initInput",
            value: function initInput() {
            }
        }, {
            key: "initPicture",
            value: function initPicture(path) {
                var image = new Image();
                image.src = path;
                return image;
            }
        }, {
            key: "endLoop",
            value: function endLoop() {
                this.sceneRenderFlag = false;
            }
        }, {
            key: "onBackPressed",
            value: function onBackPressed() {

            }
        }, {
            key: "startLoop",
            value: function startLoop() {
                var _this = this;

                var now,
                    time = 0,
                    timeRender = 0,
                    last = 0,
                    fpsRender = mainFPS,
                    stepRender = 1 / fpsRender,
                    fpsUpdate = 60,
                    stepUpdate = 1 / fpsUpdate,
                    counter = 0;
                var fps = 0;

                var frame = function frame(game, timeStart) {
                    now = performance.now();
                    time += Math.min(1, (now - last) / 1000);
                    timeRender += (now - last) / 1000;
                    var duration = now - timeStart;

                    if (duration < 1000) {//counter++;
                    } else {
                        fps = counter;
                        counter = 0;
                        timeStart = now;
                        //  console.log(fps);
                    }

                    while (time > stepUpdate) {
                        game.update();
                        time -= stepUpdate;
                    }

                    if (timeRender > stepRender) {
                        game.render();
                        counter++;
                        timeRender -= stepRender * Math.floor(timeRender / stepRender); // while (timeRender > stepRender)
                        //     timeRender -= stepRender;
                        // console.log((timeRender2 + " " + timeRender));
                    } //else console.log("KU");

                    fpsRender = mainFPS;
                    last = now;
                    if (_this.sceneRenderFlag) requestAnimationFrame(function () {
                        return frame(game, timeStart);
                    });
                };

                frame(this.game);
            }
        }]);

        return Scene;
    }();
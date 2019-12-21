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

var InputRange =
    /*#__PURE__*/
    function () {
        function InputRange(canvas, id, posX, posY, width, height, scene, enabled) {
            var _this = this;

            _classCallCheck(this, InputRange);

            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            this.scene = scene;
            this.ctx = this.canvas.getContext("2d");
            this.id = id;
            this.posX = posX;
            this.posY = posY;
            this.enabled = enabled;

            this.runnerHeight = height * 1.3;
            this.runnnerWidth = height / 2;
            this.runnerPosX = posX - this.runnnerWidth / 2;
            if (this.id === "fpsRange") {
                this.runnerPosX += (mainFPS - 20) / 40 * width;
            } else if (this.id === "colorRange") {
                this.runnerPosX += color * width;
            }
            this.runnerPosY = posY - (this.runnerHeight - height) / 2;
            this.width = width;
            this.height = height;
            this.isPressed = false;
            this.header = "";

            if (this.id === "fpsRange") {
                this.header = "FPS: " + mainFPS;
            }

            if (this.id === "colorRange") {
                this.header = "Select color";
                this.image = new Image();
                this.image.crossOrigin = "Anonymous";

                this.image.onload = function () {
                    if (enabled)
                        _this.initListeners();

                    //_this.render();
                };
                this.image.src = "palitra3.png";
            } else {
                if (enabled)
                    this.initListeners();
            }
        }

        _createClass(InputRange, [{
            key: "render",
            value: function render() {
                this.ctx.beginPath(); // this.ctx.strokeRect(this.posX, this.posY, this.width, this.height);

                if (this.image !== undefined)
                    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
                else {
                    this.ctx.strokeRect(this.posX, this.posY, this.width, this.height);
                }
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.strokeRect(this.runnerPosX, this.runnerPosY, this.runnnerWidth, this.runnerHeight);
                this.ctx.stroke();
                this.ctx.font = "50px ShowcardGothic";
                this.ctx.fillStyle = '#000000';
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(this.header, this.posX + this.width / 2,
                    this.posY - this.height / 2);

                if(!this.enabled)
                {
                    this.ctx.fillText("Achieve 1:00:00 to unlock", this.posX + this.width / 2,
                        this.posY + this.height / 2);
                }


            }
        }, {
            key: "returnPercentage",
            value: function returnPercentage() {
                return (this.runnerPosX - this.posX + this.runnnerWidth / 2) / this.width;
            }
        }, {
            key: "initListeners",
            value: function initListeners() {
                var _this2 = this;

                document.addEventListener("touchstart", function (event) {
                    var touches = event.changedTouches;
                    //  console.log(touches[0].clientX*kWidth + " " + _this2.runnerPosX);
                    if (touches[0].clientX * kWidth > _this2.runnerPosX && touches[0].clientX * kWidth < _this2.runnerPosX + _this2.runnnerWidth && touches[0].clientY * kHeight > _this2.runnerPosY && touches[0].clientY * kHeight < _this2.runnerPosY + _this2.runnerHeight)
                        _this2.isPressed = true;
                });
                document.addEventListener("touchmove", function (event) {
                    var touches = event.changedTouches;
                    if (_this2.isPressed) {
                        if (touches[0].clientX * kWidth > _this2.posX + 1 && touches[0].clientX * kWidth < _this2.posX + _this2.width - 1) {
                            _this2.runnerPosX = touches[0].clientX * kWidth - _this2.runnnerWidth / 2;
                        } else if (touches[0].clientX * kWidth >= _this2.posX + _this2.width - 1)
                            _this2.runnerPosX = _this2.posX + _this2.width - _this2.runnnerWidth / 2 - 1;
                        else _this2.runnerPosX = _this2.posX - _this2.runnnerWidth / 2 + 1;


                        if (_this2.id === "colorRange") {

                            colorOfSteam = _this2.canvas.getContext('2d').getImageData(_this2.runnerPosX + _this2.runnnerWidth / 2, _this2.runnerPosY + _this2.runnerHeight / 2, 1, 1).data;
                            lastColorOfSteam = colorOfSteam;
                            color = _this2.returnPercentage();
                        }

                        if (_this2.id === "fpsRange") {
                            mainFPS = Math.floor(20 + _this2.returnPercentage() * 41);
                            _this2.header = "FPS: " + mainFPS;
                        }

                        //console.log("RED: " + pixelData[0]);
                    }
                });
                document.addEventListener("touchend", function (event) {
                    _this2.isPressed = false;
                    if (_this2.id === "colorRange") {
                        Android.setNewColor(_this2.returnPercentage());
                        Android.saveColor(colorOfSteam[0], colorOfSteam[1], colorOfSteam[2]);
                    } else if (_this2.id === "fpsRange") {
                        Android.setNewFPS(20 + Math.floor(_this2.returnPercentage() * 41));
                    }
                });

            }
        }]);

        return InputRange;
    }();
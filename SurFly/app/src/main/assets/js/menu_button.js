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

var MenuButton =
    /*#__PURE__*/
    function () {

        function MenuButton(canvas, id, posX, posY, width, height, text, scene, enabled) {
            _classCallCheck(this, MenuButton);

            this.canvas = canvas;
            this.scene = scene;
            this.enabled = enabled;
            //this.canvas.getContext("2d").fillText("KUKU",0,0);


            this.ctx = this.canvas.getContext("2d");
            this.id = id;
            this.isPressed = false;
            this.posX = posX;
            this.posY = posY;
            this.width = width;
            this.height = height;
            this.text = text;
            if (enabled) {
                this.initOnClick();
            }
            this.render();
        }

        _createClass(MenuButton, [{
            key: "initOnClick",
            value: function initOnClick() {
                this.scene.stopAllListeners = false;

                // function startGame(event) {
                //     var touches = event.changedTouches;
                //     //C console.log(touches[0].clientX);
                //     if (touches[0].clientX * kWidth >= posX && touches[0].clientX * kWidth <= posX + width
                //         && touches[0].clientY * kHeight >= posY && touches[0].clientY * kHeight <= posY + height && this.isPressed) {
                //         document.removeEventListener("touchend", startGame);
                //         //console.log("KUKUSIKI");
                //         game.setScene(GameScene);
                //     }
                //     this.isPressed = false;
                // }
                var _this = this;

                //var stopAllListeners = false;

                function isInsideButton(touches) {
                    return (touches[0].clientX * kWidth >= _this.posX && touches[0].clientX * kWidth <= _this.posX + _this.width
                        && touches[0].clientY * kHeight >= _this.posY && touches[0].clientY * kHeight <= _this.posY + _this.height);
                }

                function initListenerForExitButton(event) {

                    var touches = event.changedTouches;
                    if (_this.scene.stopAllListeners) {
                        document.removeEventListener("touchstart", initTouchStartListener);
                        document.removeEventListener("touchend", initListenerForExitButton);
                    }
                    //console.log(_this.posX);
                    else {
                        if (isInsideButton(touches) && _this.isPressed) {
                            document.removeEventListener("touchstart", initTouchStartListener);
                            document.removeEventListener("touchend", initListenerForExitButton);
                            //console.log("KUKUSIKI");
                            Android.exitAll();
                            //alert(Android.getBestResult());
                        }
                    }
                    _this.isPressed = false;
                }

                function initListenerForGameButton(event) {

                    var touches = event.changedTouches;

                    if (_this.scene.stopAllListeners) {
                        document.removeEventListener("touchstart", initTouchStartListener);
                        document.removeEventListener("touchend", initListenerForGameButton);
                    }
                    // console.log(_this.id);
                    else {
                        if (isInsideButton(touches) && _this.isPressed) {
                            document.removeEventListener("touchstart", initTouchStartListener);
                            document.removeEventListener("touchend", initListenerForGameButton);

                            _this.scene.stopAllListeners = true;
                            _this.scene.endLoop();
                            //document.removeEventListener("touchend", initListenerForGameButton);
                            //console.log("KUKUSIKI");
                            //alert(Android.getBestResult());
                            if (_this.id === "playExclusiveButton") {
                                exclusiveColor = true;
                               // colorOfSteam = [100, 255, 100];
                            } else {
                                exclusiveColor = false;
                                //colorOfSteam = lastColorOfSteam;
                            }
                            game.setScene(GameScene);
                        }
                    }
                    _this.isPressed = false;
                }


                function initListenerForSettingsButton(event) {
                    var touches = event.changedTouches;

                    if (_this.scene.stopAllListeners) {
                        document.removeEventListener("touchstart", initTouchStartListener);
                        document.removeEventListener("touchend", initListenerForSettingsButton);
                    }
                    // console.log(_this.id);
                    else {
                        if (isInsideButton(touches) && _this.isPressed) {
                            document.removeEventListener("touchstart", initTouchStartListener);
                            document.removeEventListener("touchend", initListenerForSettingsButton);
                            _this.scene.stopAllListeners = true;
                            //document.removeEventListener("touchend", initListenerForGameButton);
                            //console.log("KUKUSIKI");
                            //alert(Android.getBestResult());

                            game.setScene(SettingsScene);
                        }
                    }
                    _this.isPressed = false;
                }

                function initTouchStartListener(ev) {
                    var touches = ev.changedTouches;
                    //console.log("KU: " + _this.id);
                    if (isInsideButton(touches)) {
                        _this.isPressed = true;
                    }
                }

                // if (this.id === "playButton") {
                document.addEventListener("touchstart", initTouchStartListener);
                // console.log("posY" + posY);
                if (_this.id === "playButton" || _this.id === "playExclusiveButton") {
                    document.addEventListener("touchend", initListenerForGameButton); // console.log("Mouse "+event.screenX + " " + event.screenY + "button " + posX + " " + posY + " w " + width + " h " + height));
                    //console.log("Init play");
                   // console.log("KU");
                } else if (_this.id === "exitButton") {
                    //console.log("Init exit");
                    document.addEventListener("touchend", initListenerForExitButton);
                } else if (_this.id === "settingsButton") {
                    document.addEventListener("touchend", initListenerForSettingsButton);
                } else console.log(_this.id);

            }
        }, {
            key: "render",
            value: function render() {


                this.ctx.beginPath();
                this.ctx.rect(this.posX, this.posY, this.width, this.height);
                this.ctx.fillStyle = '#FFFFFF';
                this.ctx.fillStyle = 'rgba(136,138,225,0.5)';
                this.ctx.fill();
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = '#000000';
                this.ctx.stroke();
                this.ctx.closePath();
                // this.ctx.font = '30px Showcard Gothic';
                //this.ctx.font = '28px ShowcardGothic';

                //this.ctx.fontFamily = 'ShowcardGothic';

                // this.ctx.fillStyle = "#000000";
                // this.ctx.fillText("KUKU",100,100);
                //console.log("DONE");
                this.ctx.font = "50px ShowcardGothic";

                if(!this.enabled)
                    this.ctx.fillStyle = '#808080';
                else
                    this.ctx.fillStyle = '#000000';

                this.ctx.textAlign = "center";
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(this.text, this.posX + this.width / 2, this.posY + this.height / 2);
                if (!this.enabled) {
                    this.ctx.fillStyle = '#000000';
                    this.ctx.fillText("Achieve 2:00:00 to unlock", this.posX + this.width / 2, this.posY + this.height / 2);
                }

            }

        }]);

        return MenuButton;
    }();
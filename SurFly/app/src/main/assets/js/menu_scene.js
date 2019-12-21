"use strict";

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
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

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
}

function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);android:overScrollMode="never"
}

var MenuScene =
    /*#__PURE__*/
    function (_Scene) {
        _inherits(MenuScene, _Scene);

        function MenuScene(canvas, game) {
            var _this;

            _classCallCheck(this, MenuScene);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuScene).call(this, canvas, game));
            _this.menuButtons = [];
            var buttonWidth = canvas.width / 4,
                buttonHeight = buttonWidth / 4;
            _this.stopAllListeners = false;

            _this.menuButtons.push(new MenuButton(canvas, "playButton", (canvas.width - buttonWidth) / 2, (canvas.height - buttonHeight) / 2 - buttonHeight*1.5, buttonWidth, buttonHeight, "PLAY",this,true));
            _this.menuButtons.push(new MenuButton(canvas, "settingsButton", (canvas.width - buttonWidth) / 2, (canvas.height - buttonHeight) / 2, buttonWidth, buttonHeight, "SETTINGS",this,true));
            _this.menuButtons.push(new MenuButton(canvas, "exitButton", (canvas.width - buttonWidth) / 2, (canvas.height - buttonHeight) / 2 + buttonHeight*1.5, buttonWidth, buttonHeight, "EXIT",this,true));
            return _this;
        }

        _createClass(MenuScene, [{
            key:"onBackPressed",
            value: function onBackPressed () {
                this.endLoop();
                Android.exitAll();
            }
        },{
            key: "render",
            value: function render() {
                _get(_getPrototypeOf(MenuScene.prototype), "render", this).call(this);

                for (var i = 0; i < this.menuButtons.length; i++) {
                    this.menuButtons[i].render();
                }

                var ctx = this.canvas.getContext("2d");
                ctx.font = "50px ShowcardGothic";
                ctx.fillStyle = '#000000';
                ctx.textAlign = "center";
                ctx.textBaseline = 'middle';
                ctx.fillText("Your best result is: "+Android.getBestResult(), this.canvas.width/2,
                    (this.canvas.height + (this.menuButtons[this.menuButtons.length-1].posY + this.menuButtons[this.menuButtons.length-1].height))/2);


            }
        }]);

        return MenuScene;
    }(Scene);

// var MenuButton =
//     /*#__PURE__*/
//     function () {
//         var stopAllListeners= false;
//         function MenuButton(canvas, id, posX, posY, width, height, text) {
//             _classCallCheck(this, MenuButton);
//
//             this.canvas = canvas;
//             //this.canvas.getContext("2d").fillText("KUKU",0,0);
//
//
//             this.ctx = this.canvas.getContext("2d");
//             this.id = id;
//             this.isPressed = false;
//             this.posX = posX;
//             this.posY = posY;
//             this.width = width;
//             this.height = height;
//             this.text = text;
//             this.render();
//             this.initOnClick();
//             //var ctx = document.getElementById("gameCanvas").getContext("2d");
//
//             // console.log(posX);
//
//
//         }
//
//         _createClass(MenuButton, [{
//             key: "initOnClick",
//             value: function initOnClick() {
//
//                 stopAllListeners = false;
//
//                 // function startGame(event) {
//                 //     var touches = event.changedTouches;
//                 //     //C console.log(touches[0].clientX);
//                 //     if (touches[0].clientX * kWidth >= posX && touches[0].clientX * kWidth <= posX + width
//                 //         && touches[0].clientY * kHeight >= posY && touches[0].clientY * kHeight <= posY + height && this.isPressed) {
//                 //         document.removeEventListener("touchend", startGame);
//                 //         //console.log("KUKUSIKI");
//                 //         game.setScene(GameScene);
//                 //     }
//                 //     this.isPressed = false;
//                 // }
//                 var _this = this;
//                 //var stopAllListeners = false;
//
//                 function isInsideButton(touches) {
//                     return (touches[0].clientX * kWidth >= _this.posX && touches[0].clientX * kWidth <= _this.posX + _this.width
//                         && touches[0].clientY * kHeight >= _this.posY && touches[0].clientY * kHeight <= _this.posY + _this.height);
//                 }
//
//                 function initListenerForExitButton(event) {
//
//                     var touches = event.changedTouches;
//                     if (stopAllListeners) {
//                         document.removeEventListener("touchstart", initTouchStartListener);
//                         document.removeEventListener("touchend", initListenerForExitButton);
//                     }
//                     //console.log(_this.posX);
//                     else {
//                         if (isInsideButton(touches) && _this.isPressed) {
//                             // document.removeEventListener("touchend", initListenerForExitButton);
//                             //console.log("KUKUSIKI");
//                             //Android.exitAll();
//                             alert(Android.getBestResult());
//                         }
//                     }
//                     _this.isPressed = false;
//                 }
//
//                 function initListenerForGameButton(event) {
//
//                     var touches = event.changedTouches;
//                     // console.log(_this.id);
//                     if (isInsideButton(touches) && _this.isPressed) {
//                         document.removeEventListener("touchstart", initTouchStartListener);
//                         document.removeEventListener("touchend", initListenerForExitButton);
//                         stopAllListeners = true;
//                         //document.removeEventListener("touchend", initListenerForGameButton);
//                         //console.log("KUKUSIKI");
//                         //alert(Android.getBestResult());
//                         game.setScene(GameScene);
//                     }
//                     _this.isPressed = false;
//                 }
//
//                 function initTouchStartListener(ev) {
//                     var touches = ev.changedTouches;
//                     //console.log("KU: " + _this.id);
//                     if (isInsideButton(touches)) {
//                         _this.isPressed = true;
//                     }
//                 }
//
//                 // if (this.id === "playButton") {
//                 document.addEventListener("touchstart", initTouchStartListener);
//                 // console.log("posY" + posY);
//                 if (_this.id === "playButton") {
//                     document.addEventListener("touchend", initListenerForGameButton); // console.log("Mouse "+event.screenX + " " + event.screenY + "button " + posX + " " + posY + " w " + width + " h " + height));
//                     //console.log("Init play");
//                 } else if (_this.id === "exitButton") {
//                     //console.log("Init exit");
//                     document.addEventListener("touchend", initListenerForExitButton);
//                 }
//                 //}
//             }
//         }, {
//             key: "render",
//             value: function render() {
//
//                 this.ctx.beginPath();
//                 this.ctx.rect(this.posX, this.posY, this.width, this.height);
//                 this.ctx.fillStyle = '#FFFFFF';
//                 this.ctx.fillStyle = 'rgba(136,138,225,0.5)';
//                 this.ctx.fill();
//                 this.ctx.lineWidth = 2;
//                 this.ctx.strokeStyle = '#000000';
//                 this.ctx.stroke();
//                 this.ctx.closePath();
//                 // this.ctx.font = '30px Showcard Gothic';
//                 //this.ctx.font = '28px ShowcardGothic';
//
//                 //this.ctx.fontFamily = 'ShowcardGothic';
//
//                 // this.ctx.fillStyle = "#000000";
//                 // this.ctx.fillText("KUKU",100,100);
//                 //console.log("DONE");
//                 this.ctx.font = "50px ShowcardGothic";
//                 this.ctx.fillStyle = '#000000';
//                 this.ctx.textAlign = "center";
//                 this.ctx.textBaseline = 'middle';
//                 this.ctx.fillText(this.text, this.posX + this.width / 2, this.posY + this.height / 2);
//
//             }
//         }]);
//
//         return MenuButton;
//     }();
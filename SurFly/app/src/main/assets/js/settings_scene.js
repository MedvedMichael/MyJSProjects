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
    return _setPrototypeOf(o, p);
}

var SettingsScene =
    /*#__PURE__*/
    function (_Scene) {
        _inherits(SettingsScene, _Scene);

        function SettingsScene(canvas, game) {
            var _this;

            _classCallCheck(this, SettingsScene);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(SettingsScene).call(this, canvas, game));
            _this.menuButtons = [];
            var buttonWidth = canvas.width / 4,
                buttonHeight = buttonWidth / 4;
            _this.inputRanges = [];
            _this.startLoop();
            _this.playerImageLeft = this.initPicture("player_left.png");
            _this.playerImageRight = this.initPicture("player_right.png");
            var bestResult = Android.getBestResult().split(":");

            _this.inputRanges.push(new InputRange(canvas, "colorRange", (canvas.width - buttonWidth) / 2 - buttonWidth, (canvas.height - buttonHeight) / 2 - buttonHeight * 1.5, buttonWidth, buttonHeight, this, (bestResult.length >= 3)));
            _this.inputRanges.push(new InputRange(canvas, "fpsRange", (canvas.width - buttonWidth) / 2 + buttonWidth, (canvas.height - buttonHeight) / 2 - buttonHeight * 1.5 + buttonHeight / 4, buttonWidth, buttonHeight / 2, this, true));
            _this.menuButtons.push(new MenuButton(canvas, "playButton", (canvas.width - buttonWidth) / 2, (canvas.height - buttonHeight) / 2 + buttonHeight * 2, buttonWidth, buttonHeight, "PLAY", this, true));
            _this.menuButtons.push(new MenuButton(canvas, "playExclusiveButton", (canvas.width - buttonWidth) / 2 - buttonWidth, (canvas.height - buttonHeight) / 2, buttonWidth, buttonHeight, "Exclusive color", this, (bestResult.length >= 3 && bestResult[0] >= 2)));
            _this.player = _this.player = new Player(_this.canvas, _this.playerImageLeft, _this.playerImageRight);
            _this.faster = false;
            inputState.THROTTLE = true;
            _this.bool = true;

            return _this;
        }

        _createClass(SettingsScene, [{
            key: "onBackPressed",
            value: function onBackPressed() {
                this.endLoop();
                game.setScene(MenuScene);
            }
        }, {
            key: "render",
            value: function render() {
                _get(_getPrototypeOf(SettingsScene.prototype), "render", this).call(this);

                if (inputState.THROTTLE === false)
                    inputState.THROTTLE = true;
                this.player.render();

                this.player.pushStream();


                for (var i = 0; i < this.player.stream.length; i++) {
                    if (!this.player.stream[i].isDone()) this.player.stream[i].update(); else this.player.stream.splice(i, 1);
                }
                this.player.renderStream();
                for (var i = 0; i < this.menuButtons.length; i++) {
                    this.menuButtons[i].render();
                }
                for (var i = 0; i < this.inputRanges.length; i++) {
                    this.inputRanges[i].render();
                }

            }
        }]);

        return SettingsScene;
    }(Scene);
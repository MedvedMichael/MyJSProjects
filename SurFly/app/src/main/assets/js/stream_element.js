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

var StreamElement =
    /*#__PURE__*/
    function (_GameObject) {
        _inherits(StreamElement, _GameObject);

        function StreamElement(canvas, player) {
            var _this;

            _classCallCheck(this, StreamElement);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(StreamElement).call(this, canvas));
            _this.radius = Math.floor(Math.random() * 9);

            _this.radius *= renderSizeKoef;

            _this.width = _this.radius;
            _this.height = _this.radius;
            _this.direction = Math.floor(Math.random() * 47) - 23;
            _this.posX = player.posX + (player.width - _this.width) / 2;
            _this.posY = player.posY + player.height * 0.7;
            _this.startSpeed = 5;
            _this.speedX = _this.startSpeed * Math.sin(_this.direction * Math.PI / 180);
            _this.speedY = _this.startSpeed * Math.cos(_this.direction * Math.PI / 180);
            _this.friction = 0.97;
            _this.transparency = 0.5;
            _this.done = false;
            if (!exclusiveColor) {
                _this.redColor = colorOfSteam[0];
                _this.greenColor = colorOfSteam[1];
                _this.blueColor = colorOfSteam[2];
            } else {
                _this.redColor = Math.floor(Math.random() * 256);
                _this.greenColor = Math.floor(Math.random() * 256);
                _this.blueColor = Math.floor(Math.random() * 256);
            }
            return _this;
        }

        _createClass(StreamElement, [{
            key: "update",
            value: function update() {
                this.transparency -= 0.005;
                if (this.transparency <= 0) this.done = true;
                this.speedX *= this.friction;
                this.speedY *= this.friction;
                this.posX += this.speedX;
                this.posY += this.speedY;
            }
        }, {
            key: "isDone",
            value: function isDone() {
                return this.done;
            }
        }, {
            key: "render",
            value: function render() {
                //this.ctx.save();
                this.ctx.beginPath();
                this.ctx.arc(this.posX + this.width / 2, this.posY + this.height / 2, this.radius, 0, Math.PI * 2);

                if (!exclusiveColor) {
                    this.redColor = Math.floor(this.redColor * 0.91);
                    this.greenColor = Math.floor(this.greenColor * 0.91);
                    this.blueColor = Math.floor(this.blueColor * 0.91);
                }
                this.ctx.fillStyle = "rgba(" + this.redColor + "," + this.greenColor + "," + this.blueColor + "," + this.transparency + ")";
                this.ctx.fill();

                // this.ctx.restore();
            }
        }]);

        return StreamElement;
    }(GameObject);
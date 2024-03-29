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

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
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

var VerticalRocket =
    /*#__PURE__*/
    function (_Rocket) {
        _inherits(VerticalRocket, _Rocket);

        function VerticalRocket(canvas, player, image) {
            var _this;

            _classCallCheck(this, VerticalRocket);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(VerticalRocket).call(this, canvas, image));
            _this.speedY = _this.speed;
            //_this.speedY = 6 * renderSizeKoef;
            _this.direction = Math.floor(Math.random() * 2); // this.image.src = "rocket11.png";

            _this.angle = _this.direction ? 180 : 0;

            _this.setStartPosition(_this.setPosition, _assertThisInitialized(_this), player);

            return _this;
        }

        _createClass(VerticalRocket, [{
            key: "setPosition",
            value: function setPosition(rocket, player) {
                rocket.posY = rocket.direction ? 0 : rocket.canvas.height - rocket.height;
                rocket.posX = Math.floor(Math.random() * (rocket.canvas.width - rocket.width));
            }
        }, {
            key: "update",
            value: function update(player) {
                this.posY += (this.direction ? 1 : -1) * this.speedY;

                if (this.posY > this.canvas.height || this.posY + this.height < 0) {
                    this.done = true;
                }
            }
        }]);

        return VerticalRocket;
    }(Rocket); //this.ctx.stroke();
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

var HorizontalRocket =
    /*#__PURE__*/
    function (_Rocket) {
        _inherits(HorizontalRocket, _Rocket);

        function HorizontalRocket(canvas, player, image) {
            var _this;

            _classCallCheck(this, HorizontalRocket);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(HorizontalRocket).call(this, canvas, image));
           _this.speedX = _this.speed;
           // _this.speedX = 6 * renderSizeKoef;
            _this.direction = Math.floor(Math.random() * 2); //left 0 right 1

            _this.angle = 90 * (_this.direction ? 1 : -1);
            _this.randomKoeficient = 5; //this.posX = (this.direction) ? 0 : (canvas.width - this.width);
            //this.posY = Math.floor(Math.random() * (canvas.height - this.height));

            _this.setStartPosition(_this.setPosition, _assertThisInitialized(_this), player); // console.log("ROCKET: " + this.image);


            return _this;
        }

        _createClass(HorizontalRocket, [{
            key: "setPosition",
            value: function setPosition(rocket, player) {
                rocket.posX = rocket.direction ? 0 : rocket.canvas.width - rocket.width;
                var random = Math.floor(Math.random() * rocket.randomKoeficient);
                if (random === 0) rocket.posY = Math.random() * (player.height - rocket.height) + player.posY; else rocket.posY = Math.random() * (rocket.canvas.height - rocket.height);
            }
        }, {
            key: "update",
            value: function update(player) {
                this.posX += (this.direction ? 1 : -1) * this.speedX;
                if (this.posX > this.canvas.width || this.posX + this.width < 0) this.done = true;
            }
        }]);

        return HorizontalRocket;
    }(Rocket);
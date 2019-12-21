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

var ExtraLife =
    /*#__PURE__*/
    function (_Rocket) {
        _inherits(ExtraLife, _Rocket);

        function ExtraLife(canvas, player, image) {
            var _this;

            _classCallCheck(this, ExtraLife);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(ExtraLife).call(this, canvas, image));
            _this.posX = Math.floor(Math.random() * (_this.canvas.width - 2 * player.width) + player.width);
            _this.posY = Math.floor(Math.random() * (_this.canvas.height - 2 * player.height) + player.height);
            _this.height = player.height * 0.5;
            _this.width = _this.image.width * _this.height / _this.image.height;
            _this.width *= renderSizeKoef;
            _this.height *= renderSizeKoef;
            _this.startTime = performance.now();
            _this.done = false;
            _this.enabledTime = 8000;
            return _this;
        }

        _createClass(ExtraLife, [{
            key: "update",
            value: function update(player) {
                if (performance.now() - this.startTime > this.enabledTime) this.done = true;
            }
        },{
            key: "render",
            value: function render() {
                // this.ctx.fillStyle = "#000000";
                // this.ctx.fillRect( -this.width / 2, -this.height / 2,this.width,this.height);
               _get(_getPrototypeOf(VerticalRocket.prototype), "render", this).call(this);
            }
        }]);

        return ExtraLife;
    }(Rocket);
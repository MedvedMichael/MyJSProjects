"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Rocket =
/*#__PURE__*/
function (_GameObject) {
  _inherits(Rocket, _GameObject);

  function Rocket(canvas, image) {
    var _this;

    _classCallCheck(this, Rocket);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rocket).call(this, canvas, image));
    _this.speed = rocketsSpeed;
    _this.done = false;
    _this.width = 28 / 2;
    _this.height = 50 / 2; //this.canvas = canvas;

    _this.width *= renderSizeKoef;
    _this.height *= renderSizeKoef;

    //this.ctx = this.canvas.getContext("2d");

    return _this;
  }

  _createClass(Rocket, [{
    key: "setStartPosition",
    value: function setStartPosition(func, rocket, player) {
      func(rocket, player);
      if (rocket.isCollision(player)) rocket.setStartPosition(func, rocket, player);
    }
  }, {
    key: "setPosition",
    value: function setPosition() {}
  }, {
    key: "isDone",
    value: function isDone() {
      return this.done;
    }
  }, {
    key: "isCollision",
    value: function isCollision(player) {
      return !(this.posX > (player.posX + player.width) || (this.posX + this.width) < player.posX
          || (this.posY + this.height) < player.posY || this.posY > (player.posY + player.height));
    }
  }, {
    key: "render",
    value: function render() {
      // this.ctx.fillStyle = '#000000';
      _get(_getPrototypeOf(Rocket.prototype), "render", this).call(this); //     this.ctx.fillRect(this.posX,this.posY,this.width,this.height);

    }
  }]);

  return Rocket;
}(GameObject);
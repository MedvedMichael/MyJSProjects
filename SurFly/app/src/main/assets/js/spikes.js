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

var Spikes =
/*#__PURE__*/
function (_GameObject) {
  _inherits(Spikes, _GameObject);

  function Spikes(canvas, player, image, up_or_down) {
    var _this;

    _classCallCheck(this, Spikes);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Spikes).call(this, canvas, image));
    _this.posX = 0;
    //console.log("UD" + up_or_down);
    if (up_or_down !== undefined) _this.up_or_down = up_or_down;else _this.up_or_down = Math.floor(Math.random() * 2); //0 up 1 down

    _this.height = player.height;
    _this.width = _this.image.width * _this.height / _this.image.height;

    _this.width *= renderSizeKoef;
        _this.height *= renderSizeKoef;

    _this.posY = _this.up_or_down ? canvas.height : -_this.height;
    _this.firstPosY = _this.posY; // this.posY += this.height;

    _this.angle = _this.up_or_down ? 180 : 0;
    _this.numberOfRender = Math.ceil(_this.canvas.width / _this.width);
    _this.initAndDeleteTime = 1000;
    _this.enabledTime = _this.initAndDeleteTime + 3000;
    _this.time = performance.now();
    _this.enabled = false;
    _this.done = false;
    _this.image.opacity = 0.2; //console.log("DONE");

    return _this;
  }

  _createClass(Spikes, [{
    key: "isDone",
    value: function isDone() {
      return this.done;
    }
  }, {
    key: "update",
    value: function update(player) {
      if (performance.now() - this.time < this.initAndDeleteTime) {
        var koef = (-performance.now() + this.time + this.initAndDeleteTime) / this.initAndDeleteTime;
        this.posY = this.firstPosY + Math.pow(-1, this.up_or_down) * this.height * (1 - koef);
      } else if (performance.now() - this.time >= this.initAndDeleteTime && performance.now() - this.time < this.enabledTime) {
        this.enabled = true;
      } else if (performance.now() - this.time >= this.enabledTime && performance.now() - this.time < this.initAndDeleteTime + this.enabledTime) {
        var _koef = (-performance.now() + this.time + (this.initAndDeleteTime + this.enabledTime)) / this.initAndDeleteTime;
        this.posY = this.firstPosY + Math.pow(-1, this.up_or_down) * this.height * _koef;
        this.enabled = false;
      } else this.done = true;
    }
  }, {
    key: "isCollision",
    value: function isCollision(player) {
      if (this.enabled) {
      if (this.up_or_down && player.posY + player.height >= this.canvas.height - this.height || !this.up_or_down && player.posY <= this.height) {
        return true;
      }
      }
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      //console.log("RENDER");
      for (var i = 0; i < this.numberOfRender; i++) {
        _get(_getPrototypeOf(Spikes.prototype), "render", this).call(this);

        this.posX += this.width;
      }

      //console.log("RENDER");
      this.posX = 0;
    }
  }]);

  return Spikes;
}(GameObject);
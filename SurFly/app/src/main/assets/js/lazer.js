"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Lazer =
/*#__PURE__*/
function (_GameObject) {
  _inherits(Lazer, _GameObject);

  function Lazer(canvas, player) {
    var _this;

    _classCallCheck(this, Lazer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Lazer).call(this, canvas));
    _this.time = performance.now();
    var random = Math.floor(Math.random() * 3);
    _this.vertical_or_horizontal = random === 0; // vert 0 horiz 1

    _this.speed = lazersSpeed;
    _this.enabled = false;
    _this.minWidth_Height = 3 * renderSizeKoef;

    _this.transparence = 0;
    _this.done = false;
    _this.width = _this.vertical_or_horizontal ? canvas.width : _this.minWidth_Height;
    _this.height = _this.vertical_or_horizontal ? _this.minWidth_Height : canvas.height;
    _this.posX = _this.vertical_or_horizontal ? 0 : Math.random() * (canvas.width - _this.width);
    _this.posY = _this.vertical_or_horizontal ? Math.random() * (canvas.height - _this.height - 3 * player.height) + 1.5 * player.height : 0;

    var sp = Math.pow(-1, Math.floor(Math.random() * 2)) * _this.speed;

    if (_this.vertical_or_horizontal) _this.speedY = sp;else _this.speedX = sp; // if (this.vertical_or_horizontal) {
    //     this.width = canvas.width;
    //     this.height = this.minWidth_Height;
    //     this.posX = 0;
    //     this.posY = Math.floor(Math.random() * (canvas.height - this.height - 1.5 * player.height) + player.height);
    //     this.speedY = Math.pow(-1, Math.floor(Math.random() * 2)) * this.speed;
    //
    // } else {
    //     this.height = canvas.height;
    //     this.width = this.minWidth_Height;
    //     this.posY = 0;
    //     this.posX = Math.floor(Math.random() * (canvas.width - this.width));
    //     this.speedX = Math.pow(-1, Math.floor(Math.random() * 2)) * this.speed;
    // }

    return _this;
  }

  _createClass(Lazer, [{
    key: "isDone",
    value: function isDone() {
      return this.done;
    }
  }, {
    key: "update",
    value: function update(player, lazers) {
      if (performance.now() - this.time <= 1000) {
        var koeficient = (performance.now() - this.time) / 1000;
        this.transparence = koeficient;
        var width_height = this.minWidth_Height * (1 + koeficient);
        if (this.vertical_or_horizontal) this.height = width_height;else this.width = width_height;
      } else if (performance.now() - this.time > 1000 && performance.now() - this.time < 3000) {
        this.enabled = true;

        if (this.vertical_or_horizontal) {
          for (var i = 0; i < lazers.length; i++) {
            if (lazers[i].vertical_or_horizontal && Math.abs(lazers[i].posY - this.posY) <= player.height * 5) {
              var minimum = Math.min(lazers[i].posY, this.posY) === this.posY;

              if (minimum && player.posY > this.posY + this.height && player.posY + player.height < lazers[i].posY || !minimum && player.posY > lazers[i].posY + lazers[i].height && player.posY + player.height < this.posY) {
                var sp = (minimum ? -1 : 1) * this.speed;
                this.speedY = sp;
                lazers[i].speedY = -sp;
                break;
              } // lazers[i].speedY = -lazers[i].speedY;

            }
          }

          if (this.posY < player.height * 1.5 || this.posY + this.height > this.canvas.height - player.height * 1.5) this.speedY = -this.speedY;
          this.posY += this.speedY;
        } else {
          this.posX += this.speedX;
        }
      } else if (performance.now() - this.time >= 3000 && performance.now() - this.time <= 4000) {
        var _koeficient = (performance.now() - this.time - 3000) / 1000;

        this.transparence = 1 - _koeficient;

        var _width_height = this.minWidth_Height * (2 - _koeficient);

        if (this.vertical_or_horizontal) this.height = _width_height;else this.width = _width_height;
        this.enabled = false;
      } else this.done = true;
    }
  }, {
    key: "isCollision",
    value: function isCollision(player) {
      if (this.enabled) {
        if (this.vertical_or_horizontal) {
          if (this.posY + this.height >= player.posY && this.posY <= player.posY + player.height) return true;
        } else {
          if (this.posX + this.width >= player.posX && this.posX <= player.posX + player.width) return true;
        }
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      //console.log(this.posX + " " + this.posY);
      var deltaLength = this.vertical_or_horizontal ? this.height / 2 : this.width / 2;
      this.ctx.fillStyle = 'rgba(246,42,44,' + this.transparence + ')';
      this.ctx.fillRect(this.posX - (this.vertical_or_horizontal ? 0 : deltaLength), this.posY - (!this.vertical_or_horizontal ? 0 : deltaLength), this.width + (!this.vertical_or_horizontal ? deltaLength * 2 : 0), this.height + (this.vertical_or_horizontal ? deltaLength * 2 : 0));
      this.ctx.fillStyle = 'rgba(246,100,100,' + this.transparence + ')';
      this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
      //this.ctx.fillStyle = '#000000';
    }
  }]);

  return Lazer;
}(GameObject);
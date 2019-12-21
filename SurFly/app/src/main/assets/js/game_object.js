"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameObject =
/*#__PURE__*/
function () {
  function GameObject(canvas, image) {
    _classCallCheck(this, GameObject);

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.image = image;
    this.angle = 0;
  }

  _createClass(GameObject, [{
    key: "update",
    value: function update(player) {}
  }, {
    key: "render",
    value: function render() {
      this.ctx.save();
      this.ctx.translate(this.posX + this.width / 2, this.posY + this.height / 2);
      this.ctx.rotate(this.angle * Math.PI / 180); //this.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

      this.ctx.drawImage(this.image, -this.width / 2, -this.height / 2,this.width,this.height);
     // this.ctx.beginPath();
     //  this.ctx.rect(-this.width / 2, -this.height / 2,this.width,this.height);
      //this.ctx.stroke();
      this.ctx.restore();
    }
  }]);

  return GameObject;
}();
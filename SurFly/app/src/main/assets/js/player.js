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

var Player =
    /*#__PURE__*/
    function (_GameObject) {
        _inherits(Player, _GameObject);

        function Player(canvas, imageLeft, imageRight) {
            var _this;

            _classCallCheck(this, Player);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this, canvas, imageRight)); //this.canvas = canvas;
            //this.ctx = this.canvas.getContext("2d");
            // console.log(this.canvas);

            _this.imageLeft = imageLeft;
            _this.imageRight = imageRight;
            _this.direction = 0; //0 left 1 right

            _this.lives = 3;
            _this.stream = [];
            _this.speedX = 0;
            _this.speedY = 0;
            _this.maxSpeed = 10 * renderSizeKoef;
            _this.accelerateX = 0.4 * renderSizeKoef;
            _this.accelerateY = 0.3 * renderSizeKoef;
            _this.engineAccelerate = 2 * _this.accelerateY;
            _this.friction = 0.95;
            _this.unvulnerability = false; //neuyazvimost'
            // console.log(this.image);
            //this.image.src = "rocket11.png"; // 28x40

            _this.width =
                /*this.image.width; */
                28;
            _this.height =
                /*this.image.height;*/
                40;

            _this.width *= renderSizeKoef;
            _this.height *= renderSizeKoef;

            _this.posX = _this.canvas.width / 2 - _this.width / 2;
            _this.posY = _this.canvas.height / 2 - _this.height / 2; //console.log(this.image.width);
            // this.image = new Image(this.width, this.height);
            // this.image.src = "rocket11.png";
            // this.image.width = this.width;
            // this.image.height = this.height;

            return _this;
        }

        _createClass(Player, [{
            key: "update",
            value: function update() {
                for (var i = 0; i < this.stream.length; i++) {
                    if (!this.stream[i].isDone()) this.stream[i].update(); else this.stream.splice(i, 1);
                } //console.log("UPDATE");


                if (inputState.LEFT) {
                    this.speedX -= this.accelerateX;
                    this.direction = 0;
                } else if (inputState.RIGHT) {
                    this.speedX += this.accelerateX;
                    this.direction = 1;
                } else {
                    if (this.speedX !== 0) this.speedX *= this.friction;
                }

                // if (inputState.THROTTLE) {
                //     this.speedY -= this.engineAccelerate;
                //
                //     for (var _i = 0; _i < 5; _i++) {
                //         this.stream.push(new StreamElement(this.canvas, this));
                //     }
                // }

                this.pushStream();

                if (this.posY !== 0) this.speedY += this.accelerateY;

                function setMaxSpeed(speed, player) {
                    if (Math.abs(speed) > player.maxSpeed) {
                        speed = player.maxSpeed * (speed > 0 ? 1 : -1);
                    }

                    return speed;
                } // if (Math.abs(this.speedY) > this.maxSpeed)
                //     this.speedY = this.maxSpeed * ((this.speedY>0)?1:(-1));
                //
                // if (this.speedX > this.maxSpeed)
                //     this.speedY = this.maxSpeed * ((this.speedY>0)?1:(-1));


                this.speedY = setMaxSpeed(this.speedY, this);
                this.speedX = setMaxSpeed(this.speedX, this);
                this.posX += this.speedX;
                this.posY += this.speedY;
                if (this.posX > this.canvas.width) this.posX = -this.width; else if (this.posX + this.width < 0) this.posX = this.canvas.width;

                if (this.posY + this.height > this.canvas.height) {
                    this.posY = this.canvas.height - this.height;
                    this.speedY = -this.speedY * 0.3;
                } else if (this.posY < 0) {
                    this.posY = 0;
                    this.speedY = -this.speedY * 0.3;
                }

                for (var _i2 = 0; _i2 < this.stream.length; _i2++) {
                    this.stream[_i2].update();
                }
            }
        }, {
            key: "render",
            value: function render() {
                this.image = this.direction ? this.imageRight : this.imageLeft;

                _get(_getPrototypeOf(Player.prototype), "render", this).call(this);
            }
        },{
            key: "pushStream",
            value: function pushStream() {
                if (inputState.THROTTLE) {
                    this.speedY -= this.engineAccelerate;

                    for (var _i = 0; _i < 5; _i++) {
                        this.stream.push(new StreamElement(this.canvas, this));
                    }
                }
            }
        }, {
            key: "renderStream",
            value: function renderStream() {
               // console.log("STEAM: " + this.stream.length);
                for (var i = 0; i < this.stream.length; i++) {
                    this.stream[i].render();
                }
            } // render() {
            //     // console.log(this.canvas.height);
            //
            //     this.ctx.translate(this.posX + this.width / 2, this.posY + this.height / 2);
            //     this.ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
            // }

        }]);

        return Player;
    }(GameObject);
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

var GameScene =
    /*#__PURE__*/
    function (_Scene) {
        _inherits(GameScene, _Scene);

        // playerImage;
        // rocketImage;
        // heartImage;
        function GameScene(canvas, game) {
            var _this;
//console.log("SET");
            _classCallCheck(this, GameScene);

            _this = _possibleConstructorReturn(this, _getPrototypeOf(GameScene).call(this, canvas, game));
            _this.canvas = canvas;

            _this.initInput();

            _this.startLoop(); //canvas.getContext("2d").drawImage(this.player.image,100,100);

            _this.rockets = [];
            _this.lazers = [];
            _this.spikes = [];
            _this.extraLives = [];
            _this.gameTime = performance.now();

            _this.initAllPictures();
            rocketsSpeed = 6* renderSizeKoef;
            lazersSpeed = 2 * renderSizeKoef;

            _this.player = new Player(_this.canvas, _this.playerImageLeft, _this.playerImageRight);
            _this.delay = 50;
            _this.renderBool = true;
            _this.timerDelay = 0;
            _this.timerForPlayer = 0;
            _this.timeForPlayerRenderDelay = 1500;
            _this.spawnDelay = 1000;
            _this.timerForSpawnExtraLifes = performance.now();
            _this.spawnExtraLifesDelay = 10000;
            _this.lastSpawnTime = performance.now(); //this.spikes.push(new Spikes(this.canvas, this.player, this.spikesImage,0));
            // this.lazers.push(new Lazer(canvas, this.player));
            // this.spikes.push(new Spikes(this.canvas,this.player));
            // for (var i = 0; i < 3; i++) {
            //     _this.extraLives.push(new ExtraLife(_this.canvas, _this.player, _this.heartImage));
            // }
            //console.log(_this.extraLives);
            //console.log(this.rockets);
            // for (let i = 0; i < 3; i++) {
            //     this.rockets.push(new HorizontalRocket(this.canvas));
            // }

            return _this;
        }

        _createClass(GameScene, [{
            key: "initAllPictures",
            value: function initAllPictures() {
                this.playerImageLeft = this.initPicture("player_left.png");
                this.playerImageRight = this.initPicture("player_right.png");
                this.rocketImage = this.initPicture("rocket_red.png");
                this.heartImage = this.initPicture("heart.png");
                this.spikesImage = this.initPicture("treugolnik.png");
            }
        },
            //     {
            //     key: "spawnEnemies",
            //     value: function spawnEnemies() {
            //         {
            //             if (performance.now() - this.lastSpawnTime > 5000) {
            //                 //console.log("SP: " + this.spawnDelay);
            //                 this.lastSpawnTime = performance.now();
            //                 this.extraLives.push(new ExtraLife(this.canvas, this.player, this.heartImage));
            //             }
            //         }
            //
            //     }
            // },
            {
                key: "checkForAvailableSpikes",
                value: function checkForAvailableSpikes(up_or_down) {
                    for (var i = 0; i < this.spikes.length; i++) {
                        if (this.spikes[i].up_or_down === up_or_down) return true;
                    }

                    return false;
                }
            },
            {
                key: "spawnEnemies",
                value: function spawnEnemies() {
                    if (performance.now() - this.lastSpawnTime > this.spawnDelay) {
                        if (this.spawnDelay > 500)
                            this.spawnDelay -= 15;
                        else {
                            this.spawnDelay = 500;
                            rocketsSpeed+=0.02;
                            lazersSpeed+=0.002;
                        }
                        //console.log("SP: " + this.spawnDelay);
                        this.lastSpawnTime = performance.now();
                        var choice = Math.floor(Math.random() * 5);
                        var choiceForSpikes = Math.floor(Math.random() * 15);

                        if (choiceForSpikes >= 1 && choiceForSpikes <= 2) {
                            for (var i = 0; i <= 1; i++) {
                                if (!this.checkForAvailableSpikes(i)) {
                                    this.spikes.push(new Spikes(this.canvas, this.player, this.spikesImage, i));
                                    break;
                                }
                            }
                        } else if (choiceForSpikes === 3 && !this.checkForAvailableSpikes(0) && !this.checkForAvailableSpikes(1)) {
                            this.spikes.push(new Spikes(this.canvas, this.player, this.spikesImage, 0));
                            this.spikes.push(new Spikes(this.canvas, this.player, this.spikesImage, 1));
                        }

                        if (choice <= 3 && choice >= 2)
                            this.rockets.push(new VerticalRocket(this.canvas, this.player, this.rocketImage));
                        else if (choice >= 0 && choice <= 1)
                            this.rockets.push(new HorizontalRocket(this.canvas, this.player, this.rocketImage));
                        else
                            this.lazers.push(new Lazer(this.canvas, this.player));
                    }
                }
            }, {
                key: "spawnExtraLifes",
                value: function spawnExtraLifes() {
                    if (performance.now() - this.timerForSpawnExtraLifes >= this.spawnExtraLifesDelay) {
                        this.timerForSpawnExtraLifes = performance.now();
                        if (this.player.lives + this.extraLives.length < 3) this.extraLives.push(new ExtraLife(this.canvas, this.player, this.heartImage));
                    }
                }
            }, {
                key: "checkForCollision",
                value: function checkForCollision(arrayOfGameObjects) {
                    for (var i = 0; i < arrayOfGameObjects.length; i++) {
                        arrayOfGameObjects[i].update(this.player, this.lazers);

                        if (arrayOfGameObjects[i].isCollision(this.player)) {
                            if (arrayOfGameObjects[i].constructor.name === "ExtraLife") this.player.lives++;
                            else {
                                if (!this.player.unvulnerability) {
                                    this.player.lives--;
                                    this.player.unvulnerability = true;
                                    this.timerDelay = performance.now();
                                    this.timerForPlayer = performance.now();
                                    Android.vibrate();
                                }
                            }
                            arrayOfGameObjects[i].done = true;
                        }

                        if (arrayOfGameObjects[i].posX + arrayOfGameObjects[i].width < 0 && arrayOfGameObjects[i].posX > this.canvas.width && arrayOfGameObjects[i].posY + arrayOfGameObjects[i].height < 0 && arrayOfGameObjects[i].posY > this.canvas.height) {
                            arrayOfGameObjects[i].done = true;
                            // console.log(arrayOfGameObjects[i]);
                        }

                        if (arrayOfGameObjects[i].isDone()) {
                            arrayOfGameObjects.splice(i, 1);
                        }
                    }
                }
            }, {
                key: "update",
                value: function update() {
                    // console.log("UPDATE");

                    this.player.update();
                    this.checkForCollision(this.lazers);
                    this.checkForCollision(this.rockets);
                    this.checkForCollision(this.spikes);
                    this.checkForCollision(this.extraLives); //TODO vibrate phone on collision

                    if (performance.now() - this.timerForPlayer >= this.timeForPlayerRenderDelay) this.player.unvulnerability = false;
                    if (this.player.lives <= 0) {
                        Android.endOfGame(this.getFormattedTime());
                        this.endGame();
                    }
                    this.spawnEnemies();
                    this.spawnExtraLifes();
                }
            }, {
                key: "renderElements",
                value: function renderElements(arrayOfGameObjects) {
                    //console.log(arrayOfGameObjects);
                    for (var i = 0; i < arrayOfGameObjects.length; i++) {
                        arrayOfGameObjects[i].render();
                    }
                }
            }, {
                key: "renderLifes",
                value: function renderLifes() {
                    var startPosX = (this.canvas.width - this.heartImage.width * renderSizeKoef * this.player.lives) / 2;
                    var ctx = this.canvas.getContext("2d");
                    ctx.fillStyle = "#5fa0ff";
                    ctx.fillRect(startPosX - 10,0,this.heartImage.width * renderSizeKoef*this.player.lives + 20,this.heartImage.height * renderSizeKoef + 20);

                    for (var i = 0; i < this.player.lives; i++) {
                        ctx.drawImage(this.heartImage, startPosX, 10, this.heartImage.width * renderSizeKoef, this.heartImage.height * renderSizeKoef);
                        startPosX += this.heartImage.width * renderSizeKoef;
                    }
                }
            }, {
                key: "renderGameTime",
                value: function renderGameTime() {

                    var timeText = this.getFormattedTime();
                    var ctx = this.canvas.getContext("2d");
                    // ctx.font = '40pt Calluna';
                    //ctx.font = '50px "ShowcardGothic"';
                    ctx.fillStyle = '#000000';
                    ctx.textAlign = "center";
                    ctx.textBaseline = 'middle';
                    var widthOfText = ctx.measureText(timeText).width;
                    var heightOfText = ctx.measureText("M").width;
                    ctx.fillText(timeText, /*this.canvas.width - */widthOfText / 2 * 1.2, heightOfText / 2 + widthOfText / 2 * 0.2);
                }
            }, {
                key: "getFormattedTime",
                value: function getFormattedTime() {
                    {
                        var currentTime = performance.now() - this.gameTime;
                        var minutes = Math.floor(currentTime / 60000);
                        var seconds = Math.floor((currentTime - minutes * 60000) / 1000);
                        var milliseconds = Math.floor((currentTime - minutes * 60000) % 1000 / 10);
                        return ((minutes !== 0) ? (minutes + ":") : "") + ((seconds < 10) ? "0" : "") + seconds + ":" + ((milliseconds < 10) ? "0" : "") + milliseconds;
                    }
                }
            }, {
                key: "render",
                value: function render() {
                    var ctx = this.canvas.getContext("2d"); //     //ctx.save();

                    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    ctx.drawImage(this.backgroundPicture, 0, -(this.canvas.width * this.backgroundPicture.height / this.backgroundPicture.width - this.canvas.height) / 2, this.canvas.width, this.canvas.width * this.backgroundPicture.height / this.backgroundPicture.width);
                    // console.log(this.canvas.width);
                    this.renderElements(this.lazers);
                    this.renderElements(this.rockets);
                    this.renderElements(this.spikes);
                    this.renderElements(this.extraLives);
                    this.player.renderStream();
                    this.renderLifes(); //    // console.log(this.spikes);


                    if (this.player.unvulnerability) {
                        if (performance.now() - this.timerDelay >= this.delay) {
                            this.renderBool = !this.renderBool;
                            this.timerDelay = performance.now();
                        }
                    }

                    if (this.renderBool || !this.player.unvulnerability) this.player.render(); //     //ctx.restore();

                    this.renderGameTime();
                }
            }, {
                key: "onBackPressed",
                value: function onBackPressed() {
                    this.endGame();
                }
            }, {
                key: "endGame",
                value: function endGame() {
                    this.endLoop();
                    document.removeEventListener("touchstart", this.initTouchStart);
                    document.removeEventListener("touchend", this.initTouchEnd);
                    if (exclusiveColor) {
                        exclusiveColor = false;
                        colorOfSteam = lastColorOfSteam;
                    }
                    game.setScene(MenuScene);
                }
            }, {
                key: "initTouchStart",
                value: function initTouchStart(event) {
                    event.preventDefault();
                    inputState.THROTTLE = true;
                    var touches = event.changedTouches;

                    if (event.targetTouches.length === 1) {
                        // console.log(touches[0].clientX);

                        if (touches[0].clientX < HTMLWidth / 2) {
                            inputState.LEFT = true;
                        } else {
                            inputState.RIGHT = true;
                        }
                    } else {
                        inputState.LEFT = false;
                        inputState.RIGHT = false;
                    }
                }
            }, {
                key: "initTouchEnd",
                value: function initTouchEnd(event) {
                    event.preventDefault();
                    inputState.THROTTLE = false;
                    inputState.LEFT = false;
                    inputState.RIGHT = false;

                    if (event.targetTouches.length === 1) {
                        inputState.THROTTLE = true;

                        if (event.changedTouches[0].clientX < HTMLWidth / 2) {
                            inputState.RIGHT = true;
                        } else {
                            inputState.LEFT = true;
                        }
                    }
                }
            }, {
                key: "initInput",
                value: function initInput() {
                    var _this2 = this;

                    function touchHandler(event) {
                        var touches = event.changedTouches,
                            first = touches[0],
                            type = ""; //console.log("KUKU");

                        switch (event.type) {
                            case "touchstart":
                                type = "mousedown";
                                break;

                            case "touchmove":
                                type = "mousemove";
                                break;

                            case "touchend":
                                type = "mouseup";
                                break;

                            default:
                                return;
                        } // initMouseEvent(type, canBubble, cancelable, view, clickCount,
                        //                screenX, screenY, clientX, clientY, ctrlKey,
                        //                altKey, shiftKey, metaKey, button, relatedTarget);


                        var simulatedEvent = document.createEvent("MouseEvent");
                        simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0
                            /*left*/
                            , null);
                        first.target.dispatchEvent(simulatedEvent);
                        event.preventDefault();
                    }

                    document.addEventListener("mousedown", function (event) {
                        //event.preventDefault();
                        inputState.THROTTLE = true;

                        if (event.screenX <= _this2.canvas.width / 2) {
                            inputState.LEFT = true;
                        } else {
                            inputState.RIGHT = true;
                        }
                    });
                    document.addEventListener("mouseup", function (event) {
                        //event.preventDefault();
                        inputState.THROTTLE = false;
                        inputState.LEFT = false;
                        inputState.RIGHT = false;
                    });

                    document.addEventListener("touchend", this.initTouchEnd);
                    document.addEventListener("touchstart", this.initTouchStart);

                }
            }]);

        return GameScene;
    }(Scene);
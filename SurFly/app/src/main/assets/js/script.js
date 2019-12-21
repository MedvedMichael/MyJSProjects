"use strict";

var inputState = {
    LEFT: false,
    RIGHT: false,
    THROTTLE: false
};
var renderSizeKoef = 1.5;
var HTMLWidth, HTMLHeight;
var displayWidth, displayHeight;
var kWidth, kHeight;
var rocketsSpeed = 6 * renderSizeKoef, lazersSpeed = 2 * renderSizeKoef;

var colorOfSteam = [Android.getRedColor(), Android.getGreenColor(), Android.getBlueColor()];
//var colorOfSteam = [255,0,0];
var lastColorOfSteam = colorOfSteam;

var exclusiveColor = false;

// alert(colorOfSteam);
var mainFPS = Android.getFPS();
if (mainFPS > 60)
    mainFPS = 60;
if (mainFPS < 20)
    mainFPS = 20;
var color = Android.getColor();
// alert(color);

var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'css/style.css';
document.getElementsByTagName('head')[0].appendChild(link);


var game;

var myFont = new FontFace('ShowcardGothic', 'url(css/showg.ttf)');

myFont.load().then(function (font) {
    document.fonts.add(font);
    console.log('Font loaded');
    //var ctx = document.getElementById("gameCanvas").getContext("2d");

    game = new Game();
});

// var example = document.getElementById('gameCanvas');
// var context = example.getContext('2d');
// context.fillStyle = "rgb(255,0,0)";
// context.fillRect(0, 0, 50, 50);
// context.fillStyle = "rgb(0,0,255)";
// context.fillRect(55, 0, 50, 50);
//
// var image = new Image();
//
// image.onload = function () {
//
//     context.drawImage(this,100,100);
//
// };
//
// image.src = "file:///android_asset/palitra2.png";
// // image.setAttribute('crossOrigin', '');
//
//
// example.addEventListener("touchmove", function(e) {
//
//     var x = e.changedTouches[0].clientX;
//     var y = e.changedTouches[0].clientY;
//     var coord = "x=" + x + ", y=" + y;
//     var c = this.getContext('2d');
//     var p = c.getImageData(x, y, 1, 1).data;
//     console.log(p[0] + " " + p[1] + " " + p[2]);
//
//    // var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
//    // $('#status').html(coord + "<br>" + hex);
// });

// var example = document.getElementById('gameCanvas');
// var context = example.getContext('2d');
//
// var downloadedImg = new Image;
// //downloadedImg.crossOrigin = "Anonymous";
// downloadedImg.addEventListener("load", function (ev) { context.drawImage(downloadedImg,0,0); }, false);
// downloadedImg.src = "file:///android_asset/palitra2.png";
//
//
//
// example.addEventListener("touchmove", function(e) {
//
//     var x = e.changedTouches[0].clientX;
//     var y = e.changedTouches[0].clientY;
//     var coord = "x=" + x + ", y=" + y;
//     var c = this.getContext('2d');
//     var p = c.getImageData(x, y, 1, 1).data;
//     console.log(p[0] + " " + p[1] + " " + p[2]);
//
//    // var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
//    // $('#status').html(coord + "<br>" + hex);
// });


function getBase64FromImageUrl(url) {
    var img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    };

    img.src = url;
}

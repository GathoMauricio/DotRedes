cordova.define("com.flyingsoftgames.ondestroyplugin.OnDestroyPlugin", function(require, exports, module) { module.exports = function () {
 exports.setEventListener = function (callback) {
  cordova.exec (callback, undefined, "OnDestroy", "setEventListener", [])
 }
 return exports
} ()
});

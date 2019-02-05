// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic', 'ui.router', 'ion-gallery', 'ngCordova']);

//app.run(function ($ionicPlatform) {
//  $ionicPlatform.ready(function () {
//    window.FirebasePlugin.getToken(function (token) {
//      alert(token);
//    }, function (error) {
//      console.error(error);
//    });
//    this.receivedEvent('deviceready');   

//    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//    // for form inputs).
//    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
//    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
//    // useful especially with forms, though we would prefer giving the user a little more room
//    // to interact with the app.
//    //if (window.cordova && window.Keyboard) {
//    //  window.Keyboard.hideKeyboardAccessoryBar(true);
//    //}

//    //if (window.StatusBar) {
//    //  // Set the statusbar to use the default style, tweak this to
//    //  // remove the status bar on iOS or change it to use white instead of dark colors.
//    //  StatusBar.styleDefault();
//    //}
//  });
//});

document.addEventListener("deviceready", function () {
  window.FirebasePlugin.getToken(function (token) {
    alert(token);
  }, function (error) {
    console.error(error);
  });
  //this.receivedEvent('deviceready');
}, false);

app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
      url: '/home',
      templateUrl: 'pages/home/home.html'
    })

    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('about', {
      // we'll get to this in a bit       
    });

});

app.factory('Base64', function () {
  var keyStr = 'ABCDEFGHIJKLMNOP' +
    'QRSTUVWXYZabcdef' +
    'ghijklmnopqrstuv' +
    'wxyz0123456789+/' +
    '=';
  return {
    encode: function (input) {
      var output = "";
      var chr1, chr2, chr3 = "";
      var enc1, enc2, enc3, enc4 = "";
      var i = 0;

      do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }

        output = output +
          keyStr.charAt(enc1) +
          keyStr.charAt(enc2) +
          keyStr.charAt(enc3) +
          keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
      } while (i < input.length);

      return output;
    },

    decode: function (input) {
      var output = "";
      var chr1, chr2, chr3 = "";
      var enc1, enc2, enc3, enc4 = "";
      var i = 0;

      // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
      var base64test = /[^A-Za-z0-9\+\/\=]/g;
      if (base64test.exec(input)) {
        alert("There were invalid base64 characters in the input text.\n" +
          "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
          "Expect errors in decoding.");
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 !== 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
          output = output + String.fromCharCode(chr3);
        }

        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

      } while (i < input.length);

      return output;
    }
  };
});

app.factory('UrlBaseApi', function () {
  var apiUrl = "http://dev2662.cloudapp.net:5105";

  return apiUrl;
});
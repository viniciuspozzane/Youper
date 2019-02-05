app.controller('home', ['$scope', '$http', '$location', '$window', '$cordovaCamera', 'UrlBaseApi',
  function ($scope, $http, $location, $window, $cordovaCamera, UrlBaseApi) {
    var vm = this;

    vm.image = null;

    vm.pickPicture = function () {
      navigator.camera.getPicture(onSuccess, onFail,
        {
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true,
            quality: 75,
            allowEdit: true,
            targetWidth: 200,
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.PNG,
            saveToPhotoAlbum:false
        });
        function onSuccess(imageData) {
            vm.image = "data:image/png;base64," + imageData;

            $http({
                method: "POST",
                dataType: 'jsonp',
                data: 
                {
                    'fileStream': imageData,
                    'extensionId': 1
                },
                url: UrlBaseApi + "/Storage/SaveStorage",
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(function success(response) {
                //alert('Sucesso');
            }, function error(response) {
                //alert('Erro: ' + response);
            });
            
            $scope.$apply();
        }

        function onFail(message) {
            if (appConstants.debug) {
                alert('Failed because: ' + message);
            }
        };
    };
  }]);

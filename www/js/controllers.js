var au;
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPopup, $auth, $http, $auth, $cordovaInAppBrowser,$rootScope) {
    $scope.fbData = {}
    au = $auth;
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
            .then(function(res) {
                console.log('$scope.authenticate', res);
                $ionicPopup.alert({
                        title: 'Success',
                        content: 'You have successfully logged in!'
                    })
                    .then(function(res) {
                        // $state.go('tab.dash')
                    })
                    //aqui lo haria por detras del popuo entonces el usuario esta distraido
                    // $state.go('tab.dash')
            })
            .catch(function(response) {
                $ionicPopup.alert({
                    title: 'Error',
                    content: response.data ? response.data || response.data.message : response
                })

            });
    };

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.getInfo = function() {

        var url = 'https://graph.facebook.com/me?fields=id,name,picture,email,bio,birthday,first_name,last_name'
        $http.get(url)
            .then(function(res) {
                console.log(res)
                $scope.fbData = res.data;
            })
    }

    $scope.login = function() {
        var user = {
            email: 'adad'
        }

        $auth.login(user)
            .then(ok)
            .catch(er)

        function ok(r) {
            console.log(r)
        }

        function er(r) {
            console.error(r)
        }
    }


    $scope.logout = function() {
        $auth.logout().then(rmFbSession)

        function rmFbSession() {
            var _aToken=$auth.getToken()
            var options = {
                location: 'no',
                clearcache: 'yes',
                toolbar: 'no'
            };

            if (typeof _aToken !== "undefined") {
                //localhost
                var url = 'https://www.facebook.com/logout.php?access_token=' + _aToken + '&next=http://localhost:3000/';
                //app
                if (ionic.Platform.isIOS() || ionic.Platform.isAndroid())
                    url = 'https://www.facebook.com/logout.php?access_token=' + _aToken + '&next=/';

                $cordovaInAppBrowser.open(url, '_blank', options)
                    .then(function(event) {
                        $cordovaInAppBrowser.close();
                    })
                    .catch(function(event) {
                        $cordovaInAppBrowser.close();
                    });


                //Cerrar Pagina login Facebook
                $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event) {
                    // insert CSS via code / file
                    $cordovaInAppBrowser.close();
                });


            }
        }
    }

})

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});

(function() {
    'use strict';

    angular
        .module('fakeBE', [
            'ngMockE2E'
        ])
        .run(Run)
    Run.$inject = ['$httpBackend']

    function Run($httpBackend) {
        $httpBackend.whenGET(/\.html$/).passThrough();
        var graph = new RegExp('^' + 'https://graph.facebook.com/', 'i');
        $httpBackend.whenGET(graph).passThrough();

        var rta = {
            "access_token": "CAAHZCmQlDZCx8BAJTjM08JdfAdZAZCkua4rcMHxw3uEi119pKmATaygIvGGqEvZA5WQKrhLzgZAVJgDvCmDzUr0oD75r9pf1FlNFe2G4lZCGRsAeMiKQvBYIiFpeaUSzJTrTQIVP5FALqtTjuBw1bkRovDcitTdeRu24LXlkmoS4kGK4uhZAvClCgIkOq18hBO4M9ZAOamdUdzAZDZD",
            "token_type": "bearer",
            "expires_in": 5182244
        }

        // AHORA SI CUANDO DEVUELVO ESTE OBJETO SATELIZER SI ME LO GUARDA EN LOCALSTORAGE

        var token = {
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InByb3ZpZGVyIjoicGFzc3dvcmQiLCJ1aWQiOiJmMGU1OTQzOS03NTdhLTRiZjctYjI4Yi1hOGYyMTZiMWE4Y2UifSwiaWF0IjoxNDU4ODQ2OTcyfQ.11GTVk7BSikDqoqspdHISU0zGQ9oFIE4WP_Jx0AXl5c"
        }

        $httpBackend.whenPOST('/auth/facebook')
            .respond(200, token);

        $httpBackend.whenPOST('/auth/login')
            .respond(200, token);



        $httpBackend.whenGET('/name', undefined, function(headers) {
            // check if the header was sent, if it wasn't the expectation won't
            // match the request and the test will fail
            debugger;
            return headers['Authorization'] == 'xxx';
        }).respond(200, { fullName: 'sebastian correa' });

        $httpBackend.whenGET('/fail', undefined, function(headers) {

        }).respond(401, { error: 'unauth' });
    }
})();

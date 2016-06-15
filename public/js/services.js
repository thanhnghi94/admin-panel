'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []);

angular.module('myApp.services')
    .service('productsService', function($http, Upload) {
        var popularities = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        return {
            getProducts: function() {
                return $http({
                    url: '/api/products',
                    method: 'GET'
                });
            },
            getCategoryList: function() {
                return $http({
                    url: '/api/categories',
                    method: 'GET'
                });
            },
            getProductByTitle: function(title) {
                return $http({
                    url: '/api/product/' + title,
                    method: 'GET'
                });
            },
            getPopularities: function() {
                return popularities;
            },
            addProduct: function(product) {
                return Upload.upload({
                    url: '/api/product/add',
                    method: 'POST',
                    data: {
                        title: product.title,
                        framework: product.framework,
                        category: product.category.name,
                        withDomainUrl: product.withDomainUrl,
                        withoutDomainUrl: product.withoutDomainUrl,
                        previewUrl: product.previewUrl,
                        popularity: product.popularity,
                        file: product.imgUrl
                    }
                });
            },
            editProduct: function(product) {
                return Upload.upload({
                    url: '/api/product/edit',
                    method: 'POST',
                    data: {
                        _id: product._id,
                        title: product.title,
                        framework: product.framework,
                        category: product.category.name,
                        dateAdded: product.dateAdded.toISOString(),
                        withDomainUrl: product.buyDomainUrl.withDomainUrl,
                        withoutDomainUrl: product.buyDomainUrl.withoutDomainUrl,
                        previewUrl: product.previewUrl,
                        popularity: product.popularity,
                        file: product.imgUrl
                    }
                });
            },
            editProductV2: function (product) {
                return $http.post('/api/product/editV2', {
                    _id: product._id,
                    title: product.title,
                    framework: product.framework,
                    category: product.category.name,
                    dateAdded: product.dateAdded.toISOString(),
                    withDomainUrl: product.buyDomainUrl.withDomainUrl,
                    withoutDomainUrl: product.buyDomainUrl.withoutDomainUrl,
                    previewUrl: product.previewUrl,
                    popularity: product.popularity
                });
            },
            deleteProductById: function(id) {
                return $http.post('/api/product/delete',{
                    _id: id
                });
            }
        };
    })
    .service('Auth', function($http, $window) {
        this.login = function (credentials) {
            return $http.post('api/login', credentials);
        };

        this.logout = function () {
            $window.localStorage.removeItem('jwt');
        };
    });

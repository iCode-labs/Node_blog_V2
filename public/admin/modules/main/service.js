'use strict';

angular.module('Main')
    .factory('MainService', ['$http',
        function($http) {
            var service = {};
            service.getBlogs = function(scop) {
                $http.get("/api/blogs").success(function(data) {
                    scop.blogs = data;
                });
            };
            service.createBlog = function(blog, callback) {
                $http.post("/api/blogs", blog).success(function(res) {
                    callback(res)
                });
            };
            service.deleteBlog = function(blogId, callback) {
                $http.delete("/api/blogs/" + blogId).success(function(res) {
                    callback(res);
                });
            };
            service.updateBlog = function(blog, callback) {
                $http.put("/api/blogs", blog).success(function(res) {
                    callback(res);
                });
            }
            return service;
        }
    ]);

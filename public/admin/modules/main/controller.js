'use strict';

angular.module('Main', ['ui.ace'])
    .controller('MainController', ['$scope', '$location', 'AuthenticationService', 'MainService',
        function($scope, $location, AuthenticationService, MainService) {
            $scope.bodyState = "articleList";
            $scope.blogs = [];
            MainService.getBlogs($scope);
            $scope.articles = function() {
                $scope.bodyState = "articleList";
            };
            $scope.logout = function() {
                AuthenticationService.ClearCredentials();
                $location.path('/login');
            };
            $scope.systemConf = function() {
                $scope.bodyState = "conf";
            };
            $scope.create = function() {
                $scope.bodyState = "editor";
                $scope.currentBlog = {
                    errMsg: "",
                    tagArray: [],
                    isNew: true,
                    validate: function() {
                        var errArray = [];
                        if (!this.blog_title) {
                            errArray.push("文章标题不能为空！");
                        }
                        if (!this.blog_content) {
                            errArray.push("文章内容不能为空！");
                        }
                        if (!this.category) {
                            errArray.push("文章分类不能为空！");
                        }
                        if (this.tags) {
                            this.tagArray = this.tags.split(',');
                        }
                        if (!errArray.length) {
                            return true;
                        }
                        this.errMsg = errArray.join('  ');
                        return false;
                    }
                };

            };
            $scope.saveBlog = function() {
                if (!$scope.currentBlog.validate()) {
                    $("#alertMsg").show();
                } else {
                    if ($scope.currentBlog.isNew) {
                        MainService.createBlog($scope.currentBlog, function(data) {
                            $scope.blogs.push(data.blog);
                            $scope.bodyState = "articleList";
                        });
                    } else {
                        MainService.updateBlog($scope.currentBlog, function(data) {
                            for (var i = 0; i < $scope.blogs.length; i++) {
                                if ($scope.blogs[i]._id == data.blog._id) {
                                    $scope.blogs[i] = data.blog;
                                    break;
                                }
                            }
                            $scope.bodyState = "articleList";

                        });
                    }
                }
            };
            $scope.deleteBlog = function(blogId) {
                MainService.deleteBlog(blogId, function(res) {
                    if (res.success) {
                        for (var i = 0; i < $scope.blogs.length; i++) {
                            if ($scope.blogs[i]._id == blogId) {
                                var index = i;
                                break;
                            }
                        }
                        if (index > -1) {
                            $scope.blogs.splice(index, 1);
                        }
                    }
                });
            };
            $scope.modifyBlog = function(blog) {
                $scope.currentBlog = {
                    errMsg: "",
                    tagArray: [],
                    isNew: false,
                    validate: function() {
                        var errArray = [];
                        if (!this.blog_title) {
                            errArray.push("文章标题不能为空！");
                        }
                        if (!this.blog_content) {
                            errArray.push("文章内容不能为空！");
                        }
                        if (!this.category) {
                            errArray.push("文章分类不能为空！");
                        }
                        if (!this.tagArray || !this.tagArray.length) {
                            this.tagArray = this.tags;
                        }
                        if (!errArray.length) {
                            return true;
                        }
                        this.errMsg = errArray.join('  ');
                        return false;
                    }
                };
                for (var pro in blog) {
                    $scope.currentBlog[pro] = blog[pro];
                }
                $scope.bodyState = "editor";
            };
        }
    ]);

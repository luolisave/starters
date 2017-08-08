/**
* @Author: Li Luo
* @Date:   2016-10-28T16:59:37-04:00
* @Last modified by:   Li Luo
* @Last modified time: 2016-11-11T10:44:12-05:00
*/

var auth = require('./scripts/auth');
var setting = require('./scripts/setting');
var page = require('./scripts/page');
var user = require('./scripts/user');

module.exports = {
    config: function (express, app, upload) {
        // Login --------------------------------------------------------------
        app.post('/api/v1/login', function (req, res) {
            auth.login(req, res);
        });

        app.get('/api/v1/check/login/status', function (req, res) {
            auth.validateToken(req, res, function(req, res){
                res.send('{"status":1,"info":"logged in already."}');
            });
        });

        // Upload -------------------------------------------------------------
        //        documents at:   https://www.npmjs.com/package/multer#readme
        //                        https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
        app.post('/upload/single/test', upload.single('avatar'), function (req, res, next) { // avatar   uploadfile
            var rv = {
                "status":1,
                "info":"file uploaded.",
                "fileInfo": req.file
            };
            res.send(JSON.stringify(rv));
            // req.file 是 `avatar` 文件的信息
            // req.body 将具有文本域数据, 如果存在的话
        });

        app.post('/upload/single', upload.single('upload'), function (req, res, next) { // avatar   uploadfile
            var rv = {
                "status":1,
                "info":"file uploaded.",
                "fileInfo": req.file
            };
            res.send(JSON.stringify(rv));
            // req.file 是 `avatar` 文件的信息
            // req.body 将具有文本域数据, 如果存在的话
        });

        app.post('/upload/files', upload.array('photos', 12), function (req, res, next) {
            // req.files 是 `photos` 文件数组的信息
            // req.body 将具有文本域数据, 如果存在的话
        })


        // Page ---------------------------------------------------------------
        app.get('/api/v1/page/list/lang/:lang', function (req, res) {
            auth.validateToken(req, res, function(req, res){
                page.list(req, res);
            });
        });

        app.post('/api/v1/page/single', function (req, res) {
            auth.validateToken(req, res, function(req, res){
                page.postSingle(req, res);
            });
        });

        app.delete('/api/v1/page/single/pid/:pid', function (req, res) {
            auth.validateToken(req, res, function(req, res){
                page.deleteSingle(req, res);
            });
        });

        app.patch('/api/v1/page/single/pid/:pid', function (req, res) {
            auth.validateToken(req, res, function(req, res){
                page.patchSingle(req, res);
            });
        });


        app.get('/api/v1/page/single/pid/:pid', function (req, res) {
            auth.validateToken(req, res, function(req, res){
                page.getSingle(req, res);
            });
        });

        // anyone can get a page content. no need for auth.
        app.get('/api/v1/public/page/single/pid/:pid', function (req, res) {
            page.getPublicSingle(req, res);
        });

        // User ---------------------------------------------------------------
        app.get('/api/v1/user/list', function (req, res) {
            auth.validateToken(req, res, function(req, res){
                user.list(req, res);
            });
        });

        app.post('/api/v1/user/single', function (req, res) {
            auth.validateToken(req, res, function(req, res){
                user.postSingle(req, res);
            });
        });

        app.delete('/api/v1/user/single/username/:username', function (req, res) {
            auth.validateToken(req, res, function(req, res){
                user.deleteSingle(req, res);
            });
        });

        app.patch('/api/v1/user/single/username/:username', function (req, res) {
            auth.validateToken(req, res, function(req, res){
                user.patchSingle(req, res);
            });
        });

        app.get('/api/v1/user/single/username/:username', function (req, res) {
            auth.validateToken(req, res, function(req, res){
                user.getSingle(req, res);
            });
        });

        // User Setting ---------------------------------------------------------------
        app.get('/api/v1/user_setting/single/username/:username', function (req, res) {
            auth.validateToken(req, res, function(req, res){
                setting.getSingle(req, res);
            });
        });

        app.patch('/api/v1/user_setting/single/username/:username', function (req, res) { //patch and post are exactlly same
            auth.validateToken(req, res, function(req, res){
                setting.patchSingle(req, res);
            });
        });

        app.post('/api/v1/user_setting/single/username/:username', function (req, res) { //patch and post are exactlly same
            auth.validateToken(req, res, function(req, res){
                setting.patchSingle(req, res);
            });
        });

    }
};

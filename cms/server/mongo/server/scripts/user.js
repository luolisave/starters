/**
 * @Author: Li Luo
 * @Date:   2016-11-11T10:37:34-05:00
 * @Last modified by:   Li Luo
 * @Last modified time: 2016-11-11T10:46:30-05:00
 */

var createHash = require('sha.js');
var sha512 = createHash('sha512');

module.exports = {

    list: function (req, res) {
        var lang = req.params.lang;
        /////console.log("lang",lang);

        var collection = db.collection('users');
        collection.find({}).toArray(function (err, items) {
            res.setHeader('Content-Type', 'application/json');
            if (items.length > 0) {
                res.send(
                    JSON.stringify(
                        {
                            "status": 1,
                            "info": "List users successfully.",
                            "records": items
                        }
                    )
                );
            } else {
                res.send(
                    JSON.stringify(
                        {
                            "status": 0,
                            "info": "Unable to list users."
                        }
                    )
                );
            }
        });
    },

    postSingle: function (req, res) {
        var userItem = req.body;
        userItem.update_time = Math.floor(new Date() / 1000);

        if (userItem && userItem.username && userItem.password) {
            userItem.password = createHash('sha512').update(userItem.password, 'utf8').digest('hex');

            var collection = db.collection('users');

            collection.find({username: userItem.username}).toArray(function (err, items) {
                if (items.length > 0) {
                    res.send(JSON.stringify({
                        "status": 0,
                        "info": "user already exist, please try to use patch(update) api instead."
                    }));
                } else {
                    collection.insert(
                        userItem,
                        function (err, doc) {
                            res.send(JSON.stringify({
                                "status": 1,
                                "info": "create user successfully.",
                                "params": req.params,
                                "err": err,
                                "doc": doc
                            }));
                        }
                    );
                }
            });

        } else {
            res.send(JSON.stringify({"status": 0, "info": "invalid username.", "userItem": userItem}));
        }
    },

    deleteSingle: function (req, res) {
        var username = undefined;
        if (req.params && req.params.username) {
            username = req.params.username;

            // ==============================
            var collection = db.collection('users');

            collection.remove({"username": username}, function (err, doc) {
                console.log("doc.result.n = ", doc.result.n);
                if(doc.result && doc.result.n > 0){
                    res.send(JSON.stringify({"status": 1, "info": "user deleted successfully.", "doc": doc}));
                }else{
                    res.send(JSON.stringify({"status": 0, "info": "user does not exist.", "doc": doc}));
                }

            });
            // ===========================

        } else {
            res.send(JSON.stringify({"status": 0, "info": "invalid username", "params": req.params}));
        }
    },

    patchSingle: function (req, res) {
        var username = undefined;
        if (req.params && req.params.username) {
            username = req.params.username;
        }

        var userItem = req.body;
        delete userItem._id;
        userItem.update_time = Math.floor(new Date() / 1000);
        userItem.password = createHash('sha512').update(userItem.password, 'utf8').digest('hex');

        if (username) {
            var collection = db.collection('users');
            collection.find({"username": username}).toArray(function (err, items) {
                userItem.username = username;
                if (items.length > 0) {
                    collection.update(
                        {username: username},
                        userItem,
                        function (err, doc) {
                            res.send(JSON.stringify({
                                "status": 1,
                                "info": "updated user successfully.",
                                "params": req.params,
                                "err": err,
                                "doc": doc
                            })); // , "err": err, "doc": doc
                        }
                    );
                } else {
                    res.send(JSON.stringify({
                        "status": 0,
                        "info": "User does not exist in database. please proivde username on url."
                    }));
                }
            });


        } else {
            res.send(JSON.stringify({
                "status": 0,
                "info": "invalid username. please proivde username on url and lang in body."
            }));
        }
    },

    getSingle: function (req, res) {
        var pid = undefined;
        if (req.params && req.params.username) {
            username = req.params.username;
            /////console.log("pid = ", pid);

            // ==============================
            var collection = db.collection('users');

            collection.find({"username": username}).toArray(function (err, items) {
                res.setHeader('Content-Type', 'application/json');
                if (items.length > 0) {
                    res.send(
                        JSON.stringify(
                            {
                                "status": 1,
                                "info": `retrive user (username = '${username}') successfully.`,
                                "records": items
                            }
                        )
                    );
                } else {
                    res.send(
                        JSON.stringify(
                            {
                                "status": 0,
                                "info": `Unable to retrive user (username = ${username}).`
                            }
                        )
                    );
                }
            });
            // ===========================
            /////res.send(JSON.stringify({"status":1,"info":"valid pid", "params":req.params}));
        } else {
            res.send(JSON.stringify({"status": 0, "info": "invalid pid", "params": req.params}));
        }
    }
};

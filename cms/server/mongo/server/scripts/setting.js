module.exports = {
    getSingle: function (req, res) {
        var collection;
        if (req.params && req.params.username) {
            username = req.params.username;
            /////console.log("pid = ", pid);

            // ==============================
            collection = db.collection('settings');

            collection.find({"username": username}).toArray(function (err, items) {
                res.setHeader('Content-Type', 'application/json');
                if (items.length > 0) {
                    res.send(
                        JSON.stringify(
                            {
                                "status": 1,
                                "info": `retrive user settings (username = '${username}') successfully.`,
                                "records": items
                            }
                        )
                    );
                } else {
                    res.send(
                        JSON.stringify(
                            {
                                "status": 0,
                                "info": `Unable to retrive user settings (username = ${username}).`
                            }
                        )
                    );
                }
            });
            // ===========================
        } else {
            res.send(JSON.stringify({"status": 0, "info": "invalid username ", "params": req.params}));
        }
    },

    patchSingle: function (req, res) {
        console.log("===========================================");
        var username = undefined;
        if (req.params && req.params.username) {
            username = req.params.username;
        }
        var userSettingItem; // var userSettingItem = req.body;
        var collection = db.collection('settings');

        if (username) {
            console.log("username = ", username);

            collection.find({"username": username}).toArray(function (err, items) {
                res.setHeader('Content-Type', 'application/json');
                if (items.length > 0) {
                    userSettingItem = items[0];
                    delete userSettingItem._id;

                    //should only update changes
                    var parts = req.body.parts;
                    console.log("parts = ", parts);
                    if(req.body && req.body.parts){
                        for (var property in parts) {
                            console.log("property = ", property);
                            if(!userSettingItem.parts){
                                userSettingItem.parts = {};
                            }
                            userSettingItem.parts[property] = parts[property];
                        }
                    }

                    // update parts data ----------------------------------
                    collection.update(
                        {username: username},
                        userSettingItem,
                        function (err, doc) {
                            res.send(JSON.stringify({
                                "status": 1,
                                "info": "updated user setting successfully.",
                                "params": req.params,
                                "err": err,
                                "doc": doc
                            })); // , "err": err, "doc": doc
                        }
                    );
                    // update parts data ends ----------------------------------------
                } else {
                    // create parts data ----------------------------------
                    userSettingItem = {
                        "username" : username,
                        "parts" : {

                        }
                    };

                    var parts = req.body.parts;
                    console.log("parts = ", parts);
                    if(req.body && req.body.parts){
                        for (var property in parts) {
                            console.log("property = ", property);
                            if(!userSettingItem.parts){
                                userSettingItem.parts = {};
                            }
                            userSettingItem.parts[property] = parts[property];
                        }
                    }

                    collection.insert(
                        userSettingItem,
                        function (err, doc) {
                            res.send(JSON.stringify({
                                "status": 1,
                                "info": "create user settings successfully.",
                                "params": req.params,
                                "err": err,
                                "doc": doc
                            }));
                        }
                    );
                    // create parts data ends ----------------------------------------

                    // res.send(
                    //     JSON.stringify(
                    //         {
                    //             "status": 0,
                    //             "info": `Unable to retrive user settings (username = ${username}).`
                    //         }
                    //     )
                    // );
                }
            });
        } else {
            res.send(JSON.stringify({
                "status": 0,
                "info": "invalid username. please proivde username on url and lang in body."
            }));
        }
    }

};
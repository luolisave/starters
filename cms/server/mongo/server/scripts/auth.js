/**
* @Author: Li Luo
* @Date:   2016-10-28T16:59:37-04:00
* @Last modified by:   Li Luo
* @Last modified time: 2016-11-08T11:19:22-05:00
*/
var createHash = require('sha.js');
var sha256 = createHash('sha256');
var sha512 = createHash('sha512');


if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

module.exports = {
    login: function (req, res) {
        console.log("req.body = ", req.body);
        var userItem = req.body;
        if (userItem.password){
            userItem.password = createHash('sha512').update(userItem.password, 'utf8').digest('hex');
            /////console.log("userItem.password = ", userItem.password);
        }
        userItem.status = "active";


        var collection = db.collection('users');
        collection.find(userItem).toArray(function(err, items) {
            res.setHeader('Content-Type', 'application/json');
            if(items.length > 0){
                var rsUser = items[0];
                if(rsUser.username == userItem.username){
                    // use sha512 will create different SHA512 string with same input
                    var newToken = sha512.update("P_R_x_E_F_I_o_X"+updateTime+"_8S3A3L2T5", 'utf8').digest('hex');
                    var updateTime = new Date().getTime();
                    console.log("updateTime", updateTime);

                    rsUser.token = newToken;
                    rsUser.token_update_time = updateTime;
                    collection.update(
                        {"username":userItem.username},
                        rsUser,
                        { upsert: false }
                    );

                    var returnUserItem = {
                        "username": rsUser.username,
                        "token" : rsUser.token
                    };
                    res.send(
                        JSON.stringify({"status":1, "info": "Success", "data":returnUserItem})
                    );
                }else{
                    res.send(
                        JSON.stringify({"status":0, "info": "Error: No such user!"})
                    );
                }
            }else{
                res.send(
                    JSON.stringify({"status":0, "info": "Error: unkown!"})
                );
            }
        });
        //res.sendFile(LI_ROOT_DIR + '/mock/login.json');
    },
    validateToken: function (req, res, func) {
        res.setHeader('Content-Type', 'application/json');
        var token = req.headers.token;
        if(token){
            var collection = db.collection('users');
            collection.find({"token": token}).toArray(function(err, items) {
                if(items.length){
                    /////console.log("user for this token is:", items[0]);
                    var currentItem = items[0];
                    var currentTime = new Date().getTime();
                    var diffTime;
                    if(currentItem && currentItem.token_update_time !== undefined){
                        diffTime = currentTime - currentItem.token_update_time;
                        diffTime = diffTime / 1000;
                        ///// console.log(`auth: expire in ${SESSION_TIMEOUT_SECONDS - diffTime} seconds.` );
                    }

                    if(diffTime < SESSION_TIMEOUT_SECONDS){
                        // refresh session time
                        currentItem.token_update_time = Date.now();
                        collection.update(
                            {"_id": currentItem._id},
                            currentItem,
                            function(err, doc){

                            }
                        );

                        //role based access control
                        try{
                            if(currentItem && currentItem.role === "super_admin"){
                                // call function
                                try{
                                    func(req, res);
                                }catch(error){
                                    res.status(500).send({ status: 0, info: "Some business logic failed!", error: 'Some business logic failed!' })
                                }
                            }else if(currentItem && currentItem.role){
                                //TODO: check role access here
                                res.send('{"status": 0, "info":"RBAC: you don\'t have access to this API."}');
                            }
                        }catch(error){
                            console.log(error);
                        }

                    }else{
                        res.send('{"status": 0, "info":"token expired, please login again."}');
                    }

                }else{
                    res.send('{"status": 0, "info":"invalid token."}');
                }
            });
        }else{
            res.send('{"status": 0, "info":"no token in header"}');
        }
    }
};

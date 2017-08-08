/**
* @Author: Li Luo
* @Date:   2016-10-31T12:49:23-04:00
* @Last modified by:   Li Luo
* @Last modified time: 2016-11-11T10:36:56-05:00
*/

module.exports = {

    list: function (req, res) {
        var lang = req.params.lang;
        /////console.log("lang",lang);

        var collection = db.collection('pages');
        collection.find({"lang":lang}).toArray(function(err, items) {
            res.setHeader('Content-Type', 'application/json');

            if(items.length > 0){
                //remove content from item to decrease bandwidth use
                for(var i = 0; i<items.length; i++){
                    items[i].content = "(reset content to empty to decrease bandwidth use.)";
                }

                res.send(
                    JSON.stringify(
                        {
                        "status": 1,
                        "info": "List pages successfully.",
                        "records": items
                        }
                    )
                );
            }else{
                res.send(
                    JSON.stringify(
                        {
                            "status": 0,
                            "info": "Unable to list pages."
                        }
                    )
                );
            }
        });
    },
    postSingle: function(req, res){
        var pageItem = req.body;
        pageItem.update_time = Math.floor(new Date() / 1000);

        if(pageItem && pageItem.pid && pageItem.lang){
          var collection = db.collection('pages');

          collection.find({pid:pageItem.pid, lang:pageItem.lang}).toArray(function(err, items) {
              if(items.length>0){
                  res.send(JSON.stringify({"status":0,"info":"item already exist, please try to use patch(update) api instead."}));
              }else{
                collection.insert(
                        pageItem,
                        function(err, doc){
                            res.send(JSON.stringify({"status":0,"info":"create page successfully.", "params":req.params, "err": err, "doc": doc}));
                        }
                      );
              }
          });

        }else{
          res.send(JSON.stringify({"status":0,"info":"invalid pid or lang code.", "pageItem":pageItem}));
        }
    },
    deleteSingle: function(req, res){
      var pid = undefined;
      if(req.params && req.params.pid){
        pid = req.params.pid;
        /////console.log("pid = ", pid);

        // ==============================
        var collection = db.collection('pages');

        collection.remove({"pid":pid}, function(err, doc){
            res.send(JSON.stringify({"status":1,"info":"record deleted successfully", "doc":doc}));
        });
        // ===========================
        /////res.send(JSON.stringify({"status":1,"info":"valid pid", "params":req.params}));
      }else{
        res.send(JSON.stringify({"status":0,"info":"invalid pid", "params":req.params}));
      }
    },
    patchSingle: function(req, res){
        var pid = undefined;
        if(req.params && req.params.pid){
          pid = req.params.pid;
        }

        var pageItem = req.body;
        delete pageItem._id;
        pageItem.update_time = Math.floor(new Date() / 1000);

        if(pid && pageItem && pageItem.lang){
          var collection = db.collection('pages');
          collection.find({"pid":pid, "lang": pageItem.lang}).toArray(function(err, items) {
              pageItem.pid = pid;
              if(items.length > 0){
                  collection.update(
                        {pid:pid, lang:pageItem.lang},
                        pageItem,
                        function(err, doc){
                            res.send(JSON.stringify({"status":1,"info":"updated page successfully.", "params":req.params, "err": err, "doc": doc})); // , "err": err, "doc": doc
                        }
                      );
              }else{
                  collection.insert(
                      pageItem,
                      function(err, doc){
                          res.send(JSON.stringify({"status":1,"info":"Update item not found, create instead. create successfully.", "params":req.params})); //, "err": err, "doc": doc
                      }
                  );
              }
          });


        }else{
          res.send(JSON.stringify({"status":0,"info":"invalid page id or language code. please proivde pid on url and lang in body."}));
        }
    },

    getSingle: function(req, res){
      var pid = undefined;
      if(req.params && req.params.pid){
        pid = req.params.pid;
        /////console.log("pid = ", pid);

        // ==============================
        var collection = db.collection('pages');

        collection.find({"pid":pid}).toArray(function(err, items) {
            res.setHeader('Content-Type', 'application/json');
            if(items.length > 0){
                res.send(
                    JSON.stringify(
                        {
                        "status": 1,
                        "info": `retrive page (pid = ${pid}) successfully.`,
                        "records": items
                        }
                    )
                );
            }else{
                res.send(
                    JSON.stringify(
                        {
                            "status": 0,
                            "info": `Unable to retrive page (pid = ${pid}).`
                        }
                    )
                );
            }
        });
        // ===========================
        /////res.send(JSON.stringify({"status":1,"info":"valid pid", "params":req.params}));
      }else{
        res.send(JSON.stringify({"status":0,"info":"invalid pid", "params":req.params}));
      }
    },

    getPublicSingle: function(req, res){
        var pid = undefined;
        if(req.params && req.params.pid){
            pid = req.params.pid;
            /////console.log("pid = ", pid);

            // ==============================
            var collection = db.collection('pages');

            collection.find({"pid":pid}).toArray(function(err, items) {
                res.setHeader('Content-Type', 'application/json');
                if(items.length > 0){
                    res.send(
                        JSON.stringify(
                            {
                                "status": 1,
                                "info": `retrive page (pid = ${pid}) successfully.`,
                                "records": items
                            }
                        )
                    );
                }else{
                    res.send(
                        JSON.stringify(
                            {
                                "status": 0,
                                "info": `Unable to retrive page (pid = ${pid}).`
                            }
                        )
                    );
                }
            });
            // ===========================
            /////res.send(JSON.stringify({"status":1,"info":"valid pid", "params":req.params}));
        }else{
            res.send(JSON.stringify({"status":0,"info":"invalid pid", "params":req.params}));
        }
    }
};

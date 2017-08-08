CMS ReadMe
==========

Document Files
--------------
[0. TODO List](documents/todo.md)

[1. API](documents/RESTful.api.md)

[2. DB](documents/readme.db.md)

Config mongo-express config.js
-------------------------------
Make mongo-express accessable from remote host, find config.default.js at:
~~~~
    /root/.nvm/versions/node/v6.10.0/lib/node_modules/mongo-express/config.default.js
  or
    C:\Users\lluo\AppData\Roaming\nvm\v6.10.0\node_modules\mongo-express\config.default.js
~~~~

make a copy of it:
~~~~
    cp config.default.js config.js
~~~~

Change config.js :
~~~~
    host:    process.env.VCAP_APP_HOST     || 'localhost',
  to
    host:    process.env.VCAP_APP_HOST     || '0.0.0.0',
~~~~


Start CMS with express (Development)
------------------------------------
1. follow instruction in readme.db.md, prepare for database.
2. Open command line
3. Start MongoDB and MongoExpress
  ~~~~
  $ ./go.sh
  c:\> go.sh (windows)
  ~~~~

Start CMS menually (UAT and PRODUCTION)
------------------------------------
0. goto project directory
 ~~~~
   test fedora server:
     cd ~/WebstormProjects/bondCMS/server/
   or on UAT:
     cd /home/lluo/git/bondCMS
    
 ~~~~

1. start mongodb
~~~~
    mongod --nojournal --port 8817 --dbpath server/db/mongodb
  or  
    mongod --logpath server/db/mongodb.log.d/mongod.log --nojournal --port 8817 --dbpath server/db/mongodb
~~~~
2. start mongo-express
~~~~
    mongo-express -a --port 8801 -P 8817 -u admin -p pass1234
~~~~
3. start web server for CMS (ExpressJS)
~~~~
    gulp 'express localhost:8888'
~~~~

Start CMS with frontend only
------------------------------------
1. Open command line
2. Start browser-sync
  ~~~~
    gulp 'express localhost:8888'
  ~~~~
 
UAT
------------------------------------
Add reverse proxy to UAT virtual host file:
~~~~
  ProxyPass               /debtipCMS          http://localhost:8888 connectiontimeout=5 timeout=300
  ProxyPassReverse        /debtipCMS          http://localhost:8888
~~~~
# clear log folder
rm server/db/mongodb.log.d/*.log


# --nojournal for development, will not create journal folder.
# --smallfiles for deploy with smaller jornal folder size (128mb each db)
# --fork run in background
# --logpath /path-to/logfile
mongod --logpath server/db/mongodb.log.d/mongod.log --nojournal --port 8817 --dbpath server/db/mongodb &
echo 'mongod PID >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ' $!

# sleep 3 seconds
sleep 1
echo 2
sleep 1
echo 1
sleep 1
echo ------- ------------------- -----------
echo ------- mongo-express below -----------
echo ------- ------------------- -----------

mongo-express -a --port 8801 -P 8817 -u admin -p pass1234 &
echo 'mongo-express PID >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ' $!


# sleep 3 seconds
sleep 1
echo 2
sleep 1
echo 1
sleep 1
echo ------- ---------------------- -----------
echo ------- express localhost:8888 -----------
echo ------- ---------------------- -----------

gulp 'express localhost:8888'
echo 'gulp express PID >>>>>>>>>>>>>>>>> ' $1

echo sleep 60
sleep 60

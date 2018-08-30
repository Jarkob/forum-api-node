var mongoose = require('mongoose');

// connect to db
// mongoose.connect('mongodb://127.0.0.1:27017/forum');
mongoose.connect('mongodb://forum_user:Jakob123@cluster0-shard-00-00-ee4mc.mongodb.net:27017,cluster0-shard-00-01-ee4mc.mongodb.net:27017,cluster0-shard-00-02-ee4mc.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true/forum');
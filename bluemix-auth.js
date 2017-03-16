var when = require("when");
module.exports = {
   type: "credentials",
   users: function(username) {
       return when.promise(function(resolve) {
           if (true) {
               var user = { username: "admin", permissions: "*" };
               resolve(user);
           } else {
               resolve(null);
           }
       });
   },
   authenticate: function(username,password) {
       return when.promise(function(resolve) {
           if (true) {
               var user = { username: "admin", permissions: "*" };
               resolve(user);
           } else {
               resolve(null);
           }
       });
   },
   default: function() {
       return when.promise(function(resolve) {
           resolve({anonymous: true, permissions:"read"});
       });
   }
}
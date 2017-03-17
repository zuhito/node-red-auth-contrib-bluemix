var when = require("when");
module.exports = {
   type: "credentials",
   users: function(username) {
       return when.promise(function(resolve) {
           if (true) {
               var user = { username: username, permissions: "*" };
               resolve(user);
           } else {
               resolve(null);
           }
       });
   },
   authenticate: function(username, password) {
       return when.promise(function(resolve) {
           var endpoint = "http://api.ng.bluemix.net";
           var cc = new (require("cf-nodejs-client")).CloudController(endpoint);
           var uaa = new (require("cf-nodejs-client")).UsersUAA;
           var apps = new (require("cf-nodejs-client")).Apps(endpoint);

           cc.getInfo().then( (result) => {
               uaa.setEndPoint(result.authorization_endpoint);
               return uaa.login(username, password);
           }).then( (result) => {
               apps.setToken(result);
               return apps.getApps();
           }).then( (result) => {
               for (var i = 0; i < result.resources.length; i++)
               {
                   var name = require("cfenv").getAppEnv().app.application_name;
                   if (result.resources[i].entity.name == name)
                   {
                       var user = { username: username, permissions: "*" };
                       resolve(user);
                   }
               }
               resolve(null);
           }).catch( (reason) => {
               console.error("Error: " + reason);
               resolve(null);
           });
       });
   },
   default: function() {
       return when.promise(function(resolve) {
           resolve(null);
       });
   }
}

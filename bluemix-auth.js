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
           Apps = new (require("cf-nodejs-client")).Apps(endpoint);

           cc.getInfo().then( (result) => {
           uaa.setEndPoint(result.authorization_endpoint);
               return uaa.login(username, password);
           }).then( (result) => {
               Apps.setToken(result);
               return Apps.getApps();
           }).then( (result) => {
               for (var i = 0; i < result.resources.length; i++)
               {
                   console.log("metadata" + JSON.stringify(result.resources[i].metadata));
                   console.log("entity" + JSON.stringify(result.resources[i].entity));
                   var name = require("cfenv").getAppEnv("name");
                   var url = require("cfenv").getAppEnv("url");
                   console.log("cfenv-name: " + JSON.stringify(name));
                   console.log("cfenv-url: " + JSON.stringify(url));
                   if (result.resources[i].entity.name == name)
                   {
                       var user = { username: username, permissions: "*" };
                       resolve(user);
                   }
               }
               console.log(result);
               resolve(null);
           }).catch( (reason) => {
               console.error("Error: " + reason);
               resolve(null);
           });
       });
   },
   default: function() {
       return when.promise(function(resolve) {
           resolve({anonymous: true, permissions:"read"});
       });
   }
}
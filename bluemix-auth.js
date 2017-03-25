var when = require("when");
var cf = require("cf-nodejs-client");
var cfenv = require("cfenv");

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
            var name = cfenv.getAppEnv().app.application_name;
            var uri = cfenv.getAppEnv().app.application_uris[0];
            console.log("uri=" + uri);
            var endpoint = "https://" + uri.replace(name, "api");
            console.log("endpoint=" + endpoint);

            endpoint = endpoint.replace(/\.mybluemix.net$/, ".bluemix.net");
            console.log("endpoint2=" + endpoint);
            if (endpoint == "http://api.bluemix.net")
            {
                endpoint = "http://api.ng.bluemix.net";
                console.log("endpoint3=" + endpoint);
            }

            var cc = new cf.CloudController(endpoint);
            var uaa = new cf.UsersUAA;
            var apps = new cf.Apps(endpoint);

            cc.getInfo().then( (result) => {
                uaa.setEndPoint(result.authorization_endpoint);
                return uaa.login(username, password);
            }).then( (result) => {
                apps.setToken(result);
                return apps.getApps();
            }).then( (result) => {
                var flag = true;
                for (var i = 0; i < result.resources.length && flag; i++)
                {
                    console.log("result.resources[" + i + "].entity.name=" + result.resources[i].entity.name);
                    console.log("name=" + name);
                    if (result.resources[i].entity.name == name)
                    {
                        console.log("success");
                        var user = { username: username, permissions: "*" };
                        flag = false;
                        resolve(user);
                    }
                }
                if (flag) {
                    console.log("fail");
                    resolve(null);
                }
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

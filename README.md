# node-red-auth-contrib-bluemix

Authentication module for Node-RED on Bluemix

Using this module on Bluemix, you can access to Node-RED by IBM ID.

# Deploy Node-RED with this authentication module
There is a setting example(bluemix-settings.js and package.json) on the following GitHub page.
You can deploy secure Node-RED using "Deploy to Bluemix" button.
https://github.com/zuhito/node-red-bluemix-starter

# Custom configuration
You can configure secure Node-RED manually as follows.

(1) Add adminAuth setting into bluemix-settings.js ([Example](https://github.com/zuhito/node-red-bluemix-starter/commit/7f8383d3ffa475c4ac2224b50ed4bfcef6f26df3))
```
adminAuth: require("node-red-auth-contrib-bluemix"),
```

(2) Remove current authentication settings from bluemix-settings.js ([Example](https://github.com/zuhito/node-red-bluemix-starter/commit/9f795bc899550a79b6653d68a2698e359dc3b0c9))
    Delete the following lines.
```
if (process.env.NODE_RED_USERNAME && process.env.NODE_RED_PASSWORD) {
...
}
```

(3) Add node-red-auth-contrib-bluemix module into package.json ([Example](https://github.com/zuhito/node-red-bluemix-starter/commit/8d8f88e6f8097468b45db51d3c4b6f71915fc993))
```
"dependencies": {
...
    "node-red-auth-contrib-bluemix": "*",
...
}
````

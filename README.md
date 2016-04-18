# rexpress
React + Express boilerplate application with passportjs authentication

# Dependencies
You must install  these dependencies globally before installation.
- [MongoDB](https://www.mongodb.org/downloads)
- [Webpack](http://webpack.github.io/docs/installation.html)

# Installation
```
$ npm intall
$ webpack -p
```

# Configuration
you can application configration settings in `config.js` file.
you can edit database configuration, application port and session secret.
```
module.exports = {
    db : {
        config : {
            url : 'mongodb://127.0.0.1/databasename'
        }
    },

    app : {
        port  : port,
        secret : 'session-secret-key'
    }
};
```
# Starting Application
```
$ npm start
```

var express = require('express');
var router = express.Router();

module.exports = function(passport){
    
    router.get('/auth', function(req,res){
        if (req.isAuthenticated()) {
            return res.json(true);
        }
        return res.json(false);
    });

    router.post('/login', function(req,res,next){
        passport.authenticate('login', function(err,user, info){
            if(err){
                return next(err);
            }
            if(!user){
                return res.json({
                    auth : false,
                    message : 'Invalid username or password'
                });
            }
            req.login(user, function(err){
                if(err){
                    return next(err);
                }
                return res.json({auth : true});
            });
        })(req,res,next);
    });

    router.post('/register', function(req,res,next){
        passport.authenticate('register', function(err,user, info){
            if(err){
                return next(err);
            }
            if(!user){
                return res.json({
                    register : false,
                    message : 'User with email already exist'
                });
            }
            req.login(user, function(err){
                if(err){
                    return next(err);
                }
                return res.json({
                    auth : true,
                    register : true
                });
            });
        })(req,res,next);
    });

    router.get('/logout', function(req,res){
        req.logout();
        res.redirect('/login');
    });

    router.get('*', function(req,res){
        res.render('index');
    });

    return router;
};
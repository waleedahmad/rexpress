import React from 'react';

var Navbar = React.createClass({

    getInitialState(){
        return{
            user_actions : '' ,
            auth : false
        }
    },

    componentWillMount(){
        this.setState({
            auth : this.props.auth
        }, function(){
            this.checkAuthState();
        });
    },

    componentWillReceiveProps(nextProps){
        this.setState({
            auth : nextProps.auth
        }, function(){
            this.checkAuthState();
        });
    },

    checkAuthState(){

        if(!this.state.auth){
            this.state.user_actions =   <ul className="nav navbar-nav navbar-right">
                                            <li><a href="/login">Login</a></li>
                                            <li><a href="/register">Register</a></li>
                                        </ul>;
            this.setState({
                user_actions : this.state.user_actions
            });
        }

        if(this.state.auth){
            this.state.user_actions =   <ul className="nav navbar-nav navbar-right">
                                            <li><a href="/logout">Logout</a></li>
                                        </ul>;
            this.setState({
                user_actions : this.state.user_actions
            });
        }
    },

    render : function(){
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <a href="/" className="navbar-brand">rexpress</a>
                    {this.state.user_actions}
                </div>
            </nav>
        );
    }
});

module.exports  =   Navbar;
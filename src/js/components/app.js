"use strict";

import React from 'react';
import RouteHandler from 'react-router';
import Navbar from './common/navbar';

var App = React.createClass({

    getInitialState(){
        return {
            auth : false
        }
    },

    checkAuth(){
        var self = this;
        $.ajax({
            type : 'GET',
            url : '/auth',
            success : function(res){
                if(res){
                    self.setState({
                        auth : true
                    });
                }else{
                    self.setState({ auth : false});
                }
            }
        });
    },

    updateNavbar(){
        this.checkAuth();
    },

    render() {
        return(
            <div className="appWrapper">
                <Navbar auth={this.state.auth}/>
                <div className="container">
                    {React.cloneElement(this.props.children, {update: this.updateNavbar})}
                </div>
            </div>
        );
    }
});

module.exports  =   App;
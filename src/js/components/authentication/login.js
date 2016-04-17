import React from 'react';
import Input from '../common/textInput';
import LoginForm from './forms/loginForm';
import Alert from '../common/alert';
import toastr from 'toastr';



var Login    =   React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState(){
        return {
            user : {email  : '', password : ''},
            auth_redirect : '',
            errors 	: {},
            message : ''
        }
    },

    componentWillMount(){
        this.setState({
            auth_redirect  : (!this.props.location.query.auth)
        }, function(){
            if(!this.state.auth_redirect){
                toastr.error('Authentication Required!');
            }
            this.setState({
                message : (!this.state.auth_redirect) ? <Alert message="You need to sign in to view that page!"/> : ''
            });
        });
    },

    /**
     * Validate registration form fields
     * @returns {boolean}
     */
    registerFormIsValid : function(){
        var formIsValid 	= true;
        this.state.errors 	= {}; // clear any errors

        if(this.state.user.email.length < 1){
            this.state.errors.email = 'Email field required.';
            formIsValid = false;
        }

        if(this.state.user.password.length < 1){
            this.state.errors.password = 'Password field required.';
            formIsValid = false;
        }

        this.setState({errors : this.state.errors});
        return formIsValid;
    },

    /**
     * Attempt login on Login form submit
     */
    validateUser : function(){
        var self = this;
        $.ajax({
            type : 'POST',
            url : '/login',
            data : {
                email : this.state.user.email,
                password : this.state.user.password
            },
            success : function(res){
                if(!res.auth){
                    toastr.error('Invalid Email or Password!');
                    self.setState({
                        message : <Alert message="Invalid Email or Password!"/>
                    });
                }else{
                    toastr.success('Successfully Authenticated!');
                    self.props.update();
                    self.context.router.push('/');
                }
            }
        });
    },

    /**
     * Authenticated user after login for validation
     * @param event
     */
    Authenticate : function(event){
        event.preventDefault();

        if(!this.registerFormIsValid()){
            return;
        }
        this.validateUser();
    },

    /**
     * Update user state from login form on keyPress
     * @param event
     */
    saveUserState : function(event){
        var field = event.target.name;
        var value = event.target.value;
        this.state.user[field] = value;
        return this.setState({author : this.state.user});
    },

    render : function(){
        return (
            <div>
                <div className="login container">
                    <LoginForm
                        user={this.state.user}
                        onChange={this.saveUserState}
                        onSave={this.Authenticate}
                        errors={this.state.errors} />
                    {this.state.message}
                </div>
            </div>
        );
    }
});

module.exports  =   Login;
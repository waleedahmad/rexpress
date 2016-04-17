import React from 'react';
import Input from '../common/textInput';
import RegisterForm from './forms/registerForm';
import Alert from '../common/alert';
import toastr from 'toastr';

var Register = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState(){
        return {
            user: {email: '', password: ''},
            auth: '',
            errors: {}
        }
    },

    componentWillMount(){
        this.setState({
            auth: (this.props.location.query.auth) ? false : true
        });
    },

    /**
     * Validate form fields on form submit
     * @returns {boolean}
     */
    registerFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {}; // clear any errors


        if (this.state.user.password.length < 3) {
            this.state.errors.password = 'Password must be at least 6 characters.';
            formIsValid = false;
        }

        if (!this.isValidEmail(this.state.user.email)) {
            this.state.errors.email = 'Invalid Email.';
            formIsValid = false;
        }

        if (this.state.user.email.length < 1) {
            this.state.errors.email = 'Email field required.';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});

        return formIsValid;
    },

    /**
     * Update user state from register form on keyPress
     * @param event
     */
    saveUserState: function (event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.user[field] = value;
        return this.setState({author: this.state.author});
    },

    /**
     * Register User
     */
    registerUser(){
        var self = this;

        $.ajax({
            type: 'POST',
            url: '/register',
            data: {
                email: this.state.user.email,
                password: this.state.user.password
            },
            success: function (res) {
                if (res.register) {
                    toastr.success('Successfully Registered!');
                    self.props.update();
                    self.context.router.push('/');
                } else {
                    toastr.error('Registration Failed!');
                    self.setState({
                        message: <Alert message="User already exist with this email."/>
                    });
                }
            }
        });
    },

    /**
     * Register user if form is valid
     * @param event
     */
    saveUser: function (event) {
        event.preventDefault();
        this.clearErrors();

        if (!this.registerFormIsValid()) {
            return;
        }

        this.registerUser();
    },

    /**
     * Validate email input
     * @param email
     * @returns {boolean}
     */
    isValidEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    /**
     * Clear form error message
     */
    clearErrors: function () {
        this.setState({
            message: ''
        });
    },

    render: function () {
        return (
            <div className="register">
                <RegisterForm
                    user={this.state.user}
                    onChange={this.saveUserState}
                    onSave={this.saveUser}
                    errors={this.state.errors}/>
                {this.state.message}
            </div>
        );
    }
});

module.exports = Register;
import React from 'react';
import Input from '../../common/textInput';

var LoginForm = React.createClass({
    propTypes : {
        user : React.PropTypes.object.isRequired,
        onSave : React.PropTypes.func.isRequired,
        onChange : React.PropTypes.func.isRequired,
        errors : React.PropTypes.object
    },

    render : function(){
        return(
            <form>
                <div className="page-header">
                    <h1><small>Login</small></h1>
                </div>
                <Input
                    name="email"
                    label="Email"
                    value={this.props.user.email}
                    onChange={this.props.onChange}
                    type='text'
                    error={this.props.errors.email}/>

                <Input
                    name="password"
                    label="Password"
                    onChange={this.props.onChange}
                    value={this.props.user.password}
                    type='password'
                    error={this.props.errors.password}/>
                <input
                    type="submit"
                    value="Sign in"
                    className="btn btn-default"
                    onClick={this.props.onSave}
                />
            </form>
        );
    }
});

module.exports = LoginForm;
import React from 'react';
import Input from '../../common/textInput';

var RegisterForm = React.createClass({
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
                    <h1><small>Registration</small></h1>
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
                    value={this.props.user.password}
                    onChange={this.props.onChange}
                    type='password'
                    error={this.props.errors.password}/>

                <input
                    type="submit"
                    value="Register"
                    className="btn btn-default"
                    onClick={this.props.onSave}
                />
            </form>
        );
    }
});

export default RegisterForm;
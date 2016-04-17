import React from 'react';

var RegisterForm = React.createClass({
    propTypes : {
        message : React.PropTypes.string.isRequired,
    },

    render : function(){
        return(
            <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign"
                      aria-hidden="true"></span>
                <span className="sr-only"> Error: </span>
                {' '  + this.props.message}
            </div>
        );
    }
});

export default RegisterForm;
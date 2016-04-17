var React   =   require('react');
import Navbar from '../common/navbar';
var Home    =   React.createClass({

    componentDidMount(){
        this.props.update('Index');
    },

    render : function(){
        return (
            <div>
                <div className="container">
                    <h1> Home </h1>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports  =   Home;
module.exports = {
    isAuthenticated : function(nextState, replace, callback) {
        $.ajax({
            type : 'GET',
            url : '/auth',
            success : function(res){
                if(!res){
                    callback(replace({ pathname: '/login', query: { auth: 'false' } }));
                }else{
                    callback();
                }
            }
        });
    },

    isNotAuthenticated : function(nextState, replace, callback) {
        $.ajax({
            type : 'GET',
            url : '/auth',
            success : function(res){
                if(!res){
                    callback();
                }else{
                    callback(replace({ pathname: '/'}));
                }
            }
        });
    },
}
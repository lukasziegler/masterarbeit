var authentication = angular.module('pdAuthentication', [])

// Inspired by http://stackoverflow.com/a/18811415/1402076

.service('authService', function(){

  var user = {};
  user.role = 'admin';

  return{
    getUser: function(){
      return user;
    },
    getUserRole: function(){
      return user.role;
    },


/* TODO TEMP / ONLY FOR WIP TODO /*/

    setAdmin: function(setAdmin){
      if (setAdmin)
        user.role = 'admin';
      else  
        user.role = 'guest';
    },
    isAdmin: function(){
      if (user.role === 'admin')
        return true;
      else
        return false;
    },
    
/* TODO TEMP / ONLY FOR WIP TODO /*/


    generateRoleData: function(){
      /*this is resolved before the router loads the view and model*/
      /*...*/
    }

  }
});
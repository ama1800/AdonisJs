'use strict'

class LogoutController {

    
    logout({ auth, response }){
        auth.logout()
        return response.route('home')
   }
}

module.exports = LogoutController

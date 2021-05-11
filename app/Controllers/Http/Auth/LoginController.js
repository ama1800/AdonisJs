'use strict'

const { validateAll } = use('Validator');

class LoginController {

    index({ view }){
        return view.render('auth/login')
    }

    async login({ request, response, session, auth }){
        
        const {email, password} = request.all();
        const rules = {
            email: 'required|email',
            password: 'required|min:6',
          };
      
          const validation = await validateAll(request.all(), rules);
         
          if(validation.fails()){
            session.withErrors(validation.messages())
                    .flashAll()
      
                    return response.redirect('back');
          }
         

         await auth.attempt(email, password)

         if(session.get('_intended', false)){
             let intended = session.get('_intended')
             session.forget('_intended')
             return response.redirect(intended)
         }
      
          return response.route('home')
    }

    async logout({ auth, response }){
       await auth.logout()
        return response.route('home')
   }

    profile({ view }){
    
    return view.render('auth/profile')
}

}

module.exports = LoginController

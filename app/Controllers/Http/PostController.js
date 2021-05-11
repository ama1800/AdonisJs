'use strict'

const { validateAll }  = use('Validator')
const Post = use('App/Models/Post')

class PostController {

    new({ view }){
        return view.render('posts.new');
    }

    async store({ request, response, session,auth }){
       
        const rules = {
            title: 'required',
            content: 'required',
            tag: 'required'
          };
      
          const validation = await validateAll(request.all(), rules);
         
          if(validation.fails()){
            session.withErrors(validation.messages())
                    .flashAll()
      
                    return response.redirect('back');
          }
         
        const {title, content, tag} = request.all();

        const post = new Post()
        post.fill({
            title,
            content,
            tag_id: tag,
            user_id: auth.user.id,
            slug: title
        })

        await post.save()
          return response.route('home')
    }
}

module.exports = PostController

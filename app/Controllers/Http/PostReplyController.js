'use strict'

const { validateAll }  = use('Validator')
const Post = use('App/Models/Post')

const { post } = require("@adonisjs/framework/src/Route/Manager");

class PostReplyController {
    async store({ request, response, session, auth, params }){
       const post = await Post.query()
                                .where('slug', params.slug)
                                .firstOrFail()
       
        const rules = {
            content: 'required|min:5',
          };
      
          const validation = await validateAll(request.all(), rules);
         
          if(validation.fails()){
            session.withErrors(validation.messages())
                    .flashAll()
      
                    return response.redirect('back');
          }
         
        const {content} = request.all();

        const reply = new Post()
        reply.fill({
            content,
            parent_id: post.id,
            user_id: auth.user.id
        })

        await reply.save()
          return response.redirect('back')
    }

    async show({ view, params }){
        const post = await Post.query()
                         .with('user')
                         .with('replies')
                         .with('replies.user')
                         .where('slug', '=', params.slug)
                         .firstOrFail()
        // console.log(post.toJSON());
        return view.render('posts/show', {
            post: post.toJSON()
        })
    }
}

module.exports = PostReplyController

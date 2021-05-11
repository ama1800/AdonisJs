'use strict'

const Tag = use('App/Models/Tag')
const Post = use('App/Models/Post')

class HomeController {

    async index({ view, request }){
        const tags = await Tag.all()
        const posts = await Post.query()
                                // .with('tag')
                                // .with('user')
                                // .with('replies')
                                .forRetrivePosts()
                                .whereNull('parent_id')
                                .orderBy('created_at', 'desc')
                                .paginate(request.input('page'), 2)
                                // .fetch()
        // console.log(posts.toJSON());
        return view.render('posts/index', {
            posts: posts.toJSON(),
            tags: tags.toJSON()
        })
    }

    async show({ view, params }){

        const post = await Post.query()
                        //  .with('tag')
                        //  .with('user')
                        //  .with('replies')
                         .forRetrivePosts()
                         .with('replies.user')
                         .where('slug', '=', params.slug)
                         .firstOrFail()
        // console.log(post.toJSON());
        return view.render('posts/show', {
            post: post.toJSON()
        })
    }

    async postsByTag({ view, params, request }){
        // methode 1
        // const tag = await Tag.query()
        //                         .where('slug', '=', params.slug)
        //                         .firstOrFail()

        // const posts = await Post.query()
        //                         .with('tag')
        //                         .with('user')
        //                         .where('tag_id', '=', tag.id)
        //                         .whereNull('parent_id')
        //                         .fetch()

        // methode 2
        const posts = await Post.query()
                                // .with('tag')
                                // .with('user')
                                // .with('replies')
                                .forRetrivePosts()
                                .whereHas('tag', query =>{
                                    query.where('slug', params.slug)
                                })
                                .whereNull('parent_id')
                                .orderBy('created_at', 'desc')
                                .paginate(request.input('page'), 2)
                                // .fetch()

        
        return view.render('posts/index', {
            posts: posts.toJSON(),
        })
    }

    async unanswered ({ view, request }){

        const posts = await Post.query()
                                // .with('tag')
                                // .with('user')
                                // .with('replies')
                                .forRetrivePosts()
                                .doesntHave('replies')
                                .whereNull('parent_id')
                                .orderBy('created_at', 'desc')
                                .paginate(request.input('page'), 2)
                                // .fetch()
        // console.log(posts.toJSON());
        return view.render('posts/index', {
            posts: posts.toJSON(),
        })
    }

    async own({ view, request, auth}){

        
        const posts = await Post.query()
                                // .with('tag')
                                // .with('user')
                                // .with('replies')
                                .forRetrivePosts()
                                .where('user_id', '=', auth.user.id)
                                .whereNull('parent_id')
                                .orderBy('created_at', 'desc')
                                .paginate(request.input('page'), 2)
                                // .fetch()
        // console.log(posts.toJSON());
        return view.render('posts/index', {
            posts: posts.toJSON(),
        })

    }
}

module.exports = HomeController

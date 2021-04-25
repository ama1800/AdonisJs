const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() =>{

    const View = use('View')

    const Tag = use('App/Models/Tag')

    Tag.all()
        .then(tags =>{
            View.global('tags', tags.toJSON())
        })
        .catch(()=>{})

})
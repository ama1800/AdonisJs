const { hooks } = require('@adonisjs/ignitor')
    const pluralize = require('pluralize')

hooks.after.providersBooted(() =>{

    const View = use('View')

    const Tag = use('App/Models/Tag')


    Tag.all()
        .then(tags =>{
            View.global('tags', tags.toJSON())
        })
        .catch(() => {})

        View.global('paginationArray', nbPages => {
            return Array.from(new Array(nbPages), (value, index) => index + 1)
        })

        View.global('pluralize', (singluar, length) => {
            return pluralize(singluar, length)
        })

})
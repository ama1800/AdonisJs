'use strict'

class TagController {

    newTag({ view }){
        return view.render('tags/new');
    }
}

module.exports = TagController

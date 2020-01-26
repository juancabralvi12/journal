//dummy database

const post1 = {id: 1, title: 'Post Title 1', body: 'Body'}
const post2 = {id: 2, title: 'Post Title 2', body: 'Body'}

const posts = [post1, post2]



module.exports = {
    posts: function(req, res) {
       res.send(posts)
    },

    create: function(req, res) {
        const title = req.param('title')
        const body = req.param('body')
        const size = posts.length + 1

        sails.log.debug('Creating post: ' + title + ' '+ body)  
        const newPost = {id: size, title: title, body: body}
        posts.push(newPost)
        res.end()
    },

    findById: function(req, res) {
        const postId = req.param('postId')

        const filtered = posts.filter(p => {return p.id == postId})
        
        //long implementation
        //const filtered = posts.filter(function(p) {
        //    return p.id == postId
        //})
        
        if (filtered.length > 0) {
            res.send(filtered[0])
        } else {
            res.send('Failed to find post by id: ' + postId)
        }
    }

}
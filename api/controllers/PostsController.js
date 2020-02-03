//dummy database

const post1 = {id: 1, title: 'Post Title 1', body: 'Body'}
const post2 = {id: 2, title: 'Post Title 2', body: 'Body'}

const posts = [post1, post2]



module.exports = {
    posts: async function(req, res) {
       //long option
       /*Post.find().exec(function(err, result){
           if (err){
               res.serverError(err.toString())
           }
           res.send(result)
       })*/
       try {
        const results = await Post.find()
        res.send(results)
       } catch (err) {
           res.serverError(err.toString())
       }
    },

    create: function(req, res) {


        const title = req.body.title
        const body = req.body.body

        Post.create({title: title, body: body}).exec(function() {
            console.log("Finished creating post object")
            return res.redirect('/home')
            //return res.end()
        })

        /*const size = posts.length + 1
        sails.log.debug('Creating post: ' + title + ' '+ body)  
        const newPost = {id: size, title: title, body: body}
        posts.push(newPost)
        res.end()*/
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
    }, 

    delete : async function(req, res) {
        const postId = req.param('postId')
        await Post.destroy({id: postId})
        res.send('Finished deleting post')
    }

}
const {prisma} = require('../prisma/prisma-client');


const CommentController = {
  createComment: async (req,res) => {
    const {content, postId} = req.body;
    const userId = req.user.userId;

    if(!content || !postId) {
      return res.status(400).json({error:'Все поля обязательны'})
    }

    try {
          const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId
      }
    })
    res.json({comment})
    } catch (error) {
      console.error('Create comment error', error)
      res.status(500).json({error:'Internal server error'})
    }
  },
  deleteComment: async (req, res) => {
    res.send('delete comment')
  }
}

module.exports = CommentController;



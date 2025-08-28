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
    res.json(comment)
    } catch (error) {
      console.error('Create comment error', error)
      res.status(500).json({error:'Internal server error'})
    }
  },
  deleteComment: async (req, res) => {
    const {id} = req.params;
    const userId = req.user.userId;

    try {
      const comment = await prisma.comment.findUnique({
        where: {id}
      })

      if(!comment) {
        return res.status(404).json({error: 'Комментарий не найден'})
      }

      if(comment.userId !== userId) {
        return res.status(403).json({error: 'Нет доступа'})
      }

      await prisma.comment.delete({
        where: {id}
      })

      res.json(comment)
    } catch (error) {
      console.error('Delete comment error', error)
      res.status(500).json({error: 'Internal server error'})
    }
  }
}

module.exports = CommentController;



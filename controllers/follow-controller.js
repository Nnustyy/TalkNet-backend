const {prisma} = require('../prisma/prisma-client');

const FollowController = {
  followUser: async (req, res) => {
    const {followingId} = req.body;
    const userId = req.user.userId;

    if(!followingId) {
      res.status(400).json({error:'Все поля обязательны'})
    }
    if(followingId === userId) {
      res.status(500).json({error:'Нельзя подписаться на себя'})
    }

    try {
      const existingSubscription = await prisma.follows.findFirst({
        where: {
          AND: [
            {followerId:userId},
            {followingId}
          ]
        }
      })
      if(existingSubscription) {
        return res.status(400).json({error:'Вы уже подписаны на этого пользователя'})
      }

      await prisma.follows.create({
        data:{
          follower:{connect: {id:userId}},
          following:{connect: {id:followingId}}
        }
      })
      res.status(201).json({message:'Подписка успешно создана'})
    } catch (error) {
      console.error('FollowUser error',error)
      res.status(500).json({error:'Internal server error'})
    }
  },
  unfollowUser:async (req, res) => {
    const {id} = req.params;
    const userId = req.user.userId;

    if(!id) {
      return res.status(400).json({error:'Все поля обязательны'})
    }
    if(userId === id) {
      return res.status(400).json({error: 'Нельзя отписаться от самого себя'})
    }
    try {
      const follows = await prisma.follows.findFirst({
        where: {
          AND: [
            {followerId:userId},
            {followingId:id}
          ]
        }
      })
      
      if(!follows) {
        return res.status(404).json({error:'Вы не подписаны на этого пользователя'})
      }
      
      await prisma.follows.delete({
        where: {id: follows.id}
      })
      res.status(201).json({message:'Подписка успешно удалена'})
    } catch (error) {
      console.error('Unfollow error', error)
      res.status(500).json({error:'Internal server error'})
    }
  }
}

module.exports = FollowController;
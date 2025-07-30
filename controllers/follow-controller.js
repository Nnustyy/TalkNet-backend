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
    res.send('unfollow')
  }
}

module.exports = FollowController;
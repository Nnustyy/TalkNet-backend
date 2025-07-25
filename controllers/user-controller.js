

const UserController = {
  register: async (req, res) => {
    res.send('ok')
  },
  login: async(req,res) => {
    res.send('login')
  },
  getUserById: async(req,res) => {
    res.send('userId')
  },
  updateUser: async(req, res) => {
    res.send('update')
  },
  current: async(req, res) => {
    res.send('current')
  },

}

module.exports = UserController;
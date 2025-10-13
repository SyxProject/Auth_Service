const { login, userService } = require('../services/user.service')

async function loginController(req, res) {
  try {
    const { name, password } = req.body
    const result = await login(name, password)
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function authenticate(req, res) {
  try {
    const { name, password } = req.body
    const result = await userService.authenticate(name, password)
    res.json({ authenticated: result })
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}

async function logout(req, res) {
  try {
    const { name } = req.body
    const result = await userService.logout(name)
    res.json({ logout: result })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function checkStatus(req, res) {
  try {
    const { name } = req.body
    const result = await userService.checkStatus(name)
    res.json({ status: result })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = { 
  login: loginController, 
  authenticate, 
  logout, 
  checkStatus 
}
const userService = require('../services/user.service')

async function loginController(req, res) {
  const { name, password } = req.body
  const result = await userService.login(name, password)
  if (result.message && result.message !== 'conexion aceptada') {
    return res.status(400).json(result)
  }
  res.json(result)
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

async function logoutController(req, res) {
  const { name } = req.body
  const result = await userService.logout(name)
  if (result.message && result.message !== 'conexion finalizada') {
    return res.status(400).json(result)
  }
  res.json(result)
}

async function checkStatusController(req, res) {
  const { name } = req.body
  const result = await userService.checkStatus(name)
  if (result.message) {
    return res.status(400).json(result)
  }
  res.json(result)
}

module.exports = {
  login: loginController,
  authenticate,
  logout: logoutController,
  checkStatus: checkStatusController
}
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserService {
  async authenticate(name, password) {
    const res = await pool.query('SELECT * FROM client WHERE name = $1', [name])
    const user = res.rows[0]
    if (!user) return false
    return await bcrypt.compare(password, user.password)
  }

  async login(name) {
    const res = await pool.query('SELECT * FROM client WHERE name = $1', [name])
    const user = res.rows[0]
    if (!user) return false
    if (user.status === 'inactivo') {
      await pool.query('UPDATE client SET status = $1 WHERE name = $2', ['activo', name])
    }
    return true
  }

  async logout(name) {
    const res = await pool.query('SELECT * FROM client WHERE name = $1', [name])
    const user = res.rows[0]
    if (!user) return false
    if (user.status === 'activo') {
      await pool.query('UPDATE client SET status = $1 WHERE name = $2', ['inactivo', name])
    }
    return true
  }

  async checkStatus(name) {
    const res = await pool.query('SELECT * FROM client WHERE name = $1', [name])
    const user = res.rows[0]
    if (!user) return 'error'
    return user.status
  }
}

async function login(name, password) {
  const res = await pool.query('SELECT * FROM client WHERE name = $1', [name])
  const user = res.rows[0]
  if (!user) throw new Error('Usuario no encontrado')
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error('Contraseña incorrecta')
  const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET)
  return { token }
}

module.exports = { login, userService: new UserService() }
const pool = require('../db')

async function login(name, password) {
  const res = await pool.query('SELECT * FROM client WHERE name = $1', [name])
  const user = res.rows[0]
  if (!user) return { message: 'usuario no encontrado' }
  if (user.password !== password) return { message: 'contraseña incorrecta' }
  if (user.status === 'inactivo') {
    await pool.query('UPDATE client SET status = $1 WHERE name = $2', ['activo', name])
  }
  return { message: 'conexion aceptada' }
}

async function logout(name) {
  const res = await pool.query('SELECT * FROM client WHERE name = $1', [name])
  const user = res.rows[0]
  if (!user) return { message: 'usuario no encontrado' }
  if (user.status !== 'inactivo') {
    await pool.query('UPDATE client SET status = $1 WHERE name = $2', ['inactivo', name])
  }
  return { message: 'conexion finalizada' }
}

async function checkStatus(name) {
  const res = await pool.query('SELECT * FROM client WHERE name = $1', [name])
  const user = res.rows[0]
  if (!user) return { message: 'usuario no encontrado' }
  return { status: user.status }
}

module.exports = { login, logout, checkStatus }
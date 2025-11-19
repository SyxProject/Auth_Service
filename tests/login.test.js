require('dotenv').config()
const userService = require('../src/services/user.service')

test('login con usuario correcto', async () => {
  const result = await userService.login('daniel', '1234')
  expect(result.message).toBe('conexion aceptada')
})

test('login con usuario incorrecto', async () => {
  const result = await userService.login('noexiste', '1234')
  expect(result.message).toBe('usuario no encontrado')
})

test('login con contraseña incorrecta', async () => {
  const result = await userService.login('daniel', 'wrong')
  expect(result.message).toBe('contraseña incorrecta')
})
require('dotenv').config()
const userService = require('../src/services/user.service')

test('logout con usuario correcto', async () => {
  const result = await userService.logout('daniel')
  expect(result.message).toBe('conexion finalizada')
})

test('logout con usuario incorrecto', async () => {
  const result = await userService.logout('noexiste')
  expect(result.message).toBe('usuario no encontrado')
})
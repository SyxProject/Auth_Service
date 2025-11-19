require('dotenv').config()
const userService = require('../src/services/user.service')

test('check status de usuario', async () => {
  const result = await userService.checkStatus('daniel')
  expect(['activo', 'inactivo']).toContain(result.status)
})

test('check status de usuario incorrecto', async () => {
  const result = await userService.checkStatus('noexiste')
  expect(result.message).toBe('usuario no encontrado')
})
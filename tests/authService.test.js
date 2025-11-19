require('dotenv').config()
const userService = require('../src/services/user.service')

describe('Microservicio de autenticación', () => {
  test('login', async () => {
    const result = await userService.login('daniel', '1234')
    expect(result.message).toBe('conexion aceptada')
  })

  test('logout', async () => {
    const result = await userService.logout('daniel')
    expect(result.message).toBe('conexion finalizada')
  })

  test('status', async () => {
    const result = await userService.checkStatus('daniel')
    expect(['activo', 'inactivo']).toContain(result.status)
  })

  test('login con usuario incorrecto', async () => {
    await expect(userService.login('noexiste@mail.com', '1234'))
      .rejects
      .toThrow('Usuario no encontrado')
  })
})
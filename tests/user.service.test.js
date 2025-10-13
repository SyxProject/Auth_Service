const userService = require('../src/services/user.service')

test('login con usuario incorrecto', async () => {
  await expect(userService.login('noexiste@mail.com', '1234'))
    .rejects
    .toThrow('Usuario no encontrado')
})
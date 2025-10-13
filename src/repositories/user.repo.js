const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = {
  async findById(id) {
    return prisma.user.findUnique({ where: { id: Number(id) } })
  },
  async findByUsername(username) {
    return prisma.user.findUnique({ where: { username } })
  },
  async updateStatus(id, status) {
    return prisma.user.update({ where: { id: Number(id) }, data: { status } })
  },
}
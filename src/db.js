const { Pool } = require('pg')

console.log('DATABASE_URL:', process.env.DATABASE_URL)

const isRender = process.env.DATABASE_URL && process.env.DATABASE_URL.includes('render.com')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ...(isRender && { ssl: { rejectUnauthorized: false } })
})

module.exports = pool
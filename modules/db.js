
/* db.js */

import { Client } from 'https://deno.land/x/mysql/mod.ts'

const home = Deno.env.get('HOME')
console.log(`HOME: ${home}`)

const connectionData = {
  '/home/codio':  {
    hostname: '127.0.0.1',
    username: 'websiteuser',
    password: 'websitepassword',
    db: 'website'
  },
  '/app': {
	hostname: 'sql4.freesqldatabase.com',
    username: 'sql4451553',
    password: 'qB2GfErKe9',
    db: 'sql4451553'
  }
}

const conn = connectionData[home]
console.log(conn)

const db = await new Client().connect(conn)

export { db }


/* routes.js */

import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts'
// import { upload } from 'https://cdn.deno.land/oak_upload_middleware/versions/v2/raw/mod.ts'
// import { parse } from 'https://deno.land/std/flags/mod.ts'


import { login, register } from './modules/accounts.js'

//const handle = new Handlebars({ defaultLayout: '' })
const handle = new Handlebars()

const router = new Router()

// the routes defined here
router.get('/', async context => {
	const authorised = context.cookies.get('authorised')
	if(authorised === undefined) context.response.redirect('/login')
    const nav = true
	const data = { authorised, nav, title: "Home" }
	const body = await handle.renderView('home', data)
	context.response.body = body
})

router.get('/myissues', async context => {
	const authorised = context.cookies.get('authorised')
	if(authorised === undefined) context.response.redirect('/login')
    const nav = true
	const data = { authorised, nav, title: "My Issues" }
	const body = await handle.renderView('my-issues', data)
	context.response.body = body
})

router.get('/addissue', async context => {
	const authorised = context.cookies.get('authorised')
	if(authorised === undefined) context.response.redirect('/login')
    const nav = true
	const data = { authorised, nav, title: "Add Issue" }
	const body = await handle.renderView('add-issue', data)
	context.response.body = body
})


router.get('/login', async context => {
    const data = { title: "Log In" }
	const body = await handle.renderView('login', data)
	context.response.body = body
})

router.get('/register', async context => {
    const data = { title: "Register" }
	const body = await handle.renderView('register', data)
	context.response.body = body
})

router.post('/register', async context => {
	console.log('POST /register')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	await register(obj)
	context.response.redirect('/login')
})

router.get('/logout', context => {
  // context.cookies.set('authorised', null) // this does the same
  context.cookies.delete('authorised')
  context.response.redirect('/login')
})

router.post('/login', async context => {
	console.log('POST /login')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	try {
		const username = await login(obj)
		context.cookies.set('authorised', username)
		context.response.redirect('/')
	} catch(err) {
		console.log(err)
		context.response.redirect('/login')
	}
})

router.post('/add', async context => {
	console.log('POST /add')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	context.response.redirect('/')
})



export default router

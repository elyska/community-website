
/* routes.js */

import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts'
// import { upload } from 'https://cdn.deno.land/oak_upload_middleware/versions/v2/raw/mod.ts'
// import { parse } from 'https://deno.land/std/flags/mod.ts'

import { login, register } from './modules/accounts.js'
import { addIssue, getNewIssues, getMyIssues, getIssueDetail, updateFlag } from './modules/issues.js'

//const handle = new Handlebars({ defaultLayout: '' })
const handle = new Handlebars()

const router = new Router()

// the routes defined here
router.get('/', async context => {
	const authorised = context.cookies.get('authorised')
	if(authorised === undefined) context.response.redirect('/login')
    const latitude = context.cookies.get('latitude')
    const longitude = context.cookies.get('longitude')
    const issues = await getNewIssues(latitude, longitude)
    console.log(issues)
    const nav = true
	const data = { authorised, nav, title: "Home", content: "Home page", style: ["style"], issues }
	const body = await handle.renderView('home', data)
	context.response.body = body
})

router.get('/myissues', async context => {
	const authorised = context.cookies.get('authorised')
	if(authorised === undefined) context.response.redirect('/login')
    const issues = await getMyIssues(authorised)
    const nav = true
    const content = "Page to display all issues submitted by the user"
	const data = { authorised, nav, title: "My Issues", content, style: ["style"], issues }
	const body = await handle.renderView('my-issues', data)
	context.response.body = body
})

router.get('/addissue', async context => {
	const authorised = context.cookies.get('authorised')
	if(authorised === undefined) context.response.redirect('/login')
    const nav = true
    const content = "Page with a form to submit an issue"
	const data = { authorised, nav, title: "Add Issue", content, style: ["style"] }
	const body = await handle.renderView('add-issue', data)
	context.response.body = body
})

router.get('/issues/:id', async context => {
	const authorised = context.cookies.get('authorised')
	if(authorised === undefined) context.response.redirect('/login')
    const issue = await getIssueDetail(context.params.id)
    if (issue.username === authorised) issue.isMine = true
    const nav = true
    const content = "Page describing an issue in detail"
	const data = { authorised, nav, title: "Add Issue", content, style: ["style", "issue"], issue }
	const body = await handle.renderView('issue-detail', data)
	context.response.body = body
})


router.get('/login', async context => {
    const url = context.request.url
    //code based on https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    const searchParams = new URLSearchParams(url.search)
    const content = "Page with a form asking for login details"
    const data = { username: searchParams.get("username"), content, title: "Log In", style: ["style"]}
    //end of code based on https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    console.log(data)
	const body = await handle.renderView('login', data)
	context.response.body = body
})

router.get('/register', async context => {
    const content = "Page with a form for a new user to regiester"
    const data = { title: "Register", content, style: ["style"] }
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
    console.log(value)
	const obj = Object.fromEntries(value)
	console.log(obj)
	try {
		const username = await login(obj)
		context.cookies.set('authorised', username)
		context.response.redirect('/')
	} catch(err) {
		console.log(err)
		context.response.redirect(`/login?username=${obj.username}`)
	}
})

router.post('/add', async context => {
	console.log('POST /add')
	const body = context.request.body({ type: 'form-data' })
	const value = await body.value.read()
    console.log(value)
    let data = value.fields 
    const user = context.cookies.get("authorised")
    const file = value.files[0]
    const { originalName, filename } = file
    // set photo to uploaded image or placeholder
    if (originalName != "") {
        await Deno.rename(value.files[0].filename, `${Deno.cwd()}/public/uploads/${user}-${originalName}`)
        data.photo = `${user}-${originalName}`
    }
    else {
        data.photo = "placeholder.png"
    }
    data.latitude = context.cookies.get("latitude")
    data.longitude = context.cookies.get("longitude")
    console.log(data)
    await addIssue(user, data)
	context.response.redirect('/')
})

router.post('/flag-as-fixed/:id', async context => {
    console.log('POST /flag-as-fixed')
    const issueId = context.params.id
    console.log(issueId)
    await updateFlag(issueId, "addressed")
    context.response.redirect(`/issues/${issueId}`)
})

router.post('/fix-confirmed/:id', async context => {
    console.log('POST /fix-confirmed')
    const issueId = context.params.id
    console.log(issueId)
    await updateFlag(issueId, "fixed")
    context.response.redirect(`/issues/${issueId}`)
})


export default router

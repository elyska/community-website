
/* issues.js */

import {db} from "./db.js"

export async function addIssue(user, data) {
    const userSql = `SELECT id FROM accounts WHERE user="${user}";`
    let userid = await db.query(userSql)
    userid = userid[0].id
    const sql = `INSERT INTO issues(title, location, description, photo, userid) 
    VALUES ("${data.title}", "${data.location}", "${data.description}", "${data.photo}", ${userid});`
    const records = await db.query(sql)
    return true
}

export async function getIssues() {
    const sql = `SELECT * FROM issues;`
    const issues = await db.query(sql)
    return issues
}

export async function getMyIssues(user) {
    const userSql = `SELECT id FROM accounts WHERE user="${user}";`
    let userid = await db.query(userSql)
    userid = userid[0].id
    const sql = `SELECT * FROM issues WHERE userid="${userid}";`
    const issues = await db.query(sql)
    return issues
}

export async function getIssueDetail(id) {
    const sql = `SELECT * FROM issues WHERE id="${id}";`
    const issue = await db.query(sql)
    const userid = issue[0].userid
    const userSql = `SELECT user FROM accounts WHERE id="${userid}";`
    const user = await db.query(userSql) 
    let detail = issue[0]
    if (detail.photo === "placeholder.png") delete detail.photo
    detail.username = user[0].user
    return detail
}

export async function updateFlag(id, status) {
    const sql = `UPDATE issues SET status="${status}" WHERE id="${id}";`
    const records = await db.query(sql)
    return true
}
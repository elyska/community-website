
/* issues.js */

import {db} from "./db.js"
import { DistanceCalculator } from "https://deno.land/x/distancecalculator/distance-calculator.ts"

export async function addIssue(user, data) {
    const userSql = `SELECT id FROM accounts WHERE user="${user}";`
    let userid = await db.query(userSql)
    userid = userid[0].id
    const latitude = parseFloat(data.latitude)
    const longitude = parseFloat(data.longitude)
    console.log(latitude)
    console.log(typeof latitude)
    const sql = `INSERT INTO issues(title, location, description, photo, userid, longitude, latitude) 
    VALUES ("${data.title}", "${data.location}", "${data.description}", "${data.photo}", ${userid}, ${longitude}, ${latitude});`
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

export async function addDistances(curr, username) {
    //console.log(username)
    const userSql = `SELECT id FROM accounts WHERE user="${username}";`
    const userid = await db.query(userSql)
    //console.log(userid)
    
    const sql = `SELECT id, latitude, longitude FROM issues WHERE status="new";`
    const issues = await db.query(sql)
    for (const issue of issues) {
       if (issue.latitude === null || issue.longitude === null) issue.distance = null
       else {
           //console.log(issue)
           const distance = DistanceCalculator.getDistanceInKilometers(curr.latitude, curr.longitude, issue.latitude, issue.longitude)
           issue.distance = distance 
           //console.log(distance)
           const distSql = `INSERT INTO distances(issueid, userid, distance) VALUES (${issue.id}, ${userid[0].id}, ${distance}) ON DUPLICATE KEY UPDATE distance=${distance};`
           const records = await db.query(distSql)
       }
    }
    
    //console.log(issues)
    return true
}


export async function getDistances(username) {
    
    console.log(username)
    const userSql = `SELECT id FROM accounts WHERE user="${username}";`
    const userid = await db.query(userSql)
    console.log(userid)
    
    const sql = `SELECT i.id, i.title, i.location, i.currdate, i.photo, i.status, d.issueid, d.userid, d.distance FROM issues i LEFT JOIN distances d ON i.id = d.issueid WHERE d.userid = "${userid[0].id}";`
    const issues = await db.query(sql)
    console.log(issues)
    return issues
}
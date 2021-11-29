
/* issues.js */

import {db} from "./db.js"
import { DistanceCalculator } from "https://deno.land/x/distancecalculator/distance-calculator.ts"
import Ajv from "../ajv.js"

export async function addIssue(user, data) {
    if(data.latitude != undefined || data.latitude != undefined) {
        /*data.latitude = null
        data.latitude = null
        console.log("changed to null")
        console.log( data.longitude)*/
        data.latitude = parseFloat(data.latitude)
        data.longitude = parseFloat(data.longitude)
    }
    // validate data against JSON schema
    const ajv = new Ajv({ allErrors: true })
    const dataSchema = {
        title: "Add Issue",
        description: "JSON schema to validate data about an issue",
        type: "object",
        properties: {
            
            title: {
                type: "string",
                maxLength: 60
            }, 
            location: {
                type: "string",
                maxLength: 100
            },
            description: {
                type: "string"
            },
            photo: {
                type: "string"
            },
            longitude: {
                type: ["number", "null"]
            },
            latitude: {
                type: ["number", "null"]
            }
        }
    }/*
    console.log("data.longitude")
    console.log( data.longitude)
    console.log(typeof data.longitude)*/
    const validate = ajv.compile(dataSchema)
    
    try {
        const valid = validate(data)
        if (valid === false) throw validate.errors
        console.log("ADD ISSUE OBJECT VALID")
        
        const userSql = `SELECT id FROM accounts WHERE user="${user}";`
        let userid = await db.query(userSql)
        userid = userid[0].id
        
        if(data.latitude == undefined || data.latitude == undefined) {
            const sql = `INSERT INTO issues(title, location, description, photo, userid) VALUES ("${data.title}", "${data.location}", "${data.description}", "${data.photo}", ${userid});`
            const records = await db.query(sql)
        }
        else {
            const sql = `INSERT INTO issues(title, location, description, photo, userid, longitude, latitude) VALUES ("${data.title}", "${data.location}", "${data.description}", "${data.photo}", ${userid}, ${data.longitude}, ${data.latitude});`
            const records = await db.query(sql)
        }
        return true 
    }
    catch(err) {
        console.log("ADD ISSUE OBJECT INVALID")
        console.log(err)
    }
}

export async function getNewIssues(currLat, currLon) {
    const sql = `SELECT * FROM issues WHERE status="new";`
    const issues = await db.query(sql)
    for (const issue of issues) {
        if (issue.latitude && issue.longitude && currLat && currLon) {
            issue.distance = DistanceCalculator.getDistanceInKilometers(currLat, currLon, issue.latitude, issue.longitude)
            issue.distance = Math.round(issue.distance * 1000)
        }
        else {
            issue.distance = null
        }
    }
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
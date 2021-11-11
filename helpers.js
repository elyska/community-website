
/* helpers. js */

import { Marked } from 'https://deno.land/x/markdown@v2.0.0/mod.ts'


const convertDate = (date) => {
    // code based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    const newDate = date.getDate().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getFullYear().toString()
    // end of code based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    return newDate
}

const equalsNew = (status) => {
    console.log(status)
    if (status === "new") return true
    return false
}

const equalsAddressed = (status) => {
    if (status === "addressed") return true
    return false
}

const markdownConverter = (description) => {
    // code based on https://deno.land/x/markdown@v2.0.0
    const markup = Marked.parse(description)
    console.log(markup.content)
    // end of code based on https://deno.land/x/markdown@v2.0.0
    return markup.content
}

export const helpers = {
    convertDate: convertDate,
    equalsNew: equalsNew,
    equalsAddressed: equalsAddressed,
    markdownConverter: markdownConverter
}



/* helpers. js */

const convertDate = (date) => {
    // code based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    const newDate = date.getDate().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getFullYear().toString()
    // end of code based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    return newDate
}

const equalsNew = (status) => {
    if (status === "new") return true
    return false
}

const equalsAddressed = (status) => {
    if (status === "addressed") return true
    return false
}

export const helpers = {
    convertDate: convertDate,
    equalsNew: equalsNew,
    equalsAddressed: equalsAddressed
}

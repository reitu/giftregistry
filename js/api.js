export var users = [] //user accounts

export var objX = {}

export var guests = []

export function init() {
    pullUsers()
}


export function addUser (thename = " ", theemail = " ", thetitle = " ", thedetails = " ", thedate = " ") {
    objX = {
        name: thename,
        email: theemail,
        grtitle: thetitle,
        grdscrptn: thedetails,
        grdate: thedate,
        giftreg: []
        //uuid: getUniqueID()
    }
    fetchUserDetails(objX)
    users.push(objX)
    console.log('this is the object right now: ', objX)
    pushUsers()
}

function pushUsers() { 
    var myJSONstring = JSON.stringify(users)  
    window.localStorage.setItem('allUsers', myJSONstring)
}

function pullUsers() {
    var storedStr = window.localStorage.allUsers
    if (storedStr) {
        users = JSON.parse(storedStr)
    }
    if (!storedStr) {
        users = []
    }
}


const idGenerator = (function* () {
    const options = [
        () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0
            const v = c === 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        }),
        () => 'cxx1xxxx-xx1x-4xxx-yxxx-sxcxxxxcxx1x',
        () => '1xx2xaxx-xa1x-4xxx-yxxy-cxxvxvxaxv2y'
    ]
    while (1) yield options[Math.floor(Math.random() * options.length)]()
})()
function uuidv4() {
    return idGenerator.next().value
}


function getUniqueID () {
    var duplicate = false
    let id = uuidv4()
    users.forEach(element => {
        try {
            if (element.uuid === id) {
                duplicate = true
            }
        } catch (e) {
            console.error('error', e)
        }
    });
    if (duplicate) {
        return getUniqueID()
    } else {
        return id
    }
} 


export function fetchUserDetails(a) {
    a.uuid = getUniqueID() 
}

export const uuid = new URLSearchParams(location.search).get('uuid')

export function getCurrentProfile() { //does it keep pulling it
    const queryString = window.location.search
    const product = new URLSearchParams(queryString).get('uuid')

    let userInfo = users.filter(function (e) {
        return e.uuid === product; //returns an array
    });
    
    let currentProfile = userInfo[0]

    return currentProfile
}


export function addItem(xName, xDes) {
    getCurrentProfile().giftreg.push({
        giftname: xName,
        giftdescription: xDes,  
        assigned: false
    })
    pushUsers()
}


export function dltItem (x) {
    var myUpdatedReg =  getCurrentProfile().giftreg.filter(function(thegift) {
            return !(thegift.giftname === x)
        });       
    getCurrentProfile().giftreg = myUpdatedReg
    pushUsers()

}


export function getItem (thekey) {
    //getCurrentProfile().giftreg.forEach(element => {
    thekey.assigned = true
   // });
    pushUsers()
    console.log('hey',users)

}



export function ungetItem (thekey) {
    //getCurrentProfile().giftreg.forEach(element => {
    thekey.assigned = false
   // });
    pushUsers()
    console.log('hey',users)

}
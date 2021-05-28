var users = [] //user accounts //inaccessible outside API
var giftArr = []

export var objX = {}

export var guests = []

export function init() {
    pullUsers()
}


function sendCopy (value) {
    return JSON.parse(JSON.stringify(value))
}


export function addUser (thename, theemail, thetitle, thedetails, thedate) { 

    if (!theemail || !thename) return false

    if (theemail) { 
        var duplicate = false 
        _getUsers().forEach(function (el) {
                if (el.email === theemail) {
                    duplicate = true
                }
            });
        
        if (!duplicate) {
            objX = {
                name: thename,
                email: theemail,
                grtitle: thetitle,
                grdscrptn: thedetails,
                grdate: thedate,
                giftreg: []
            }
            _fetchUserDetails(objX)
            users.push(objX)
            console.log('this is the object right now: ', objX)
            _pushUsers()

            return true
        } 
    } 

}

function _pushUsers() {  
    var myJSONstring = JSON.stringify(users)  
    window.localStorage.setItem('allUsers', myJSONstring)
}

function _getUsers () { //ALL PRIVATE MUST HAVE AN UNDERSCORE
    var storedStr = window.localStorage.allUsers
    if (storedStr) {
        users = JSON.parse(storedStr)
    }
    if (!storedStr) {
        users = []
    }             
    return users 
}


export function getUsers () { 
    return sendCopy(_getUsers())    
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


export function _fetchUserDetails(a) {
    a.uuid = getUniqueID() 
}

export const uuid = new URLSearchParams(location.search).get('uuid')


export function getCurrentProfile(a) {

    let userInfo = _getUsers().filter(function (e) {
        return e.uuid === a; 
    });
    
    let currentProfile = userInfo[0]

    return sendCopy(currentProfile) 
}


export function addItem(gift, description, userID) {
    var user = _fetchUser(userID)
    if (!gift) return false

    var giftDuplicate = false

    user.giftreg.forEach(function (el) {
        if (el.giftname === gift) {
            giftDuplicate = true
        }
    });

    if (!giftDuplicate) {
        user.giftreg.push({
            giftname: gift,
            giftdescription: description,  
            assigned: ''
        })
        _pushUsers()
        console.log("hey", _getUsers())
        return true
    }
}


export function dltItem (userID, x) {
    var myUpdatedReg = _fetchUser(userID).giftreg.filter(function(thegift) {
            return !(thegift.giftname === x)
        });       
        _fetchUser(userID).giftreg = myUpdatedReg 
    _pushUsers()

}


export function getIDofRecent() {
    var iPos = _getUsers().length
    var recentlyAdded = _getUsers()[iPos-1]
    return recentlyAdded.uuid
}


export function finalizeGift(userID, selectedGifts, name, email) {

    if (!selectedGifts && (!name || !email)) return false

    var user = _fetchUser(userID)
    var userGifts = user.giftreg

    userGifts.forEach(el => {
        selectedGifts.forEach(element => {
            if (el.giftname === element.giftname) {
            
                el.assigned = {
                    name,
                    email
                }
            } 
        })        
    })
    _pushUsers()

    return true  
}


function _fetchUser(userID) {
    var user = null
    _getUsers().forEach(element => {
        if (element.uuid === userID)  {
            user = element
        } 
    })
    return user    
}






import {init, addUser, users, addItem, getCurrentProfile, dltItem, uuid, getItem, ungetItem, finishAdd} from './api.js'
import {stringToHTML} from './helpersfile.js'

window.onload = start()


function start() {
    init()
    console.log(uuid)

    console.log('all users right now: ', users)

    var regList = document.getElementById("reg-list")
    regList.appendChild(stringToHTML(`
        <div class="yourdetails"> 
            <h2> Gift Registry Details
            </h2>
            <p> Sent by: ${getCurrentProfile().name}
            </p>
            <p> Contact: ${getCurrentProfile().email}
            </p>
            <p>  ${getCurrentProfile().grtitle}
            </p>
            <p> ${getCurrentProfile().grdscrptn}
            </p>
            <p> ${getCurrentProfile().grdate}
            </p>
            
        
        </div>
        `))
   showGifts()
}


function showGifts () {
    var currentRegArr = getCurrentProfile().giftreg
    var regList = document.getElementById("view-list")
    regList.innerHTML = " "
    currentRegArr.forEach(element => {
        console.log('im an element here: ', element.giftname , element.assigned)
        if (element.assigned) {
            var el = stringToHTML(`
                <div> 
                    <div> 
                    <label for="gift">  <s> ${element.giftname} </s></label>
                    <input type="checkbox" class="gifts">
                    </div>
                    
                </div>
            `)
        } else {
            var el = stringToHTML(`
                <div> 
                    <div> 
                    <label for="gift"> ${element.giftname} hey </label>
                    <input type="checkbox" class="gifts">
                    </div>
                    
                </div>
            `)

        }

        regList.appendChild(el)
        
        var thename = document.getElementById("res-name")
        var theemail = document.getElementById("res-email")

        var checkGift = el.querySelector(".gifts")

        checkGift.onchange = function () {
            if (checkGift.checked) {
                console.log("hey")
                getItem(element, thename.value, theemail.value)
            } 
            if(!checkGift.checked) {
                console.log("im going")
                ungetItem(element)
            }
        }

        // btnGet.onclick = function () {
        //    // dltItem (element.giftname)
        //    //element.assigned = true
        //     console.log("i am pressing a button") 
        //     getItem(element, thename.value, theemail.value)
        //     showGifts()
        // }   

        // btnUndo.onclick = function () {
        //     // dltItem (element.giftname)
        //     //element.assigned = true
        //      console.log("undid honey") 
        //      ungetItem(element)
        //      showGifts()

        //      //getItem(element)
        //      //showGifts()
       
    });   
    
}


var btnFinish = document.getElementById("btnFinish")

btnFinish.onclick = function () {
    console.log('all DEM', users)
    finishAdd()
}










//  var btnGet = el.querySelector(".giftGet")

//         var btnUndo = el.querySelector(".giftUndo")

//         //var checkGift = el.querySelector(".gifts")


  // btnGet.onclick = function () {
        //    // dltItem (element.giftname)
        //    //element.assigned = true
        //     console.log("i am pressing a button") 
        //     getItem(element, thename.value, theemail.value)
        //     showGifts()
        // }
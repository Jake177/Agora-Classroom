//Display userName on the chatbox form
let form = document.getElementById('lobby__form')

let displayName = sessionStorage.getItem('display_name')
if (displayName) {
    form.name.value = displayName
}

// allow user to join certain room with room id(string)
form.addEventListener('submit',(e)=> {
    e.preventDefault()
    //submit the form
    sessionStorage.setItem('display_name',e.target.name.value)

    let inviteCode = e.target.room.value
    // if there is no invite code, randomly create one
    if (!inviteCode) {
        inviteCode = String(Math.floor(Math.random() * 10000))
    }
    window.location = `room.html?room=${inviteCode}`
})
// print message when a member joined specic roomId
let handleMemberJoined = async (MemberId) => {
    let {name} = await rtmClient.getUserAttributesByKeys(MemberId, ['name'])
    console.log("A new member joined the room: ", MemberId)
    addMemberToDom(MemberId)

    let members = await channel.getMembers()
    updateMemberTotal(members)

    addBotMessageToDom(`${name} joined the room`)
}

// add new come-in user to participants
let addMemberToDom = async (MemberId) => {
    let {name} = await rtmClient.getUserAttributesByKeys(MemberId, ['name'])

    let membersWrapper = document.getElementById('member__list')
    let memberItem = `<div class="member__wrapper" id="member__${MemberId}__wrapper">
                        <span class="green__icon"></span>
                        <p class="member_name">${name}</p>
                    </div>`

    membersWrapper.insertAdjacentHTML('beforeend', memberItem)
}
// update the number of participants
let updateMemberTotal = async (members) => {
    let total = document.getElementById('members__count')
    total.innerText = members.length
}

// remove the come-in user from participants when user left
let handleMemberLeft = async(MemberId) => {
    removeMemberFromDom(MemberId)

    let members = await channel.getMembers()
    updateMemberTotal(members)
}

let removeMemberFromDom = async (MemberId) => {
    let memberWrapper = document.getElementById(`member__${MemberId}__wrapper`)
    let name = memberWrapper.getElementsByClassName('member_name')[0].textContent
    addBotMessageToDom(`${name} has left the room`)
    memberWrapper.remove()
}

// get all the users in the channel and show them (including youself)
let getMembers = async() => {
    let members = await channel.getMembers()
    updateMemberTotal(members)
    for (let i = 0;members.length > i;i++) {
        addMemberToDom(members[i])
    }

}

// peer to peer message for chat box
let handleChannelMessage = async(messageData, MemberId) => {
    console.log("A new message was received")
    let data = JSON.parse(messageData.text)
    // chat message
    if (data.type === 'chat') {
        addMessageToDom(data.displayName, data.message)
    }
    // leave message
    if (data.type === 'user_left') {
        document.getElementById(`user-container-${data.uid}`).remove()

        //hide the toggled large frame
        if(userIdInDisplayFrame === `user-container-${uid}`) {
            displayName.style.display = null

            for (let i = 0; videoFrames.length > i; i++) {
                videoFrames[i].style.height = '300px'
                videoFrames[i].style.width = '300px'
            }
        }
    }
}

// When sending message, create a container showing the name of the author and the content of message
let sendMessage = async(e) => {
    e.preventDefault()
    let message = e.target.message.value
    channel.sendMessage({text:JSON.stringify({'type':'chat','message':message,'displayName':displayName})})
    addMessageToDom(displayName, message)
    e.target.reset()
}
let addMessageToDom = (name, message) => {
    let messagesWrapper = document.getElementById('messages')
    let newMessage = `<div class="message__wrapper">
                        <div class="message__body">
                            <strong class="message__author">${name}</strong>  
                                <p class="message__text">${message}</p>
                        </div>
                     </div>`
    messagesWrapper.insertAdjacentHTML('beforeend', newMessage)
    //move the scroll bar of chat box to bottom
    let lastMessage = document.querySelector('#messages .message__wrapper:last-child')
    if (lastMessage) {
        lastMessage.scrollIntoView()
    }
}

// bot message when user join or left the room
let addBotMessageToDom = (botmessage) => {
    let messagesWrapper = document.getElementById('messages')
    let newMessage = `<div class="message__wrapper">
                        <div class="message__body__bot">
                                <p class="message__text__bot">${botmessage}</p>
                        </div>
                    </div>`
    messagesWrapper.insertAdjacentHTML('beforeend', newMessage)
    //move the scroll bar of chat box to bottom
    let lastMessage = document.querySelector('#messages .message__wrapper:last-child')
    if (lastMessage) {
        lastMessage.scrollIntoView()
    }
}

// When user leave, immedately call remove the user
let leaveChannel = async () => {
    await channel.leave()
    await rtmClient.logout()
}
window.addEventListener('beforeunload', leaveChannel)
let messageForm = document.getElementById('message__form')
messageForm.addEventListener('submit', sendMessage)
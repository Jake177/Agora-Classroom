//construct variable by calling getElementById
let messagesContainer = document.getElementById('messages');
messagesContainer.scrollTop = messagesContainer.scrollHeight;

const memberContainer = document.getElementById('members__container');
const memberButton = document.getElementById('members__button');

const chatContainer = document.getElementById('messages__container');
const chatButton = document.getElementById('chat__button');

let activeMemberContainer = false;

memberButton.addEventListener('click', () => {
  if (activeMemberContainer) {
    memberContainer.style.display = 'none';
  } else {
    memberContainer.style.display = 'block';
  }

  activeMemberContainer = !activeMemberContainer;
});

let activeChatContainer = false;

chatButton.addEventListener('click', () => {
  if (activeChatContainer) {
    chatContainer.style.display = 'none';
  } else {
    chatContainer.style.display = 'block';
  }

  activeChatContainer = !activeChatContainer;
});


// handle the click events when click on the video frame
let displayFrame = document.getElementById('stream__box')
let videoFrames = document.getElementsByClassName('video__container')
let userIdInDisplayFrame = null;

//check for video in stream__box and change the layout if there is
let expandVideoFrame = (e) => {

  let child = displayFrame.children[0]
  if (child){
    // remove the item
    document.getElementById('streams__container').appendChild(child)
  }

  displayFrame.style.display = 'block'
  displayFrame.appendChild(e.currentTarget)
  userIdInDisplayFrame = e.currentTarget.id;

  for (let i = 0; videoFrames.length > i; i++) {
    // smaller the other frame
    if (videoFrames[i].id != userIdInDisplayFrame) {
      videoFrames[i].style.height = '100px'
      videoFrames[i].style.width = '100px'
    }
}
}

for (let i = 0; videoFrames.length > i; i++) {
  videoFrames[i].addEventListener('click', expandVideoFrame)
}

// hide large stream when click on it
let hideDisplayFrame = () => {
    userIdInDisplayFrame = null
    displayFrame.style.display = null

    let child = displayFrame.children[0]
    document.getElementById('streams__container').appendChild(child)

    for (let i = 0; videoFrames.length > i;i++) {
      videoFrames[i].style.height = '300px'
      videoFrames[i].style.width = '300px'
  }
}
displayFrame.addEventListener('click', hideDisplayFrame)
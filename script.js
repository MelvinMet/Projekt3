const joinBTN = document.querySelector("#liitu")
const inp = document.querySelector("#nimi")
const maps = document.querySelector("#map")
const SendMessage = document.querySelector("#saada")
const inp2 = document.querySelector("#kiri")
let user = ""
let playerkey = ""

  const saved = JSON.parse(localStorage.getItem('key')) || ""
  playerkey = saved

async function load() {
  const response = await fetch('https://tinkr.tech/sdb/melvinm/wander');
  const data = await response.json();
   maps.innerHTML = ""
  for (const idk of data.players) {
    const player = document.createElement("div")
    player.style.position = "absolute"
    player.style.left = idk.x + "px"
    player.style.top = idk.y + "px"
    player.style.height = "32px"
    player.style.width = "32px"
    maps.appendChild(player)

    const playerMessage = document.createElement("p")
    playerMessage.textContent = idk.message + "\n↓"
    playerMessage.style.color = "white"
    playerMessage.style.textAlign = "center"
    if (idk.message === null) {
     playerMessage.textContent = "" 
    }
    player.appendChild(playerMessage)

    const playerimg = document.createElement("img")
    playerimg.style.height = "40px"
    playerimg.style.width = "40px"
    playerimg.src = "https://tinkr.tech" + idk.image
    player.appendChild(playerimg)

    const playername = document.createElement("p")
    playername.textContent = idk.username
    player.appendChild(playername)
  }
}

function saveKey() {
  localStorage.setItem("key", JSON.stringify(playerkey))
}

joinBTN.addEventListener("click", async function () {
  if (playerkey === "") {
  let username = inp.value
  const messageData = { action: 'join', username: username }

  const response = await fetch('https://tinkr.tech/sdb/melvinm/wander', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(messageData)
  });

  const result = await response.json()
  playerkey = result.player_key
  user = username
  load()
  saveKey()
  }
  else {
    alert("You already joined")
  }
})

maps.addEventListener("click", async function (move) {
  if (playerkey === "") {
    alert("Join the game to move")
  }
  else {
    let suurus = maps.getBoundingClientRect()
    let x = move.clientX - suurus.left
    let y = move.clientY - suurus.top

    const messageData = { action: 'move', player_key: playerkey, x: x, y: y };
    const response = await fetch('https://tinkr.tech/sdb/melvinm/wander', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageData)
    });
    load()
  }
})

SendMessage.addEventListener("click", async function() {
  let talk = inp2.value
    if (playerkey === "" || talk === "") {
    alert("Something went wrong!")
  }
  else {
  const messageData = { action: 'talk', player_key: playerkey, message: talk };
        
  const response = await fetch('https://tinkr.tech/sdb/melvinm/wander', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
            },
     body: JSON.stringify(messageData)
   });
   inp2.value = ""
   load()
  }
})

load()

setInterval(function() {
    load();
}, 2000);
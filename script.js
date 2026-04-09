const joinBTN = document.querySelector("#liitu")
const inp = document.querySelector("#nimi")
const maps = document.querySelector("#map")

async function load() {
      const response = await fetch('https://tinkr.tech/sdb/melvinm/wander');
  const data = await response.json();
  console.log(data);
  for (const idk of data.players) {
    const player = document.createElement("div")
    player.style.position = "absolute"
    player.style.left = idk.x + "px"
    player.style.top = idk.y + "px"
    player.style.height = "32px"
    player.style.width = "32px"
    maps.appendChild(player)

    const playerimg = document.createElement("img")
    playerimg.style.height = "32px"
    playerimg.style.width = "32px"
    playerimg.src = "https://tinkr.tech"+ idk.image
    console.log(idk.image)
    player.appendChild(playerimg)
  }
}

load()
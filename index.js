const express = require("express");
const http = require("http");
const mineflayer = require('mineflayer')
const pvp = require('mineflayer-pvp').plugin
const { pathfinder, Movements, goals} = require('mineflayer-pathfinder')
const armorManager = require('mineflayer-armor-manager')
const mc = require('minecraft-protocol');
const AutoAuth = require('mineflayer-auto-auth');
const app = express();
const { exec } = require("child_process");

app.use(express.json());

app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

setInterval(() => {
  http.get('http://localhost:3000').on('error', () => {
    console.log("Servidor não está rodando.");
  });
}, 60000);


function createBot () {
const bot = mineflayer.createBot({
  host: 'FriendsUFAC.aternos.me', 
  version: false, 
  username: 'herobrine', 
  port: 22373, 
  plugins: [AutoAuth],
  AutoAuth: 'bot112022'
})

bot.loadPlugin(pvp)
bot.loadPlugin(armorManager)
bot.loadPlugin(pathfinder)

bot.on('kicked', (reason) => {
  console.log(`Bot foi kickado: ${reason}`);
  setTimeout(createBot, 10000) // 10 segundos antes de reconectar
});

bot.on('error', console.log)
bot.on("end", () => {
  console.log("Reiniciando o bot automático!");
  exec(`curl -X POST https://api.render.com/v1/services/srv-cv3jak7noe9s73c3f64g/deploys \
  -H "Authorization: Bearer rnd_ZFRMqoK1vuvJ3fH5WQ44JzK9BbDu" \
  -H "Content-Type: application/json" \
  -d '{}'`);
});

}

createBot()

//import required holepunch modules
import Hyperswarm from "hyperswarm";
import Hypercore from "hypercore";
import b4a from "b4a";

// This function will push new data to the core
function append(data) {
  core.append(data);
}

// Initialise hyperswarm 
const swarm = new Hyperswarm();

// Initialise hypercore in hyperclip-dir
const core = new Hypercore("./hyperclip-dir", { writable: true });
await core.ready();

// Get the key and display it
const key = b4a.toString(core.key, "hex");
document.getElementById("key").textContent = `Your Hyperclip key is: ${key}`

swarm.join(core.discoveryKey);
swarm.on("connection", (conn) => core.replicate(conn));

// Push clipboard data when button is clicked
document
  .getElementById("sendClipboardButton")
  .addEventListener("click", function () {
    navigator.clipboard
      .readText()
      .then((text) => {
        // Call the append function with the input data
        append(text);
        window.alert("Clipboard sent");
      })
      .catch((err) => {
        console.error("Failed to read clipboard contents: ", err);
        window.alert("Failed to send clipboard: " + err);
      });
  });

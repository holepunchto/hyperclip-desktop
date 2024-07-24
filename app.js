//import required holepunch modules
import Hyperswarm from "hyperswarm";
import Hypercore from "hypercore";
import b4a from "b4a";

const swarm = new Hyperswarm();
// Initialise hypercore in hyperclip-dir
const core = new Hypercore("./hyperclip-dir", { writable: true });

async function main() {
  await core.ready();
  // Show connection key on the frontend
  document.getElementById("key").innerHTML =
    "Your Hyperclip key is: " + b4a.toString(core.key, "hex");
  swarm.join(core.discoveryKey);
  swarm.on("connection", (conn) => core.replicate(conn));
}

// This function will push new data to the core
function append(data) {
  core.append(data);
}

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

main(); // Call the async function

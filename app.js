//import required holepunch modules
import Hyperswarm from "hyperswarm";
import Hypercore from "hypercore";
import b4a from "b4a";

// This function will push new data to the core
function append(data) {
  core.append(data);
}

const swarm = new Hyperswarm();
// Initialise hypercore in hyperclip-dir
const core = new Hypercore("./hyperclip-dir", { writable: true });

await core.ready();
// Show connection key on the frontend
document.getElementById("key").innerHTML =
  "Your Hyperclip key is: " + b4a.toString(core.key, "hex");
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

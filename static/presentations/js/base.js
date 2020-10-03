const $ = document.querySelector.bind(document);
const reactions = {};
const questions = {};

function repaintReactions() {
  const reactionsEl = $("#reactions");
  reactionsEl.innerHTML = "";
  for (let reaction in reactions) {
    if (reactions[reaction] <= 0) {
      reactions[reaction] = 0;
      continue;
    }
    reactionsEl.innerHTML += `<span class='reaction'>${reaction}</span>`;
    if (reactions[reaction] > 1) reactionsEl.innerHTML += `x${reactions[reaction]}`;
    reactionsEl.innerHTML += " ";
  }
}

function showQuestions() {
  var list = document.getElementById("questionsList");
  list.innerHTML = "";
  for (k in questions) {
    list.insertAdjacentHTML("beforeend", '<li qid="' + k + '">' + questions[k] + "</li>");
  }
  document.getElementById("questionsListPanel").style.visibility = "visible";
}

function hideQuestions() {
  document.getElementById("questionsListPanel").style.visibility = "hidden";
  document.getElementById("questionCount").innerText = Object.keys(questions).length;
}

client = new Paho.MQTT.Client("159.89.4.84", 9001, "presentation" + Math.floor(Math.random() * 1000));
client.onConnectionLost = () => console.log("CONNECTION LOST");

client.onMessageArrived = (msg) => {
  const message = msg.payloadString;
  if (message.startsWith("move")) handleMove(message.replace("move/", ""));
  else if (message === "hideQuestions") hideQuestions();
  else if (message === "showQuestions") {
    showQuestions();
    const outMessge = new Paho.MQTT.Message(`questionsInformation/${JSON.stringify(questions)}`);
    outMessge.destinationName = "remote";
    client.send(outMessge);
  }
};

client.connect({
  onSuccess: () => {
    console.log("CONNECTED");
    client.subscribe("presentation");
  },
});

const handleMove = (move) => {
  switch (move) {
    case "up":
      Reveal.up();
      break;
    case "down":
      Reveal.down();
      break;
    case "left":
      Reveal.left();
      break;
    case "right":
      Reveal.right();
      break;
  }
};

// socket.on("clientNumberChanged", (num) => {
//   document.querySelector("#clientsNum").textContent = num;
// });

// socket.on("reaction", (reaction) => {
//   if (!(reaction in reactions)) reactions[reaction] = 0;
//   reactions[reaction]++;
//   setTimeout(() => {
//     reactions[reaction]--;
//     repaintReactions();
//   }, 10000);
//   repaintReactions();
// });

// socket.on("question", (q) => {
//   qId = q.split(";")[0];
//   question = q.substring(qId.length + 1);
//   questions[qId] = question;
//   var popup = document.getElementById("questionPopup");
//   popup.innerText = question;
//   popup.classList.add("show");
//   document.getElementById("questionCount").innerText = Object.keys(questions).length;
//   document.getElementById("questionsList").insertAdjacentHTML("beforeend", '<li qid="' + qId + '">' + question + "</li>");
//   setTimeout(() => {
//     popup.classList.remove("show");
//   }, 5000);
// });

// socket.on("removeQuestion", (id) => {
//   delete questions[id];
//   document.getElementById("questionCount").innerText = Object.keys(questions).length;
//   document.querySelector('li[qid="' + id + '"]').remove();
// });

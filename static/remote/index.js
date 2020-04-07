const $ = document.querySelector.bind(document);
let currentPage = $('#pageLoading');
let socket;
let startTime;


function showPage(page) {
    if (currentPage !== null)
        currentPage.style.visibility = 'hidden';
    currentPage = $('#page' + page);
    currentPage.style.visibility = 'visible';
    currentPage.style.animation = 'pageFlowIn 1s';
}

function removeQuestion(id){
    $('tr[qId="' + id + '"]').remove();
    socket.emit("removeQuestion", id);
}


function formatTime(milliseconds){
  seconds = Math.floor(milliseconds / 1000) % 60;
  minutes = Math.floor(milliseconds / 60000) % 60;
  hours = Math.floor(milliseconds / 3600000);
  return  ("0" + hours).slice(-2) + ":" +  ("0" + minutes).slice(-2) + ":" +  ("0" + seconds).slice(-2);
}

function updateTime(){
  diff = new Date - startTime;
  console.log(diff);
  $("#timePanel").innerHTML = formatTime(diff);
  setTimeout(updateTime, 1000);
}

window.onload = () => {
  const pLoadingStatus = $('#pLoadingStatus');

  let alreadyConnected = false;
  function onConnect() {
    if (alreadyConnected)
      location.reload();
    socket.emit('role', 'rc');
    showPage('UI');
  }

  for (let arrow of document.querySelectorAll('.arrow')){
    arrow.onclick = () => socket.emit('move', arrow.id);
  }

  document.getElementById("showQuestions").onclick = () => {
      socket.emit('showQuestions', '');
      showPage("Questions");
  }

  document.getElementById("hideQuestions").onclick = () => {
      socket.emit('hideQuestions', '');
      showPage("UI");
  }


  pLoadingStatus.textContent = 'Připojuji se k prezentaci';
  socket = io();
  socket.on('connect', onConnect);
  socket.on('disconnect', () => showPage('Disconnected'));

  socket.on('questionsInformation', (info) => {
      table = document.getElementById("questionsTable");
      table.innerHTML = "";
      for(k in info){
          table.insertAdjacentHTML('beforeend','<tr qId="' + k + '"><td>' + info[k] + '</td><td class="deleteQuestion" onclick="removeQuestion(\'' + k + '\')">X</td></tr>');
      }
  });
  startTime = new Date();
  updateTime();
}
String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

let currentPage = $('#pageLoading');
let socket;

function showPage(page) {
  if (currentPage !== null)
    currentPage.hide();
  currentPage = $('#page' + page);
  currentPage.css("visibility", "visible");
}

function requestFullScreen(element) {
  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
  if (requestMethod) { 
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") {
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}

function genQuestionId(){
    return Date.now().toString() + Math.floor(Math.random() * 10000)
}

function askQuestion(){
    var inp = $("#txtAskQuestion").val();
    if(inp != ""){
        var qId = genQuestionId();
        var newHtml = '<tr  qId="' + qId + '"><td>' + inp + '</td><td  onclick="removeQuestion(\'' + qId + '\')" class="deleteQuestion">X</td></tr>'
        $("#questionTable").append(newHtml);
        $("#txtAskQuestion").val("");
        socket.emit("question", qId + ";" + inp);
    }
}

function removeQuestion(id){
    $('tr[qId="' + id + '"]').remove();
    socket.emit("removeQuestion", id);
}

window.onload = () => {
  const pLoadingStatus = $('#pLoadingStatus');

  let alreadyConnected = false;

  function onConnect() {
    if (alreadyConnected)
      location.reload();
    alreadyConnected = true;
    socket.emit('role', 'client');
    showPage(Cookie.get('presentationLogin') === 'loggedIn' ? 'UI' : 'Enter');
    
    $('#btnEnter').click(function() {
      requestFullScreen(document.body);
      showPage('UI');
      socket.emit('login', "login");
    });
   
  }

  let lastClickTime = 0;
  let reactionBtns = document.querySelectorAll('.reactionBtn');
  const userCanClickEvery = 10; // seconds
  for (let reactionBtn of reactionBtns)
    reactionBtn.onclick = () => {
      if (Date.now() - lastClickTime < userCanClickEvery * 1000)
        return;
      lastClickTime = Date.now();
      for (let btn of reactionBtns)
        btn.style.visibility = 'hidden';
      reactionBtn.style.visibility = 'visible';
      socket.emit('reaction', reactionBtn.textContent);
      setTimeout(() => {
        for (let btn of reactionBtns)
          btn.style.visibility = 'visible';
      }, userCanClickEvery * 1000);
    };

  pLoadingStatus.textContent = 'Připojuji se k prezentaci';
  socket = io();
  socket.on('connect', onConnect);
  socket.on('disconnect', () => showPage('Disconnected'));
}
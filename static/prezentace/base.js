const $ = document.querySelector.bind(document);
const socket = io();
const reactions = {};
const questions = {};

function repaintReactions() {
    const reactionsEl = $('#reactions');
    reactionsEl.innerHTML = '';
    for (let reaction in reactions) {
        if (reactions[reaction] <= 0) {
            reactions[reaction] = 0;
            continue;
        }
        reactionsEl.innerHTML += `<span class='reaction'>${reaction}</span>`;
        if (reactions[reaction] > 1)
            reactionsEl.innerHTML += `x${reactions[reaction]}`;
        reactionsEl.innerHTML += ' ';
    }
}

function showQuestions(){
    var list = document.getElementById('questionsList');
    list.innerHTML = "";
    for(k in questions){
        list.insertAdjacentHTML('beforeend','<li qid="' + k + '">' + questions[k] + "</li>");
    }
    document.getElementById('questionsListPanel').style.visibility = "visible";
}

function hideQuestions(){
    document.getElementById('questionsListPanel').style.visibility = "hidden";
    document.getElementById("questionCount").innerText = Object.keys(questions).length;
}


socket.on('connect', () => socket.emit('role', 'host'));
socket.on('clientNumberChanged', (num) => {
    document.querySelector('#clientsNum').textContent = num;
});

socket.on('reaction', (reaction) => {
    if (!(reaction in reactions))
        reactions[reaction] = 0;
    reactions[reaction]++;
    setTimeout(() => {
        reactions[reaction]--;
        repaintReactions();
    }, 10000);
    repaintReactions();
});

socket.on('question', (q) => {
    qId = q.split(';')[0];
    question = q.substring(qId.length + 1);
    questions[qId] = question;
    var popup = document.getElementById("questionPopup");
    popup.innerText = question;
    popup.classList.add("show");
    document.getElementById("questionCount").innerText = Object.keys(questions).length;
    document.getElementById('questionsList').insertAdjacentHTML('beforeend','<li qid="' + qId + '">' + question + "</li>");
    setTimeout(() => {
        popup.classList.remove("show");
    }, 5000)
});

socket.on('removeQuestion', (id) => {
    delete questions[id];
    document.getElementById("questionCount").innerText = Object.keys(questions).length;
    document.querySelector('li[qid="' + id + '"]').remove();
});

socket.on('showQuestions', () => {
    showQuestions();
    socket.emit("questionsInformation", questions);
});

socket.on('hideQuestions', () => hideQuestions());

socket.on('move', (move) => {
    switch (move) {
        case 'moveUp':
            Reveal.up();
            break;
        case 'moveDown':
            Reveal.down();
            break;
        case 'moveLeft':
            Reveal.left();
            break;
        case 'moveRight':
            Reveal.right();
            break;
    }
});
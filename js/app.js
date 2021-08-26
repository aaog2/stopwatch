// UI
const background = document.getElementById('background');

const display = document.getElementById("display");

const pennant = document.getElementById('pennant'),
    play = document.getElementById('play'),
    sync = document.getElementById('sync');

const ul = document.getElementById("list");

const recs = JSON.parse(localStorage.getItem('tasks'));
// console.log(recs);

if (recs) {
    recs.forEach(function (rec) {
        // console.log(rec);
        // console.log(rec.text);
        // console.log(rec.complete);
        // addtodo(rec);

        const li = document.createElement("li");

        if(rec && rec.complete){
            li.classList.add("complete");
        }

        li.append(document.createTextNode(rec.text));

        ul.append(li);
        updatelocalstoage()

        li.addEventListener('click', function (e) {
            li.classList.toggle('complete');
            updatelocalstoage();
            e.preventDefault();
        });

        li.addEventListener('contextmenu', function (e) {
            li.remove();
            updatelocalstoage();
            e.preventDefault();
        });


    })
}

function todolist() {
    // console.log("hey");
    addtodo();

}

function addtodo(){

    let todotext = display.innerText;

    const li = document.createElement("li");

    li.append(document.createTextNode(todotext));
    // console.log(li.innerText);
    ul.append(li);
    updatelocalstoage()

    li.addEventListener('click', function (e) {
        li.classList.toggle('complete');
        updatelocalstoage();
        e.preventDefault();
    });

    li.addEventListener('contextmenu', function (e) {
        li.remove();
        updatelocalstoage();
        e.preventDefault();
    });


}

let times;

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];



// Start Stop Timer
function startstoptimer() {

    if (times !== null) {
        clearInterval(times);
    }

    const playbtn = play.querySelector('i.fa-play');
    if (playbtn) {
        times = setInterval(stopwatch, 10);
    } else {
        clearInterval(times);
    }
    playpausebtn();
}

// Reset timer
function resetstopwatch() {
    clearInterval(times);
    display.innerText = "00:00:00:000";
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];

    play.querySelector('i.fas').className = "fas fa-play";

}

// timer function
function stopwatch() {
    // console.log("hey");
    milliseconds += 10
    // console.log(milliseconds);
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        // console.log(seconds);
    }

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let milisec = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

    display.innerText = `${h}:${m}:${s}:${milisec}`;

    let value = 20-(seconds*2);
    background.style.filter = `blur(${value}px)`;

}

// Button function
function playpausebtn() {
    const playbtn = play.querySelector('i.fa-play');
    if (playbtn) {
        // console.log("hey");
        play.querySelector('i.fas').classList.remove('fa-play');
        play.querySelector('i.fas').classList.add('fa-pause');
    } else {
        play.querySelector('i.fas').classList.add('fa-play');
        play.querySelector('i.fas').classList.remove('fa-pause');
    }
}


function updatelocalstoage() {

    todos = document.querySelectorAll("li");

    const reclist = [];

    todos.forEach(function (todo) {
        // console.log(todo);

        reclist.push({
            text: todo.innerText,
            complete: todo.classList.contains("complete")
        });

        // console.log(reclist);
    });

    localStorage.setItem('tasks', JSON.stringify(reclist));


}


// Event Listener
play.addEventListener('click', startstoptimer);
sync.addEventListener("click", resetstopwatch);
pennant.addEventListener('click', todolist);
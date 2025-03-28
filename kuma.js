console.log("Loaded javascript")

var count = 0;

function increment() {
    count++;
    document.getElementById("counter").innerHTML = count;
}

function decrement() {
    count--;
    document.getElementById("counter").innerHTML = count;
}

console.log("Hi. How are you doing?")
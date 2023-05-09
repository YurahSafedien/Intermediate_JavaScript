/*
==========================================================
Expansion on Day 1's functionality
==========================================================
*/

/*
==========================================================
Expansion on Post()
==========================================================
*/

formElem.onsubmit = async (e) => {

    e.preventDefault();

    let response = await fetch('/article/formdata/post/user', {
        method: 'POST',
        body: new FormData(formElem)
    });
    let result = await response.json();
    alert(result.message);
};

/*
==========================================================
FormatData Methods
==========================================================
*/

/*
Modify fields in FormData with methods:

- formData.append(name, value) : add a form field with the given name and value.

- formData.append(name, blob, fileName) : add a field as if it were <input type="file">, the third argument fileName sets file name (not form field name), as it it were a name of the file in user’s filesystem.

- formData.delete(name) : remove the field with the given name.

- formData.get(name) : get the value of the field with the given name.

- formData.has(name) : if there exists a field with the given name, returns true, otherwise false
*/

/*
Ensures there’s only field with such name:

- formData.set(name, value).
- formData.set(name, blob, fileName).
*/

//Iterate over formData fields using for..ofloop:

let formData = new FormData(); 
formData.append('key1', 'value1'); formData.append('key2', 'value2');

// List key/value pairs
for(let [name, value] of formData) {
alert("${name} = ${value}"); 
//key1-value1, then key2-value2
}

/*
==========================================================
Sending Form with a File
==========================================================
*/

formElem.onsubmit = async (e) => {
    e.preventDefault();
    let response = await fetch('/article/formdata/post/user-avatar', {
        method: 'POST',
        body: new FormData(formElem)
    });
    let result = await response.json();
    alert(result.message);
};

/*
==========================================================
Sending Form with Blob Data
==========================================================
*/

//Submits an image from <canvas>, along with some other fields, using FormData:

canvasElem.onmousemove = function(e) {
    let ctx = canvasElem.getContext('2d');
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
};

async function submit() {
    let imageBlob = await new Promise(resolve => canvasElem.toBlob (resolve, 'image/png'));

    let formData = new FormData();
    formData.append("firstName", "John");
    formData.append("image", imageBlob, "image.png");

    let response = await fetch('/article/formdata/post/image-form', {
            method: 'POST',
            body: formData
    });

    let result = await response.json();
    alert(result.message);
}

/*
Create an empty object, and then append fields with methods:

- formData.append(name, value)
- formData.append(name, blob, fileName)
- formData.set(name, value)
- formData.set(name, blob, fileName)

Other methods are:

- formData.delete(name)
- formData.get(name)
- formData.has(name)

*NB: Two peculiarities here:

- The set method removes fields with the same name, append doesn’t.

- To send a file, 3-argument syntax is needed, the last argument is a file name, that normally is taken from user filesystem for <input type="file">.
*/

/*
==========================================================
Fetch() Expansion: Download Progress
==========================================================
*/

/*
Allows tracking of download process.
*/

//Code that reads the response from response.body:

// instead of response.json() and other methods
const reader = response.body.getReader();

// infinite loop while the body is downloading 
while(true) {
// done is true for the last chunk
// value is Uint8Array of the chunk bytes 

    const {done, value} = await reader.read();

    if (done) {
            break;
    }

    console.log(`Received ${value.length} bytes`)
}
   
/*
Result of await reader.read() call is an object with two properties:

- done : true when the reading is complete.
- value : a typed array of bytes: Uint8Array.
*/

//Full code to get response and log the progress:
// Step 1: start the fetch and obtain a reader
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader2 = +response.body.getReader();

// Step 2: get total length
const contentLength = +response.headers.get('Content-Length');

// Step 3: read the data
let receivedLength = 0; // length at the moment
let chunks = []; // array of received binary chunks (comprises the body)
while(true) {
    const {done, value} = await reader2.read();

    if (done) {
        break;
    }

    chunks.push(value);
    receivedLength += value.length;

    console.log("Received ${receivedLength} of ${contentLength}")
}

// Step 4: concatenate chunks into single Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for (let chunk of chunks) {
    chunksAll.set(chunk, position); // (4.2)
    position += chunk.length;
}

// Step 5: decode into a string
let result = new TextDecoder("utf-8").decode(chunksAll);

// We're done!
let commits = JSON.parse(result); 
(commits[0].author.login);

/*
Step-by-step explanation:

- We perform fetch as usual, but instead of calling response.json(), we obtain a stream reader response.body.getReader().

- Please note, we can’t use both these methods to read the same response. Either use a reader or a response method to get the result.

- Prior to reading, we can figure out the full response length from the Content-Length header.

- It may be absent for cross-domain requests (see chapter Fetch: Cross-Origin Requests) and, well, technically a server doesn’t have to set it. But usually it’s at place.

- Call await reader.read() until it’s done.

- We gather response chunks in the array. That’s important, because after the response is consumed, we won’t be able to “re-read” it using response.json() or another way (you can try, there’ll be an error).

- At the end, we have chunks – an array of Uint8Array byte chunks. We need to join them into a single result. Unfortunately, there’s no single method that concatenates those, so there’s some code to do that:

    : We create new Uint8Array(receivedLength) – a same-typed array with the combined length.

    : Then use .set(chunk, position) method to copy each chunk one after another in the resulting array.

    : We have the result in chunksAll. It’s a byte array though, not a string.
*/

//When you need binary content instead of JSON:
let blob = new Blob(chunks);

/*
==========================================================
Fetch() Expansion: Abort
==========================================================
*/

/*
AbortController - special built-in object to aboirt fetch().
*/

let controller = new AbortController();

/*
Controller - simple object.

AbortController():

- abort method with single property signal.

- scalable, it allows to cancel multiple fetches at once.

*/

//Step 1: The abortevent when calling abort() triggers 'controller.signal':

let signal = controller.signal;

// triggers when controller.abort() is called 
signal.addEventListener('abort', () => alert("abort!"));

controller.abort(); // abort!

alert(signal.aborted); // true (after abort)

//Step 2: pass the signal property to fetch option

fetch(url, {
  signal: controller.signal

});

//Fetch() listens to the signal.

//Step 3: to abort, call controller.abort():

controller.abort();

//fetch gets the event from signal and aborts the request.

//When a fetch is aborted, its promise rejects with an error named AbortError, so we should handle it:

// abort in 1 second
setTimeout(() => controller.abort(), 1000);

try {
    let response = await fetch('/article/fetch-abort/demo/hang', {
        signal: controller.signal
    }
);
} catch(err) {
    if (err.name == 'AbortError') { // handle abort()
        alert("Aborted!");
    } else {
        throw err;
    }
}

//Fetch many urls in parallel, and the controller aborts them all:

let urls2 = ["https://www.youtube.com"]; // a list of urls to fetch in parallel

let controller2 = new AbortController();

let fetchJobs2 = urls.map(url => fetch(url, {
signal: controller.signal
}));

let results2 = await Promise.all(fetchJobs2);

// from elsewhere:
// controller.abort() stops all fetches

//If we have our own jobs, different from fetch, we can use a single AbortController to stop those, together with fetches:

let urls = ["https://www.youtube.com"];
let controller3 = new AbortController();

let ourJob = new Promise((resolve, reject) => {
    controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, {
signal: controller.signal
}));

let results = await Promise.all([...fetchJobs, ourJob]);

// from elsewhere:
// controller.abort() stops all fetches and ourJob
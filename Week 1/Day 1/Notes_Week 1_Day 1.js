/*
==========================================================
POP-UPS & WINDOW METHODS
==========================================================
*/

function windowTest(){
    window.open('Hello, love.');
}

/*
==========================================================
Window.open
==========================================================
*/

/*
Format : window.open(url, name, params);

url      - url to load into the new window.
name     - name od new window, already designated window names overwrite this.
params   - New window configuration string.
          - Contains settings, delimited by a comma with no spaces.
          - E.g.: width:200,height=100
*/

//Param Settings

/*
Position:

left/top (numeric)  - coordinates the window to the screen's  top-left corner.
                    - limitation: new window can't be positioned offscreen.

width/height (numeric)  - depicts width/height of window.
                        - limitation: min on height/width and it's impossible to create an invisible window.
*/

/*
Window Features:

menubar (yes/no)    - shows/hides new window browser menu.

toolbar (yes/no)    - shows/hides browser's new window navigation bar (back forward, reload, etc.).

location (yes/no)    - shows/hides new window URL field.
                     - FF and IE don't hide it by default.

status (yes/no)    - shows/hides status window, though most browsers force it to show.

resizable (yes/no)    - allows disablement of new window resize, not recommended

scrollbars (yes/no)   - allows disablement of new window scrollbars, however this is not recommended.

*NB: lesser number of browser-specific features are supported and are usually not used.
*/

/*
==========================================================
Accessing Pop-Up from Window
==========================================================
*/

function testNewWin1() {
    let newWin = window.open("about:blank", "hello", "width=200,height=200");

    newWin.document.write("Hello, world!");
}

function testNewWin2() {
    let newWindow = open('https://youtube.com', 'example', 'width=300,height=300')

    newWindow.focus();
}

/* 
THE BELOW CODE DOESN'T WORK

function testNewWin3() {
    alert(newWin.location.href); // (*) about:blank, loading hasn't started yet

    newWindow.onload = function() {

        let html = `<div style="font-size:30px">Welcome!</div>`;

        ('afterbegin', html);

   };
}*/

//The below code is a Chat GPT debugged version of the commented out code, it works, but I don't think it's what the LMS wanted.
function testNewWin3() {
    let newWindow = window.open('https://www.youtube.com', 'Youtube');
    
    newWindow.onload = function() {
      let html = `<div style="font-size:30px">Welcome!</div>`;
      newWindow.document.body.insertAdjacentHTML('afterbegin', html);
    };
  }

  /*
  Cross-Window Communication

  Implements the 'Same Origin' policiy that, for safety reasons, limits windows and frames from communication and switching between each other.
  */

/*
==========================================================
Accessing Window from Pop-Up
==========================================================
*/

function testNewWin4() {
    let newWin = window.open("about:blank", "hello", "width=200,height=200");

    newWin.document.write(

        "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"

    );
}

/*
==========================================================
Closing a Pop-Up
==========================================================
*/

function testNewWinClose() {
    let newWindow = open('/', 'example', 'width=300,height=300');

    newWindow.onload = function() {

        newWindow.close();

        alert(newWindow.closed); // true

    };
}

/*
==========================================================
Scrolling and Resizing
==========================================================
*/

/*
Methods to move/resize window:

- win.moveBy(x,y) : moves windows relative to current position x-pixels to the right and y-pixels down, accepts negative values.

- win.moveTo(x,y) : moves window to screens (x,y) coordinates.

- win.resizeBy(width,height) : resize relative to current width and height, no negatives values accepted.

- win.resizeTo(width,height) : resizes according to screens width and height, alternatively 'window.onresize' is an event that can be used.
*/

/*
==========================================================
Scrolling a Window
==========================================================
*/

/*
- win.scrollBy(x,y) : scroll window x-pixels right and y-pixels down relative to current scroll, accepts negative values.

- win.scrollTo(x,y) : scrolls to given (x,y) coordinates.


- elem.scrollIntoView(top = true) : scroll window to make elem show at default top or bottom for elem.scrollIntoView(false) or window.onscroll event.
*/
---
title: The DOM
---

<h2 class="week-title">{{ page.title }}</h2>

In this tutorial we are going to look at p5js's functions to access and manipulate the DOM and use them to create a simple audio player interface.

First, The DOM (Document Object Model) is just the official way of referring to the collection of HTML elements that make up a webpage. These are the ```<p>```, ```<img>``` and ```<a>``` elements for holding text, images and links, and also some more complex elements, like ```<canvas>``` elements, where our p5js sketch gets drawn or ```<video>``` and ```<audio>``` elements for displaying different kinds of media on a webpage.

<div class="scaled-images s75">
  <img src = "{{ site.baseurl }}/assets/tutorials/dom-00.jpg"/>
</div>

Usually, these elements and their content are defined in the html file for the webpage, and any special behavior is specified using a separate JavaScript file. We might have a button defined in our html file and then a JavaScript file would specify what happens when that button is clicked.

Somewhere in the html we could have something like this:
```html
<button onclick="displayTime()">Display Time</button>
```

And then in a JavaScript file:
```js
function displayTime() {
  let time = new Date();
  alert(time);
}
```

In this example, the ```displayTime()``` function uses the JavaScript ```alert()``` function to show a popup with the current time and date. Don't worry about the details; it's just a simple example of html with JavaScript to show that, traditionally, html defines the *what* of our webpages and then JavaScript defines the *how*.

Elements in a webpage that are *static*, or, don't have to move around or change, will be defined in the html. Elements that are created based on user interaction can be created in the JavaScript file and added to the webpage's DOM *dynamically*.

Nowadays it's become more common to use frameworks like [Angular](https://angular.io/), [React](https://react.dev/), [Vue](https://vuejs.org/) or [Svelte](https://svelte.dev/) to create webpages with elements that have more complex behaviors, like submitting forms, accessing databases, validating passwords, etc.

And even though p5js is not the best tool to create these kinds of websites and interactions, it provides us with a [bunch of functions](https://p5js.org/reference/#group-DOM) to create and manipulate html elements on the page.

We can add links to our sketch:
{% include p5-editor.html id="hwBhX9KFO" %}

And then we can use our p5js ```draw()``` and ```mouseClick()``` to dynamically calculate the position for a link, or to dynamically keep adding links as we click:
{% include p5-editor.html id="bZxYrxm8w" %}

This is fine and fun, but unless there's a real good reason for creating these kinds of static elements dynamically in our p5js, it's best to have them defined and positioned in the html file.

But, the p5js functions for adding elements to the DOM become really useful in situations where we want to create some simple user input elements:
{% include p5-editor.html id="Tijh9kSp5" %}

In this sketch, the ```createSlider()``` function creates a html ```<input>``` element of type *range*, and returns an object that we can use to change its position and style. Then, in ```draw()``` we use the object's ```value()``` function to access its current value and use it to change background and text colors.

We cna also create html ```<button>``` elements in a similar way, and, kind of like with the ```mouseClicked()``` function, we can define functions that will execute whenever the button is pressed:
{% include p5-editor.html id="ydaS9ywTE" %}

We can combine our button with the sliders in a way that every time the button is clicked, the sliders get updated with the new RGB values for the background:
{% include p5-editor.html id="iAXJSvusY" %}

The more correct way of doing this in 2023 is using an ```<input>``` element of type *color* that creates a browser-specific color picker element with a lot of options:
{% include p5-editor.html id="ASiwp-9hR" %}

---
Let's now use some html elements in our sketch to create a simple sound player.

First, let's load an audio file using the [```loadSound()```](https://p5js.org/reference/#/p5/loadSound) function and test it. This is similar to how we have loaded images, text files, datasets, etc using the ```preload()``` function.

The ```loadSound()``` function returns a [```SoundFile```](https://p5js.org/reference/#/p5.SoundFile) object, and we can use its [```play()```](https://p5js.org/reference/#/p5.SoundFile/play) function to play the song whenever we click the mouse:
https://editor.p5js.org/thiagohersan/sketches/aLnj1hrsv

What happens if we click the mouse multiple times? It sounds like the ```song``` object starts playing the file multiple times over itself.

There are two ways we can fix this.

First, we can specify the file's [```playMode()```](https://p5js.org/reference/#/p5.SoundFile/playMode) to be either ```restart``` or ```untilDone```, and that will make it only play one version of the file, either by starting the song over or not doing anything until it plays until the end:
{% include p5-editor.html id="yD2bhgfPO" %}

The other way is to check first if the object is already playing the file and only call ```play()``` if it's not. We can also use [```isPlaying()```](https://p5js.org/reference/#/p5.SoundFile/isPlaying) to change the background color as an indication of the play state:
{% include p5-editor.html id="cKAbzWY2a" %}

---
Now that we know how to play a sound file, let's organize our sound player.

We are going to have $$3$$ buttons: skip to beginning, play/pause and stop. Our song also has $$3$$ states it can be in: ```playing```, ```paused```, and ```stopped```. The skip to beginning button always resets the song's playing position, but it doesn't change what state it's in. The other buttons make the song change states between ```playing```, ```paused``` and ```stopped```. This state diagram specifies these changes:

<div class="scaled-images s75">
  <img src = "{{ site.baseurl }}/assets/tutorials/dom-01.jpg"/>
</div>

Let's write some pseudo-code first:
{% include p5-editor.html id="v5Pbvv6Z2" %}

We'll have to double check some things that aren't so clear from the documentation, like whether the [```stop()```](https://p5js.org/reference/#/p5.SoundFile/stop) function also resets the tracks position, and what happens if we call [```jump(0)```] on a file that is not playing.

Two things to note on this code:
{% include p5-editor.html id="g1s3upXIH" %}

1. The [```jump()```] function only works if the file is playing, so we had to use an extra global variable to keep track of whether the file should restart after a pause.
2. The buttons could probably be in a class, since they have the same size and style and right now there's lots of repeated code.

Let's make a class for our buttons to encapsulate its style and behavior:
{% include p5-editor.html id="XENqVU0Gt" %}

Now, let's add a fourth button for skipping to the next song, and detect double clicks on the back button to skip to the previous song:
{% include p5-editor.html id="DcCgrtEbU" %}

Again, there's some extra logic that we have to use to set ```shouldRestart``` every time we change songs or states while paused.

---
One more last thing, hopefully a fun one.

Let's visualize the songs while they're playing.

The p5js ```SoundFile``` object doesn't seem to have any function or variable that tells us the exact values of the samples that are currently playing. The closest thing it has is a [```getPeaks()```](https://p5js.org/reference/#/p5.SoundFile/getPeaks) function that gives us a simplified, resampled, version of values for the entire sound file.

The default length of the array returned by ```getPeaks()``` is $$5$$ times the canvas ```width```, so no matter how long the song is, the length of the peaks array will always be the same. The numbers in this array represent samples, which are like the pixels of sound files. In this case they have been normalized to a range of $$[-1, 1]$$, where numbers with larger absolute values represent louder samples.

We can use this to map the sample values of the current song from $$[-1, 1]$$ to values between $$[-width, width]$$ that we can use to draw some ellipses:
```js
function toWidth(_peakVal) {
  return map(abs(_peakVal), 0, 1, 0, width);
}

waveDiameters = song.getPeaks().map(toWidth);
```

Since ```song.getPeaks()``` returns an array of samples, we can use the JavaScript array special function [```map()```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to transform every sample in the array. The ```toWidth()``` function that we use to do the actual mapping of each array value uses the p5js [```map()```](https://p5js.org/reference/#/p5/map) function internally. They are both named ```map()```, they both transform numbers from one range of values into another, but they are different functions.

Once we have that array of ellipse diameters, we just have to know which one to draw at each frame. That's this code here in ```draw()```:
```js
let tPos = song.currentTime() / song.duration();
let dIndexDelay = floor(tPos * waveDiameters.length + DELAY);
let dIndex = constrain(dIndexDelay, 0, waveDiameters.length - 1);
let diam = waveDiameters[dIndex];
ellipse(width / 2, height / 2, diam, diam);
```

The ```tPos``` variable uses the song's [```currentTime()```](https://p5js.org/reference/#/p5.SoundFile/currentTime) and [```duration()```](https://p5js.org/reference/#/p5.SoundFile/duration) functions to determine how far we are along the song that is playing. Its value will always be between $$[0, 1]$$, and represents the percentage of the track that has been played.

The ```dIndexDelay``` variable turns the ```tPos``` value into an index value by multiplying the percentage by the length of the diameter array. ```DELAY``` is a constant that we added to account for delays between the screen and the computer's speakers. We can play with that variable in the beginning of the file to shift which index we use at a given frame to account for delays when using bluetooth headphones or speakers.

This value then goes through ```floor()``` and ```constrain()``` in order to guarantee that we are always using a whole-number integer (no decimal) that is within the array's bounds.

After that we use it to index into our arrays of diameters and draw an ellipse whose size is proportional to the volume of the current sample being played:
{% include p5-editor.html id="LqkTuPJ0j" %}

Try it out on both tracks, and remember to adjust the ```DELAY``` value to get better synchronization if using bluetooth speakers/earbuds or if the browser is overloaded.

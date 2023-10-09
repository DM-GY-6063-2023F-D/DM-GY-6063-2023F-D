---
title: Strings
---

<h2 class="week-title">{{ page.title }}</h2>

In this tutorial we are going to take a look at a special datatype: $$strings$$.

A string holds text data. It is a list (or, array) of characters, specified within single (' '), double (" ") or back (``` ` ` ```) quote symbols, and, just like other values, it can be assigned to variables:
```js
let s0 = "This is a string";
let s1 = 'This is also a string!';
let s2 = `Another string`;
```

In p5js we use the [```text()```](https://p5js.org/reference/#/p5/text) function to draw strings on the screen. In addition to the string (or the variable that holds the string), we also have to give the ```text()``` function the x and y coordinates where the text is to be drawn:
```js
let s0 = "This is a string";
text(s0, 10, 10);
```

{% include p5-editor.html id="UIFxGREsZ" %}

In addition to ```text()```, p5js also has a bunch of [functions](https://p5js.org/reference/#group-Typography) for controlling typography and text properties, like font size, font type, alignments, etc:

{% include p5-editor.html id="8s2cHbfAS" %}

Text [alignment](https://p5js.org/reference/#/p5/textAlign) is something worth reading about and experimenting with:

{% include p5-editor.html id="2wjTge4MA" %}

In cases where our text is really long, we can have it wrap around and display in multiple lines by giving the ```text()``` function a couple of extra parameters:

{% include p5-editor.html id="qUQqHpfnf" %}

This is just like ```rect()``` where we specify x,y location and width,height, except the width and height now are for a textbox.

---
Since strings are arrays of characters, and used often, JavaScript also provides us with special functions and variables for manipulating them.

For example, the variable [```length```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length) can be used to check how many characters are in the string:
```js
let s0 = "This is a string";
print(s0.length); // should print: 16
```

The function [```toUpperCase()```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase), for example, can be used to turn every letter in a string into uppercase letters:
```js
let s0 = "This is a string";
print(s0.toUpperCase()); // should print: THIS IS A STRING
```

There are a whole bunch of [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) for strings.

And just like with an array of numbers, we can iterate over a string and draw its characters one at a time:

{% include p5-editor.html id="m6jmIOGf4G" %}


Independent of the size of the string, we can always iterate over it using ```length``` and accessing the letters using array index notation:

{% include p5-editor.html id="gbF_-Tsb_" %}

This is trying to fit all of the letters of a long sentence along the diagonal of our canvas, but instead we could first split the sentence into words, and then iterate over the array of words:

{% include p5-editor.html id="yh84WDAuL" %}

If we look at the documentation for the [```split()```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) function we'll see that it takes a string as its parameter, and that string is used to split the original string into many substrings. We used the space character (```" "```) to split the sentence into words, but we could've used any string as the split parameter.

And if we want to avoid having words that go beyond the edge of our canvas, we use the p5js function [```textWidth()```](https://p5js.org/reference/#/p5/textWidth) to calculate the width of each word, and use that to adjust the x-location of the word if it will overflow:

{% include p5-editor.html id="StBeYLsZq" %}

---
We can even create simple animations once we have a sentence split into words. Let's write a sketch that shows one word at a time on the center of the screen.

We want to use the ```frameCount``` variable to pick a word to display each time the ```draw()``` function runs. Since ```frameCount``` just keeps growing and growing, from $$0$$ to very large numbers, we have to use the modulo operator ($$\%$$) to keep the index within the boundary of our array of words (```words.length```):

{% include p5-editor.html id="NkdXnKrL7" %}

So it works, it cycles through all of the words and starts over once it gets to the end, but one word per frame is way too fast. Let's say we only want to change the word once every second. We could try:
```js
let wordIndex = second() % words.length;
```

{% include p5-editor.html id="gx7LF-xgi" %}

---
And now, Let's create a sketch that draws a random winner from a list of names.

We first start by defining a string with all of the names:
```js
let s0 = "thiago, alice, bob, chewbacca, dany, elisa";
```

And splitting it into an array of names:
```js
words = s0.split(", ");
```

Now, every time there's a mouse click we select the winner based on a random value that represents the index of that name in our array:
```js
function mouseClicked() {
  chosenIndex = random(0, words.length);
}
```

The problem with the above code is that the numbers returned by ```random()``` can be fractional and have a decimal portion, like: $$1.3, 2.62, 0.78$$, etc. and those are not valid array indexes. In order to use values returned by the ```random()``` function as indexes to arrays, we first have to turn them into whole numbers (integers), by dropping the fractional part.

One way to do that is by using the [```floor()```](https://p5js.org/reference/#/p5/floor) function, which calculates the closest whole integer value that is less than or equal to the number given as the parameter. Or, in other words, it just drops the fractional part, which is exactly what we want.

So, instead of:
```js
chosenIndex = random(0, words.length);
```

We'll use:
```js
chosenIndex = floor(random(0, words.length));
```

{% include p5-editor.html id="nJhHNHikk" %}

---
One last thing about working with texts and strings.

Just like there are ```loadJSON()``` and ```loadTable()``` functions, p5js also has a [```loadStrings()```](https://p5js.org/reference/#/p5/loadStrings) function that can be used to read a text file (from our computer or the internet), and split it into lines.

So, if we use a ```for()``` loop, or some other method, to iterate through the resulting array returned by ```loadStrings()```, we will go through the text file one line at a time:

{% include p5-editor.html id="1KnFLhNbS" %}

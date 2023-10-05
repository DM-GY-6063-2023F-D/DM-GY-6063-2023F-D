---
title: More Arrays
---

<h2 class="week-title">{{ page.title }}</h2>

Since arrays are so very often used in programming, and not only to store information, but also to manipulate and organize information, most programming languages will have not just a way to specify arrays, but lots of built in functions and variables that can be used when working with arrays.

We saw some of these in the previous [tutorial about arrays]({{ site.baseurl }}/tutorial/arrays-0/): ```push()``` and ```length```. The [```push()```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) function is used when we want to add elements to the end of the array, and the ```length``` variable when we want to know the size of the array:

https://editor.p5js.org/thiagohersan/sketches/5TJYOc0Xl

In this sketch we are adding random diameter values to an array every time the mouse is clicked, and during ```draw()``` we draw ellipses based on those diameters. Since we can't tell beforehand how many times the mouse has been clicked, we can't foretell how many values we have in our array, so we rely on ```length``` to set the limit for the ```for()``` loop in ```draw()```.

We are also limiting the maximum number of elements in our array to $$10$$. If during a click event we detect that we already have $$10$$ elements in the array: ```if (myDiameters.length > 9)```, we remove the first element before adding a new $$10^{th}$$ element.

The way to remove the first element of an array is using the special builtin function [```shift()```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift). If we keep clicking and adding new diameters we can see why (maybe?) the function is called shift: as we remove elements from the front of the array (index $$0$$), and add new elements to the back of the array (index $$9$$), our drawing seems to shift to the left.

We can do the reverse: add elements to the front of the array and remove from the back with [```unshift()```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) and [```pop()```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop), respectively:

https://editor.p5js.org/thiagohersan/sketches/Hq2pjvxEA

Let's pretend that now, for aesthetic reasons, we want to draw our diameters in order from smallest to largest. We can make use of the special [```sort()```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) function:

https://editor.p5js.org/thiagohersan/sketches/jnOgEyxik

After we add a new element we sort the array of diameters from smallest to largest. As we keep clicking through this example we'll notice something strange: it seems like all the circles drawn just keep growing. If we think about how we are adding and removing elements this will make sense. We are always removing the first element of the array. Since we are using a sorted array now, that element is always the smallest, so as we click the mouse it's like we are filtering out the smallest element in our array and over time are left with only the larger ones.

Let's say that now instead of just the $$10$$ diameters we have an array that holds up to $$100$$ circle [objects]({{ site.baseurl }}/tutorial/objects/):

https://editor.p5js.org/thiagohersan/sketches/QXvrUA6dg

Same logic as before, with every click we add a new element to our array, up to $$100$$ elements, but this time our elements are circle objects, with ```x```, ```y``` and ```d``` parameters.

The ```for()``` loop that draws our circles works. It's a good ```for()``` loop. But, if we look at what's happening inside the ```for()``` loop we'll notice that all of the parameters used by the ```ellipse()``` function are coming from the object ```aCircle[i]```. When we have this situation, where we want to get every element of an array and do something with it there's a different way to ask for the array to iterate over its elements:

https://editor.p5js.org/thiagohersan/sketches/DhLOKnElN

First, we define a function called ```drawCircle()```. This function takes one argument, one of our circle objects with ```x```, ```y``` and ```d``` parameters, and draws an ellipse using those values. Then, in our ```draw()``` function, when we want to iterate over all of the elements of the array and draw our circles, we can use the special function ```forEach()```.

This function is special in many ways: first, it's one of those builtin functions that come with a JavaScript array. Besides that, it's also special because it's a function that takes a function as an argument 🤯. The way to think about this is to imagine we are asking our array to run a function on every one of its elements, using the elements as arguments.

This is some really advanced array'ing !

Once we know how to pass functions to functions we can really start doing some fancier processing of the data in our arrays, like filtering our array by values inside its elements:

https://editor.p5js.org/thiagohersan/sketches/wV23pLR6dN

If we look at at the documentation for the [```filter()```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) function we'll see that it takes a function as parameter and returns a copy of the array, but only with the elements that pass the filter function. What this means is that it runs a function on every element of the array and if the function returns true that element is copied into the new array, if not, it doesn't make it into the array.

In the example above, there's a function called ```fullyInside()``` that returns ```true``` if a circle element is entirely within the canvas. When we pass that function to ```filter()``` it will call the function with each element of our array and only keep the circles whose shape is entirely visible in the canvas.

In our code, we first call the ```filter()``` function on the original array. Since ```filter()``` returns an array, that array has a ```forEach()``` special function that can be called to draw the filtered circles:
```js
let filteredCircles = myCircles.filter(fullyInside);
filteredCircles.forEach(drawCircle);
```

Try to write your own filter function. Maybe it removes elements that are too close to the center of the canvas... or all the small circles...


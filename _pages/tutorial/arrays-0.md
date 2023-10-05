---
title: Arrays
---

<h2 class="week-title">{{ page.title }}</h2>

In this tutorial we are going to look into a way of organizing data that will help us animate more complex scenes using more objects.

First, let's start with a simple animation of a falling circle:

{% include p5-editor.html id="bMWhX6E_x" %}

The code is pretty straight forward: at each frame we draw the ellipse at $$(xPos, yPos)$$, increase the ```yPos``` variable by the velocity specified in ```yVel```, and check to see if it has gone off screen and needs to be reset.

The way a single ellipse falls like this can be kind of sad:

{% include p5-editor.html id="lhIYqCUrY" %}

So, let's add some extra circles to our sketch:

{% include p5-editor.html id="4cfE26_b6" %}

Now, instead of one variable for keeping track of the y position of one circle, we have 3 variables (```yPos0```, ```yPos1```, ```yPos2```) to keep track of 3 separate y positions. The velocity of each circle is still the same (```yVel```), but now, once a circle gets to the bottom and has to be reset at the top, we are using a random value for the new initial ```yPos```. That's what makes them get out of sync after a few seconds.

We can add some clouds to our sketch and change the background to make it more like the weather this past week:

{% include p5-editor.html id="0c8zO9zbz" %}

Let's say we want to have $$10$$, $$30$$ or $$100$$ drops now. Adding one variable at a time would require $$100$$ separate variables (```yPos0```, ```yPos1```, ```yPos2```, $$...$$ ```yPos99```), and doing $$100$$ separate checks (```if(yPos0 > height)```, $$...$$ ```if(yPos99 > height)```). Luckily JavaScript, like most programming languages, has a builtin data-structure that can help us organize data like this: Arrays.

Arrays are like regular variables that hold values, but instead of holding just $$1$$ value, they hold sequences (or lists) of values. For our example, instead of having a separate variable for the ```yPos``` of each circle, we can just use a list of values for as many values as we want. This code declares a variable called ```yPos``` that holds $$3$$ values: the y position for each of our circles:

```let yPos = [0, 0, 0];```

A similar construct can be used for defining the x locations of our circles:

```let yPos = [100, 150, 250];```

Once we have declared and initialized an array, we can access each member (each value) using this syntax:
```
xPos[0]; // the first value
xPos[1]; // the second value
xPos[2]; // the third value
... // etc
```

At first this doesn't seem like an advantage at all, because we just changed ```yPos0``` for ```yPos[0]```, which is more typing even. The full advantage of using arrays comes from the fact that we can iterate through them using ```for()``` loops and avoid writing repetitive code.

For example, if we want to print all the values in an array called ```yPos```, we can use some code like this:
```
for (let i = 0; i < yPos.length; i += 1) {
  print(yPos[i]);
}
```

We create a ```for()``` loop that counts from $$0$$ all the way to ```yPos.length```. ```yPos.length``` is a variable that belongs to our array and tells us how many elements the array has. So, if we have $$3$$ elements in our array, ```yPos.length``` will be $$3$$.

Now we can use this in our sketch to avoid repeating code:

{% include p5-editor.html id="6EnLwMOad" %}

Once ```xPos``` and ```yPos``` are initialized as arrays, we can use a ```for()``` loop to iterate over their values and draw, update and check each circle with minimal amounts of code. Since we simplified some of the logic we can even change the x positions for each circle to be a new random value whenever they have to be reset.

The beautiful thing about this code is that we can add more elements to the arrays without changing any of the code in the ```draw()``` function, and we'll get more ellipses:

{% include p5-editor.html id="VZj7P7D3d" %}

And, if we really want a lot of circles, manually adding the initial positions to the arrays is kind of boring, so we can use another ```for()``` loop to do that for us in the ```setup()``` function:

{% include p5-editor.html id="DvUpxNJEs" %}

In this example we are declaring our ```xPos``` and ```yPos``` variables to be empty arrays:
```
let xPos = [];
let yPos = [];
```

and declaring a variable called ```numDrops``` that defines how many drops we want in our sketch.

Then, in the ```setup()``` function we use a ```for()``` loop to count from $$0$$ to ```numDrops``` and add values to the ```xPos``` and ```yPos``` arrays using a special array-specific function called ```push()```.

In this case we have $$10$$ drops, but we can change just one number in our sketch and get $$100$$ drops! Try it!

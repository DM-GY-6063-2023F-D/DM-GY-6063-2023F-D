---
title: Functions
week: 4
order: 0
---

<h2 class="week-title">{{ page.title }}</h2>

We saw how to use ```for()``` loops to run the same code over and over and create patterns.

There's another tool for repeating actions in programming: functions. Functions are predefined, named, sequences of commands that can be easily re-executed. In addition to this encapsulation that facilitates repeating sequences of commands, functions are also *parametrizable*, which allows them to have similar but different behavior, depending on information that gets sent to the function during its execution. More about this in a bit.

This is how we define a function:
```
function functionName(param0, param1, ...) {
  command0;
  command1;
  ...
}
```

We've seen many predefined p5.js functions, like ```rect()```, ```ellipse()```, ```line()```, etc. They all take parameters that effect how and where the shapes get drawn, like the x and y positions and shape width and height. But now we will see how to define our own functions.

Let's see one case where defining a function simplifies the code we write and how many variable we have to keep around.

We'll start with an ellipse:

{% include p5-editor.html id="pjmIC60W-" %}

Now we want to rotate that ellipse by $$45^\circ$$. We use a combination of ```translate()``` and ```rotate()``` (with [```radians()```](https://p5js.org/reference/#/p5/radians)) to change our canvas before we draw on it:

{% include p5-editor.html id="B1q7qaFIj" %}

Cool. Now let's draw a second, un-rotated, ellipse to the right of the first one:

{% include p5-editor.html id="8cCHdVQGa" %}

Oh. That's not what we wanted. Our ```translate()``` and ```rotate()``` commands get reset at the end of our ```draw()``` function, but since we are drawing multiple shapes inside our ```draw()``` function we have to remember to manually undo those transformations:

{% include p5-editor.html id="PNG7-40zu" %}

It's in the right place, so we can rotate the second ellipse now, by, say, $$65^\circ$$:

{% include p5-editor.html id="xBriX3Irb" %}

Oh... right, the rotation pivot point is still at $$(50, 50)$$. We have to undo that too:

{% include p5-editor.html id="P3dM0LUlR" %}

Finally! But it's difficult and cumbersome to keep track of all the translation and rotation values so we can undo them...

Drawing a rotated ellipse uses a very specific and repetitive set of commands that have to be executed in order:
- translate to the center
- rotate
- undo rotation
- undo translation

This is a perfect opportunity to simplify repetitive code by using a function. Let's define a function for drawing a rotated ellipse:

```
function rotatedEllipse(x, y, w, h, angle) {
  translate(x, y);
  rotate(radians(angle));
  ellipse(0, 0, w, h);
  rotate(radians(-angle));
  translate(-x, -y);  
}
```

By doing this we are giving that sequence of code a name (```rotatedEllipse```) and some variables (```x```, ```y```, etc) to control how and where our ellipse will be drawn. Now we can just **call** that function with different parameters whenever we want a rotated ellipse:

{% include p5-editor.html id="QYgky18CN" %}

Amazing!

We can even use it in a loop:

{% include p5-editor.html id="UhgcKbHqI" %}

By using a function we have encapsulated all of the commands necessary to draw a rotated ellipse into a easy to use command.

Just one more thing, p5.js actually has a mechanism to undo transformations without us having to keep track of the exact values used in ```translate()``` and ```rotate()```. We can use the [```push()```](https://p5js.org/reference/#/p5/push) and [```pop()```](https://p5js.org/reference/#/p5/pop) functions to easily undo transformations like this:

```
push();
translate(50, 50);
rotate(radians(45));
ellipse(0, 0, 50, 60);
pop();
```

When we can ```push()``` it's like we are telling p5.js to pay extra close attention to our transformations and keep track of them for us. After we are done drawing, we call ```pop()```, which now tells p5.js to actually undo the transformations for us.

So we can use this in our function instead, but it's still nicer and easier to have a function to draw our rotated ellipses:

{% include p5-editor.html id="i0MEsivC0" %}

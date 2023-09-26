---
title: 1D Animation
---

<h2 class="week-title">{{ page.title }}</h2>

We've seen this basic p5.js structure many times now:
```
function setup() {
  // run this once
}

function draw() {
  // run this over and over and over
}
```

Just to reiterate what p5.js does with this code: the ```setup()``` function, so all of the commands inside of it, run just once. This is where we setup the canvas size, maybe set initial values to some variables, draw the background for the first time, set up any of the drawing modes, like [```rectMode```](https://p5js.org/reference/#/p5/rectMode), [```colorMode```](https://p5js.org/reference/#/p5/colorMode), etc.

After the ```setup()``` function runs once, p5.js takes our ```draw()``` function and runs all the commands that are inside of it over and over and over again, at a specific rate. For most of the code we have run so far we haven't noticed this re-draw because we draw the same shapes every time the ```draw()``` function runs. But we have seen some cases when using ```random()``` where we've had to use some tricks to make sure we draw the same thing each time.

How often the ```draw()``` function runs will depend on many things, but for most browsers and displays it will be either 30 times per second or 60 times per second. This is referred to as the frame rate and sometimes these values are given as 30 fps or 60 fps, where fps stands for *frames per second*. 30 and 60 fps are common refresh rates on monitors and they are fast enough that we can use consecutive re-draws to draw animations without our eyes noticing jumps or discontinuities. We can call each execution of ```draw()``` a frame, and by varying positions, sizes and colors slightly between frames we can create animations.

*Animations?* Yeah! If, instead of drawing a circle at the exact same location every time ```draw()``` executes, we use a variable to change its position, we can make it move!

{% include p5-editor.html id="9dPEc2s6U" %}

Instead of using a variable called ```xPos``` we could have called the p5.js variable [```frameCount```](https://p5js.org/reference/#/p5/frameCount). This variable keeps track of how many times the ```draw()``` function has executed and can be easily used for creating animations:

{% include p5-editor.html id="pj861WPhB" %}

At each frame we are redrawing the ellipse, but before redrawing we are rotating our canvas by ```frameCount``` degrees: the first frame it rotates by $$0^\circ$$, the second time by $$1^\circ$$, then $$2^\circ$$, then $$3^\circ$$, etc, and when we see all these frames one after the other we perceive it as an animated ellipse rotating.

Since the ```frameCount``` variable just keeps growing and growing it's very easy to use it for something like this because rotations are "cyclic", they repeat after $$360^\circ$$. Also note that we are using the ```radians()``` function because ```rotate()``` expects angles in radians and if we just gave ```rotate()``` our ```frameCount``` it would rotate really fast. Try it!!

Let's go back to our circle example:

{% include p5-editor.html id="9dPEc2s6U" %}

Play with the value that determines the speed of the circle and figure out how to make it move faster. As it moves faster, do we lose the impression of an animation at any point?

Now, what if we don't want it to go away, and instead have it bounce back once it hits the edge of our canvas?

We have a variable that keeps track of our position, so every frame, after we increment the position of our circle we could check if it has gotten bigger than the canvas width and change its direction:

{% include p5-editor.html id="jbsoIwGTJ" %}

That required a new variable for keeping track of the direction of movement, but it works!

Our circle is disappearing on the left side of the screen now. We can fix that the same way we fixed the right side:

{% include p5-editor.html id="jUJYxGWG5" %}

Almost perfect. The circle only changes direction when its center goes beyond the canvas, not its edge. Let's put the circle radius in a variable and use that to detect when the circle hits the end of the canvas:

{% include p5-editor.html id="mHwD47zud" %}

One last thing, let's put the circle speed in a variable, so it's easier to experiment with different circle speeds:

{% include p5-editor.html id="QwtC4r8Sh" %}

We have one variable for keeping track of the direction, and another for the speed. Could these be combined to simplify our code a little bit? #spoiler: yes.

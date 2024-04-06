---
title: Cycles
---

<h2 class="week-title">{{ page.title }}</h2>

We saw how to loop through elements and repeat code execution using ```for()``` loops. That structure is good for when we have repetitions with a well-defined beginning and an end, but sometimes we might want to repeat some computation or action for an indefinite amount of time with a certain rhythm or frequency. So... cycles.

One of the simplest ways to create a cycle is to think of a way to periodically reset a variable that just grows and grows. Think of the way an analog clock works: time just keeps going forward and growing, but the longer arm of the clock comes back to its beginning position every 60 minutes, and the shorter arm resets every 12 hours:

<div class="scaled-images left s33">
  <img src = "{{ site.baseurl }}/assets/tutorials/cycles.jpg"/>
</div>

Before we create any cycles, let's just visualize a variable that keeps growing and growing in p5js: [```frameCount```](https://p5js.org/reference/#/p5/frameCount), which keeps track of how many times the ```draw()``` function has executed:

{% include p5-editor.html id="GDSfaAYYC" %}

Ok, the horizontal position of the circle "grows" as time/```frameCount``` grows, and eventually it leaves the screen. We could create a variable that grows just like ```frameCount```, and once it gets bigger than ```width``` it is reset:

{% include p5-editor.html id="c8SmJmXy0" %}

This is nice because we can also control the speed of the circle by changing the amount ```x``` grows with each ```draw()```. Try it out! Change ```x += 1``` to ```x += 2```, or ```x += 10```.

This works, and we can extend it to keep track of different cycles, with different start positions, end positions and speeds:

{% include p5-editor.html id="EIk3qFSfZ" %}

We'll learn how to keep track of object positions like this using a different programming paradigm called "object-oriented programming", but when thinking about cycles it's nice to be able to abstract what we're trying to do here into a more general mathematical formulation. Just as a reminder of what it is that we're trying to do: turn a variable that grows linearly into a cyclic variable that repeats with a certain frequency.

Well, there's a nice operator in JavaScript (and most programming languages) that can help us do just that: the [modulo operator](https://betterexplained.com/articles/fun-with-modular-arithmetic/).

Let's say we want our circle to move 10 pixels and then go back to 0, move 10 pixels, back to 0, etc etc. That sequence of values that repeats every ```10``` numbers is: $$[0,1,2,3,4,5,6,7,8,9, 0,1,2,3,4,5,6,7,8,9, 0,1,2,...]$$. And, those are just the remainders of the natural numbers ($$[0,1,2,3,...]$$) when they are divided by ```10```.

And if we want to repeat the sequence after ```width``` elements, like: $$[0 \rightarrow width, 0 \rightarrow width, ...]$$, we can just use the remainder of the natural numbers when they are divided by ```width```:

{% include p5-editor.html id="A_1Rjsrd3" %}

In our case, using p5js, the [```frameCount```](https://p5js.org/reference/#/p5/frameCount) variable already gives us a sequence of the natural numbers. And, in this example, the ```width``` number is acting as the amplitude of our cycle (how far the circle goes before it repeats), and there's no offset (starting position), but we could add one:

{% include p5-editor.html id="iriHwwAt3" %}

This circle moves a distance of $$\frac{width}{2}$$ pixels, starting at $$\frac{width}{4}$$, so the amplitude of this cycle is $$\frac{width}{2}$$ and its offset is $$\frac{width}{4}$$.

Let's say we now want to make it move faster. We could just multiple the ```frameCount``` variable so that instead of growing by 1 it grows by 2: (``` 2 * frameCount```), or by 3: (```3 * frameCount```), etc...

{% include p5-editor.html id="j8duRwv3O" %}

This is good, but sometimes it's useful to control the frequency of a repeating action using actual time units, like: seconds, milliseconds or minutes. And in our code, even though we can control how often the action repeats, it's not clear how to change it if we want to, for example, make the action repeat every 1 second or 2 seconds or 15 seconds.

In order to do that in this case, we need to keep track of how often our frame is updating in terms of seconds, and more generally, we need some way to define the period of our repetition in terms of seconds. Let's start by creating a variable called ```periodSec``` that keeps track of how often we want to repeat our action (in seconds), and since we are updating our sketch every frame, let's calculate how often we repeat our action in terms of frames, using our ```frameRate```: \$$period = periodSeconds\;(seconds) \times frameRate\;(\frac{frames}{second})$$

```period``` is the number of frames our action will last before it repeats. ```frameRate``` can be obtained in p5js using the [```getTargetFrameRate()```](https://p5js.org/reference/#/p5/getTargetFrameRate) function.

Now, we can think about the speed of our circle as: \$$speed = \frac{amplitude}{period}\;(\frac{pixels}{frames})$$

And its location: \$$ x = frameCount\;(frames) \times speed\;(\frac{pixels}{frame})$$

Putting that in the code with the modulo and the offset, we get:

{% include p5-editor.html id="lVu_eb7oP" %}

Now, the reason why it's advantageous to express our cycles in terms of amplitude, period and offset is because we can easily find other equations for repetitive motion that are expressed in those terms. Like this equation for a [triangle wave](https://en.wikipedia.org/wiki/Triangle_wave#Definition) from wikipedia that defines a triangle wave of period $$p$$ that spans the range $$[0, 1]$$ as: \$$x(t) = 2 \left\lvert\frac{t}{p} - \left \lfloor \frac{t}{p} + \frac{1}{2} \right\rfloor\right\rvert$$

Now, we can easily translate that into p5js: \$$x = 2 \times abs\left(\frac{frameCount}{period} - floor\left(\frac{frameCount}{period} + \frac{1}{2}\right)\right) \times amplitude$$

We have to multiply by amplitude to turn the range $$[0, 1]$$ in the original equation into the range $$[0, amplitude]$$. But that was the only change! Besides that I just copied the equation from wikipedia and it works:

{% include p5-editor.html id="PImIcoREP" %}

---
title: Cycles
---

<h2 class="week-title">{{ page.title }}</h2>

We saw how to loop through elements and repeat code execution using ```for()``` loops. That structure is good for when we have repetitions with a well-defined beginning and an end, but sometimes we might want to repeat some computation or action for an indefinite amount of time with a certain rhythm or frequency. So... cycles.

One of the simplest ways to create a cycle is to think of a way to periodically reset a variable that just grows and grows. Think of the way an analog clock works: time just keeps going forward and growing, but the longer arm of the clock comes back to its beginning position every 60 minutes, and the shorter arm resets every 12 hours:

<div class="image-row image-row-2" markdown=1>
  <div class="img-wrapper" markdown=1>
  ![](https://cdn.shopify.com/s/files/1/0600/7023/2109/products/orville-clock-wall-decor-2.jpg)
  </div>
</div>

Before we create any cycles, let's just visualize a variable that keeps growing and growing in p5js: [```frameCount```](https://p5js.org/reference/#/p5/frameCount), which keeps track of how many times the ```draw()``` function has executed:

https://editor.p5js.org/thiagohersan/sketches/GDSfaAYYC

Ok, the horizontal position of the circle "grows" as time/```frameCount``` grows, and eventually it leaves the screen. We could create a variable that grows just like ```frameCount```, and once it gets bigger than ```width``` it is reset:

https://editor.p5js.org/thiagohersan/sketches/c8SmJmXy0

This is nice because we can also control the speed of the circle by changing the amount ```x``` grows with each ```draw()```:

https://editor.p5js.org/thiagohersan/sketches/EIk3qFSfZ

This works, and we can extend it to keep track of different cycles, with different start positions, end positions and speeds:

https://editor.p5js.org/thiagohersan/sketches/EIk3qFSfZ

We'll learn how to keep track of object positions like this using a different programming structure/paradigm called "classes", but when thinking about cycles it's nice to be able to abstract what we're trying to do here into a more general mathematical formulation. Just as a reminder of what it is that we're trying to do: turn a variable that grows linearly into a cyclic variable that repeats with a certain frequency. Well, there's a nice operator in JavaScript (and most programming languages) that can help us do just that: the modulo operator.

Let's say we want to create the following pattern of numbers (could be x position of a circle) that repeats every $10$ numbers: [$0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,...$]. Those are just the remainders of the natural numbers ([$0,1,2,3,...$]) when they are divided by $10$. And if we want to repeat the sequence after $width$ elements ([$0 \rightarrow width$, $0 \rightarrow width, ...$]) we can get the remainder of the natural numbers ([$0,1,2,3,...$]) when they are divided by $width$:

https://editor.p5js.org/thiagohersan/sketches/A_1Rjsrd3

In our case, using p5js, the [```frameCount```](https://p5js.org/reference/#/p5/frameCount) variable already gives us a sequence of the natural numbers. And, in this example, the $width$ number is acting as the amplitude of our cycle (how far the circle goes before it repeats), and there's no offset, but we could add one:

https://editor.p5js.org/thiagohersan/sketches/iriHwwAt3

This circle moves a distance of $\frac{width}{2}$ pixels, starting at $\frac{width}{4}$.

Let's say we want to make it faster. We could just multiple the ```frameCount``` variable so that instead of growing by 1 it grows by 2 (``` 2 * frameCount```), by 3 (```3 * frameCount```), etc...

https://editor.p5js.org/thiagohersan/sketches/j8duRwv3O

This is good, but sometimes it's useful to control the frequency of a repeating action using actual time units, like: seconds, milliseconds or minutes. And in our code, even though we can control how often the action repeats, it's not clear how to change it if we want to, for example, make the action repeat every 1 second or 2 seconds or 15 seconds.

In order to do that in this case, we need to keep track of how often our frame is updating in terms of seconds, and more generally we need some way to define the period of our repetition in terms of seconds. Let's start by creating a variable called ```period``` that keeps track of how often we want to repeat our action (in seconds). 

Now, we can think about this desired speed of our circle as: $\frac{amplitude}{period} \frac{pixels}{seconds}$.


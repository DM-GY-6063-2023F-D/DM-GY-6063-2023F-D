---
title: Map
week: 4
order: 2
---

<h2 class="week-title">{{ page.title }}</h2>

Now that we know how to set up animations using the ```draw()``` cycle, and also detect user input using event functions, we'll very often find ourselves having to deal with "boundary conditions". Boundary conditions sometimes involve physical boundaries, like, detecting and deciding what to do when a shape moves beyond our screen boundary. Other times, these boundary conditions involve setting the minimum and maximum values a variable can have.

Let's take a look at a sketch that draws a circle at $$(mouseX, mouseY)$$. We've also set the circle diameter to be equal to the $$mouseY$$ value; the further down the canvas, the bigger the circle:

{% include p5-editor.html id="RcUoHjoJz" %}

When the mouse is very near the top the circle is almost not visible, and, likewise, when it's at the very bottom it's too big.

One way to make this a bit more controllable is to set a $$maxDiameter$$ variable and then calculate the actual diameter like this: \$$diameter = \frac{mouseY}{height} \times maxDiameter$$

The $$\frac{mouseY}{height}$$ term is the location of the mouse as a percentage of the canvas height: it goes from $$0\%$$ when $$mouseY = 0$$, to $$100\%$$ when $$mouseY = height$$.

We can now use this to set the diameter:

{% include p5-editor.html id="ONb2xFJqu" %}

And we can do something similar if we want to set a minimum value for the circle diameter: \$$diameter = \frac{mouseY}{height} \times (maxDiameter - minDiameter) + minDiameter$$

The $$(maxDiameter - minDiameter)$$ term is the magnitude of our output (how much it's allowed to vary), and multiplying it by $$\frac{mouseY}{height}$$ gives us how far along this magnitude our output should be. We still have to add the $$minDiameter$$ term to make sure our output is in the range $$[minDiameter, maxDiameter]$$:

{% include p5-editor.html id="-lhWT-K5U" %}

Let's say that now we want to have the logic reversed: larger circle at the top of the screen, and smaller circle at the bottom:

{% include p5-editor.html id="tNOf62UFa" %}

The logic for calculating the circle diameter is getting a bit complicated:
```
let mDiamInv = (mouseY / height) * (maxDiam - minDiam) + minDiam;
let mDiam = maxDiam - mDiamInv + minDiam;
```

This is where ['''map()'''](https://p5js.org/reference/#/p5/map) comes in. It's a function that maps a value from one range to another.

If we want to map the value of ```mouseY``` from a range of $$[0, height] \rightarrow [minDiameter, maxDiameter]$$, we can just use: ```let mDiam = map(mouseY, 0, height, minDiam, maxDiam);```:

{% include p5-editor.html id="SPem8nNRO" %}

Likewise, if we want to reverse the logic and have larger circle at the top of the screen and smaller circle at the bottom, or, map : $$[0, height] \rightarrow [maxDiameter, minDiameter]$$, we just swap ```minDiam``` and ```maxDiam```: ```let mDiam = map(mouseY, 0, height, maxDiam, minDiam);```:

{% include p5-editor.html id="5d4Q2aSJ6" %}

---

[```map()```](https://p5js.org/reference/#/p5/map) is useful in other situations too. Let's say we want to draw evenly spaced vertical lines on our canvas. We have a ```for()``` loop that counts from $$0$$ to $$16$$ and we can just map the counter variable to the position we want because we know our counter has a range $$[0, 16]$$ and our line positions will have a range $$[0, width]$$:

{% include p5-editor.html id="_1qLp6Hf4" %}

We can map the same counter to two different output ranges: $$[0, 16] \rightarrow [0, width]$$ and $$[0, 16] \rightarrow [width, 0]$$. The first going from left to right and the other from right to left, as the counter increases:

{% include p5-editor.html id="I-0zfItKy" %}

Using the same counter we can map $$[0, 16] \rightarrow [0, width]$$ and $$[0, 16] \rightarrow [0, \frac{width}{10}]$$:

{% include p5-editor.html id="xI7qrR_jt" %}

Or, with an offset for one of the output ranges, map $$[0, 16] \rightarrow [0, width]$$ and $$[0, 16] \rightarrow [\frac{width}{4}, \frac{width}{3}]$$:

{% include p5-editor.html id="ESNSos3lN" %}

We can even do something where our counter $$[0, 16]$$ gets mapped to *three* different output ranges:

{% include p5-editor.html id="iOMArqVae" %}

---

The ```map()``` function is also very useful when drawing time. In this example we map the seconds that have passed in the current minute of time to the diameter of a circle. We know seconds has a range $$[0, 59]$$, so it's just a matter of choosing the smallest and largest values for the diameter:

{% include p5-editor.html id="p84wngLLR" %}

We are mapping $$[0, 59] \rightarrow [20, width]$$ for the diameter, but we are also mapping the seconds value to the amount of green in our ```fill()``` color. We know each of the 3 color parameters has a maximum value of $$255$$, and if we always want a bit of green in our color we can map $$[0, 59] \rightarrow [128, 255]$$.
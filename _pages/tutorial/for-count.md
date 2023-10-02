---
title: For Loops (counting)
week: 3
order: 2
---

<h2 class="week-title">{{ page.title }}</h2>

We have many examples of how to use ```for()``` loops to draw gridded patterns in our [other tutorial]({{ site.baseurl }}/tutorial/for-for-for/), but in this tutorial we'll explore another way to think about loops that will allow us to do slightly different things.

We saw how to draw repeating shapes by using loops with a start position (or offset), an end position and a fixed spacing:

```
for(let x = startPosition; x < endPosition; x += spacing) {
  drawShape();
}
```

{% include p5-editor.html id="0iazqBfqD" %}

One way to think about this is that the ```for()``` command is a counter, counting from ```startPosition``` to ```endPosition``` in increments of ```spacing```. Thinking about the ```for()``` command as a "counter" makes it easy to see how to use it in situations that aren't about the location of shapes.

We can use it to repeat an action a set number of times:

{% include p5-editor.html id="UGguNyDn8" %}

Or to do some math on sequences of numbers, like finding the sum of all numbers between $$N_{0}$$ and $$N_{1}$$;

{% include p5-editor.html id="g3Zstv9-4" %}

Or, to iterate through a collection of items, in an [array]({{ site.baseurl }}/tutorial/array/):

{% include p5-editor.html id="GaVnWe0bi" %}

---

Let's explore the situation where we want to repeat something a set number of times. Instead of drawing squares all the way across the canvas, we just want rows with $$5$$ squares:

{% include p5-editor.html id="Xy4oqzF61" %}

Instead of iterating through pixel values, and counting from a starting *position* to a final *position*, we are now counting the number of squares to draw, from $$0$$ to $$4$$.

For each square that we want to draw we have to do a little math first to figure out where to place it: if the first one is at $$0$$, the next one should be at $$0 + spacing$$, and the one after that at $$0 + spacing + spacing$$... and so on, and so on... in other words, the $$i^{th}$$ square is at position $$i * spacing$$. If there's an offset for the first square, that can just get added to the equation, as is seen in the case of the second row of squares in the code above.

---

If instead we want to draw a fixed number of squares in a fixed amount of space, we need to figure out how to space the squares. Our friend [```map()```](https://p5js.org/reference/#/p5/map) can help with that:

{% include p5-editor.html id="3igLJ6nXo" %}

In this case we are using ```map()``` to calculate the position of our squares given the fact that our counter goes from $$0$$ to $$10$$ and we want to place them between $$0$$ and $$width$$ in the first case, and between $$offset$$ and $$width$$ in the second case.

---

This is similar but a little different from the case where we might want to draw a fixed number of shapes, in a fixed amount of space, but allowing for the square's width to either grow to avoid gaps, or shrink to avoid overlap. Imagine the previous example, but where we want to draw $$15$$ squares instead of $$10$$, with no gaps or overlap:

{% include p5-editor.html id="jDC95eddA" %}

Using ```map()``` we can see there are gaps in the top row and overlap in the bottom. To fix this we have to calculate a new spacing and width for each of the two cases, based on the number of squares we want and the space we have to fill:

{% include p5-editor.html id="EgpqLQcPE" %}

---

So, to review: in cases where we're drawing shapes between a pre-defined start position and end position, with a fixed spacing, we can just iterate over the pixel values and draw:
```
for(let pos = start; pos < end; pos += spacing) {
  // draw
}
```

When we want to draw a specific number of shapes, with a *given* spacing, and we don't care how much space it might take, we can use a ```for()``` loop as a counter and calculate the position from the spacing:
```
for(let count = 0; count < maxCount; count += 1) {
  let pos = offset + count * spacing;
  // draw
}
```

When we want to draw a specific number of shapes, within a *fixed* amount of space, without knowing the spacing beforehand, we can use a ```for()``` loop as a counter and use ```map()``` to calculate the position of each shape:
```
for(let count = 0; count < maxCount; count += 1) {
  let pos = map(count, 0, maxCount, minPos, maxPos);
  // draw
}
```

If we want to draw a specific number of shapes, within a *fixed* amount of space, without knowing the spacing beforehand, and avoid overlaps or gaps, we have to calculate the spacing based on available width and number of shapes, then we can use a ```for()``` loop as a counter, and do a little math to calculate the position from the spacing:
```
let spacing = availableWidth / maxCount;
for(let count = 0; count < maxCount; count += 1) {
  let pos = offset + count * spacing;
  // draw
}
```

---

Let's put some of this to practice and draw a chessboard, centered on our canvas, with some margin around it.

We'll start by drawing one row of our board. Since the number of squares is fixed ($$8$$), the amount of space they'll take is also fixed ($$width - 2 * margin$$) and we want to avoid overlaps, we'll use the last method:
```
let spacing = availableWidth / maxCount;
for(let count = 0; count < maxCount; count += 1) {
  let pos = offset + count * spacing;
  // draw
}
```

{% include p5-editor.html id="cJRitSc_i" %}

The spacing and sizing looks good. We just have to fix the color. We want black and white squares to alternate, which means painting the even numbered squares black and the odd numbered squares white. Since we have a variable that keeps track of which square we are drawing (```col```), we can just check if that's an even number (```col % 2 == 0```) and select the color accordingly:

{% include p5-editor.html id="gQ9D2frvM" %}

Now we just have to nest some ```for()``` loops to get all of our rows, and we'll be done:

{% include p5-editor.html id="F0jEms0uu" %}

The square colors are alternating in the horizontal direction because we are checking if ```col``` is even, but to get the correct pattern we should also alternate the pattern by row. If we enumerate all the possible combinations of column and row even/odd pairings, the pseudo-code for the logic could be something like:
```
if (col is even && row is even) {
  fill(black);
} else if (col is even && row is odd) {
  fill(white);
} else if (col is odd && row is even) {
  fill(white);
} else if (col is odd && row is odd) {
  fill(white);
}
```

So, if the row and column index are both even, or are both odd, we paint black. If one is odd and the other is even, we paint white. The above pseudo-code can be simplified to:

```
if (col evenness == row evenness) {
  fill(black);
} else {
  fill(white);
}
```

And in JavaScript ```if(col % 2 == row % 2)``` will check if the "evenness" of the values is the same:

{% include p5-editor.html id="I4pAf4ysF" %}

---

Now, we can even think about more complicated tile patterns, like this one:
![](https://i.pinimg.com/564x/0c/90/2e/0c902e36c586665f45c57d4ccdd414dd.jpg)

It's made up of a single composite shape, but depending on which column or row it's in, it gets rotated $$90^\circ$$, $$180^\circ$$ or $$270^\circ$$.

Without worrying too much about the implementation details, let's say we have a function called ```zig()``` that draws the shape based on $$4$$ parameters: x location, y location, width and angle of rotation (in degrees):

{% include p5-editor.html id="2IarIAkMf" %}

We can just use that in our previous chessboard sketch and instead of alternating colors, alternate angle:

{% include p5-editor.html id="iqWU_6Mxb" %}

That is cool, and we can experiment with the angles in this version, but it only uses $$2$$ out of the $$4$$ different variations of the pattern. We can try something like this, that rotates depending on different row and column even/odd combinations:
```
if (col is even && row is even) {
  angle = 0;
} else if (col is even && row is odd) {
  angle = 270;
} else if (col is odd && row is even) {
  angle = 90;
} else if (col is odd && row is odd) {
  angle = 180;
}
```

{% include p5-editor.html id="WXTIQraE-" %}

---
title: Boolean Mouseover
---

<h2 class="week-title">{{ page.title }}</h2>

In this tutorial we are going to take a look at how to use conditionals (if/else) to implement a simple mouseover effect on a shape.

Let's start with a square, centered on our canvas. Notice the use of variables for setting the location and dimensions of the ```rect()```. This will be important soon.

{% include p5-editor.html id="pL0Eu59vX" %}

Now, let's detect when the mouse moves to the right of the left-most edge of the square and indicate that by changing the color of the square. Since we have a variable for the x position of the square this is simply:

```
if(mouseX > rectX)
```

{% include p5-editor.html id="9e-EW8ovX" %}

As we move the mouse around the canvas we'll notice that, yes, the square changes color when the mouse goes from the left side of the canvas into the square, but it also stays red when the mouse exits on the right side, or when the mouse is above or below the square. Let's fix that.

Focusing on the x direction only, the logic we want to implement could be described in words as:  
"fill the square with red as long as the mouse is *between* the left and right edges of the square".

A mathematical equation for this could be:  
```leftEdge < mouseX < rightEdge```

Unfortunately we can't just put a double conditional like that inside an ```if()```, but we can break it up using boolean logic. Since we want both conditions to be true, this is equivalent to:  
```leftEdge < mouseX AND mouseX < rightEdge```

And this can be rearranged a bit to improve legibility. I find this easier to read in my head in words: "mouse is greater than left edge AND less than right edge":  
```mouseX > leftEdge AND mouseX < rightEdge```

Putting it into JavaScript and using our variables this become:  
```if(mouseX > rectX && mouseX < rectX + rectWidth)```  
(We have the left edge of the square, but its right edge has to be calculated as location + width)

{% include p5-editor.html id="wuduCLW9M" %}

Better! But the square is still red when the mouse is directly above or below the square. Hmmm.....

We can go through the above reasoning again, but this time including the y direction as well. A phrase that could describe what we want can be something like:  
"fill the square with red if the mouse x position is *between* the left and right edges of the square AND the mouse y position is *between* its bottom and top edges".

The logic in pseudo-code could be:  
```mouseX > leftEdge AND mouseX < rightEdge AND```  
```mouseY > topEdge AND mouseY < bottomEdge```  

The mouseY logic statements (for example: ```mouseY < bottomEdge``` ) look "upside down", we want to detect when the mouse is above the bottom edge, not below! This is actually correct the way it is because ```mouseY``` grows towards the bottom of the screen.

In JavaScript this could be:  
```if (mouseX > rectX && mouseX < rectX + rectWidth &&```  
```mouseY > rectY && mouseY < rectY + rectWidth)```  
(in the editor below p5.js has nicely re-formatted this long line so that it's easier to read)

{% include p5-editor.html id="dtj2fo9O_" %}

🎉✨

Could we do something similar with a non-square rectangle? what would have to change?

What about a circle or an ellipse ?

What if we wanted to detect clicks inside the square ?

---
title: Objects
---

<h2 class="week-title">{{ page.title }}</h2>

Let's start with our rain sketch from the [arrays tutorial]({{ site.baseurl }}/tutorial/arrays-0/):

{% include p5-editor.html id="xZAGjgz8X" %}

This sketch has $$10$$ drops, and each drop has its own x and y position that is kept in the ```xPos``` and ```yPos``` arrays. For example, the position for the $$4^{th}$$ drop is given by ```(xPos[3], yPos[3])```.

Let's say we now want each drop to also have its own diameter.

Easy, just declare a new empty array called ```cDiam```, and give it some random diameters between $$15$$ and $$30$$ whenever we initialize the other arrays in ```setup()```:
```
for (let d = 0; d < numDrops; d += 1) {
  xPos.push(random(width));
  yPos.push(random(-50, 50));
  cDiam.push(random(15, 30));
}
```

And, drawing all the drops becomes:
```
for (let d = 0; d < xPos.length; d += 1) {
  ellipse(xPos[d], yPos[d], cDiam[d], cDiam[d]);
}
```

{% include p5-editor.html id="vNoJNYYLG" %}

And now, if we want to give each drop a different velocity and color, and draw the small drops first to give the impression that they are behind the larger drops and further into the canvas?

We could keep adding arrays:
```
let yVel = [];
let cColor = [];
```

But it's nearly impossible to redefine the order in which we draw the drops because each drop has parameters specified in $$5$$ different arrays, and keep track of how those parameters go together once we start re-ordering one of the arrays is not easy.

Once an object that we're trying to represent starts to have many different parameters, we can take advantage of another JavaScript data structure, called an Object.

JavaScript objects are kind of similar to arrays, in the sense that they help keep related values together using a single variable. For example, for our drops, we could declare a "drop" objects like this, where data is organized into key-value pairs:
```
let drop = {
  x: random(width),
  y: random(100),
  diam: random(15, 30),
  yVel: random(2, 5),
  color: random(200, 255),
  alpha: random(180, 220)
};
```

And just like arrays have a special syntax for accessing their members by index, objects have a special syntax for accessing members by the name of their properties. So, if we want to get the x position of our drop we can use: ```drop.xPos```. Similarly, the velocity would be: ```drop.yVel```. It's almost as if our ```drop``` variable has a set of internal variables that belong to it.

Now we can combine arrays and objects and create an empty array to hold our drop objects:
```
let drops = [];
```

Then in our ```setup()``` function we can use a ```for()``` loop to add a predefined number of drops to this array:
```
for (let d = 0; d < numDrops; d += 1) {
  let aDrop = {
    x: random(width),
    y: random(-50, 50),
    diam: random(15, 30),
    yVel: random(2, 5),
    color: random(200, 255),
    alpha: random(180, 220),
  };

  drops.push(aDrop);
}
```

The rest of our code is very similar, but now instead of accessing parameters in different arrays using an index, like:
```
ellipse(xPos[i], yPos[i], dDiam[i], dDiam[i]);
```

We first get our object from the array, and then access its properties by name:
```
let aDrop = drops[i];
ellipse(aDrop.x, aDrop.y, aDrop.diam, aDrop.diam);
```

The rest is pretty similar:

{% include p5-editor.html id="s-DCrhtr2" %}

Now that all of the properties for a single drop are kept together in an object, we can re-order the drops by size. It will seem a little bit magical for now, but it does work and is not too complicated:

{% include p5-editor.html id="en1kZytiA" %}

And, since we are drawing smaller drops first, we can also use ```map()``` to make the smaller objects move slower, seem darker and less transparent.

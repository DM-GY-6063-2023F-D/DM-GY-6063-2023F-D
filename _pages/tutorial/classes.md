---
title: Classes
---

<h2 class="week-title">{{ page.title }}</h2>

We've been learning about [arrays]({{ site.baseurl }}/tutorial/arrays-0/) and [objects]({{ site.baseurl }}/tutorial/objects/), and those structures work really well to organize data: values that are related to each other can be grouped and accessed in different ways. 

Like in this sketch, very similar to our [objects tutorial]({{ site.baseurl }}/tutorial/objects/):

{% include p5-editor.html id="pm0efAQQk" %}

We have an array of circles, and each circle is an object that keeps track of its x, y, diameter, velocity and color.

What if we also want to group behavior and functions along with these values? So, not only do we want to store the diameter and the x and y positions of a circle, but also want to define how they move and what happens when they collide with each other. Right now the ```draw()``` function is responsible for updating the positions of our circles and check if they have left the canvas. This can get really messy if we keep adding functionality to our circles, like collision detection or multi-direction movements.

This is a perfect case for using [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). We can think of classes as being super objects: objects stored values index by names, classes do that too, but they also store their own functions for manipulating their values.

The overall structure for a class is something like:
```js
class ClassName {
  constructor(param0, param1) {
    // initialize some stuff
  }

  functionName() {
    // do some stuff with internal values
  }
}
```

So, it has a special function called ```constructor()``` that is used to initialize our instance and define some internal variables, and then it has other special functions that are specific to the class and are used to manipulate the internal values of our instance.

*What are instances?*

Let's look at an example to see. We'll redefine our circles from the example above to use a ```Circle``` class:

{% include p5-editor.html id="OKVYz_pC_" %}

So far, not much has changed: the code for the ```draw()``` function is even exactly the same as before. The only difference is that now the values for the circles have been put inside a class. Since the circles are in a class now, the way we create a new circle based on our ```Circle``` class definition, is using the word ```new```. So ```let c = new Circle();``` will run the ```constructor()``` function in our ```Circle``` class and return a new instance of a ```Circle```, with its own values for x, y, diam, etc.

And in the constructor, when we give values for x, y, diam, etc, we prepend those variable names with the word ```this```, to make it explicit that those values belong to one instance of the class ```Circle```, more specifically the new circle we're creating.

But, ```draw()``` is still doing all of the work of updating positions and checking if the circle should be reset. Let's move that logic to functions inside our class:

{% include p5-editor.html id="h2xA3LXEt" %}

Now, the result looks the same, but all of the logic necessary for defining the behavior of our circles lives inside the class and that makes it easy for us to add new functionality to our circles:

{% include p5-editor.html id="Bs3_gWGC8" %}

We've added the ```xVel``` variable, so our circles will now move in both x and y directions, and when the circle reaches the canvas edge it doesn't get reset, but bounces back.

We can even create a simple animation to make the circles temporarily transparent when they hit the edges, and give their bounce a little more emphasis:

{% include p5-editor.html id="uOaFmLn-G" %}

And, finally, we can also add functions to detects when a circle is overlapping with another circle:

{% include p5-editor.html id="aOD7k3G52" %}

Now, inside ```update()``` after updating positions, we first check if the circle has reached a boundary, and then we check if it overlaps with any other circle. To do that we must compare x and y locations of this circle to every other circle in the array:

```js
checkAllOverlaps() {
  let overlap = false;
  for (let ci = 0; ci < circles.length; ci++) {
    let aCircle = circles[ci];
    if (this.checkOverlap(aCircle)) {
      overlap = true;
    }
  }

  if (overlap) {
    this.color = color(255, 0, 0, this.alpha);
  } else {
    this.color = color(255, this.alpha);
  }
}
```

We iterate through all of the circles and use the ```checkOverlap()``` function to check for the actual overlap. If there's an overlap we set the ```overlap``` variable to true and use it later to make the circle color red. If there's no overlap with any other circle, then the variable ```overlap``` never turns to true and later the color is set to white.

And, the actual function that compares two circles to determine overlap is this:

```js
checkOverlap(otherCircle) {
  // check if comparing to itself
  if (this == otherCircle) {
    return false;
  }

  // use distance between 2 circles and radius to check overlap
  let cDist = dist(this.x, this.y, otherCircle.x, otherCircle.y);
  return cDist < this.radius + otherCircle.radius;
}
```

It first has to detect and avoid self-comparisons. Then, it calculates the distance between the centers of the two circles and returns ```true``` if this distance is less than the sum of their radius:

<div class="scaled-images s75">
  <img src = "{{ site.baseurl }}/assets/tutorials/classes-00.jpg"/>
  <img src = "{{ site.baseurl }}/assets/tutorials/classes-01.jpg"/>
  <img src = "{{ site.baseurl }}/assets/tutorials/classes-02.jpg"/>
</div>

And now we have overlap detection !

---
As a bonus exercise, can you see how this part of the code:
```js
let overlap = false;
for (let ci = 0; ci < circles.length; ci++) {
  let aCircle = circles[ci];
  if (this.checkOverlap(aCircle)) {
    overlap = true;
  }
}
```

Could be turned into this?
```js
function overlapReducer(currentOverlap, aCircle) {
  return currentOverlap || this.checkOverlap(aCircle);
}

let overlap = circles.reduce(overlapReducer, false);
```

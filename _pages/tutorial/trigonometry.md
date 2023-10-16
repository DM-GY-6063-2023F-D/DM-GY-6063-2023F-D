---
title: Trigonometry
---

<h2 class="week-title">{{ page.title }}</h2>

This is a brief tutorial with examples of how to use some of the trigonometry and math functions in p5js.

These are the basic [trigonometric functions](https://en.wikipedia.org/wiki/Trigonometric_functions) (and the [Pythagorean theorem](https://en.wikipedia.org/wiki/Pythagorean_theorem)) that relate the angles of a right triangle to the lengths of its sides:

<div class="scaled-images s75">
  <img src = "{{ site.baseurl }}/assets/tutorials/trigonometry-00.jpg"/>
</div>

These can be used to derive formulas for translating between [Cartesian](https://en.wikipedia.org/wiki/Cartesian_coordinate_system) and [polar](https://en.wikipedia.org/wiki/Polar_coordinate_system) coordinate systems.

<div class="scaled-images s75">
  <img src = "{{ site.baseurl }}/assets/tutorials/trigonometry-01.jpg"/>
</div>

Cartesian coordinates are what we use to specify points on a plane (and pixels on a screen) using two numbers that represent distances in perpendicular directions. Polar coordinates specify points on a plane using a distance and an angle.

These in turn can be very useful when we need to calculate the distance or the angle between two points.

If we image two points on our screen, with coordinates $$(x_0, y_0)$$ and $$(x_1, y_1)$$, we can get the distance between them by using the Pythagorean theorem:

<div class="scaled-images s75">
  <img src = "{{ site.baseurl }}/assets/tutorials/trigonometry-02.jpg"/>
</div>

In this sketch the distance between two moving points is calculated using the formula $$\sqrt{(x_1 - x_0)^2 + (y_1 - y_0)^2}$$ and the p5js function [```dist()```](https://p5js.org/reference/#/p5/dist). When those distances are used as the diameter for two circles centered on the canvas, we can see that they are exactly the same:

{% include p5-editor.html id="BM0IF01HH" %}

---
Similarly, we can use the formula that calculates the polar angle of a point to get the angle between two points:

<div class="scaled-images s75">
  <img src = "{{ site.baseurl }}/assets/tutorials/trigonometry-03.jpg"/>
</div>

Or, the angle between a point and itself in the future. If a moving point at $$(x, y)$$ has velocity $$v_x$$ and $$v_y$$, its position in the near future will be $$(x + v_x, y + v_y)$$. We can calculate the angle between the point now and the point in the future to get its heading angle:

<div class="scaled-images s75">
  <img src = "{{ site.baseurl }}/assets/tutorials/trigonometry-04.jpg"/>
</div>

We can use the heading angle of a moving object to rotate its shape and emphasize its direction of motion:

{% include p5-editor.html id="McuKrbsvl" %}

---
While not as common, sometimes we might want to calculate the distance between a point and a line.

This is the shortest distance from a given point to any point on an infinite straight line. It is the perpendicular distance of the point to the line, or, the length of the line segment which joins the point to nearest point on the line.

It's distance $$d$$ between $$(X, Y)$$ and the line $$y = \frac{m}{n}x + b$$ on the drawing below:

<div class="scaled-images s75">
  <img src = "{{ site.baseurl }}/assets/tutorials/trigonometry-05.jpg"/>
</div>

There are many ways to derive the equation for the distance. The one in the drawing involves using distances from another point $$(X_0, Y_0)$$, also on the line, to the original point and to a point $$(X_0+m, Y_0-h)$$ that is perpendicular to the line. The final distance equation is:

$$d = \frac{mX - nY + bn}{\sqrt{m^2 + n^2}}$$

Again, the details of how this is derived are not super important. We should just know that it can be calculated, and that the equation is here in the tutorial whenever we need it.

{% include p5-editor.html id="Q2mlRpMIo" %}

---
p5.js actually has a class called [```Vector```](https://p5js.org/reference/#/p5.Vector) that can help with geometry calculations like these. The simplest way to think about a vector is that it specifies a point $$(x, y)$$ in space, relative to the $$(0, 0)$$ origin. Vectors are actually more than that, but to do the distance and angle calculations that we've seen, it's fine to think of vectors as points with an $$(x, y)$$ coordinate.

This drawing shows two vectors/points and if we subtract $$_1$$ from $$v_0$$, we get a third vector that holds information about the distance and direction between them.

<div class="scaled-images s75">
  <img src = "{{ site.baseurl }}/assets/tutorials/trigonometry-06.jpg"/>
</div>

The vectors in p5js actually have builtin functions to calculate distances and angles. We can create two vectors and get the distance between them like this:
```js
let v0 = createVector(20, 10);
let v1 = createVector(10, 20);
let d = v0.distance(v1);
```

and the angle like this:
```js
let v0 = createVector(20, 10);
let v1 = createVector(10, 20);
let d = v0.angleBetween(v1);
```

Let's use vectors to redo some of the sketches in the tutorial.

First, distance:

{% include p5-editor.html id="c5YCY8pXv" %}

Instead of pushing JavaScript objects with $$4$$ parameters $$(x, y, vx, vy)$$, we now have objects with two vectors, one for the location and one for the velocity of the objects.

In draw, anytime we had ```p.x``` now we'll have to use ```p.loc.x```. Likewise for velocity, ```p.vx``` becomes ```p.vel.x```. It might a bit more letters to type, but the related quantities are in a vector, which helps to do some math, like updating the location.

Instead of this:
```js
p.x += p.vx;
p.y += p.vy;
```

We can just do:
```js
p.loc.add(p.vel);
```

And the distance between the two circles can now be calculated with:
```js
ps[0].loc.dist(ps[1].loc);
```

---
For the angles, it's very similar. We can always call<br>```v0.angleBetween(v1)``` to get the angle between two vectors, but we have to think about which $$2$$ vectors we need the angle between.

In the example where we are trying to get heading angles, the vector that points in the direction of movement is ```p.vel```. Since in p5js an angle of $$0$$ points in the direction of the x-axis, the angle that we need to rotate our objects is gonna be relative to this reference vector of zero rotation.

The code is mostly the same as the previous sketch, with the vector addition for location updates, but now we do:
```js
let xAxis = createVector(1, 0);
let hAngle = xAxis.angleBetween(p.vel);
```
{% include p5-editor.html id="4laz8uFA4" %}

This way we get the heading angle relative to the reference point of zero/no rotation, and then use that to rotate our objects.

---
To calculate the distance to a line, the code remains mostly the same, and it looks just as complicated, but in reality it uses some of the properties of vectors to make the calculation a little more geometric instead of algebraic, which can help remember the formula at a later time.

Again, don't worry about the details for this one, just know where it it and how to use it.

{% include p5-editor.html id="mqShzRx7C" %}

We first define a line object with parameters for its equation in the form: $$y=mx + b$$. We then use these parameters to create a vector that is perpendicular to this line, so we can project our original vector onto this perpendicular vector. And just like that, we get the distance.

---
Now that we know about classes, we can even create a class for the line with equation $$y = mx+b$$ and keep all of the math for calculating distances inside the class:

{% include p5-editor.html id="YI2E4ithx" %}

This is one of the great things about classes: once we have the math for something figured out, we can always wrap it inside a class that will use it to update an object, character or signal, and then we can have $$10$$ or $$100$$ of these objects by just creating new instances from our class definition.

For example, we can move the color info inside our object, call it a Light class and use it to create a couple of lights in our canvas:

{% include p5-editor.html id="DSmK_Y5pK" %}

And now automate some slope changes over time, sit back and enjoy a low-fi, pixel light show:

{% include p5-editor.html id="EjqQv0gjl" %}

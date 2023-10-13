---
title: Trigonometry
---

<h2 class="week-title">{{ page.title }}</h2>

This is a brief tutorial with examples of how to use some of the trigonometry and math functions in p5js.

These are the basic [trigonometric functions](https://en.wikipedia.org/wiki/Trigonometric_functions) (and the [Pythagorean theorem](https://en.wikipedia.org/wiki/Pythagorean_theorem)) that relate the angles of a right triangle to the lengths of its sides:

<div class="scaled-images s75">
  <img src = "{{ site.baseurl }}/assets/tutorials/trigonometry_00.jpg"/>
</div>

These can be used to derive formulas for translating between [Cartesian](https://en.wikipedia.org/wiki/Cartesian_coordinate_system) and [polar](https://en.wikipedia.org/wiki/Polar_coordinate_system) coordinate systems.

<div class="scaled-images s75">
  <img src = "{{ site.baseurl }}/assets/tutorials/trigonometry_01.jpg"/>
</div>

Cartesian coordinates are what we use to specify points on a plane (and pixels on a screen) using two numbers that represent distances in perpendicular directions. Polar coordinates specify points on a plane using a distance and an angle.

These in turn can be very useful when we need to calculate the distance or the angle between two points.

If we image two points on our screen, with coordinates $$(x_0, y_0)$$ and $$(x_1, y_1)$$, we can get the distance between them by using the Pythagorean theorem:

<div class="scaled-images s75">
  <img src = "{{ site.baseurl }}/assets/tutorials/trigonometry_02.jpg"/>
</div>

In this sketch the distance between two moving points is calculated using the formula $$\sqrt{(x_1 - x_0)^2 + (y_1 - y_0)^2}$$ and the p5js function [```dist()```](https://p5js.org/reference/#/p5/dist). When those distances are used as the diameter for two circles centered on the canvas, we can see that they are exactly the same:

{% include p5-editor.html id="BM0IF01HH" %}

Similarly, we can use the formula that calculates the polar angle of a point to get the angle between two points:

<div class="scaled-images s75">
  <img src = "{{ site.baseurl }}/assets/tutorials/trigonometry_03.jpg"/>
</div>

Or, the angle between a point and itself in the future. If a moving point at $$(x, y)$$ has velocity $$(v_x and v_y)$$, its position in the near future will be $$(x + v_x, y + v_y)$$. We can calculate the angle between the point now and the point in the future to get its heading angle:

<div class="scaled-images s75">
  <img src = "{{ site.baseurl }}/assets/tutorials/trigonometry_04.jpg"/>
</div>

We can use the heading angle of a moving object to rotate its shape and emphasize its direction of motion:

{% include p5-editor.html id="McuKrbsvl" %}


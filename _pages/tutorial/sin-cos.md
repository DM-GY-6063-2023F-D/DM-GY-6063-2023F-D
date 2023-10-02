---
title: Sine and Cosine
---

<h2 class="week-title">{{ page.title }}</h2>

In the [previous tutorial]({{ site.baseurl }}/tutorial/cycles/) we saw how to define a cycle in terms of amplitude, period and offset:

{% include p5-editor.html id="lVu_eb7oP" %}

A little review:

Amplitude: how far the circle moves before going back to the beginning.

Period: how long it takes for one cycle to complete and start again (can be in seconds, but number of frames is more useful when using ```frameCount```).

Offset: starting position of the circle.

Other than the modulus operator and the triangle wave, another easy way of generating cycles is by using the [sine and cosine](https://en.wikipedia.org/wiki/Sine_and_cosine) trigonometric functions. This might not be immediately clear from the wikipedia definition: *In the context of a right triangle: for a given angle, its sine is the ratio of the length of the side that is opposite that angle to the length of its hypotenuse; and the cosine is the ratio of the length of the adjacent leg to that of the hypotenuse*.

But, what's important to us here is to remember that both the sine and cosine functions repeat every 360º or $$2\pi$$ radians.

In the case of sine, as the angle $$\theta$$ grows from $$0$$ to $$\frac{\pi}{2}$$, $$sin(\theta)$$ grows from $$0$$ to $$1$$. As $$\theta$$ grows from $$\frac{\pi}{2}$$ to $$\pi$$, $$sin(\theta)$$ decreases from $$1$$ to $$0$$. As $$\theta$$ grows from $$\pi$$ to $$\frac{3\pi}{2}$$, $$sin(\theta)$$ goes from $$0$$ to $$-1$$, and finally as $$\theta$$ grows from $$\frac{3\pi}{2}$$ to $$2\pi$$, $$sin(\theta)$$ increases from $$-1$$ to $$0$$. After that, as $$\theta$$ keeps growing, to $$3\pi$$, $$4\pi$$, $$5\pi$$, etc, the values of $$sin(\theta)$$ will keep repeating and always be between $$[-1 , 1]$$. In other words: \$$sin(\theta + 2\pi) = sin(\theta)$$

Visually:
<img style="display: block; margin: 0 auto;" src="https://www.mathsisfun.com/algebra/images/sine-graph.svg">

If we look for equations that relate the sine and cosine functions to cyclic or [harmonic](https://phys.libretexts.org/Bookshelves/Classical_Mechanics/Classical_Mechanics_(Dourmashkin)/23%3A_Simple_Harmonic_Motion/23.01%3A_Introduction_to_Periodic_Motion#Simple_Harmonic_Motion:_Quantitative) motion, we might find something like this: \$$y(t) = A \times sin\left(\frac{2\pi}{P}\times t\right)$$

where $$A$$ is the amplitude and $$P$$ is the period.

In p5js this could be rewritten as: \$$x = A\times sin\left(\frac{2\pi}{P}\times frameCount\right)$$

where $$A$$ is the amplitude, $$P$$ is the period in number of frames and frameCount is the variable that keeps growing indefinitely:

{% include p5-editor.html id="q6P1VmLpY" %}

Hmmm.... this kind of works. Since the range of ```sin()``` is $$[-1, 1]$$, our circle is oscillating between $$[-amplitude, amplitude]$$, which isn't really what we want. One easy way to fix this is to add 1 to the ```sin()``` function so we have a range that goes between $$[0, 2]$$, and then divide that by 2 to bring the range down to $$[0, 1]$$ and then, finally, multiple by the amplitude: \$$x = A\times \left(sin\left(\frac{2\pi}{P}\times frameCount\right) + 1\right) \times \frac{1}{2}$$

{% include p5-editor.html id="vXXjgxnoq" %}

Much better. And this same equation works for other parameters, like the circle radius. We just have to define an amplitude, period and offset that makes sense for radius values:

{% include p5-editor.html id="0Ihnoz1jH" %}

We can take some time to play with the parameters here and build some intuition about how they affect the motion of the circle.

Then, we can easily change the variable names and equations to make the circle oscillate vertically:

{% include p5-editor.html id="EDewPuJ1t" %}

And we can even combine harmonic motion in the x and y direction to get elliptic cycles (just have to make sure we use sine for one direction and cosine for the other):

{% include p5-editor.html id="u4OjI0_At" %}

And, if we also make the sine and cosine functions have different periods we can get some nice [Lissajous curve](https://en.wikipedia.org/wiki/Lissajous_curve) movements:

{% include p5-editor.html id="355jxvkxk" %}

Putting it all together (x, y and radius) almost gives it a 3D effect:

{% include p5-editor.html id="FOr644eN8" %}

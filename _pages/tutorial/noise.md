---
title: Noise
---

<h2 class="week-title">{{ page.title }}</h2>

Like in the [previous tutorial](../random-gaussian/), we are going to continue looking at different ways to generate and use random numbers.

Random numbers are important when we are trying to make something that is difficult to predict.

This can be for security reasons, like when random numbers are used as temporary passwords for online transactions, or for aesthetic reasons, like when we want to create a shape that has enough variation that it doesn't look programmed.

Let's start with our old friend: [```random()```](https://p5js.org/reference/#/p5/random).

Random gives us numbers following an *uniform distribution*, meaning that every number within its range has an equal probability of being selected.

We can see that in this sketch, where we draw lines whose lengths in the y-direction are selected from a uniform distribution with range $$[\frac{-height}{2}, \frac{height}{2}]$$.

{% include p5-editor.html id="yHE8K5Z3N" %}

Each number between $$\frac{-height}{2}$$ and $$\frac{height}{2}$$ has the same change of being selected, so we get a pretty "random" looking graph.

We can look at this in another way. Let's draw random whole numbers in the range $$[0, 12]$$ and count how many times each number shows up:

{% include p5-editor.html id="sTQli5TnB" %}

This is like rolling a 12-sided die many times and counting how many times each choice is rolled. As we keep clicking the mouse the sum of occurrences of each whole number between $$0$$ and $$12$$ approaches the same value.

Yet another wey to look at ```random()```: if we use it to select x and y locations for drawing ellipses, eventually we will cover our whole canvas uniformly:

{% include p5-editor.html id="7JYBbGDl6" %}


{%comment%}
{% include p5-editor.html id="BWiFcetz_" %}
{%endcomment%}

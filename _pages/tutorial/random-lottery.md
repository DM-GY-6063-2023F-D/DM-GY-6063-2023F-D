---
title: Random Lottery
week: 3
order: 3
---

<h2 class="week-title">{{ page.title }}</h2>

In this tutorial we are going to see how we can use ```random()``` to select a value from a pre-determined set of options. For example, let's say we are drawing many circles and we want half of them to be black and the other half to be white, but we don't want all the black ones in a row, and then the white ones, that's boring. We want them to be mixed and shuffled.

Let's start with a simple grid of circles. Note the use of a variable to set the circle diameter:

{% include p5-editor.html id="tnZGosI3j" %}

Now we could use ```random(0, 255)``` to pick a random grayscale value between 0 and 255 to fill each circles:

{% include p5-editor.html id="uGsJzT5oW" %}

Hmmmm.... there are two issues with this. First, each circle is getting a different random color every frame and, second, we are not drawing black and white circles. All the values between 0 and 255 are equally likely to occur!

Let's fix the first issue first. If we want the ```random()``` function to always give us the same random values every time we go through our ```draw()``` function, we can set what is called the *seed* of our random number generator. Random numbers are not really random. The computer can generate long lists of numbers, where each number has an equal probability of showing up and the order is really hard to predict. But it's still a list.

By default p5.js just picks a different start location on this list everytime we run our sketch, but we can tell the computer where to start reading the list using the [```randomSeed()```](https://p5js.org/reference/#/p5/randomSeed) function:

{% include p5-editor.html id="N5MQtE52M" %}

Much better! But our circles are still random gray and not black and white and randomly placed.

There are a few ways to achieve this, but let's start by using the ```random()``` function to give us a number betweeen 0 and 1.0. Since all the values between 0 and 1.0 are equally likely to occur, about half of the number will be less than 0.5 and the other half will be greater than 0.5.

If we image a number line and 50 random points along that line, about 25 of them will be less than 0.5 and the rest will be greater than 0.5:
<div style="width:80%;" markdown=1>
  <img style="width: 100%;" src="{{ site.baseurl }}/assets/tutorials/random-lottery-00.jpg">
</div>

Putting this in pseudo-code, our logic could be:  
```aRandomNumber = random()```  
```if aRandomNumber < 0.5: draw a white circle```  
```if aRandomNumber > 0.5: draw a black circle```

Since the two choices are mutually exclusive (they can't both happen at the same time), we can use an ```else``` statement and turn this into the following JavaScript:  
```
if(random() < 0.5) {
  fill(255);
} else {
  fill(0);
}
```

{% include p5-editor.html id="nHxhbdN7G" %}

Cool ! What if want 3 colors now, like some R, G, B circles? We could do something similar. Draw a number, if it's less than half, draw a red circle, otherwise, draw another number and repeat the process to pick between green and blue. This works, but what do we notice about the frequency of the three colors?

{% include p5-editor.html id="5XJLVOqcm" %}

Green and blue circles happen with similar frequency, but it seems like there are more red circles. Twice as many red circles, actually. In the previous code we were asking p5.js to draw red circles half of the time, and then to split the remaining half again in half, so blue and green only happen 25% of the time each.

We implemented something like this:
<div style="width:80%;" markdown=1>
  <img style="width: 100%;" src="{{ site.baseurl }}/assets/tutorials/random-lottery-01.jpg">
</div>

Well... what if we draw a random number between 0 and 1 and save it in a variable. Now we can use this number multiple times in multiple ```if()``` statements and check if it falls between certain ranges. If we want something to happen about one-third of the time, that's the same as asking if the random number is less than 0.3333, because of all the numbers between 0 and 1 one-third of them are less than 0.3333.

We're implementing something like this:
<div style="width:80%;" markdown=1>
  <img style="width: 100%;" src="{{ site.baseurl }}/assets/tutorials/random-lottery-02.jpg">
</div>

In pseudo-code this can be:  
```if aRandomNumer < 0.333: draw red```

If the number is greater than 0.3333 we can now just check if it's also less than 0.6666. Doing this after we checked that it's greater than 0.3333 guarantees that our random number is between 0.3333 and 0.6666, an interval that accounts for another third of the numbers between 0 and 1.

In pseudo-code:  
```if aRandomNumer < 0.333: draw red```  
```else if aRandomNumer < 0.666: draw green```

And if the number is not less than 0.6666 we get the other third of the numbers between 0 and 1 (all the numbers between 0.6666 and 1.0). So:  
```if aRandomNumer < 0.333: draw red```  
```else if aRandomNumer < 0.666: draw green```  
```else: draw blue```

{% include p5-editor.html id="sgrPdiBeQ" %}

Hooray.  
✨✨🎉✨✨

Doing a lottery selection like this is a bit cumbersome, but it gives us a way to precisely control how often something happens. If we want to have different events happen with different probabilities we can just change the values we check against in our if/else-if/else logic statements.

Let's say we want to use six colors: red, green, blue, cyan, pink, yellow, and we want pink one-third of the time, red one-quarter of the time and the other colors one-tenth of the time. To work with values that add up to 100% let's use pink: 35%, red: 25%, and 10% for all others.

Something like this:
<div style="width:80%;" markdown=1>
  <img style="width: 100%;" src="{{ site.baseurl }}/assets/tutorials/random-lottery-03.jpg">
</div>

Our pseudo-code could be something like:  
```aRandomNumber = random()```  
```if aRandomNumber < 0.35: draw pink```  
```else if aRandomNumber < 0.60: draw red```  
```else if aRandomNumber < 0.70: draw green```  
```else if aRandomNumber < 0.80: draw blue```  
```else if aRandomNumber < 0.90: draw cyan```  
```else: draw yellow```

The thresholds we check against are accumulating. When we are checking for red, we already know that it's greater than 0.35, and we only check if it's less than 0.6 because numbers between 0.35 and 0.60 account for 25% of all the numbers between 0.0 and 1.0.

In code, the above logic becomes:

{% include p5-editor.html id="jKQSSL9dS" %}

Can we use something similar to pick different shapes or different sizes from a set of pre-determined options ?

<div class="assignment-back-container">
  <a class="assignment-back-link" href="{{ site.baseurl }}/week/03">
    <span>Back to week 03 material</span>
  </a>
</div>

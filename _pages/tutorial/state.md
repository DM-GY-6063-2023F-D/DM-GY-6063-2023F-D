---
title: State Variables
---

<h2 class="week-title">{{ page.title }}</h2>

Once we start detecting input from the mouse and keyboard, and start building more complex animations we'll soon find the need to remember certain interactions or sequences of interactions.

Let's start with a simple case, where we want the user to change the background color using the mouse:

{% include p5-editor.html id="BWiFcetz_" %}

Every time the mouse is clicked a random color is selected for the background.

But, what if we just want to allow colors from a set of pre-selected colors that we like? One way to do that is to declare a global variable outside of both ```setup()``` and ```draw()``` to keep track of which color our background should be:

{% include p5-editor.html id="SL-BHbHi2" %}

```bgColorIndex``` is a variable that holds a number between $$0$$ and $$3$$ and keeps track of which color we should use for the background. Every time the mouse is clicked we check which color should be displayed, increment the color index and display the new color. The ```bgColorIndex``` variable cycles from $$0$$ to $$3$$ $$(0, 1, 2, 3, 0, 1, 2, 3, 0, 1, ...)$$, and the background color cycles from *mediumVioletRed* to *gold* to *darkGreen* to *darkBlue* and back to *mediumVioletRed*.

We say ```bgColorIndex``` is a global variable because it's declared outside any function, and this way, all functions in our sketch can read it and update it. This kind of variable is useful for keeping track of values that change due to time passing, or due to user interaction, while our sketch is running.

---

Let's take a look at another example, where we keep track of more than one value from the user:

{% include p5-editor.html id="hld-ujC__" %}

In this sketch we keep track of mouse events and their location in order to draw a rectangle between where the mouse was pressed and released. In order to achieve that, we create two global variables, ```mouseDownX``` and ```mouseDownY```, that store the location where the mouse was last pressed. Once the mouse is released we can use those variables to set our rectangle location and, along with ```mouseX``` and ```mouseY``` from the release, calculate the rectangle width and height.

A similar effect, but now the rectangle is drawn between two locations specified by mouse clicks:

{% include p5-editor.html id="dLt3pt3aU" %}

We still only need two variables, ```rectStartX``` and ```rectStartY```, for keeping track of the location where the mouse was clicked, but now, in addition to keeping the mouse locations, we are also using these variables to determine whether we are detecting the first or the second click needed to draw the rectangle. If one of the two variables is a $$-1$$, we are detecting the start location of the rectangle, otherwise, if ```rectStartX``` and ```rectStartY``` already have valid locations, we use ```mouseX``` and ```mouseY``` to draw the rectangle and then reset ```rectStartX``` and ```rectStartY```.

---

We can use a global state variable to define "moments" in our sketch. Let's say we want to present an intro screen before playing our animation. We can use a variable to detect the first click, or whether the animation has started and draw completely different canvases based on the situation:

{% include p5-editor.html id="CHJaUgDUZ" %}

In this case we display an intro screen and when the user clicks the mouse it starts an animation. Once the animation starts clicks have no effect. The state diagram for this situation would be something like:

![]({{ site.baseurl }}/assets/tutorials/state-00.jpg)

We can see that we only have two possible states (Intro and Animation), so we can use a boolean value (```true``` or ```false```) to keep track of the current state and pick which screen to draw.

If, instead, we want to allow the user to pause the animation once it has begun, we could implement the following state transitions:

![]({{ site.baseurl }}/assets/tutorials/state-01.jpg)

Now we have $$3$$ states and we'll have to use a number to keep track of which of the states we are in. We can use $$0: Intro$$, $$1: Animation$$, $$2: Pause$$ as our states, and in each execution of ```draw()``` we'll draw based on which state we are in, and in each execution of ```mouseClicked()``` we will update our current state:

{% include p5-editor.html id="5pvWETd-0" %}

In this sketch we achieved the effect of pausing by just not doing anything, by not calling ```drawIntro()``` or ```drawAnimation()``` we don't clear the canvas, the shape's position is not updated and nothing new is drawn to the screen.

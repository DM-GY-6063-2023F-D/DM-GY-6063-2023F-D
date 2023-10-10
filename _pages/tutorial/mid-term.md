---
title: Mid-Term Tutorial
---

<h2 class="week-title">{{ page.title }}</h2>

This is going to be a wild tutorial.

In addition to the new ```Class``` construct, we're also going to use pretty much all of the things we've learned so far:
- conditionals
- loops
- functions
- arrays
- strings
- state variables
- mouse events
- pseudo-code
- animations
- drawings

Let's get started.

---
Our project is to create an automatic, unpredictable, procedural, drawing machine.

*What?!*

Yeah! What this means is: we'll create a sketch with a few autonomous agents that move around our canvas, and then, we'll use them to draw shapes depending on their positions and some other special conditions that we have to define.

Our project will have at least two modes: in one mode we will see the agents moving, and in the other(s) we'll see the resulting drawing(s). We'll use the mouse to toggle between the modes, and the 'R' and 'S' keys to reset and save our drawings.

An initial skeleton of our sketch could have the following structure and pseudo-code:

{% include p5-editor.html id="y53VeHqwa" %}

Filling in our code, the logic to detect mouse and keyboard events and update state, could look like this:

{% include p5-editor.html id="eUnEHNWiz" %}

Now we just have to fill in the rest.

We'll start by writing some pseudo-code for our ```Agent``` class:

{% include p5-editor.html id="3yje3bbLZ" %}

Once we have the class definition and its functions, we can fill in some of the rest of the code in ```setup()``` and ```draw()``` even though none of the class is written:

{% include p5-editor.html id="zovsJ1fGz" %}

And now, finally, let's fill in some of our class, starting with the constructor and the ```drawAgent()``` function, and some pseudo-code for ```update()```:

{% include p5-editor.html id="CpcX_dT7f" %}

For our ```update()``` function we might want to try different strategies for the boundary checks, so let's write a couple of functions that we can use later:

{% include p5-editor.html id="tXjjgdTos" %}

The same is true for how we update the position of the agents. Let's have a couple of strategies that we can test later:

{% include p5-editor.html id="YIivQqhZu" %}

Hmmm.... this looks odd:
```js
let sortedByDist = agents.toSorted(this.distComp.bind(this));
```

*What's with the ```bind(this)```?*

If we look at the ```distCom()``` function definition we'll see that it uses ```this``` to order a pair of agents based on their distances to ```this```:
```js
distComp(agentA, agentB) {
  let distA = dist(this.x, this.y, agentA.x, agentA.y);
  let distB = dist(this.x, this.y, agentB.x, agentB.y);
  return distA - distB;
}
```

The problem is that when we send the ```distComp()``` function as a parameter to the ```toSorted()``` function, the ```this``` variable will have a different meaning because ```toSorted()``` is actually a method of the array class, so ```this``` is gonna refer to the ```agents``` array.

In order to make sure ```this``` keeps referring to an ```Agent``` object during sorting, we have to add ```.bind(this)``` to the function before we sent it to ```toSorted()```.

But, no worries. Once we have that working we can even re-use it during drawing. Let's add some drawing strategies to our class:

{% include p5-editor.html id="uHaz0JWfB" %}

Let's clean up our code a bit and test our functions.

We can remove the text labels since those were only there to test the state logic. Also, since we want our drawing to stay on the canvas we should move the ```background(255)``` command from ```draw()``` to the state change in ```mouseClick()```.

And we can begin by looking at ```updateNearest()``` with ```resetBoundary()```:

{% include p5-editor.html id="sVZ4ziA0F" %}

Then, ```updateByVelocity()``` with ```bounceBoundary()```:

{% include p5-editor.html id="p8Aon1YV7" %}

And ```updateRandom()``` with ```wrapBoundary()```:

{% include p5-editor.html id="JmQiFH4FF" %}

But, for all of these, only the ```AGENT_MODE``` is drawing anything. Let's create some new MODES, one for each of our drawing functions and cycle through them as we click the mouse:

{% include p5-editor.html id="jmczGnvdS" %}

And try with the other combinations of update and boundary functions:

{% include p5-editor.html id="6P4slX71w" %}

and:

{% include p5-editor.html id="BmSObJNns" %}

And, really, now the possibilities are endless. We can experiment with all possible combinations of update and boundary functions, and increase the number of agents to get more overlaps.

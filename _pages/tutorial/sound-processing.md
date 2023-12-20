---
title: Sound Processing
---

<h2 class="week-title">{{ page.title }}</h2>

NOTE:  
To use the sound library, make sure to include the [p5.sound library](https://p5js.org/reference/#/libraries/p5.sound) in your project's ```index.html``` file after the p5js file, like this:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/addons/p5.sound.js"></script>
```

---
We looked at how to use the [p5.sound](https://p5js.org/reference/#/libraries/p5.sound) library to [play pre-recorded sounds](../sound-files/) from files, now, let's look at how to use other parts of the library to manipulate recorded or live audio.


The p5.sound library, along with many other creative coding audio processing toolkits, was designed to somewhat mimic a physical audio processing setup. Objects have input and output ports that receive/send the same kind of information (digital audio samples); each module does some kind of processing or manipulation on its inputs before sending them to its outputs; and modules can easily be chained together to create more complex sound effects.

There are special objects that allow us to grab live audio from our computer's input ports (microphone, line-in), and other objects that allow us to send our processed audio to our computer's outputs (speakers, line-out).

There are also "_display_" objects that don't output any sound signal, but are used to obtain specific information about our audio signals, which we can then use to analyze our audio visually.

<div class="scaled-images left">
  <img src = "{{ site.baseurl }}/assets/tutorials/sound-processing/sound-processing-00.jpg"/>
</div>

The outputs from these objects/modules can be routed to many inputs, and some modules can receive multiple inputs:

<div class="scaled-images left">
  <img src = "{{ site.baseurl }}/assets/tutorials/sound-processing/sound-processing-01.jpg"/>
</div>

Let's start by looking at one of the simpler modules: [Amplitude](https://p5js.org/reference/#/p5.Amplitude).

This is one of the "_display_" modules that don't output audio, but instead can be used to show information about our signal.

In this case, the Amplitude module will give us an audio signal's amplitude (how loud it is), as a number between $$0$$ and $$1$$:

<div class="scaled-images left">
  <img src = "{{ site.baseurl }}/assets/tutorials/sound-processing/sound-processing-02.jpg"/>
</div>


By default, any [```p5.SoundFile```](https://p5js.org/reference/#/p5.SoundFile) object we create will send its output to the [```p5.soundOut```](https://p5js.org/reference/#/p5/soundOut) module/object, which is our final output: the signal that goes to our speaker.

And, also by default, the Amplitude module gets its input from this same [```p5.soundOut```](https://p5js.org/reference/#/p5/soundOut) object.

So, technically, instantiating these two objects like this, would be enough to have them connected properly:

```js
mSound = loadSound("./sound-file.mp3");
mAmp = new p5.Amplitude();
```

But, it's not a bad idea to practice how to make these connections ourselves. This will avoid unexpected behavior and unnecessary debugging once our audio processing pipelines start getting more complex.

We can use the following code to manually re-route the signal from our ```p5.SoundFile``` object to both the ```p5.soundOut``` object and a ```p5.Amplitude``` module:

```js
mSound.disconnect();
mSound.connect(p5.soundOut);
mSound.connect(mAmp);
```

These are the exact connections shown in the diagram above.

Our ```p5.Amplitude``` object can now be used at every iteration of our ```draw()``` function to get the sound's amplitude and display it visually:

{% include p5-editor.html id="Dvc9L6y-_" %}

---


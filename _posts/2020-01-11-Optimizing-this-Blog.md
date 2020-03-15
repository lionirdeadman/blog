---
title: Optimizing This Blog
tags: [programming, libraries]
layout: post
description: This post goes into detail about how I optimized this site to be as fast as it can be.
---

# Optimizing My Blog

- **My blog can be viewed [here](https://resynth1943.github.io/).**
- **The source code is freely available [here](https://github.com/resynth1943/resynth1943.github.io/).**
- **You can view this post on my blog [here](https://resynth1943.github.io/2020/01/11/optimizing-this-blog).**

So you might be wondering why my site is so visually basic. There's a few reasons for this, but the main one would definitely be **Content comes first**. This is the fundamental point of having a blog (or any website). If you're surrounding your content with advertisements, flashing lights, color palletes and Nyan Cats, *you're doing it wrong*. So in short, this blog is going to stay good lookin' and slim, because I want your eyes to be on the content, rather than my distracting creations.

Another thing I think I've mastered with this blog is performance. I'll go into that aspect in depth below, but here's the quote I'd like you to walk away with.

> How long do users stay on your website before clicking away? How long do users stay on a web page?
>
> Most stick around less than 15 seconds. That’s how long you have to capture someone’s attention on your website. So, if you don’t do that in less than a quarter of a minute, you’ve lost them.
> — [CrazyEgg "The 15 Second Rule: 3 Reasons Why Users Leave a Website"][15-second-rule]

I find this rule to be very important, especially as I'm seeing more and more sites adopt these "Allow Cookie" *fullscreen* banners, This really doesn't help in our modern society where things are moving so quickly. I've chosen to neglect this model and go with something slightly more minimalistic: Nothing.

Now you might think doing very little inhibits you. *It really doesn't*. It actually helps you in the long run. Why rush around getting your React app to build when you could just use Markdown and Jekyll? Some simplicity is required, after all.

Following the above points, there are a few performance optimizations I've made to this site. I'd like to share them with you today.

## Lazy-loading Images

When you're reading something on the internet that has images, you really don't need the images to load until you can see them. Web developers use something called lazy-loading for this exact purpose. When the image enters your line of sight, they are loaded. Until then, they're left empty. The speed boost this provides is dependant is dependant on how many images are in the post. Of course if there are any, it's practically *useless*.

The effects of this can be seen on a mobile with a very slow data connection. I tried to keep that in mind.

{% include youtube_video.html video_id="0eGxC5u3mPU" alt="Lazy loading images — How it looks for a mobile user" %}

### How this works

I wrote a Node script to do this for me. This means I can produce content without thinking about this, *it's all automated.*

The most important transformation this does inside the HTML is this. Here's what a normal `img` tag looks like, in all it's glory.

```html
    <img src="/assets/images/image.png" alt="..." />
```

Now here's what the Node script does to it.

```html
    <script>i_({src:'/assets/images/image.png',alt:'...',height:'...'})</script>
    <noscript>
        <img src="/assets/images/image.png" alt="..." />
    </noscript>
```

When the `i_` function is called, the HTML is changed to this.

```html
    <script>i_({src:'/assets/images/image.png',alt:'...',height:'...'})</script>
    <img data-src="/assets/images/image.png" height="..." data-lazy-loading src="{Base64 placeholder image data url}">
    <noscript>
        <img src="/assets/images/image.png" alt="..." />
    </noscript>
```

As you can see, the `script` tag calls a JavaScript function: `_i`. This function handles the lazy loading of the images, of course. Following this, the `height` attribute is also passed to this function which allows the JavaScript to set the height of the placeholder image to that specific height, so the content doesn't "jump about" when the image is loaded in. This makes for a smoother user experience, while also preserving the natural performance benefits of this technique. In short, you get the best of both worlds.

Following this, when the image has not yet been loaded in, a placeholder is used. This placeholder is a Base64 1x1 transparent image, which lets us do the above.

If you're curious, the placeholder image can be seen below.

<details>
    <summary>The placeholder image</summary>
    <code>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=</code>
</details>

Tiny, isn't it? That's the point.

## Responsive Images

In addition to the previous technique, responsive images are provided to the user via the `srcset` and `sizes` attributes. These allow the browser to fetch smaller images which match the side of the screen, using a smaller amount of data for devices with smaller screens, e.g. a mobile phone or a tablet.

This is done by another Node script.

There are a series of screen widths the images on this site are tailored for. *Currently*, those are:

- (200px → 300px)
- (400px → 500px)
- (600px → 700px)
- (700px → 800px)
- (1024px → *)

 For every image in the `/assets/images/` location, smaller variants are created. Imagine you put an image there named `cat.png`...

You would end up with these files generated by the script(s):

- `cat-2x.png` (200px → 300px)
- `cat-4x.png` (400px → 500px)
- `cat-6x.png` (600px → 700px)
- `cat-7x.png` (700px → 800px)
- `cat.png` (1024px → *)

Of course, images that have a width greater than the `max-width` of the site are scaled down, so the images are always going to be perfectly sized, in width and in download size.

## The Handling of Critical Styles

Styling your website is important. Moreover, getting those styles to the user in a swift manner is important too. That is the reason why I created *another* Node script to inline these styles into the `head` of every HTML document. This creates less network requests and a faster initial loading time.

What happens at build-time is this. In the Jekyll layout that includes the `<head>`, there's one odd `<style>` element there.

```html
<style data-transform-critical></style>
```

At build-time, that gets transformed to a `<style>` element containing the central CSS for this page. Currently, this includes *all* the CSS. If I increase the amount of CSS required for this page, I may choose to separate the criical and the non-critical styles into different files, and only inline the critical one here.

## Fonts

Fonts are very fun to play with. I found a font I very much liked, and was hoping to include it as a part of this website. The font in question is named the [Hack Nerd Font][hack-nerd-font]. It's both elegant and simplistic, a fundamental building block of a good-looking website.

The only problem was the *size* of the font(s). There were four variants being requested by the browser: Italic, Bold, Regular and BoldItalic. They were all 1MB each. 

To try to counteract this while keeping the fonts, I had experimented with [FontForge](fontforge), a popular but [seemingly abandoned][fontforge] editor of fonts. My experience with this was not a good one, so I strove to find something *better*.

Shortly after, I had discovered [subfont]. Quoting the README:

> A command line tool to statically analyse your page in order to generate the most optimal web font subsets, then inject them into your page.

Minimizing the size of the fonts turned out to be as easy as this:

```sh
$ subfont _site --recursive --in-place --dynamic --inline-fonts
```

**Why isn't everyone doing this?!**

That actually reduces the size of the fonts by a staggering 29.9MB. After my experience with it, I would urge you to [read more about it][web-fonts-performance]. I would encourage anyone creating a website to use this tool, as the reduction in size can be megnificent. I care about how fast my website loads, so this was perfect.

## Video Embeds

Onto the last one. With video embeds, I've chosen to apply a more minimalistic approach, which is using `<a>` tags which, when clicked, will load the YouTube video embed. I have written a Jekyll layout for this very purpose.

```html
{% raw %} <a href="#" onclick="y_(this,'{{ include.video_id }}?{{ include.query }}')" aria-label="YouTube Video" class="yt-vid-link">YouTube: {{ include.alt }}</a> {% endraw %}
```

When you click on the anchor tag (`<a>`), the YouTube embed iframe is appended to that part of the document, providing a lazy-loading solution for embeds. Genius! Of course, this had to stand out like an actual YouTube embed would, so I had to decorate it a bit. Here's a demo.

{% include youtube_video.html video_id="K1Xkt1E7PJY" alt="9 hours relaxing sounds of cat hoovering around Christmas tree and presents #XmasLife" %}

See? It stands out while still being speedy. Perfect!

In closing, I'd like to say the advantage of not eagerly loading the iframe is that it avoids loading a massive chunk of JavaScript / HTML. If I chose the lazy route, I might as well have not bothered optimizing at all.

## Conclusion

I'd like to end this blog post by saying that optimizing your site is actually quite *easy*. When you have the opportunity to do so, do it. As I have hopefully shown to you, the difference between an optimized and unoptimized site can be enormous, and it's definitely worth it. Don't reach for JavaScript libraries too quickly, and remember the [15 Second Rule][15-second-rule].

[fontforge]: https://github.com/fontforge/fontforge/issues/2483#issuecomment-230650946
[subfont]: https://www.npmjs.com/package/subfont
[15-second-rule]: https://www.crazyegg.com/blog/why-users-leave-a-website/
[web-fonts-performance]: https://slides.com/munter/high-performance-web-fonts-3#/
[fontforge]: https://fontforge.org/en-US/
[hack-nerd-font]: https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/Hack
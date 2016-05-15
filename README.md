naver LINE dynamic share button
================================

Naver LINE provided share button is meant to just be dropped into a web site, but isn't suitable for integration in2 a html5 web app. Here's the fix!

What's the core issue that requires solving
-------------------------------------------------

Naver LINE share button js module expects this block of code to be dropped into the `<body>`

    <span>
      <script type="text/javascript" src="//media.line.me/js/line-button.js?v=20140411" ></script>
      <script type="text/javascript">
        new media_line_me.LineButton({"pc":false,"lang":"en","type":"a"});
      </script>
    </span>


##These are the issues with using Naver LINE's stock js module:

* `<script>` blocks don't belong in the `<body>`
* `lang` is hardcoded
* can't specify an element (selector) to attach the share button to
* `URL` is hardcoded as the current page url
* The share button design is **UGLY**. Someone gift a glossy rounded corners LINE button plz

![FB glossy rounded corners 79px * 27px](https://github.com/grummerd/naver-LINE-dynamic-share-button/blob/master/fb-share-button-glossy.png)


Naver supplied API
---------------------

Naver LINE js API provides one entry point, 

    media_line_me.LineButton(option)


[Source: Naver LINE install docs](https://media.line.me/howto/en/)

Which expects to attach an `<a>` and `<img>` into the `<span>` parent of the script block. Which can't be in the `<head>`. So NAVER gives only one option, copy and pasting the entire block of code **as is** in2 the `<body>`

naver-LINE-dynamic-share-button
----------------------------------

The single entry point now accepts a selector. LINE share button is placed **after** the $selector element

    media_line_me.LineButton(option, $selector)


##Example usage


    media_line_me.LineButton( {"pc":false,"lang":gplusLang,"type":"a","text":strShareTitle,"withUrl":true, "href": strShareUrl}, $('#click-to-fb-share') );


Can pass in both a dynamic lang, text and href

## CSS styling

The naver LINE share button consists of an <img> within an <a> CSS classes are provided for both


* `.naver-line-a`
* `.naver-line-img`





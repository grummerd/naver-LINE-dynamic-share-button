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

The single entry point now longer needs any params! Content is pulled from html5 meta properties

    media_line_me.LineButton()

Meta property list

- Dynamic storage of option.text: `<meta property="og:title"         content="">`
- Dynamic storage of option.href: `<meta property="og:url"           content="">`
- Dynamic storage of option.lang: `<meta property="og:locale"           content="">`
- Dynamic storage of prev element selector `<meta name="naver-line-selector" content="" />`

##Example usage
    <head>
    <script src="jquery.js"></script>
	<script src="naver-LINE-share-button.js?v=20140411" ></script>
    <script>
    jQuery(document).ready(function() {
        $('meta[property="og\\:url"]').attr('content', 'https://www.google.com');
        $('meta[property="og\\:title"]').attr('content', 'Lets exchange LINE');
        $('meta[property="og\\:locale"]').attr('content', 'en_US');
        $('meta[name="naver-line-selector"]').attr('content', '#after-this');
        media_line_me.LineButton();
    });
    </script>
    </head>
    <body>
    <div id="after-this"></div>
    </body>

## CSS styling

The naver LINE share button consists of an <img> within an <a> CSS classes are provided for both

* `.naver-line-a`
* `.naver-line-img`

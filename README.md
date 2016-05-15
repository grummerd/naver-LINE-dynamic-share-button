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

**Naver Line button rendered 78px x 20px**

![Naver Line button 78px x 20px](http://media.line.me/img/button/en/78x20.png)

**FB glossy rounded corners 79px x 27px**

![FB glossy rounded corners 79px x 27px](https://github.com/grummerd/naver-LINE-dynamic-share-button/blob/master/fb-share-button-glossy.png)


Naver supplied API
---------------------

Naver LINE js API provides one entry point, 

    media_line_me.LineButton(option)


[Source: Naver LINE install docs](https://media.line.me/howto/en/)

Which expects to attach an `<a>` and `<img>` into the `<span>` parent of the script block. Which can't be in the `<head>`. So NAVER gives only one option, copy and pasting the entire block of code **as is** in2 the `<body>`

naver-LINE-dynamic-share-button
----------------------------------

Set some meta properties then the Naver LINE share button loads async

Meta property list

- Dynamic storage of option.text: `<meta property="og:title"         content="">`
- Dynamic storage of option.href: `<meta property="og:url"           content="">`
- Dynamic storage of option.lang: `<meta property="og:locale"           content="">`
- Dynamic storage of prev element selector `<meta name="naver-line-selector" content="" />`

##Example usage
    <!doctype html>
    <html xmlns:og="http://ogp.me/ns#">
        <head>
            <meta name="naver-line-selector" content="" />
            <meta property="og:locale"        content="en_US" />
            <meta property="og:url"           content="http://www.google.com" />
            <meta property="og:title"         content="Dynamic FB Share test page 0" />
            <script src="jquery.js"></script>
            <script>
                jQuery(document).ready(function() {
                    $('meta[property="og\\:url"]').attr('content', 'https://www.google.com');
                    $('meta[property="og\\:title"]').attr('content', 'Lets exchange LINE');
                    $('meta[property="og\\:locale"]').attr('content', 'en_US');
                    $('meta[name="naver-line-selector"]').attr('content', '#after-this');
                    (function(d) {
		                var po = d.createElement('script'); po.type = 'text/javascript'; po.async = true;
		                po.src = 'naver-LINE-share-button.js?v=20140411';
		                var s = d.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	                })(document);
                });
            </script>
        </head>
        <body>
            <div id="after-this"></div>
        </body>
    </html>

**Please note**
`naver-LINE-share-button.js` is pure `javascript`. JQuery just used for the **ready** event handler 
    jQuery(document).ready(function() {
    });

## CSS styling

The naver LINE share button consists of an <img> within an <a> CSS classes are provided for both

* `.naver-line-a`
* `.naver-line-img`

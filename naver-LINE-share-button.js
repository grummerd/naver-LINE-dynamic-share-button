(function(global){

    //namespace

    var ns = function(name){
        var namespaces = name.split('.');
        var obj = global;
        while (namespaces.length > 0) {
            var segment = namespaces.pop();
            if(typeof obj[segment] === 'undefined'){
                obj[segment] = {};
            }
            if(typeof obj[segment] !== 'object') {
                // do nothing
                return null;
            }
            obj = obj[segment];
        };
        return obj;
    };
    
    // can not remove jp.naver.line.media for old snippets
    if (!ns('media_line_me') || !ns('media.line.naver.jp')){
        return;
    }

    // util
    var $ = {
        bind: function(obj, type, fn){
            obj.addEventListener ?
                obj.addEventListener(type, fn, false) :
                obj.attachEvent('on'+type, fn);
        },
        getThisScriptElement: function() {
            // returns caller script element node if it is called in loading
            var scripts = document.getElementsByTagName('script');
            return scripts[scripts.length -1];
        },
        each: function(array, fn) {
            for ( var i = 0, l = array.length; i < l; i++ ) {
                var r = fn(i, array[i], array);
                if (r === false) {return;}
            }
        },
        attr: function(el, obj){
            for (var key in obj) {
                el.setAttribute(key, obj[key]);
            }
        },
        map: function(array, fn){
            var res = [];
            $.each(array, function(i, v, a){
                res.push(fn(i, v, a));
            });
            return res;
        },
        filter: function(array, fn){
            var res = [];
            $.each(array, function(i, v, a){
                if(fn(i, v, a)){res.push(v)};
            });
            return res;
        },
        ready: function(fn){
            $.bind(window, 'load', fn);
        },
        isSmartphone: function(){
            return navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/i);
        }
    };
    
    var lineButton = {
        constant: {
            LINE_BASE_URL: '//line.me/R/msg/text/',
            IMG_BASE_URL: '//media.line.me/img/button/',
            ALT: {'ja_JP': 'LINE\u3067\u9001\u308b',
                  'en_US': 'LINE it!',
                  'zh_CN': 'LINE it!',
                  'zh_TW': 'LINE it!'
                 },
            // width, height
            IMG_SIZE: {'ja_JP': {a:[82,20], b:[20,20], c:[30,30], d:[40,40], e:[36,60]},
                       'en_US': {a:[78,20], b:[20,20], c:[30,30], d:[40,40], e:[36,60]},
                       'zh_CN': {a:[84,20], b:[20,20], c:[30,30], d:[40,40], e:[36,60]},
                       'zh_TW': {a:[84,20], b:[20,20], c:[30,30], d:[40,40], e:[36,60]}}
        },

        insertButton: function(argOption, scriptParent, script){
            var self = this;
            var option = self.validate(argOption);
            if (!(option.pc || $.isSmartphone())){
                return;
            }
            
            var s = (script.parentNode === scriptParent) ? script : undefined;
            scriptParent.insertBefore(self.createTag(option), s);
        },

        validate: function(argOption){
            var self = this;
            var pattern = {lang: /^(ja_JP|en_US|zh_CN|zh_TW)$/,
                           type: /^(a|b|c|d|e)$/,
                           text: /^[\s\S]+$/};
            //default
            var option = {lang: 'ja_JP', type: 'a', text: null};
            if (!argOption) {
                return option;
            }
            for (var key in option) {
                if (argOption[key]
                    && typeof argOption[key] === 'string'
                    && argOption[key].match(pattern[key])){
                    option[key] = argOption[key];
                }
            }

            option.withUrl = !!argOption.withUrl;
            option.pc = !!argOption.pc;
            
            return option;
        },
        
        createTag: function(option){
            var self = this;
            var size = self.constant.IMG_SIZE[option.lang][option.type];
            
            /*
              <a href="{url}">
              <img src="{img}" alt="{alt}" height="{height}" width="{width}"/>
              </a>
            */
            var a = document.createElement('a');
            a.className = 'naver-line-a';
            $.attr(a, {href: self.createUrl(option), target:'__blank'});
            var img = document.createElement('img');
            $.attr(img,
                   {src: self.createImageUrl(option),
                    width: size[0],
                    height: size[1],
                    alt: self.constant.ALT[option.lang]});
            
            a.appendChild(img).className = 'naver-line-img';;
            return a;
        },

        createUrl: function(option){
            var self = this;
            var text = self.text(option);
            return [self.constant.LINE_BASE_URL,
                    encodeURIComponent(text).replace(/\+/g, '%20')
                   ].join('?');
        },

        text: function(option){
            var text;
            if (option.text) {
                text = [option.text];
                if(option.withUrl && typeof(option.href)!="undefined"){
					text.push(option.href);
				} else {
                    text.push(document.location.href);
                }
            } else {
                text = [document.title, document.location.href];
            }
            return text.join('\n');
        },

        createImageUrl: function(option){
            var self = this;
            var C = self.constant;
            var size = C.IMG_SIZE[option.lang][option.type];
            return [C.IMG_BASE_URL,
                    option.lang, '/',
                    size[0], 'x', size[1], '.png'].join('');
        }
    };

    global.media_line_me.LineButton = global.jp.naver.line.media.LineButton = function(option, $selector){
    // for jQuery Mobile
    // It cannot move with document.write()
    // and it removes script tag...
    var script = $.getThisScriptElement();
    var scriptParent = script.parentNode;

    //Pull locale from og:locale. If option.lang param passed in, ignore value
    option.lang = $('meta[property="og\\:locale"]').attr('content');
    if (typeof(option.lang)=="undefined") { option.lang='en_US'; }
        
    if(scriptParent.tagName.toLowerCase() !== 'head'){
        $.ready(function(){
            lineButton.insertButton(option, scriptParent, script);
        });
    } else {
	$.ready(function(){
          $selector.after( lineButton.createTag(option) ) ;
        });
    }
  };
    
})(this);

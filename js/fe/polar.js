/*
 * Polar MediaVoice Desktop JS
 * Last Update: 2015-04-22 by Alvin Ling
 *
 * Related
 * - /css/fe/native.css (native units)
 * - /css/fe/polar.css (secondary page)
 */

/*
    IMPORTANT:  No GPT slot defintions are required on-page using the "dfp" configuration.  Polar
    performs the ad call and renders the creative.  Having a GPT definition/display on the site 
    is redundant and will result in a significant impression discrepancy.
    
    Ideal image sizes, by template (loaded in the Polar CMS in a single Image Set):
    
    - Royals Hub: 120x150
    - Standard Hub: 120x150
    
    Run the following command in your JS console and reload the page to debug:
    sessionStorage.setItem("me.polar.mediavoice.deferToDev", "1")
*/

(function(){

    var newsTemplate = '',
        homepageStyleBeautyTemplate = '',
        articleTemplate = '',
        awardHubTemplate = '',        
        royalsHubTemplate = '',      
        standardHubTemplate = '';        

    window.NATIVEADS = window.NATIVEADS || {};
    window.NATIVEADS.injectedAt = new Date().getTime();
    window.NATIVEADS.onReady = function(ads) {

        var dateFormatter = function(selector, showTime) {
            
            var dateString = $(selector).html(),
                convertedDate = new Date(dateString),
                d = convertedDate.getDate(),
                m =  convertedDate.getMonth(),
                y = convertedDate.getFullYear(),
                monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
                month = monthNames[m],
                hours = convertedDate.getHours(),
                minutes = convertedDate.getMinutes(),
                ampm = hours >= 12 ? 'pm' : 'am',
                formattedDate = '';
                
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+ minutes : minutes;
            
            formattedDate = month + ' ' + d + ', ' + y;
            
            if (showTime) {
                formattedDate += ' ' + hours + ':' + minutes + ' ' + ampm
            }
            
            $(selector).html(formattedDate);
        };

        var fluidVideo = function(selector, container) {
            var $allVideos = $(selector),
                $thisVideo,
                $fluidEl = $(container);
                
            $allVideos.each(function() {
                var $el = $(this),
                    ratio = 9/16;               
                
                // YouTube embeds are rendering with a 0.5 aspect ratio so use the 
                // default 16:9 ratio, all other embeds perform a calculation to 
                // preserve the original aspect ratio
                if (!$el.attr('src').indexOf('www.youtube.com')) {
                    ratio = $el.height() / $el.width();
                }

                $el.data('aspectRatio', ratio)
                    .removeAttr('height')
                    .removeAttr('width');
            });
        
            $(window).resize(function() {
            	// some videos display a vertical black pixel that runs the length of the video
            	// when the width is set to the full 765px
                var newWidth = $fluidEl.width() - 1;
                $allVideos.each(function() {
                    var $el = $(this);
                    $el.width(newWidth)
                        .height(newWidth * $el.data('aspectRatio'));
                });
            }).resize();
        };

        ads.setPropertyID('NA-USMAGA-11236287');
        ads.setSecondaryPageURL('/paid');

        // ad data for units that do not replace an element on the page
        var adUnits = [
            {
                label: 'Homepage News',
                pathname: '/',
                unitID: '/4236/Polar_UsMag_Ads/homepage',
                size: '2x2',
                location: '#latest-news-content > .news-item:eq(2)',
                template: newsTemplate
            },
            {
                label: 'Style News',
                pathname: '/celebrity-style',
                unitID: '/4236/Polar_UsMag_Ads/style',
                size: '2x2',
                location: '#latest-news-content > .news-item:eq(2)',
                template: newsTemplate
            },        
            {
                label: 'Style Article',
                pathname: '/celebrity-style',
                unitID: '/4236/Polar_UsMag_Ads/style/article',
                size: '2x2',
                location: '#related-stories-content #story-3',
                template: articleTemplate
            },        
            {
                label: 'Beauty News',
                pathname: '/celebrity-beauty',
                unitID: '/4236/Polar_UsMag_Ads/beauty',
                size: '2x2',
                location: '#latest-news-content > .news-item:eq(2)',
                template: newsTemplate
            },
            {
                label: 'Beauty Article',
                pathname: '/celebrity-beauty',
                unitID: '/4236/Polar_UsMag_Ads/beauty/article',
                size: '2x2',
                location: '#related-stories-content #story-3',
                template: articleTemplate
            },        
            {
                label: 'Moms News',
                pathname: '/celebrity-moms',
                unitID: '/4236/Polar_UsMag_Ads/moms',
                size: '2x2',
                location: '#latest-news-content > .news-item:eq(2)',
                template: newsTemplate
            },
            {
                label: 'Moms Article',
                pathname: '/celebrity-moms',
                unitID: '/4236/Polar_UsMag_Ads/moms/article',
                size: '2x2',
                location: '#related-stories-content #story-3',
                template: articleTemplate
            },        
            {
                label: 'Body News',
                pathname: '/celebrity-body',
                unitID: '/4236/Polar_UsMag_Ads/body',
                size: '2x2',
                location: '#latest-news-content > .news-item:eq(2)',
                template: newsTemplate
            },  
            {
                label: 'Body Article',
                pathname: '/celebrity-body',
                unitID: '/4236/Polar_UsMag_Ads/style/article',
                size: '2x2',
                location: '#related-stories-content #story-3',
                template: articleTemplate
            },        
            {
                label: 'Entertainment News',
                pathname: '/entertainment',
                unitID: '/4236/Polar_UsMag_Ads/entertainment',
                size: '2x2',
                location: '#latest-news-content > .news-item:eq(2)',
                template: newsTemplate
            },    
            {
                label: 'Entertainment Article',
                pathname: '/entertainment',
                unitID: '/4236/Polar_UsMag_Ads/entertainment/article',
                size: '2x2',
                location: '#related-stories-content #story-3',
                template: articleTemplate
            },        
            {
                label: 'Award Hub',
                pathname: '',
                unitID: '/4236/Polar_UsMag_Ads/awardhub',
                size: '2x2',
                location: '.latest-news > ul > li:eq(2)',
                template: awardHubTemplate
            },    
            {
                label: 'Royals Hub',
                pathname: '/royal-family',
                unitID: '/4236/Polar_UsMag_Ads/royalshub',
                size: '2x2',
                location: '.article-feed > a.child-article:eq(1)',
                template: standardHubTemplate
            },    
            {
                label: 'Standard Hub',
                pathname: '',
                unitID: '/4236/Polar_UsMag_Ads/standardhub',
                size: '2x2',
                location: '.main-col > ul > li:eq(2)',
                template: standardHubTemplate
            },    
        ];

        // set custom targeting to match the method used on site
        // (i.e., adtest querystring parameter becomes a kw=test
        // key value pair)
        var testParam = 'test',
            regex = new RegExp('[\\?&]' + testParam + '=([^&#]*)'),
            val = regex.exec(location.search),
            keywords = gptAds.keywords || [],
            adTargets = {},
            pathname = window.location.pathname,
            isArticle = false,
            isStandardHub = false;
        
        if (val !== null) {
            // if a test param is found in the url, use only that...
            val = decodeURIComponent(val[1].replace(/\+/g, ' '));
            
            if (!isNaN(val)) {
                adTargets = {
                    'kw': 'test' + val
                };
            }
        }
        else if (keywords.length > 0) {
            // ...otherwise, pull every keyword on the page
            
            // convert the keywords object to an array
            var targets = $.map(keywords, function(el) {
                return el;
            });
            
            // multiple values must be passed as a comma-delimited string
            // e.g., 'kw': 'foo,bar'
            adTargets = {
                'kw': targets.join(',')
            };
        }
                
        for (var i = 0, j = adUnits.length; i < j; i++) {
            
            isArticle = adUnits[i].unitID.indexOf('article') > -1;
            isRoyalsHub = adUnits[i].unitID.indexOf('royalshub') > -1;
            isStandardHub = adUnits[i].unitID.indexOf('standardhub') > -1;
                       
            // insert the ads relevant to the page and any that are not limited to
            // a specific URL (e.g., hub pages, articles)
            if (!isArticle && !isRoyalsHub && !isStandardHub && (!adUnits[i].pathname.length || pathname === adUnits[i].pathname)) {
            
	            ads.insertPreview({
	                label: adUnits[i].label,
	                unit: {
	                    'server': 'dfp',
	                    'id': adUnits[i].unitID,
	                    'size': adUnits[i].size,
	                    'targets': adTargets
	                },
	                location: adUnits[i].location,
	                infoText: '',
	                infoButtonText: '',
	                template: adUnits[i].template,
	                onRender: function($element) { 
	                    dateFormatter('.dateformatted', false);
	                },
	                onFill: function(data) { },
	                onError: function(error) { }
	            });
	            
			}
			else if (isArticle && pathname.indexOf(adUnits[i].pathname) === 0) {
    			
    	        ads.insertPreview({
	                label: adUnits[i].label,
    	            unit: {
    	                'server': 'dfp',
	                    'id': adUnits[i].unitID,
	                    'size': adUnits[i].size,
	                    'targets': adTargets
    	            },
	                location: adUnits[i].location,
    	            infoText: '',
    	            infoButtonText: '',
	                template: adUnits[i].template,
    	            onRender: function($element) { 
    	                ads.$('#related-stories-content #story-3').remove();
    	            },
    	            onFill: function(data) { },
    	            onError: function(error) { }
    	        });
    			
			}
			else if (isRoyalsHub && pathname.indexOf(adUnits[i].pathname) === 0) {

    	        ads.insertPreview({
	                label: adUnits[i].label,
    	            unit: {
    	                'server': 'dfp',
	                    'id': adUnits[i].unitID,
	                    'size': adUnits[i].size,
	                    'targets': adTargets
    	            },
	                location: adUnits[i].location,
    	            infoText: '',
    	            infoButtonText: '',
	                template: adUnits[i].template,
    	            onRender: function($element) { 
        	            var $articles = ads.$('.article-feed > .child-article');
        	            
        	            // shift the second child article below the gallery container
        	            ads.$('.article-feed > .main-gallery-container').after($articles.eq(2));
        	            
        	            // remove the last child-article
    	                $articles.last().remove();
    	            },
    	            onFill: function(data) { },
    	            onError: function(error) { }
    	        });

			}
			else if (isStandardHub) {

    	        ads.insertPreview({
	                label: adUnits[i].label,
    	            unit: {
    	                'server': 'dfp',
	                    'id': adUnits[i].unitID,
	                    'size': adUnits[i].size,
	                    'targets': adTargets
    	            },
	                location: adUnits[i].location,
    	            infoText: '',
    	            infoButtonText: '',
	                template: adUnits[i].template,
    	            onRender: function($element) { 
        	            var $articles = ads.$('.main-col .ms15-article');
        	            
        	            // shift the second child article below the gallery container
        	            ads.$('.main-col .ms15-gallery').eq(1).after($articles.eq(3));
        	            
        	            // remove the last child-article
    	                $articles.last().remove();
    	            },
    	            onFill: function(data) { },
    	            onError: function(error) { }
    	        });

			}
        }

        if (pathname === '/') {
            // The Style & Beauty module is inserted separately because we need an ad-specific onRender function only if the ad is rendered
	        ads.insertPreview({
	            label: 'Homepage StyleBeauty',
	            unit: {
	                'server': 'dfp',
	                'id': '/4236/Polar_UsMag_Ads/homepage',
	                'size': '2x3',
	                'targets': adTargets
	            },
	            location: '#beautystylenews-2',
	            infoText: '',
	            infoButtonText: '',
	            template: homepageStyleBeautyTemplate,
	            onRender: function($element) { 
	                ads.$('#beautystylenews-2').remove();
	            },
	            onFill: function(data) { },
	            onError: function(error) { }
	        });
        
		}
		
        ads.configureSecondaryPage({
            binding: {
                sponsor: {
                    link: '#mv-sponsor-link',
                    logo: '#mv-sponsor-logo',
                    name: '#mv-sponsor-name'
                },
                title: '#mv-title',
                summary: '#mv-summary',
                content: '#mv-content',
                author: '#mv-author',
                pubDate: '#mv-pub-date',
                image: {
                    href: '#mv-media',
                    caption: '#mv-media-caption',
                    credits: '#mv-media-credits'
                }
            },
            onFill: function(data) { },
            onRender: function() { 
                dateFormatter('.dateformatted', false);
                fluidVideo('#mv-content iframe, #mv-content embed', '.branded-content');    

                // remove the loading screen
                ads.$('.loading-overlay').fadeOut('slow', function() {
                    $(this).remove();
                });
            },
            onError: function(error) { },
            track: function() { }
        });

    };



    /*
    Handlebars Templates
    
    This function represents a pre-compiled Handlebars template. Pre-compiled
    templates are not pretty, but they provide a very significant performance
    boost, especially on mobile devices. For more information, see
    http://handlebarsjs.com/precompilation.html.
    */
    
    /*
    News
    
    <div class="news-item sponsored">
        <div class="info centered">
            <h4>
                <a href="{{link}}" rel="nofollow">{{title}}</a>&nbsp;<span class="link-arrow">&raquo;</span>
            </h4>
            <div class="sponsored-by">BRANDED CONTENT FOR <span class="sponsor-name">{{sponsor.name}}</span></div>
        </div>
    </div>
    */
    newsTemplate = function (Handlebars,depth0,helpers,partials,data) {
        this.compilerInfo = [4,'>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
        var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;
        
        buffer += "<div class=\"news-item sponsored\"><div class=\"info centered\"><h4><a href=\"";
        if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
        else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1)
            + "\" rel=\"nofollow\">";
        if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
        else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1)
            + "</a>&nbsp;<span class=\"link-arrow\">&raquo;</span></h4><div class=\"sponsored-by\">BRANDED CONTENT FOR <span class=\"sponsor-name\">"
            + escapeExpression(((stack1 = ((stack1 = depth0.sponsor),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
            + "</span></div></div></div>";
        return buffer;
    };
    

    /*
    Homepage Style & Beauty Module
    
    <div class="item clearfix sponsored">
        <h4>
            <a href="{{link}}" rel="nofollow">{{title}}</a>
        </h4>
        <div class="sponsored-by">BRANDED CONTENT FOR <span class="sponsor-name">{{sponsor.name}}</span></div>
    </div>
    */
    homepageStyleBeautyTemplate = function (Handlebars,depth0,helpers,partials,data) {
        this.compilerInfo = [4,'>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
        var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;
        
        buffer += "<div class=\"item clearfix sponsored\"><h4><a href=\"";
        if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
        else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1)
            + "\" rel=\"nofollow\">";
        if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
        else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1)
            + "</a></h4><div class=\"sponsored-by\">BRANDED CONTENT FOR <span class=\"sponsor-name\">"
            + escapeExpression(((stack1 = ((stack1 = depth0.sponsor),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
            + "</span></div></div>";
        return buffer;
    };
    
       
    /*
    Article Template
    
    <li class="sponsored">
        <div class="info">
            <h4>
                <a href="{{link}}" class="link-arrow clearfix" rel="nofollow">
                    {{title}}
                    <span class="link-arrow">&nbsp;</span>
                </a>
            </h4>
            <div class="sponsored-by">BRANDED CONTENT FOR <span class="sponsor-name">{{sponsor.name}}</span></div>
        </div>
        <div class="clearfix"></div>
    </li>
    */
    articleTemplate = function (Handlebars,depth0,helpers,partials,data) {
        this.compilerInfo = [4,'>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
        var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;
        
        buffer += "<li class=\"sponsored\"><div class=\"info\"><h4><a href=\"";
        if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
        else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1)
            + "\" class=\"link-arrow clearfix\" rel=\"nofollow\">";
        if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
        else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1)
            + "<span class=\"link-arrow\">&nbsp;</span></a></h4><div class=\"sponsored-by\">BRANDED CONTENT FOR <span class=\"sponsor-name\">"
            + escapeExpression(((stack1 = ((stack1 = depth0.sponsor),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
            + "</span></div></div><div class=\"clearfix\"></div></li>";
        return buffer;
    };
    
    /*
    Award Hub Template
    
    <li class="sponsored">
        <a href="{{link}}" class="link-arrow clearfix" rel="nofollow">
            <p>{{title}}</p>
        </a>
        <div class="sponsored-by">BRANDED CONTENT FOR <span class="sponsor-name">{{sponsor.name}}</span></div>
    </li>
    */
    awardHubTemplate = function (Handlebars,depth0,helpers,partials,data) {
        this.compilerInfo = [4,'>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
        var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;
        
        buffer += "<li class=\"sponsored\"><a href=\"";
        if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
        else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1)
            + "\" class=\"link-arrow clearfix\" rel=\"nofollow\"><p>";
        if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
        else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1)
            + "</p></a><div class=\"sponsored-by\">BRANDED CONTENT FOR <span class=\"sponsor-name\">"
            + escapeExpression(((stack1 = ((stack1 = depth0.sponsor),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
            + "</span></div></li>";
        return buffer;
    };
            
    /*
    Royals Hub Template
    
    <a class="sponsored child-article" href="{{link}}" rel="nofollow">
        <span class="child-article-image">
            <img src="{{image.href}}" width="120" height="150" />
        </span>
        <span class="article-copy">
            <h2>{{title}}</h2>
            <p class="article-desc">
                {{summary}}
            </p>
            <p class="more">Read More &raquo;</p>
            <div class="sponsored-wrapper">
                <span class="sponsored-by">BRANDED CONTENT FOR</span>
                <span class="sponsored-logo"><img src="{{sponsor.logo.href}}" /></span>
            </div>
        </span>
    </a>
    */
                      
    royalsHubTemplate = function (Handlebars,depth0,helpers,partials,data) {
        this.compilerInfo = [4,'>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
        var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;
        
        buffer += "<a class=\"sponsored child-article\" href=\"";
        if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
        else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1)
            + "\" rel=\"nofollow\"><span class=\"child-article-image\"><img src=\""
            + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.href)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
            + "\" width=\"120\" height=\"150\" /></span><span class=\"article-copy\"><h2>";
        if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
        else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
        buffer += escapeExpression(stack2)
            + "</h2><p class=\"article-desc\">";
        if (stack2 = helpers.summary) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
        else { stack2 = depth0.summary; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
        buffer += escapeExpression(stack2)
            + "</p><p class=\"more\">Read More &raquo;</p><div class=\"sponsored-wrapper\"><span class=\"sponsored-by\">BRANDED CONTENT FOR</span><span class=\"sponsored-logo\"><img src=\""
            + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.sponsor),stack1 == null || stack1 === false ? stack1 : stack1.logo)),stack1 == null || stack1 === false ? stack1 : stack1.href)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
            + "\" /></span></div></span></a>          ";
        return buffer;
    };
            
    /*
    Standard Hub Template
    
    <li class="ms15-article">
        <a class="sponsored vertical" href="{{link}}" rel="nofollow">
            <span class="article-image">
                <img src="{{image.href}}" width="120" height="150" />
            </span>
            <span class="article-copy">
                <h2>{{title}}</h2>
                <p class="article-desc">
                    {{summary}}
                </p>
                <p class="more">Read More</p>
                <div class="sponsored-wrapper">
                    <span class="sponsored-by">BRANDED CONTENT FOR</span>
                    <span class="sponsored-logo"><img src="{{sponsor.logo.href}}" /></span>
                </div>
            </span>
        </a>
    </li>
    */
                                      
    standardHubTemplate = function (Handlebars,depth0,helpers,partials,data) {
        this.compilerInfo = [4,'>= 1.0.0'];
        helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
        var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;
        
        buffer += "<li class=\"ms15-article\"><a class=\"sponsored vertical\" href=\"";
        if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
        else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
        buffer += escapeExpression(stack1)
            + "\" rel=\"nofollow\"><span class=\"article-image\"><img src=\""
            + escapeExpression(((stack1 = ((stack1 = depth0.image),stack1 == null || stack1 === false ? stack1 : stack1.href)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
            + "\" width=\"120\" height=\"150\" /></span><span class=\"article-copy\"><h2>";
        if (stack2 = helpers.title) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
        else { stack2 = depth0.title; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
        buffer += escapeExpression(stack2)
            + "</h2><p class=\"article-desc\">";
        if (stack2 = helpers.summary) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
        else { stack2 = depth0.summary; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
        buffer += escapeExpression(stack2)
            + "</p><p class=\"more\">Read More</p><div class=\"sponsored-wrapper\"><span class=\"sponsored-by\">BRANDED CONTENT FOR</span><span class=\"sponsored-logo\"><img src=\""
            + escapeExpression(((stack1 = ((stack1 = ((stack1 = depth0.sponsor),stack1 == null || stack1 === false ? stack1 : stack1.logo)),stack1 == null || stack1 === false ? stack1 : stack1.href)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
            + "\" /></span></div></span></a></li>";
        return buffer;
    };
              
})();

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s);
    js.id = id; js.type = "text/javascript"; js.async = true;
    js.src = "http://plugin.mediavoice.com/plugin.js";
    fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "nativeads-plugin");
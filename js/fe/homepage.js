/*
function removeHomepageSplash() {
	var overlay = document.getElementById("overlay-logo");
	overlay.style.display = 'none';
	overlay.style.visibility = 'hidden';
}
*/

$(function() {
        var part_items  = $('.partner_item');
        var p_text_link = $('.p_text_link');
        p_text_link.each(function(){
                if($(this).height() < 47){
                        var ptb_margin = ((47-$(this).height())/2)-.5;
                        $(this).css('margin-top',ptb_margin+"px");
                }
        });
});

//Support code for homepage takeover ajax call above - use to extract test get parameter
$.urlParam = function(name){
    var results = new RegExp('[\\?&;]' + name + '=([^&#]*)').exec(window.location.href);
	if(results != null)
    	return results[1] || 0;
	return 0;
}

//setTimeout(removeHomepageSplash, 3500);
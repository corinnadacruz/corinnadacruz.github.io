$(function() {

	//$('#top-stories li, #related-stories li').each(function(){
    $('.left-col-stories li').each(function(){
			var liHeight = $(this).height();
			var infoHeight = $('.info', this).height();
			var heightDiff = liHeight - infoHeight;
			var dividedSpacing = heightDiff*.5;
			$('.info', this).attr('style', 'margin-top:'+ dividedSpacing +'px;');
	});
});
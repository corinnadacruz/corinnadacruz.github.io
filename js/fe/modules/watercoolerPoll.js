(function($) {

	// define Us namespace if it doesn't already exist
	window.Us = window.Us || {};
	
	// Videos of the Day Module (Using the Module pattern here)
	Us.WatercoolerPoll = (function() {
		//properties
		var submitted = false;
		var submitType = 'radio';
		
		var submitHandler,		// fn called when the user submits
				submitSelector,		// selector for elements that submit the poll
				resultsHandler;		// fn called when the results need to be shown
		
		//elements
		var $el,
			$pollResultsWrap,
			submitted;
			
		function init() {
			$el 			 = $('#replace-poll-wrapper');
			$pollResultsWrap = $('#poll-results', $el);
			determinePollType();
			setupTypeSpecificSettings();
			addListeners();
		}
			
		function determinePollType() {
			if($el.hasClass('poll-radio')) {
				submitType = 'radio';
			} else if($el.hasClass('poll-combined')) {
				submitType = 'combined';
			}
		}
		
		function setupTypeSpecificSettings() {
			switch(submitType) {
				case 'radio':
					submitHandler = radioSubmit;
					submitSelector = '#submit';
					resultsHandler = showRadioResults;
					break;
					
				case 'combined':
					submitHandler = combinedSubmit;
					submitSelector = '.submit-button';
					resultsHandler = showCombinedResults;
					break;
			}
		}
		
		function addListeners() {
			// Using delegate to listen for clicks because content gets wiped for each poll
			
			// Submit Poll
			// note: submitSelector is set in setupTypeSpecificSettings()
			$el.delegate(submitSelector, 'click', function(evt) {

				evt.preventDefault();
				submitPoll(evt);

			});
			
			// See Results
			$el.delegate('.see-results', 'click', function(evt) {
				
				evt.preventDefault();
				resultsHandler();	
				$('.back-to-poll', $el).show();
				
			});
			
			// Back To Poll
			$el.delegate('.back-to-poll', 'click', function(evt) {
				evt.preventDefault();
				backToPoll();
			});
			
			// Next Poll
			$el.delegate('.next-poll', 'click', function(evt){
				
				// Load new poll within existing Watercooler Poll holder (.replace-poll-wrapper)
				$el.load($(this).attr('href'));
				evt.preventDefault();
				
			});
		}
		
		// Returns IDs for the radio (i.e. normal) type
		function radioSubmit(evt) {
			
			var selectedAnswer = $('input[@name=\'poll_option\']:checked', $el);
			//check that an answer has been choosen
			if (selectedAnswer.length == 0) {
				alert('Please select an answer in order to vote.');
				return false;
			}
			
			var selectedAnswerId = selectedAnswer.val();
			var pollId = $('.see-results', $el).attr('data-id');
			
			return {
				selectedAnswerId: selectedAnswerId, 
				pollId: pollId 
			};
		}
		
		// Returns IDs for the combined type
		function combinedSubmit(evt) {
			var selectedAnswerId = $(evt.target).data('value');
			if(!selectedAnswerId) {
				alert('Please select an answer in order to vote.');
				return false;
			}
			
			var pollId = $('.see-results', $el).attr('data-id');
			
			return {
				selectedAnswerId: selectedAnswerId, 
				pollId: pollId 
			};
		}
		
		function submitPoll(evt) {
			
			// if they already submitted, then pause for now
			if(submitted) {
				return false;
			}
			
			// call the submit handler and get the poll IDs
			var ids = submitHandler(evt);
			
			// probably shouldn't submit if we don't have values
			if(!ids) {
				return false;
			}
			
			submitted = true;
			
			$.ajax({
				type: "POST",
	            url: "/capture/vote/poll.htm",
	            data: { 
								poll_id: ids.pollId, 
								answer_id: ids.selectedAnswerId,
							}, 
	            success: resultsHandler,
							error: resultsHandler

			});

			$('.see-results', $el).hide();
			
		}
		
		function showRadioResults() {
			
			var pollResultsUrl = $('.see-results', $el).data('results');
			var $pollResults   = $('#poll-results', $el);
			var $pollForm      = $('#poll-form', $el);
			
			$pollResults.load(pollResultsUrl, function() {
				$pollForm.slideUp(300, function() {
					$pollResults.slideDown(200, function() {
						if (submitted == true) {
							$('.next-poll', $el).css('display', 'block');
							submitted = false;
						}
					});
				});
			
			});
			
			$('.see-results', $el).hide();
		};
		
		function showCombinedResults() {
			
			var pollResultsUrl = $('.see-results', $el).data('results');
			var $pollResults   = $('#poll-results', $el);
			var $pollForm      = $('#poll-form', $el);
			
			$pollResults.load(pollResultsUrl, function() {
				$pollForm.slideUp(300, function() {
					$pollResults.slideDown(200, function() {
						if (submitted == true) {
							$('.next-poll', $el).css('display', 'block');
							submitted = false;
						}
						$("#poll-form .options").hide();
					});
				});
			
			});
			
			$('.see-results', $el).hide();
		}
		
		function backToPoll() {
			var $pollForm    = $('#poll-form', $el);
			var $pollResults = $('#poll-results', $el);
			
			$pollResults.slideUp(300, function() {
				$pollForm.slideDown(200);
			});
			
			$('.back-to-poll', $el).hide();
			$('.see-results', $el).show();
			$("#poll-form .options").show();
		};
	
		return {
			init: init
		}
	
	})();
	
})(jQuery);

jQuery(document).ready(function($){
	
	// Calling init on the object WatercoolerPoll
	Us.WatercoolerPoll.init();
	
});
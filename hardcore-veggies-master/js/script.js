
//Create instance of Poller
var sPoll = new window.spredfast.Poller;
$("#results-table").hide();

//Call Poll function for the initial load
doPoll();

function doPoll(){

	//Run poll to get latest results
	var promise1 = sPoll.poll({ type: 'veggies', limit: 10 });
	var promise2 = sPoll.poll({  type: 'fruits',  limit: 10 });
	
	//Wait till both polls are returned 
	$.when( promise1, promise2 ).done(function(message1, message2) {
		
		//Merge both result into single array
		var fullResults = message1.concat( message2 );
		
		//Sort array in desc order
		fullResults.sort( function( a, b ) {
			var countA = a.count, countB = b.count;
			return countB - countA;
		});
		
		//Number of produce on board
		var displayCount = 5;
		
		for( var x = 0; x < displayCount; x++ ) {
			
			//Timeout function to allow for animating each row one at a time
			(function(x){
				setTimeout(function(){
					var rowNumber = "row" + x;
			
					//If this is not the first time through then replace the existing rows
					if( $( "#" + rowNumber ).length ) {
				
						$( "#" + rowNumber + " .pName").hide().text(  fullResults[x].name ).fadeIn(1000);				
						$( "#" + rowNumber + " .pCount").hide().text( Number(fullResults[x].count).toLocaleString('en') ).fadeIn(1000);
					
					//Otherwise load the rows for the first time
					} else {
			
						$("#results-table").append( '<div id = "' +rowNumber + '" class="row"> <div class="cell"><span class="pName"> ' + fullResults[x].name + '</span></div> <div class="cell"><span class="pCount">' +  Number(fullResults[x].count).toLocaleString('en') + '</span><span class="mentions">Mentions</span></div></div>' ).fadeIn(3000);	
			
					}		
			
				}, x * 1000);
				
			}(x));
			
		}
	
	}); 
	
	//Run poll every 15 seconds
	setTimeout(doPoll, 15000);
	
}; 
	








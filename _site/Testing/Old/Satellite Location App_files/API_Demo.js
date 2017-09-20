$(function(){
  $('#zipsubmitbtn').on('click', function(e){
    e.preventDefault();
    $('#ghapidata').html('<div id="loader"><img src="default.svg" alt="loading..."></div>');
   
      var Lat = $('#Lat').val();
        var Long = $('#Long').val();
         var tempY = document.getElementById("Year");
		var Year = tempY.options[tempY.selectedIndex].value;
		  var tempD = document.getElementById("Day");
		var Day = tempD.options[tempD.selectedIndex].value;
			  var tempM = document.getElementById("Month");
		var Month = tempM.options[tempM.selectedIndex].value;
          
     var repouri  = 'https://api.nasa.gov/planetary/earth/imagery?lon='+Long+'&lat='+Lat+'&date='+Year+'-'+Month+'-'+Day+'&cloud_score=True&api_key=QejLcBisOiNzFnAE9EM1h6UDCwGpLN6HN9Bvyf5t';
    var requri   = repouri
    
    
    requestJSON(requri, function(json) {
      if(json.message =='Admins have been notified') {
        $('#ghapidata').html("<h2>No value found</h2>");
      }
      
      else {
        // else we have a user and we display their info

        var date   =  json.date ;
        var url = json.url;
        var message = json.message;
		if(message='undefined')
		{
		message='No Errors';
		}

        var outhtml ='<h2> System Message:'+message+'<br>'+'input text:'+Lat+'  '+Long+' '+'  '+Year+'  '+ Day +'  ' + Month+' <br> <span class="smallname"><img src="'+url+'">'+'</a>)</span></h2>';
      

         
        
        var repositories;
        $.getJSON(repouri, function(json){
          repositories = json;   
          outputPageContent();                
        });          
        
        function outputPageContent() {
          
  
         
          $('#ghapidata').html(outhtml);
        } // end outputPageContent()
      } // end else statement
    }); // end requestJSON Ajax call
  }); // end click event handler
  
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
});
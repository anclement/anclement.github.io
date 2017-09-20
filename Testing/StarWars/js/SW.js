$(function(){
  $('#locsubmitbtn').on('click', function(e){
    e.preventDefault();
    $('#ghapidata').html('<div id="loader"><img src="default.svg" alt="loading..."></div>');
   
      var random = getRandomIntInclusive(1, 80) 
     var repouri  = 'https://swapi.co/api/people/'+random+'/?format=json';
    var requri   = repouri
 
    
    requestJSON(requri, function(json) {
      if(1 ==2) {
        $('#ghapidata').html("<h2>No value found</h2>");
      }
      
      else {
   
        var name = json.name;
    	var height= json.height;
    	var mass=json.mass;
    	var hair_color=json.hair_color;
    	var eye_color=json.eye_color;
    	var birth_year=json.birth_year;
    	var gender=json.gender;
   		var species=json.species;
    	var homeworld=json.homeworld;
    	var films=json.films;
 		var vehicles=json.vehicles
    	var url =json.url;
    

        var outhtml ='<h6>Name:'+name+'</h6> Height:'+ height + '<br>Mass:'+mass+'<br>Hair Color:'+hair_color+'<br> Eye Color:'+eye_color+
        '<br>Birthday Year: '+birth_year+'<br> Gender: '+gender+'<br>Homeworld: '+homeworld+'<br> Species:'+species+'<br> Films Appearing in:'+films+'<br>Vehicles:'+vehicles+'<br>URL:'+url;
    	
      
      
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



function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
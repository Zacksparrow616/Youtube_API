//Search Handler
$(document).ready(function(){
	var SearchField=$('#query');
	var icon=$('#search-btn');
		
//Focus handler
	$(SearchField).on('focus',function(){
		$(this).animate({
			width:'100%'
 		},400);
		$(icon).animate({
			right:'10px'
		},400);
	});	
	//Blur Event Handler
	$(SearchField).on('blur',function(){
		if(SearchField.val()=='')
		{
			$(SearchField).animate({
				width:'45%'
			},400,function(){});
			$(icon).animate({
				right:'360px'
			},400,function(){});
		}
	});
	$('#search-form').submit(function(e){
		e.preventDefault();
	});
});
function searching(){
$('#results').html('');
$('#buttons').html('');
//Get form input

q=$('#query').val();
$.get("https://www.googleapis.com/youtube/v3/search",{
	part:'snippet, id',
	q:q,
	type:'video',
	key:'AIzaSyCLqv26_XpNMetBlfRdTDtgQI-y0WuSiAY'},
	function(data){
		var nextPageToken=data.nextPageToken;
		var prevPageToken=data.prevPageToken;
		console.log(data);
		$.each(data.items,function(i,item){
			var output=getOutput(item);
			//Display Results
			$('#results').append(output);
		});  
		var buttons=getButtons(prevPageToken,nextPageToken);
		 $('#buttons').append(buttons); 
		}
	);
}

//next page function
function NextPage(){ 

var token=$('#next-button').data('token');
var q=$('#next-button').data('query');
$('#results').html('');
$('#buttons').html('');
//Get form input

q=$('#query').val();
$.get("https://www.googleapis.com/youtube/v3/search",{
	part:'snippet, id',
	q:q,
	pageToken:token,
	type:'video',
	key:'AIzaSyCLqv26_XpNMetBlfRdTDtgQI-y0WuSiAY'},
	function(data){
		var nextPageToken=data.nextPageToken;
		var prevPageToken=data.prevPageToken;
		console.log(data);
		$.each(data.items,function(i,item){
			var output=getOutput(item);
			//Display Results
			$('#results').append(output);
		});  
		var buttons=getButtons(prevPageToken,nextPageToken);
		 $('#buttons').append(buttons); 
		}
	);
}

//PrevPage function

function PrevPage(){ 

var token=$('#prev-button').data('token');
var q=$('#prev-button').data('query');
$('#results').html('');
$('#buttons').html('');
//Get form input

q=$('#query').val();
$.get("https://www.googleapis.com/youtube/v3/search",{
	part:'snippet, id',
	q:q,
	pageToken:token,
	type:'video',
	key:'AIzaSyCLqv26_XpNMetBlfRdTDtgQI-y0WuSiAY'},
	function(data){
		var nextPageToken=data.nextPageToken;
		var prevPageToken=data.prevPageToken;
		console.log(data);
		$.each(data.items,function(i,item){
			var output=getOutput(item);
			//Display Results
			$('#results').append(output);
		});  
		var buttons=getButtons(prevPageToken,nextPageToken);
		 $('#buttons').append(buttons); 
		}
	);
}


//Build Output
 function getOutput(item){
 	var videoId=item.id.videoId;
 	var title=item.snippet.title; 
  	var description=item.snippet.description; 
 	var thumb=item.snippet.thumbnails.high.url; 
 	var channelTitle=item.snippet.channelTitle; 
 	var videoDate=item.snippet.publishedAt; 

 	//Build Output String

 	var output='<li>'+
 	'<div class="list-left">'+
 	'<img src="'+thumb+'">'+
 	'</div>'+
 	'<div class="list-right">'+
 	'<h3><a data-fancybox data-type="iframe" href="https://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>'+
 	'<small>By<span class="cTitle">'+channelTitle+'</span> on'+videoDate+'</small>'+
 	'<p>'+description+'</p>'+
 	'</div>'+
 	'</li>'+
 	'<div class="clearfix"></div>'+'';
 	return output;
 }  

 //build the buttons
function getButtons(prevPageToken,nextPageToken){
	if(!prevPageToken)
		
		var btnoutput='<div class="button-container">'+
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'" onclick="NextPage();">Next Page</button></div>';
	else 
		var btnoutput='<div class="button-container">'+
		'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'" onclick="PrevPage();">Prev Page</button>'
		+'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'" onclick="NextPage();">Next Page</button></div>';
		return btnoutput;
}
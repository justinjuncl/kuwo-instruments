function getAJAX ( url, callback ) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onload = function () {
		if ( 200 <= xhr.status && xhr.status < 400 )
			callback( xhr.responseText );
	}
	xhr.send();
}

function postAJAX ( url, data, callback ) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// xhr.onload = function () {
	// 	if ( 200 <= xhr.status && xhr.status < 400 )
	// 		callback( xhr.responseText );
	// }
	if ( callback )
	    xhr.onload = callback.bind(xhr); 
	xhr.send(data);
}

function getForm () {

	getAJAX("/form", function(data) {
		document.getElementById("form-container").innerHTML = data;
	});

	title = document.getElementById('new-post-button').innerText;
	document.getElementById('new-post-button').innerText = ( title == "New Post" ) ? "Cancel" : "New Post"

	$('#form-container').collapse('toggle');
}

function postAuth () {
	var password = document.getElementById("password").value;
	postAJAX("/auth", "password=" + password);
}

function previewImg() {
	var textElement = document.getElementById('text-background');
	var imageFrameElement = document.getElementById('image-frame');
	var imagePreview = document.getElementById('image-preview');
	var imageFile    = document.getElementById('image-file').files[0];
	var reader = new FileReader();

	textElement.style.display = "none"
	imageFrameElement.style.borderStyle = "solid"

	reader.addEventListener("load", function () {
		imagePreview.src = reader.result;
	}, false);

	if (imageFile) {
		reader.readAsDataURL(imageFile);
	}
}


function postForm () {

	var inputs = document.getElementsByTagName("input");
	var elements = [].slice.call(inputs);

	var data = elements.map(function(el) {
        return encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value);
    }).join('&');

	postAJAX("/posts", data);
}


$("select").on( "change", function (event) {

	getAJAX("/posts/" + event.target.value, function(data) {
		document.getElementById("table-container").innerHTML = data;
	});

});

$(document).ready(function() {


	$(".clicky").on( 'click', function (a) {

		console.log(a)

		var url = $(this).data("href");
		console.log(url);

		getAJAX(url, function (data) {
			document.getElementById("form-container").innerHTML = data;
		});

	});

});
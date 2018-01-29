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
	xhr.onload = function () {
		if ( 200 <= xhr.status && xhr.status < 400 )
			callback( xhr.responseText );
	}
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

		loadImage(imageFile, function (img) {
			reader.readAsDataURL(img)
		}, {maxWidth: 1200, maxHeight: 1200, orientation: true})

	}
}


function postForm () {

	var inputs = document.getElementsByTagName("input");
	var elements = [].slice.call(inputs);

	var imgfileIndex = elements.indexOf(document.getElementById("image-file"))
	elements.splice(imgfileIndex, 1);

	elements.push(document.getElementById("image-preview"));

	var data = elements.map(function(el) {
		if ( el.value )
        	return encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value);
        else if ( el.src )
        	return "image" + '=' + encodeURIComponent(el.src);
    }).join('&');

	postAJAX("/posts", data, function (data) {
		window.location = "/";
	});
}

function cancel () {
	window.location = "/";
}

function postFormDelete () {

	getAJAX("/delete/" + document.getElementById("idTag").value, function (data) {
		window.location = "/";
	})

}


$("select").on( "change", function (event) {

	getAJAX("/posts/" + event.target.value, function(data) {
		document.getElementById("table-container").innerHTML = data;

		$("tbody tr").on( 'click', function (a) {

			var url = $(this).data("href");

			getAJAX(url, function (data) {
				document.getElementById("form-container").innerHTML = data;
			});

		});

	});

});
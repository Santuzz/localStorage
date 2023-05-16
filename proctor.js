
var videoElem;
var startElem;
var canvas;
var myTimer;
var bstate; // If sharing is enabled or not
var sharing;

var imageElement;
var imageElement2;
var imageElement3;
var imageElement4;
var imageElement5;
var imageElement6;
var imageElement7;
var imageElement8;

var count = 0;
var bEnabled = true;

var displayMediaOptions = {
	video: {
		cursor: "motion",
		logicalSurface: false,
	},
	audio: false
};

window.onload = function () {
	videoElem = document.getElementById("video");
	startElem = document.getElementById("start");
	canvas = document.getElementById("canvas");
	sharing = document.getElementById("sharing");

	imageElement = document.getElementById("imageElement");
	imageElement2 = document.getElementById("imageElement2");
	imageElement3 = document.getElementById("imageElement3");
	imageElement4 = document.getElementById("imageElement4");
	imageElement5 = document.getElementById("imageElement5");
	imageElement6 = document.getElementById("imageElement6");
	imageElement7 = document.getElementById("imageElement7");
	imageElement8 = document.getElementById("imageElement8");

	if (bEnabled === false) {
		sharing.style.display = "none";
	} else {
		//myTimer = setInterval(checkFrame, 5000);
		myTimer = setInterval(sendFrame, 1000);
	}

	videoElem.style.display = "none";
	canvas.style.display = "none";

	bstate = false;
	startElem.disabled = false;

	// Set event listeners for the start and stop buttons
	startElem.addEventListener("click", function (evt) {
		startCapture();
	}, false);

};

async function startCapture() {
	try {
		videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
		bstate = true;

	} catch (err) {
		console.error("Error: " + err);
	}

}

async function sendFrame() {
	bstate = true
	if (bstate === true) {

		// Array per memorizzare gli screenshot
		const screenshots = [];

		//var img = document.createElement("IMG");
		var ctx = canvas.getContext('2d');
		ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
		var dataURI = canvas.toDataURL('image/jpeg', 0.8);

		var name = 'screenshot_' + count;
		localStorage.setItem(name, dataURI);
		console.log("screenshot " + count);

		//console.log(localStorage.getItem('screenshot_' + count));

		count += 1;
		//Se ci sono 8 screenshot allora vanno inviati
		if (count > 7) {
			console.log("eccone " + count);

			imageElement.src = localStorage.getItem("screenshot_0");
			imageElement2.src = localStorage.getItem("screenshot_1");
			imageElement3.src = localStorage.getItem("screenshot_2");
			imageElement4.src = localStorage.getItem("screenshot_3");
			imageElement5.src = localStorage.getItem("screenshot_4");
			imageElement6.src = localStorage.getItem("screenshot_5");
			imageElement7.src = localStorage.getItem("screenshot_6");
			imageElement8.src = localStorage.getItem("screenshot_7");

			// Itera attraverso tutte le chiavi nel localStorage
			for (let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i);

				// Controlla se la chiave corrisponde a uno screenshot
				if (key.startsWith('screenshot_')) {
					// Recupera l'immagine associata alla chiave
					const screenshotData = localStorage.getItem(key);

					// Aggiungi l'immagine all'array degli screenshot
					screenshots.push(screenshotData);
				}
			}
			console.log("svuoto localStorage...");
			//Svuoto il local storage dagli screenshot
			//Non utilizzo localStorage.clear() perchè localStorage potrebbe essere utilizzato anche da altre applicazioni e lo spazio di archiviazione è condiviso

			//console.log("Da esserci " + localStorage.length + " cose")
			clearScreenshots();
			count = 0;

			console.log("Siamo passati a " + localStorage.length + " cose in localStorage");
			//imageElement.src = "";
			//imageElement2.src = "";
		}

	}

}


function clearScreenshots() {
	const keysToRemove = [];

	// Trova tutte le chiavi relative agli screenshot
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);

		if (key.startsWith('screenshot_')) {
			keysToRemove.push(key);
		}
	}

	// Rimuovi le chiavi relative agli screenshot
	keysToRemove.forEach(key => {
		localStorage.removeItem(key);
	});
}
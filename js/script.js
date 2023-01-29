let BoxOpened = "";
let ImgOpened = "";
let Counter = 0;
let ImgFound = 0;

let Source = "#boxcard";

let ImgSource = [
  "https://coddyjs.github.io/img/1.png",
  "https://coddyjs.github.io/img/2.png",
  "https://coddyjs.github.io/img/3.png",
  "https://coddyjs.github.io/img/4.png",
  "https://coddyjs.github.io/img/5.png",
  "https://coddyjs.github.io/img/6.png",
  "https://coddyjs.github.io/img/7.png",
  "https://coddyjs.github.io/img/8.png",
  "https://coddyjs.github.io/img/9.png",
  "https://coddyjs.github.io/img/10.png",
];

function RandomFunction(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}
	
function ShuffleImages() {
	let ImgAll = $(Source).children();
	let ImgThis = $(Source + " div:first-child");
	let ImgArr = new Array();

	for (let i = 0; i < ImgAll.length; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}
	
		ImgThis = $(Source + " div:first-child");
	
	for (let z = 0; z < ImgAll.length; z++) {
	let RandomNumber = RandomFunction(0, ImgArr.length - 1);

		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
		ImgArr.splice(RandomNumber, 1);
		ImgThis = ImgThis.next();
	}
}

function ResetGame() {
	ShuffleImages();
	$(Source + " div img").hide();
	$(Source + " div").css("visibility", "visible");
	Counter = 0;
	$("#success").remove();
	$("#counter").html("" + Counter);
	BoxOpened = "";
	ImgOpened = "";
	ImgFound = 0;
	return false;
}

function OpenCard() {
	let id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) {
		$(Source + " div").unbind("click", OpenCard);
	
		$("#" + id + " img").slideDown('fast');

		if (ImgOpened == "") {
			BoxOpened = id;
			ImgOpened = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 300);
		} else {
			CurrentOpened = $("#" + id + " img").attr("src");
			if (ImgOpened != CurrentOpened) {
				setTimeout(function() {
					$("#" + id + " img").slideUp('fast');
					$("#" + BoxOpened + " img").slideUp('fast');
					BoxOpened = "";
					ImgOpened = "";
				}, 400);
			} else {
				$("#" + id + " img").parent().css("visibility", "hidden");
				$("#" + BoxOpened + " img").parent().css("visibility", "hidden");
				ImgFound++;
				BoxOpened = "";
				ImgOpened = "";
			}
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 400);
		}
		Counter++;
		$("#counter").html("" + Counter);

		if (ImgFound == ImgSource.length) {
			$("#counter").prepend('<span id="success">Вы нашли все карты</span>');
		}
	}
}

$(function() {

	for (let y = 1; y < 3; y++) {
		$.each(ImgSource, function(i, val){
			$(Source).append("<div id=card" + y + i + "><img src = "+ val +">");
		});
	}
	$(Source + " div").click(OpenCard);
	ShuffleImages();
})
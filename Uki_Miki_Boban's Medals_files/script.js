function addMoreMedals()
{
	var t = document.getElementById("medalTable").tBodies[0];
	
	for (i = 0 ; i < 5 ; i++)
	{
		t.appendChild(t.rows[i].cloneNode(true));
	}
	
	elements = document.getElementsByName("medalId[]");
	elements[elements.length - 1].value = "";
	
	elements = document.getElementsByName("title[]");
	elements[elements.length - 1].value = "";
}

function showScreenShot(image, width, height, caption)
{
	width += 5;
	height += 5;

	var w = window.open("/scripts/screenshotViewer.php?image=" + image + "&caption=" + caption + "&width=" + width + "&height=" + height, "screenshotWindow", "width=" + width + ",height=" + height);
	w.focus();

}

function showCheat(swt)
{
	var cheat = document.getElementById("cheat");
	
	cheat.style.display = "";
	swt.style.display = "none";
}

var colors = ["#B8D430", "#3AB745", "#029990", "#3501CB",
				"#2E2C75", "#673A7E", "#CC0071", "#F80120",
				"#F35B20", "#FB9A00", "#FFCC00", "#FEF200"];
var blamed = ["The Police", "The Government", "Immigration", "Islam", "The Economy", "The Rich"];

var startAngle = 0;
var arc = Math.PI / (blamed.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

function drawRouletteWheel()
{
	var canvas = document.getElementById("canvas");
	var outsideRadius = 200;
	var textRadius = 160;
	var insideRadius = 125;

	ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,500,500);


	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;

	ctx.font = 'bold 12px Helvetica, Arial';

	for(var i = 0; i < blamed.length; i++)
	{
		var angle = startAngle + i * arc;
		ctx.fillStyle = colors[i];

		ctx.beginPath();
		ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
		ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
		ctx.stroke();
		ctx.fill();

		ctx.save();
		ctx.shadowOffsetX = -1;
		ctx.shadowOffsetY = -1;
		ctx.shadowBlur    = 0;
		ctx.shadowColor   = "rgb(0,0,0)";
		ctx.fillStyle = "white";
		ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
		250 + Math.sin(angle + arc / 2) * textRadius);
		ctx.rotate(angle + arc / 2 + Math.PI / 2);
		var text = blamed[i];
		ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
		ctx.restore();
	}

	//Arrow
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
	ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
	ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
	ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
	ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
	ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
	ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
	ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
	ctx.fill();
}

function spin()
{
	document.getElementById("bias").disabled = true;
	document.getElementById("spin").disabled = true;
	spinAngleStart = Math.random() * 10 + 30;
	spinTime = 0;
	spinTimeTotal = Math.random() * 3 + 4 * 1000;
	rotateWheel();
}

function rotateWheel()
{
	spinTime += 30;
	
	if(spinTime >= spinTimeTotal)
	{
		stopRotateWheel();
		document.getElementById("bias").disabled = false;
		document.getElementById("spin").disabled = false;
		return;
	}
	
	var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
	startAngle += (spinAngle * Math.PI / 180);
	drawRouletteWheel();
	spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel()
{
	clearTimeout(spinTimeout);
	var degrees = startAngle * 180 / Math.PI + 90;
	var arcd = arc * 180 / Math.PI;
	var index = Math.floor((360 - degrees % 360) / arcd);
	ctx.save();
	ctx.fillStyle = "white";
	ctx.font = 'bold 30px Helvetica, Arial';
	var text = blamed[index]
	ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
	ctx.restore();
}

function easeOut(t, b, c, d)
{
	var ts = (t/=d)*t;
	var tc = ts*t;
	return b+c*(tc + -3*ts + 3*t);
}

function changeValues()
{
	var bias = document.getElementById("bias").value;

	switch (parseInt(bias))
	{
		case 2:
			blamed = ["Teh Gays", "Non-Christians", "Immigrants", "Phone Hackers", "Terrorists", "Paedophiles"];
		break;

		case 3:
			blamed = ["Diana's Killers", "Sponging Foreigners", "The EU"];
		break;

		case 4:
			blamed = ["The Darkies", "The Darkies", "The Darkies", "The Darkies", "The Darkies"];
		break;
		
		case 5:
			blamed = ["The Parents"];
		break;

		default:
			blamed = ["The Police", "The Government", "Immigration", "Islam", "The Economy", "The Rich", "Facebook", "Twitter", "Blackberry"];
		break;
	}

	startAngle = 0;
	arc = Math.PI / (blamed.length / 2);
	spinTimeout = null;

	drawRouletteWheel();

	document.getElementById("bias").disabled = false;
	document.getElementById("spin").disabled = false;
}
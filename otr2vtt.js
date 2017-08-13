var EOL = "\r\n";
var vtt = "";
	vtt += "WEBVTT" + EOL;
	vtt += EOL;
	vtt += "NOTE Paragraph" + EOL;

var txt = fs.readFileSync('Transcript exported Sun, 13 Aug 2017 12-40-11 GMT.txt','utf8');
var txt = otr.split('\n');

var startTime = /^(\d{1,2}:)?(\d{1,2}):(\d{1,2})/
var endTime   = /(\d{1,2}:)?(\d{1,2}):(\d{1,2})$/

var parseTime = function(timeObject){

	var HH = ( timeObject[1] ) ? (( timeObject[1].length < 2 ) ? "0" + timeObject[1] : timeObject[1]) : "";
	var MM = timeObject[2];
	var SS = timeObject[3];
	return `${HH}${MM}:${SS}`;

}

txt
.filter((sub)=> sub.length)	// Filter out empty newlines
.map((sub)=> sub.trim())	// Trim leading and ... spaces
.map((sub)=>{

	var outputSub = "";
	var _startTime = sub.match(startTime);
	var _endTime   = sub.match(endTime);
	outputSub += parseTime(_startTime) + " --> " + parseTime(_endTime) + "\r\n";
	outputSub += sub.replace(parseTime(_startTime), '').replace(parseTime(_endTime), '').trim();
	outputSub += "\r\n";
	return outputSub;

});


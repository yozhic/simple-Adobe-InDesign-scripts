//DESCRIPTION:Changing linked Graphic Properties. Usage: Select a Frame containing Graphics and run the Script.  

#target indesign
#targetengine main

/********************************************************\
  Description .....: Changing linked Graphic Properties
  Version .........: 1.0
  C.Date / M.Date .: 12.08.2021 / 28.06.2025
  Target App ......: Adobe InDesign
  Tested on .......: 13.1.1−16.3.2 Intel Mac; 15.1.2 Win
  Inspired by .....: https://creativepro.com/script-show-options-files/
  File Encoding ...: UTF-8 no BOM
\********************************************************/

var doc;
var obj;
var objName;
var msgHelp;
var msgFoot;

var isMac = detectMac();

if (isMac[1] > 11) {
	msgFoot = "\r\r──────────\rPublic Domain 2025\r";
} else {
	msgFoot = "\r\r─────────────────────────\rPublic Domain 2025\r";
}

msgHelp = "Usage:\rSelect a Frame containing Graphics or Graphic itself and run the Script.\r\r" +
          "Note:\rThe Script does not handle Text, Tables, Groups or Vector Objects.";

if (app.documents.length == 0) msgbox(isMac[0], msgHelp, msgFoot);

doc = app.activeDocument;
if (doc.selection.length == 0) msgbox(isMac[0], msgHelp, msgFoot);

objName = doc.selection[0].constructor.name;
switch (objName)
{
	case "TextFrame":
	case "Text":
	case "TextColumn":
	case "Paragraph":
	case "Line":
	case "TextStyleRange":
	case "Word":
	case "Character":
	case "InsertionPoint":
	case "Group":
	case "GraphicLine":
	case "Table":
	case "Cell":
		msgbox(isMac[0], msgHelp, msgFoot);
		break;
	case "EPS":
	case "Image":
	case "ImportedPage":
	case "PDF":
	case "PICT":
	case "WMF":
		obj=doc.selection[0];
		break;
	case "Rectangle":
	case "Oval":
	case "Polygon":
		obj=doc.selection[0].allGraphics[0];
		if (obj == undefined) msgbox(isMac[0], msgHelp, msgFoot);
		break;
	default:
		//Debug message
		msgbox(isMac[0], "Unknown Name of Object:\r" + objName + "\r\rEdit the Script by adding a New Object Name to the appropriate condition.", msgFoot);
		break;
}

if (obj.itemLink.status != LinkStatus.NORMAL)
	msgbox(isMac[0], "The Frame refers to a Graphic that doesn't exist or is inaccessible.", msgFoot);
if ((obj.visibleBounds[0] < 0) && (Math.abs(obj.visibleBounds[0]) > doc.pasteboardPreferences.pasteboardMargins[1]))
	msgbox(isMac[0], "The top edge of the Graphic inside the Frame is outside the Pasteboard. The Script can't handle this condition.", msgFoot);

try {
	obj.place(obj.itemLink.filePath, true);
} catch (err) {
	//Debug message: uncomment if script is silent on startup
	//msgbox(isMac[0], err, msgFoot);
}

exit();

//----------------------------------------------------------
// System-specific replacement for alert()

function msgbox(b, msg, foot) {
	var msgHead = "Graphic Properties";
	if (b) { alert(msgHead + "\r" + msg + foot); }
	else { alert(msg, msgHead); }
	exit();
}

//----------------------------------------------------------
// Detect macOS version

function detectMac() {
	var a = $.os.split(" ");
	var aOS = new Array(2);
	if (a[0] == "Macintosh") { aOS[0] = true; }
	else { aOS[0] = false; }
	aOS[1] = a[2].substring(0,2);
	return aOS;
}

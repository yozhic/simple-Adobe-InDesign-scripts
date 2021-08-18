//DESCRIPTION:Changing linked Graphic Properties. Usage: Select a Frame containing Graphics and run the Script.

#target indesign
#targetengine main

/********************************************************\
  Description .....: Changing linked Graphic Properties
  Version .........: 0.4
  C.Date / M.Date .: 12.08.2021 / 18.08.2021
  Target App ......: Adobe InDesign
  Tested on .......: 16.3.2 Mac; 15.1.2 Win
  Inspired by .....: https://creativepro.com/script-show-options-files/
\********************************************************/

var myDoc;
var myObj;
var myObjName;
var myMsgHead;
var myMsgHelp;
var myMsgFoot;

myMsgHead = "Graphic Properties\n\n";
myMsgFoot = "\n\n─────────────────────────\nPublic Domain 2021\n";
myMsgHelp = myMsgHead +
            "Usage:\nSelect a Frame containing Graphics or Graphic itself and run the Script.\n\n" +
            "Note:\nThe Script does not handle Text, Tables, Groups or Vector Objects." +
            myMsgFoot;

if (app.documents.length == 0) msgbox(myMsgHelp);

myDoc = app.activeDocument;
if (myDoc.selection.length == 0) msgbox(myMsgHelp);

myObjName = myDoc.selection[0].constructor.name;
switch (myObjName)
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
    msgbox(myMsgHelp);
    break;
  case "EPS":
  case "Image":
  case "ImportedPage":
  case "PDF":
  case "PICT":
  case "WMF":
    myObj=myDoc.selection[0];
    break;
  case "Rectangle":
  case "Oval":
  case "Polygon":
    myObj=myDoc.selection[0].allGraphics[0];
    if (myObj == undefined) msgbox(myMsgHelp);
    break;
  default:
    //Debug message
    msgbox(myMsgHead + "Unknown Name of Object:\n" + myObjName + "\n\nEdit the Script by adding a New Object Name to the appropriate condition." + myMsgFoot);
    break;
}

if (myObj.itemLink.status != LinkStatus.NORMAL)
  msgbox(myMsgHead + "The Frame refers to a Graphic that doesn't exist or is inaccessible." + myMsgFoot);
if ((myObj.visibleBounds[0] < 0) && (Math.abs(myObj.visibleBounds[0]) > myDoc.pasteboardPreferences.pasteboardMargins[1]))
  msgbox(myMsgHead + "The top edge of the Graphic inside the Frame is outside the Pasteboard. The Script can't handle this condition." + myMsgFoot);

try {
  myObj.place(myObj.itemLink.filePath, true);
} catch (err) {
  //Debug message: uncomment if the script is silent on startup
  //msgbox(err);
}

exit();

function msgbox(msg) {
  alert(msg);
  exit();
}

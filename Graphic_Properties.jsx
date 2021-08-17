//DESCRIPTION:Changing linked Graphic Properties. Usage: Select a Frame containing Graphics and run script.

#target indesign
#targetengine main

/********************************************************\
  Description .....: Changing linked Graphic Properties
  Version .........: 0.3
  C.Date / M.Date .: 12.08.2021 / 17.08.2021
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
            "Usage:\nSelect a Frame containing Graphics or Graphic itself and run the script.\n\n" +
            "Note:\nThe script does not handle Text, Tables, Groups or Vector Objects." +
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
    //Debugging message
    msgbox(myMsgHead + "Unknown Name of Object:\n" + myObjName + "\n\nEdit the Script by adding a New Object Name to the appropriate condition." + myMsgFoot);
    break;
}

if (myObj.itemLink.status != LinkStatus.NORMAL)
  msgbox(myMsgHead + "The Frame refers to a Graphic that does not exist or is inaccessible." + myMsgFoot);

try {
  myObj.place(myObj.itemLink.filePath, true);
} catch (e) { }

exit();

function msgbox(msg) {
  alert(msg);
  exit();
}

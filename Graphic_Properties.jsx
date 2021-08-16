//DESCRIPTION:Changing linked Graphic Properties. Usage: Select a Frame with Graphic and run script.

#target indesign
#targetengine main

/********************************************************\
  Description .....: Changing linked Graphic Properties
  Version .........: 0.2
  C.Date / M.Date .: 12.08.2021 / 13.08.2021
  Target App ......: Adobe InDesign
  Tested on .......: 16.3.2 Mac
  Inspired by .....: https://creativepro.com/script-show-options-files/
\********************************************************/

var myDoc;
var myObj;
var myObjName;

myDoc = app.activeDocument;
if (myDoc.selection.length == 0 ) {
  msgbox("Graphic Properties\rPlease select a Frame containing Graphics before running the script.\r");
}

myObjName = myDoc.selection[0].constructor.name;
switch (myObjName)
{
  case "TextFrame" || "Text" || "Paragraph" || "Word" || "Character":
    msgbox("Graphic Properties\rThe script does not handle Text Frames or Text.\rPlease select a Frame containing Graphics.\r")
    break;
  case "Group":
    msgbox("Graphic Properties\rThe script does not handle Groups or Vector Objects.\rPlease select a Frame containing Graphics.\r");
    break;
  case "Table" || "Row" || "Column" || "Cell":
    msgbox("Graphic Properties\rThe script does not handle Tables.\rPlease select a Frame containing Graphics.\r");
    break;
  case "Image" || "PDF" || "EPS" || "ImportedPage":
    myObj=myDoc.selection[0];
    break;
  case "Rectangle" || "Oval" || "Polygon":
    myObj=myDoc.selection[0].allGraphics[0];
    break;
  default:
    //Debugging part:
    msgbox("Graphic Properties\rUnknown Name of Object:\r" + myObjName + "\r\rEdit the Script by adding a New Object Name to the appropriate condition.\r");
    break;
}

if (myObj.itemLink.status != LinkStatus.NORMAL) {
  msgbox("Graphic Properties\rThe Frame refers to a Graphic that does not exist or is inaccessible.\r");
}

try {
  myObj.place(myObj.itemLink.filePath, true);
} catch (e) { }

exit();

function msgbox(msg) {
  alert(msg);
  exit();
}

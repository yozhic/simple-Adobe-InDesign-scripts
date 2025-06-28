//DESCRIPTION:Add a Save all feature in the File Menu.  

// Installation:
// Place the current file into Scripts/Startup Scripts/
// (if the folder Startup Scripts doesn't exist, create it)

/********************************************************\
  Description .....: A fork of Mark Autret's FileCloseAll.js with minimal changes.
                     Add a Save all feature in the File Menu.
  Version .........: 1.0
  C.Date / M.Date .: 28.06.2025
  Target App ......: Adobe InDesign CS4+
  Credits .........: www.indiscripts.com
  File Encoding ...: UTF-8 no BOM
\********************************************************/

#targetengine "menuFileSaveAll"

// THE MAIN PROCESS
// -----------------------------------------------
var fcaTitle = "Save All";

var fcaHandlers = {
	'beforeDisplay' : function(ev)
		{
		ev.target.enabled = (app.documents.length>1);
		},
		
	'onInvoke' : function()
		{
		var doc;
		for( var i = app.documents.length-1 ; i>=0 ; i-- )
			{
			doc = app.documents[i];
			doc.save();
			}
		}
	};
	

// THE MENU INSTALLER
// -----------------------------------------------
var fcaMenuInstaller = fcaMenuInstaller||
(function(mnuTitle,mnuHandlers)
{
// 1. Create the script menu action
var mnuAction = app.scriptMenuActions.add(mnuTitle);

// 2. Attach the event listener
var ev;
for( ev in mnuHandlers )
	{
	mnuAction.eventListeners.add(ev,mnuHandlers[ev]);
	}

// 3. Create the menu item
var fileMenu = app.menus.item("$ID/Main").submenus.item("$ID/&File");
var refItem = fileMenu.menuItems.item("$ID/&Save");

fileMenu.menuItems.add(mnuAction,LocationOptions.after,refItem);

return true;
})(fcaTitle, fcaHandlers);

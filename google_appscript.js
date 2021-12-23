function myFunction() {

  function editSheet(file){

  var ss = SpreadsheetApp.open(file).getSheets()[0];

  ss.getRange('A14').setValue('Email:');
ss.getRange('B14').setValue('Name:');
  ss.getRange('G1').setValue(file.getName().match(/.*(?= — )/));
    ss.getRange('G2').setValue(file.getName().match(/\w[^—]*$/));
    var rowsNumber = ss.getMaxRows();
  var range = ss.getRange('A15:C'+ rowsNumber);
range.sort(2);

var range = ss.getRange('Q15:Q' + rowsNumber);
var protection = range.protect().setDescription('SAS');



// Ensure the current user is an editor before removing others. Otherwise, if the user's edit
// permission comes from a group, the script will throw an exception upon removing the group.
var me = Session.getEffectiveUser();
protection.addEditor(me);
  protection.removeEditors(protection.getEditors());
if (protection.canDomainEdit()) {
  protection.setDomainEdit(false);
}

var range = ss.getRange('O15:O' + rowsNumber);
var protection = range.protect().setDescription('SAS');


// Ensure the current user is an editor before removing others. Otherwise, if the user's edit
// permission comes from a group, the script will throw an exception upon removing the group.
var me = Session.getEffectiveUser();
protection.addEditor(me);

  protection.removeEditors(protection.getEditors());
if (protection.canDomainEdit()) {
  protection.setDomainEdit(false);
}
  var range = ss.getRange('F15:F' + rowsNumber);
var protection = range.protect().setDescription('SAS');
// Ensure the current user is an editor before removing others. Otherwise, if the user's edit
// permission comes from a group, the script will throw an exception upon removing the group.
var me = Session.getEffectiveUser();
protection.addEditor(me);

  protection.removeEditors(protection.getEditors());
if (protection.canDomainEdit()) {
  protection.setDomainEdit(false);
}
  var range = ss.getRange('I15:I' + rowsNumber);
var protection = range.protect().setDescription('SAS');
// Ensure the current user is an editor before removing others. Otherwise, if the user's edit
// permission comes from a group, the script will throw an exception upon removing the group.
var me = Session.getEffectiveUser();
protection.addEditor(me);

  protection.removeEditors(protection.getEditors());
if (protection.canDomainEdit()) {
  protection.setDomainEdit(false);
}
  var range = ss.getRange('M15:M' + rowsNumber);
var protection = range.protect().setDescription('SAS');
// Ensure the current user is an editor before removing others. Otherwise, if the user's edit
// permission comes from a group, the script will throw an exception upon removing the group.
var me = Session.getEffectiveUser();
protection.addEditor(me);

  protection.removeEditors(protection.getEditors());
if (protection.canDomainEdit()) {
  protection.setDomainEdit(false);
}
  var range = ss.getRange('K15:K' + rowsNumber);
var protection = range.protect().setDescription('SAS');
// Ensure the current user is an editor before removing others. Otherwise, if the user's edit
// permission comes from a group, the script will throw an exception upon removing the group.
var me = Session.getEffectiveUser();
protection.addEditor(me);

  protection.removeEditors(protection.getEditors());
if (protection.canDomainEdit()) {
  protection.setDomainEdit(false);
}
  var range = ss.getRange('D15:D' + rowsNumber);
var protection = range.protect().setDescription('SAS');
// Ensure the current user is an editor before removing others. Otherwise, if the user's edit
// permission comes from a group, the script will throw an exception upon removing the group.
var me = Session.getEffectiveUser();
protection.addEditor(me);

  protection.removeEditors(protection.getEditors());
if (protection.canDomainEdit()) {
  protection.setDomainEdit(false);
}
  var range = ss.getRange('W15:W' + rowsNumber);
var protection = range.protect().setDescription('SAS');
// Ensure the current user is an editor before removing others. Otherwise, if the user's edit
// permission comes from a group, the script will throw an exception upon removing the group.
var me = Session.getEffectiveUser();
protection.addEditor(me);

  protection.removeEditors(protection.getEditors());
if (protection.canDomainEdit()) {
  protection.setDomainEdit(false);
}
  var range = ss.getRange('U15:U' + rowsNumber);
var protection = range.protect().setDescription('SAS');
// Ensure the current user is an editor before removing others. Otherwise, if the user's edit
// permission comes from a group, the script will throw an exception upon removing the group.
var me = Session.getEffectiveUser();
protection.addEditor(me);

  protection.removeEditors(protection.getEditors());
if (protection.canDomainEdit()) {
  protection.setDomainEdit(false);
}
  var range = ss.getRange('S15:S' + rowsNumber);
var protection = range.protect().setDescription('SAS');
// Ensure the current user is an editor before removing others. Otherwise, if the user's edit
// permission comes from a group, the script will throw an exception upon removing the group.
var me = Session.getEffectiveUser();
protection.addEditor(me);

  protection.removeEditors(protection.getEditors());
if (protection.canDomainEdit()) {
  protection.setDomainEdit(false);
}
  var range = ss.getRange('Y15:Y' + rowsNumber);
var protection = range.protect().setDescription('SAS');
// Ensure the current user is an editor before removing others. Otherwise, if the user's edit
// permission comes from a group, the script will throw an exception upon removing the group.
var me = Session.getEffectiveUser();
protection.addEditor(me);

  protection.removeEditors(protection.getEditors());
if (protection.canDomainEdit()) {
  protection.setDomainEdit(false);
}
   var range = ss.getRange('AA15:AA' + rowsNumber);
var protection = range.protect().setDescription('SAS');
// Ensure the current user is an editor before removing others. Otherwise, if the user's edit
// permission comes from a group, the script will throw an exception upon removing the group.
var me = Session.getEffectiveUser();
protection.addEditor(me);

  protection.removeEditors(protection.getEditors());
if (protection.canDomainEdit()) {
  protection.setDomainEdit(false);
}
   var range = ss.getRange('J7:L7');
var protection = range.protect().setDescription('SAS');
// Ensure the current user is an editor before removing others. Otherwise, if the user's edit
// permission comes from a group, the script will throw an exception upon removing the group.
var me = Session.getEffectiveUser();
protection.addEditor(me);

  }


var folders = DriveApp.searchFolders('title = "Q3-7-11"');
while (folders.hasNext()) {
  var folder = folders.next();
  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    Logger.log(file.getName());
    editSheet(file);
  }
}
}

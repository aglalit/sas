function calculateRating() {
  var sourceFolder = DriveApp.getFolderById('1WlZWOC1rOS-q1j5phqY18htfzo4zkcwD');
  var destFile = DriveApp.getFileById('1aMtlgMtWGR8Qun1tWZpfzd7r2q6mWuE9QxX0J-aBKMY');

  var destSheet = SpreadsheetApp.open(destFile).getSheets()[0];
  var emailsSheet = SpreadsheetApp.open(destFile).getSheets()[1];

  var studentsDB = DriveApp.getFileById('1HVImmTpEJ0BkPJ25AmUAy02A_3NkuXbLMby4C6yU-CE');

  var studentsDBSheet = SpreadsheetApp.open(studentsDB).getSheets()[0];

  var studentsDBEmails = studentsDBSheet.getRange('B2:B300').getValues();
  var studentsDBYears = studentsDBSheet.getRange('D2:D300').getValues();

  var grades = {};

  var students = [];
  var emails;
  var names;
  var years;
  var subjects = [];

  var sourceFiles = sourceFolder.getFiles();


   var folders = sourceFolder.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if (folder.getName() !== 'Templates'
    && folder.getName() !== 'Internships'){
      var sourceFiles = folder.getFiles();
 while (sourceFiles.hasNext()) {
      var file = sourceFiles.next();
      collectGrades (file, grades, studentsDBEmails, studentsDBYears)
   }
    }
}

  createArraysForPasting(grades);
  pasteGrades(students,subjects);

   //Logger.log(grades);

 function pasteGrades(students,subjects){
   destSheet.getRange('A2:E300').clearContent();
   destSheet.getRange('G2:BY300').clearContent();
   var columnIndex = 'H';
   for (var i=0;i<students.length;i++){
     destSheet.getRange('A'+(i+2)).setValue(students[i]);
     destSheet.getRange('B'+(i+2)).setValue(grades[students[i]].name);
     destSheet.getRange('C'+(i+2)).setValue(grades[students[i]].year);
     destSheet.getRange('D'+(i+2)).setValue(grades[students[i]].numberOfCoursesTaken);
     destSheet.getRange('E'+(i+2)).setValue(grades[students[i]].numberOfCoursesNotGraded);
     destSheet.getRange('F'+(i+2)).setValue(grades[students[i]].coursesNotGraded);
     destSheet.getRange('G'+(i+2)).setValue(grades[students[i]].rating);
     for (var j=0;j<subjects.length;j++){
       if (grades[students[i]][subjects[j]] !== null){
         destSheet.getRange('A'+(i+2)).setValue(students[i]);
       }
     }
   }
   for (var k=0;k<subjects.length;k++){
     destSheet.getRange(`${columnIndex}1`).setValue(subjects[k]);
     for (var j=0;j<students.length;j++){
       if (grades[students[j]][subjects[k]] !== null && grades[students[j]][subjects[k]] !== undefined){
         destSheet.getRange(`${columnIndex}${j+2}`).setValue(grades[students[j]][subjects[k]]);
       }
     }
     if (columnIndex === "Z"){
       columnIndex = "AA"
     }
     else if (columnIndex === "AZ"){
       columnIndex = "BA"
     }
     else if (columnIndex.length == 2){
       columnIndex = columnIndex[0] + nextChar(columnIndex[1])
     }
     else {
       columnIndex = nextChar(columnIndex);
     }
   }

   SpreadsheetApp.flush();
   destSheet.sort(7, false);

   function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
    }

 }
}

function onOpen(e) {
  var menu = SpreadsheetApp.getUi().createAddonMenu(); // Or DocumentApp.
      menu.addItem('Calculate rating', 'calculateRating')
      .addToUi();

      menu.addItem('Send grades', 'sendGrades')
      .addToUi();
}

function collectGrades (file, grades, studentsDBEmails, studentsDBYears){
   var ss = SpreadsheetApp.open(file);
    var sheet = ss.getSheets()[0];
    var title = sheet.getRange('I1').getValues();

   var names = sheet.getRange('A15:A100').getValues();
   var emails = sheet.getRange('B15:B100').getValues();
   var years = sheet.getRange('C15:C100').getValues();

   var finalGrades = sheet.getRange('D15:D100').getValues();
   for (var i=0;i<emails.length;i++){
     if ( /*years[i][0] === 'MA' || */
     !studentsDBYears[studentsDBEmails.map(e => {return e[0]}).indexOf(emails[i][0])]
     /* || studentsDBYears[studentsDBEmails.map(e => {return e[0]}).indexOf(emails[i][0])][0] === 'MA' */
     || studentsDBYears[studentsDBEmails.map(e => {return e[0]}).indexOf(emails[i][0])][0] === 'MA2') continue;
     else {

     if (grades[emails[i][0]]) {
       grades[emails[i][0]][title] = (parseFloat(finalGrades[i][0]) < 0 || finalGrades[i][0] === null || finalGrades[i][0] === '') ? 0 : finalGrades[i][0];
     }
     else {
       if(emails[i][0].length > 1){
         grades[emails[i][0]] = {};
       grades[emails[i][0]][title] = (parseFloat(finalGrades[i][0]) < 0 || finalGrades[i][0] === null || finalGrades[i][0] === '') ? 0 : finalGrades[i][0];
       grades[emails[i][0]].name = names[i][0];
       grades[emails[i][0]].year = studentsDBYears[studentsDBEmails.map(e => {return e[0]}).indexOf(emails[i][0])];
       }
     }
     }
   }
 }

 function createArraysForPasting(grades,students,emails,names,years,subjects){
   for (entry in grades){
     var sumOfgrades = 0;
     grades[entry].rating = 0;
     grades[entry].numberOfCoursesTaken = 0;
     grades[entry].numberOfCoursesNotGraded = 0;
     grades[entry].coursesNotGraded = '';
     if (!students.includes(entry)) students.push(entry);
     for (subj in grades[entry]){
       if (subj !== 'name' && subj !== 'year' && subj !== 'numberOfCoursesTaken' && subj !== 'numberOfCoursesNotGraded' && subj !== 'coursesNotGraded' && subj !== 'rating') {
         sumOfgrades += grades[entry][subj];
         grades[entry].numberOfCoursesTaken++;
         if (grades[entry][subj] === null || parseInt(grades[entry][subj]) === 0 || grades[entry][subj] === '') {
           grades[entry].numberOfCoursesNotGraded++;
           grades[entry].coursesNotGraded += subj + ', ';
           Logger.log(grades[entry]);
         }

         if (!subjects.includes(subj)){
           subjects.push(subj);
         }
       }
     }
     if (grades[entry].numberOfCoursesTaken === grades[entry].numberOfCoursesNotGraded){
       grades[entry].rating = 0;
     }
     else {
       grades[entry].rating =
     sumOfgrades/(grades[entry].numberOfCoursesTaken - grades[entry].numberOfCoursesNotGraded);
     }
   }
 }

function sendGrades(){
    Logger.log(MailApp.getRemainingDailyQuota());
   var sourceFolder = DriveApp.getFolderById('1WlZWOC1rOS-q1j5phqY18htfzo4zkcwD');
  var destFile = DriveApp.getFileById('1aMtlgMtWGR8Qun1tWZpfzd7r2q6mWuE9QxX0J-aBKMY');

  var destSheet = SpreadsheetApp.open(destFile).getSheets()[0];
  var emailsSheet = SpreadsheetApp.open(destFile).getSheets()[1];

  var studentsDB = DriveApp.getFileById('1HVImmTpEJ0BkPJ25AmUAy02A_3NkuXbLMby4C6yU-CE');

  var studentsDBSheet = SpreadsheetApp.open(studentsDB).getSheets()[0];

  var studentsDBEmails = studentsDBSheet.getRange('B2:B300').getValues();
  var studentsDBYears = studentsDBSheet.getRange('D2:D300').getValues();

  var grades = {};

  var students = [];
  var emails;
  var names;
  var years;
  var subjects = [];

  var sourceFiles = sourceFolder.getFiles();


   var folders = sourceFolder.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    if (folder.getName() !== 'Templates'
    && folder.getName() !== 'Internships'
    && folder.getName() !== 'RS'){
      var sourceFiles = folder.getFiles();
 while (sourceFiles.hasNext()) {
      var file = sourceFiles.next();
      collectGrades (file, grades, studentsDBEmails, studentsDBYears)
   }
    }
}

  createArraysForPasting(grades,students,emails,names,years,subjects)
   SpreadsheetApp.flush();
   emailsSheet.getRange('A2:E300').clearContent();
   let index = 2;
   for (entry in grades){
     let emailAddress = entry;
     let name = grades[entry].name;
     let stringOfGrades = '';

     for (subj in grades[entry]){
       if (subj !== 'name' && subj !== 'year' && subj !== 'numberOfCoursesTaken' && subj !== 'numberOfCoursesNotGraded' && subj !== 'coursesNotGraded' && subj !== 'rating'
       && subj !== 'Professional and Creative Internship'
       && subj !== 'Quantitative Methods 1') {
          stringOfGrades += `${subj}: ${parseFloat(grades[entry][subj]).toFixed(2)};\n`;
       }
     }
     let emailBody = `Dear ${name},\n\nyour grades for the quarter 1 are:\n\n${stringOfGrades}\nBest regards,\nAlyona Bunkova`;
     let emailSubject = 'Grades Q1 (TEST)';

     if (parseInt(grades[entry].numberOfCoursesNotGraded) <= 1){
       MailApp.sendEmail(emailAddress, emailSubject, emailBody);
     }

     SpreadsheetApp.flush();

     emailsSheet.getRange(`A${index}`).setValue(emailAddress);
     emailsSheet.getRange(`B${index}`).setValue(name);
     emailsSheet.getRange(`D${index}`).setValue(emailBody);
     if (parseInt(grades[entry].numberOfCoursesNotGraded) <= 1){
       emailsSheet.getRange(`C${index}`).setValue('TRUE');
     }
     else {
       emailsSheet.getRange(`C${index}`).setValue('FALSE');
     }
     index++;
   }
 }

function updateSchedule(e) {
var data = {};

var ss = SpreadsheetApp.getActiveSpreadsheet();

parseTabs();

function parseTabs(){
  var sheets = ss.getSheets();
  sheets.forEach(function(sheet){
    if (sheet.getName() === 'PitB'){
      parsePitB(sheet);
    }
    else {
      data[sheet.getName()] = parseTabData(sheet);
    }
  });
}

function parseTabData(sheet){
    var week = new Map();

    var weekdaysRowNumbers = [];
    var weekdaysColumn = sheet.getRange('A:A').getValues();
    weekdaysColumn.forEach((cell, index)=>{
      if (cell[0] || index === weekdaysColumn.length - 1) weekdaysRowNumbers.push(index);
    });

    for (i=0;i<weekdaysRowNumbers.length-1;i++){
      var day = new Map();
      var dayString = sheet.getRange(`A${weekdaysRowNumbers[i]+1}`).getValue();

      var timeColumn = sheet.getRange(`C${weekdaysRowNumbers[i]+1}:C${weekdaysRowNumbers[i+1]}`).getValues();


      for (var t=0;t<timeColumn.length/3;t++){
        var time = new Map();
        var timeString = sheet.getRange(`C${weekdaysRowNumbers[i]+1+(t*3)}`).getValue();
        var classesRange = sheet.getRange(`D${weekdaysRowNumbers[i]+1+(t*3)}:Z${weekdaysRowNumbers[i]+3+(t*3)}`).getValues();

        classesRange[0].forEach(function(entry, index){
          if (entry) {
            time[`${entry}, class ID: ${index+1}`] = {
            teacher: classesRange[1][index],
            room: classesRange[2][index].toString()
          }
          }

        });
        day[timeString] = time;
      }
      day['announcement1'] = sheet.getRange(`B${weekdaysRowNumbers[i]+1}`).getValue();
      day['announcement2'] = sheet.getRange(`B${weekdaysRowNumbers[i]+2}`).getValue();
      day['divider'] = sheet.getRange(`B${weekdaysRowNumbers[i]+3}`).getValue();
      week[dayString] = day;
    }
    return week;
}

function parsePitB(sheet){
  var PitBData = {};
  var timeSlots = sheet.getRange('A2:A20').getValues().filter( i => i[0] );
  for (i=0;i<timeSlots.length;i++){
    PitBData[timeSlots[i]] = sheet.getRange(`B${i+2}:G${i+2}`).getValues();
  }
  data.PitB = PitBData;
}

var options = {
  'method' : 'post',
  'contentType': 'application/json',
  // Convert the JavaScript object to a JSON string.
  'payload' : JSON.stringify(data)
};
UrlFetchApp.fetch('https://schoolofadvancedstudies.herokuapp.com/schedule_data_0382473723', options);
}

function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu() // Or DocumentApp.
      .addItem('Update schedule', 'updateSchedule')
      .addToUi();
}

function myFunction() {
  // MA
    var sourceFolder = DriveApp.getFolderById('1JhT9lSsrWhzYwbiQXLjZwDfQ52QT58Pi');
  //
  // BA
  //var sourceFolder = DriveApp.getFolderById('1YLxWXErG6GlDnk0Im3LVW9xqc1SBI_R5');
  //
  var templateFile = DriveApp.getFileById('1lT9DRuoovJxkWpigCVpZMTMkWZPrY0i3mER2xwxIq-8');

  var templateSheet = SpreadsheetApp.open(templateFile).getSheets()[0];

  var logSheet = SpreadsheetApp.open(templateFile).getSheets()[2];

  var sourceFiles = sourceFolder.getFiles();

  while (sourceFiles.hasNext()) {
    var file = sourceFiles.next();
    createAttendanceSheets(file)
    logSheet.getRange('A1').setValue(file.getName());
  }

  function createAttendanceSheets(file){
    var ssFile = SpreadsheetApp.open(file);
    var sheets = ssFile.getSheets();
    var ss;
    for (i=0;i<sheets.length;i++){
      if (sheets[i].getName() === "Attendance (combined)" || sheets[i].getName() === "Attendance"){
        ss = sheets[i];
      }
    }
    var title = ss.getRange('I1').getValues();
    var professor = ss.getRange('I2').getValues();
    var dates = ss.getRange('E9:U9').getValues();
    var arrayStudents = ss.getRange(`A10:A${ss.getLastRow()}`).getValues();
    var filteredArrayStudents = arrayStudents.reduce(function(ar, e) {
  if (e[0]) ar.push([e[0]])
  return ar;
}, []);
    var firstEmptyRow = filteredArrayStudents.length + 10;
    var names = ss.getRange('A10:C'+(firstEmptyRow)).getValues();
    var attendance = ss.getRange('E10:J'+(firstEmptyRow)).getValues();



    var rosterLength = Math.ceil(filteredArrayStudents.length);

    templateSheet.copyTo(ssFile);

    for (i=0;i<sheets.length;i++){
      if (sheets[i].getName() === "Copy of Reporting to UTMN" || sheets[i].getName() === "Reporting to UTMN"){
        ssFile.deleteSheet(sheets[i]);
      }
    }
    templateSheet.copyTo(ssFile);

       sheets = ssFile.getSheets();
       var newSheet = sheets[sheets.length-1];
        newSheet.setName('Reporting to UTMN');

        for (i=0;i<sheets.length;i++){
      if (sheets[i].getName() === "Copy of Reporting to UTMN"){
        ssFile.deleteSheet(sheets[i]);
      }
    }

    var initialRowToPaste = 3;
    var initialColumnToCopyFrom = 'E';

    function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
    }

//    Logger.log(dates);

    for (var i=0;i<dates[0].length;i++){
      var lastRow = initialRowToPaste+rosterLength;
      var attendanceValues = ss.getRange(initialColumnToCopyFrom+"10:"+initialColumnToCopyFrom+(rosterLength+10)).getValues();

      attendanceValues = attendanceValues.map(function(el){ return el[0] ? ["-"] : ["+"]});


      newSheet.getRange("A"+(lastRow-1)+":G"+(lastRow-1)).setBorder(null, null, true, null, true, false);
      newSheet.getRange("B"+initialRowToPaste+":D"+(lastRow)).setValues(names);
      newSheet.getRange("E"+initialRowToPaste).setValues(title);
      newSheet.getRange("A"+initialRowToPaste).setValues(professor);
      newSheet.getRange("F"+initialRowToPaste).setValue(dates[0][i]);
      newSheet.getRange("G"+initialRowToPaste+":G"+(lastRow)).setValues(attendanceValues);

      newSheet.getRange("A"+initialRowToPaste+":A"+(lastRow-1)).mergeVertically();
      newSheet.getRange("E"+initialRowToPaste+":E"+(lastRow-1)).mergeVertically();
      newSheet.getRange("F"+initialRowToPaste+":F"+(lastRow-1)).mergeVertically();

      initialRowToPaste += rosterLength;
      initialColumnToCopyFrom = nextChar(initialColumnToCopyFrom);
    }

    newSheet.deleteRow(newSheet.getLastRow());


    // newSheet2.getRange('A10:C95').setValues(names);
    // newSheet2.getRange('G1').setValues(title);
    // newSheet2.getRange('G2').setValues(professor);
  }

}

function myFunction() {
  // MA
   // var sourceFolder = DriveApp.getFolderById('1JhT9lSsrWhzYwbiQXLjZwDfQ52QT58Pi');
  //
  // BA
  var sourceFolder = DriveApp.getFolderById('11CiE3MA4glrcdLvaX2Iey8HJW6UMVGv6');
  //


  var folders = sourceFolder.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
    //if (folder.getId() === '1FTzGOBn6RjBpNovquSdzctZPCfEkOOZP' || folder.getId() ===  '1RmlxiZlV59o9HfZ6S87dmjJCk1_kaogS'){
      var sourceFiles = folder.getFiles();
 while (sourceFiles.hasNext()) {
      var file = sourceFiles.next();
      // createAttendanceSheets(file)
      updateFormulae(file)
   }
 // }


}


function updateFormulae(file){
  let ssFile = SpreadsheetApp.open(file);
    console.log(ssFile.getName());
    let sheets = ssFile.getSheets();


    const regex = RegExp('@');
    const bgColor = '#76d8ff';
    for (var i=0;i<sheets.length;i++){
      let sheet = sheets[i];
       let lastRow = sheet.getLastRow();
      let startRow = regex.test(sheet.getRange('B10').getValue()) ? 10 : 15;
      let isGradesSheet = startRow === 15 ? true : false;

      /*
      if (i===1){
        var protections = sheets[i].getProtections(SpreadsheetApp.ProtectionType.RANGE);
        console.log(protections)
        for (var m = 0; m < protections.length; m++) {
          var protection = protections[i];
          if (protection.canEdit()) {
            protection.remove();
          }
      }
        }*/
    // if (sheet !== undefined){





      // GRADES
      if (isGradesSheet){

        sheet.getRange('F10:AC13').setFormulas([ [ '=IF(AND($F$6 = "NO", $J$6 = "NO"), CONCAT(CONCAT(">", 7),":"), "")',
    '=IF(AND($F$6 = "NO", $J$6 = "NO"), IF(OR(NOT(ISBLANK(F$15)),NOT(ISBLANK(F$16))), COUNTIF(G15:G150,">7"), ""), "")',
    '=IF(AND($F$6 = "NO", $J$6 = "NO"), CONCAT(CONCAT(">", 7),":"), "")',
    '=IF(AND($F$6 = "NO", $J$6 = "NO"), IF(OR(NOT(ISBLANK(H$15)),NOT(ISBLANK(H$16))), COUNTIF(I15:I150,">7"), ""), "")',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT(">", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(J$15)),NOT(ISBLANK(J$16))), COUNTIF(K15:K150,">7"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT(">", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(L$15)),NOT(ISBLANK(L$16))), COUNTIF(M15:M150,">7"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT(">", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(N$15)),NOT(ISBLANK(N$16))), COUNTIF(O15:O150,">7"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT(">", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(P$15)),NOT(ISBLANK(P$16))), COUNTIF(Q15:Q150,">7"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT(">", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(R$15)),NOT(ISBLANK(R$16))), COUNTIF(S15:S150,">7"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT(">", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(T$15)),NOT(ISBLANK(T$16))), COUNTIF(U15:U150,">7"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT(">", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(V$15)),NOT(ISBLANK(V$16))), COUNTIF(W15:W150,">7"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT(">", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(X$15)),NOT(ISBLANK(X$16))), COUNTIF(Y15:Y150,">7"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT(">", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(Z$15)),NOT(ISBLANK(Z$16))), COUNTIF(AA15:AA150,">7"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT(">", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(AB$15)),NOT(ISBLANK(AB$16))), COUNTIF(AC15:AC150,">7"), ""))' ],
  [ '=IF(AND($F$6 = "NO", $J$6 = "NO"), CONCAT(CONCAT("<", 7),":"), "")',
    '=IF(AND($F$6 = "NO", $J$6 = "NO"), IF(OR(NOT(ISBLANK(F$15)),NOT(ISBLANK(F$16))), COUNTIF(G15:G150,"<7")-COUNTIF(G15:G150,"<=3.5"), ""), "")',
    '=IF(AND($F$6 = "NO", $J$6 = "NO"), CONCAT(CONCAT("<", 7),":"), "")',
    '=IF(AND($F$6 = "NO", $J$6 = "NO"), IF(OR(NOT(ISBLANK(H$15)),NOT(ISBLANK(H$16))), COUNTIF(I15:I150,"<7")-COUNTIF(I15:I150,"<=3.5"), ""), "")',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT("<", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(J$15)),NOT(ISBLANK(J$16))), COUNTIF(K15:K150,"<7")-COUNTIF(K15:K150,"<=3.5"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT("<", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(L$15)),NOT(ISBLANK(L$16))), COUNTIF(M15:M150,"<7")-COUNTIF(M15:M150,"<=3.5"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT("<", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(N$15)),NOT(ISBLANK(N$16))), COUNTIF(O15:O150,"<7")-COUNTIF(O15:O150,"<=3.5"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT("<", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(P$15)),NOT(ISBLANK(P$16))), COUNTIF(Q15:Q150,"<7")-COUNTIF(Q15:Q150,"<=3.5"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT("<", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(R$15)),NOT(ISBLANK(R$16))), COUNTIF(S15:S150,"<7")-COUNTIF(S15:S150,"<=3.5"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT("<", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(T$15)),NOT(ISBLANK(T$16))), COUNTIF(U15:U150,"<7")-COUNTIF(U15:U150,"<=3.5"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT("<", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(V$15)),NOT(ISBLANK(V$16))), COUNTIF(W15:W150,"<7")-COUNTIF(W15:W150,"<=3.5"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT("<", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(X$15)),NOT(ISBLANK(X$16))), COUNTIF(Y15:Y150,"<7")-COUNTIF(Y15:Y150,"<=3.5"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT("<", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(Z$15)),NOT(ISBLANK(Z$16))), COUNTIF(AA15:AA150,"<7")-COUNTIF(AA15:AA150,"<=3.5"), ""))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", CONCAT(CONCAT("<", 7),":"))',
    '=IF(OR($F$6 = "YES", $J$6 = "YES", $N$6 = "NO"),"", IF(OR(NOT(ISBLANK(AB$15)),NOT(ISBLANK(AB$16))), COUNTIF(AC15:AC150,"<7")-COUNTIF(AC15:AC150,"<=3.5"), ""))' ],
  [ '=IF($J$6 = "YES","Average:","")',
    '',
    '=IF($J$6 = "YES","Average:","")',
    '',
    '=IF($J$6 = "YES","Average","")',
    '',
    '=IF($J$6 = "YES","Average","")',
    '',
    '=IF($J$6 = "YES","Average","")',
    '',
    '=IF($J$6 = "YES","Average","")',
    '',
    '=IF($J$6 = "YES","Average","")',
    '',
    '=IF($J$6 = "YES","Average","")',
    '',
    '=IF($J$6 = "YES","Average","")',
    '',
    '=IF($J$6 = "YES","Average","")',
    '',
    '=IF($J$6 = "YES","Average","")',
    '',
    '=IF($J$6 = "YES","Average","")',
    '' ],
  [ '=IF($J$6 = "YES", IFERROR(IF(AVERAGEIF(F15:F150,">=3.50")<=10,AVERAGEIF(F15:F150,">=3.50"),AVERAGEIF(F15:F150,">=3.50")/10),""),"")',
    '',
    '=IF($J$6 = "YES", IFERROR(IF(AVERAGEIF(H15:H150,">=3.50")<=10,AVERAGEIF(H15:H150,">=3.50"),AVERAGEIF(H15:H150,">=3.50")/10),""),"")',
    '',
    '=IF($J$6 = "YES", IFERROR(IF(AVERAGEIF(J15:J150,">=3.50")<=10,AVERAGEIF(J15:J150,">=3.50"),AVERAGEIF(J15:J150,">=3.50")/10),""),"")',
    '',
    '=IF($J$6 = "YES", IFERROR(IF(AVERAGEIF(L15:L150,">=3.50")<=10,AVERAGEIF(L15:L150,">=3.50"),AVERAGEIF(L15:L150,">=3.50")/10),""),"")',
    '',
    '=IF($J$6 = "YES", IFERROR(IF(AVERAGEIF(N15:N150,">=3.50")<=10,AVERAGEIF(N15:N150,">=3.50"),AVERAGEIF(N15:N150,">=3.50")/10),""),"")',
    '',
    '=IF($J$6 = "YES", IFERROR(IF(AVERAGEIF(P15:P150,">=3.50")<=10,AVERAGEIF(P15:P150,">=3.50"),AVERAGEIF(P15:P150,">=3.50")/10),""),"")',
    '',
    '=IF($J$6 = "YES", IFERROR(IF(AVERAGEIF(R15:R150,">=3.50")<=10,AVERAGEIF(R15:R150,">=3.50"),AVERAGEIF(R15:R150,">=3.50")/10),""),"")',
    '',
    '=IF($J$6 = "YES", IFERROR(IF(AVERAGEIF(T15:T150,">=3.50")<=10,AVERAGEIF(T15:T150,">=3.50"),AVERAGEIF(T15:T150,">=3.50")/10),""),"")',
    '',
    '=IF($J$6 = "YES", IFERROR(IF(AVERAGEIF(V15:V150,">=3.50")<=10,AVERAGEIF(V15:V150,">=3.50"),AVERAGEIF(V15:V150,">=3.50")/10),""),"")',
    '',
    '=IF($J$6 = "YES", IFERROR(IF(AVERAGEIF(X15:X150,">=3.50")<=10,AVERAGEIF(X15:X150,">=3.50"),AVERAGEIF(X15:X150,">=3.50")/10),""),"")',
    '',
    '=IF($J$6 = "YES", IFERROR(IF(AVERAGEIF(Z15:Z150,">=3.50")<=10,AVERAGEIF(Z15:Z150,">=3.50"),AVERAGEIF(Z15:Z150,">=3.50")/10),""),"")',
    '',
    '=IF($J$6 = "YES", IFERROR(IF(AVERAGEIF(AB15:AB150,">=3.50")<=10,AVERAGEIF(AB15:AB150,">=3.50"),AVERAGEIF(AB15:AB150,">=3.50")/10),""),"")',
    '' ] ])


        // console.log(sheet.getRange('D15:AC15').getFormulas())

        for (let r=15;r<150;r++){
          sheet.getRange(`D${r}:AC${r}`).setFormulas([ [ `=IF(NOT(ISBLANK(B${r})), F${r}-E${r}, "")`,
    ``,
    `=IF(NOT(ISBLANK(A${r})), H${r},"")`,
    `=IF(NOT(ISBLANK(B${r})), IF($R$6 = "NO", IF(F${r}=0,"",IF(F${r}=7.5,8,ROUND(F${r}))),IF(F${r}=7.5,8,ROUND(F${r}))), "")`,
    `=IF(NOT(ISBLANK(A${r})), IF(AVERAGE((J${r}*K$9),(L${r}*M$9),(N${r}*O$9),(P${r}*Q$9),(R${r}*S$9),(T${r}*U$9),(V${r}*W$9),(X${r}*Y$9),(Z${r}*AA$9),(AB${r}*AC$9))*10>10,AVERAGE((J${r}*K$9),(L${r}*M$9),(N${r}*O$9),(P${r}*Q$9),(R${r}*S$9),(T${r}*U$9),(V${r}*W$9),(X${r}*Y$9),(Z${r}*AA$9),(AB${r}*AC$9)),AVERAGE((J${r}*K$9),(L${r}*M$9),(N${r}*O$9),(P${r}*Q$9),(R${r}*S$9),(T${r}*U$9),(V${r}*W$9),(X${r}*Y$9),(Z${r}*AA$9),(AB${r}*AC$9))*10),"")`,
    `=IF(NOT(ISBLANK(B${r})), IF($R$6 = "NO", IF(H${r}=0,"",IF(H${r}=7.5,8,ROUND(H${r}))),IF(H${r}=7.5,8,ROUND(H${r}))), "")`,
    ``,
    `=IF(NOT(ISBLANK(J${r})), IF(J${r}<=10,IF($R$6 = "NO", IF(J${r}=0,"",ROUND(J${r})),ROUND(J${r})),IF($R$6 = "NO", IF(J${r}=0,"",ROUND(J${r}/10)),ROUND(J${r}/10))), "")`,
    ``,
    `=IF(NOT(ISBLANK(L${r})), IF(L${r}<=10,IF($R$6 = "NO", IF(L${r}=0,"",ROUND(L${r})),ROUND(L${r})),IF($R$6 = "NO", IF(L${r}=0,"",ROUND(L${r}/10)),ROUND(L${r}/10))), "")`,
    ``,
    `=IF(NOT(ISBLANK(N${r})), IF(N${r}<=10,IF($R$6 = "NO", IF(N${r}=0,"",ROUND(N${r})),ROUND(N${r})),IF($R$6 = "NO", IF(N${r}=0,"",ROUND(N${r}/10)),ROUND(N${r}/10))), "")`,
    ``,
    `=IF(NOT(ISBLANK(P${r})), IF(P${r}<=10,IF($R$6 = "NO", IF(P${r}=0,"",ROUND(P${r})),ROUND(P${r})),IF($R$6 = "NO", IF(P${r}=0,"",ROUND(P${r}/10)),ROUND(P${r}/10))), "")`,
    ``,
    `=IF(NOT(ISBLANK(R${r})), IF(R${r}<=10,IF($R$6 = "NO", IF(R${r}=0,"",ROUND(R${r})),ROUND(R${r})),IF($R$6 = "NO", IF(R${r}=0,"",ROUND(R${r}/10)),ROUND(R${r}/10))), "")`,
    ``,
    `=IF(NOT(ISBLANK(T${r})), IF(T${r}<=10,IF($R$6 = "NO", IF(T${r}=0,"",ROUND(T${r})),ROUND(T${r})),IF($R$6 = "NO", IF(T${r}=0,"",ROUND(T${r}/10)),ROUND(T${r}/10))), "")`,
    ``,
    `=IF(NOT(ISBLANK(V${r})), IF(V${r}<=10,IF($R$6 = "NO", IF(V${r}=0,"",ROUND(V${r})),ROUND(V${r})),IF($R$6 = "NO", IF(V${r}=0,"",ROUND(V${r}/10)),ROUND(V${r}/10))), "")`,
    ``,
    `=IF(NOT(ISBLANK(X${r})), IF(X${r}<=10,IF($R$6 = "NO", IF(X${r}=0,"",ROUND(X${r})),ROUND(X${r})),IF($R$6 = "NO", IF(X${r}=0,"",ROUND(X${r}/10)),ROUND(X${r}/10))), "")`,
    ``,
    `=IF(NOT(ISBLANK(Z${r})), IF(Z${r}<=10,IF($R$6 = "NO", IF(Z${r}=0,"",ROUND(Z${r})),ROUND(Z${r})),IF($R$6 = "NO", IF(Z${r}=0,"",ROUND(Z${r}/10)),ROUND(Z${r}/10))), "")`,
    ``,
    `=IF(NOT(ISBLANK(AB${r})), IF(AB${r}<=10,IF($R$6 = "NO", IF(AB${r}=0,"",ROUND(AB${r})),ROUND(AB${r})),IF($R$6 = "NO", IF(AB${r}=0,"",ROUND(AB${r}/10)),ROUND(AB${r}/10))), "")` ] ])

        }

        /*

        setProtection(sheet,`A${startRow}:D`);
        setProtection(sheet,`G${startRow}:I150`);
        setProtection(sheet,`K${startRow}:K150`);
        setProtection(sheet,`M${startRow}:M150`);
        setProtection(sheet,`O${startRow}:O150`);
        setProtection(sheet,`Q${startRow}:Q150`);
        setProtection(sheet,`S${startRow}:S150`);
        setProtection(sheet,`U${startRow}:U150`);
        setProtection(sheet,`W${startRow}:W150`);
        setProtection(sheet,`Y${startRow}:Y150`);
        setProtection(sheet,`AA${startRow}:AA150`);
        setProtection(sheet,`AC${startRow}:AC150`);
        setProtection(sheet,`C6:AC14`);
        setProtection(sheet,`C1:Q4`);
        */

        var finalComment = sheet.getRange('C9:E12');
        finalComment.setValue('The final grade can be decimal');
        finalComment.setWrap(true);

        var range = sheet.getRange("D15:D150");
        var rule = SpreadsheetApp.newConditionalFormatRule()
        .whenNumberBetween(0.01, 3.5)
        .setBackground("#dd7e6b")
        .setRanges([range])
        .build();
        var rules = sheet.getConditionalFormatRules();
        rules.push(rule);
        sheet.setConditionalFormatRules(rules);


      }
      // ATTENDANCE
      else {

        for (let j=10;j<150+1;j++){
          sheet.getRange(`D${j}`).setFormulas([[`=IF(NOT(ISBLANK(B${j})),SUMPRODUCT(E${j}:AG${j}="O")+SUMPRODUCT(E${j}:AG${j}="О"),"")`]])
        }
        /*
        setProtection(sheet,`A${startRow}:D150`);
        setProtection(sheet,`C1:AH4`);
        */
      }

      let emails = sheet.getRange(`B${startRow}:B150`).getValues()
      emails.forEach(function(email, index){
        var rowToColor = sheet.getRange(`A${index+startRow}:D${index+startRow}`);
        if (dictOnline.includes(email[0])){
          rowToColor.setBackground(bgColor);
        }
        else if (email[0].length === 0){
          rowToColor.setBackground('#ffffff');
        }
        else {
          rowToColor.setBackground('#ffffff');
        }
      });


      function setProtection(ss, rangeToProtect){

        if (ss !== undefined){
          let range = ss.getRange(`${ss.getName()}!${rangeToProtect}`);
       //   range.setBackground('#ffffff');
          let protection = range.protect();
          let me = Session.getEffectiveUser();
          protection.addEditor(me);
          protection.removeEditors(protection.getEditors());
          protection.addEditors(['d.kontowski@utmn.ru','m.agliulin@utmn.ru','i.telipko@utmn.ru','i.poluyanova@utmn.ru','a.bunkova@utmn.ru'])
       }
     }
 //   }
}
}

function colorOnlineStudents(file){
  let ssFile = SpreadsheetApp.open(file);
    let sheets = ssFile.getSheets();
    const regex = RegExp('@');
    const bgColor = '#76d8ff';
    for (i=0;i<sheets.length;i++){
      let lastRow = sheets[i].getLastRow();
      let startRow = regex.test(sheets[i].getRange('B10').getValue()) ? 10 : 15;
      let emails = sheets[i].getRange(`B${startRow}:B150`).getValues()
      emails.forEach(function(email, index){
        var rowToColor = sheets[i].getRange(`A${index+startRow}:D${index+startRow}`);
        if (dictOnline.includes(email[0])){
          rowToColor.setBackground(bgColor);
        }
        else if (email[0].length === 0){
          rowToColor.setBackground('#ffffff');
        }
        else {
          rowToColor.setBackground('#ffffff');
        }
      });
    }
}


  function createAttendanceSheets(file){
    var ssFile = SpreadsheetApp.open(file);
    console.log(ssFile.getName());
    var sheets = ssFile.getSheets();
    var ss;
    var teacherName = sheets[0].getRange('I2').getValue();
    for (i=0;i<sheets.length;i++){



      if (sheets[i].getName() === "Attendance (combined)" || sheets[i].getName() === "Attendance" || sheets[i].getName().search(/att/i) > -1){
      try {

        if(teacherName.length > 1){
          sheets[i].getRange('G2').setValue(teacherName);
        }
      sheets[i].createTextFinder("SUMPRODUCT(LEN(").matchFormulaText(true).replaceAllWith("SUMPRODUCT(")
            sheets[i].createTextFinder(')>0),"")').matchFormulaText(true).replaceAllWith('="O"),"")')
      sheets[i].getRange("G1:O1").breakApart();
              sheets[i].getRange("G2:O2").breakApart();
              sheets[i].getRange("L3:O3").breakApart();
              sheets[i].getRange("L4:O4").breakApart();
              sheets[i].getRange("G1:G4").setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);
              sheets[i].getRange("M1").setValue("Legend:");
        try{
        sheets[i].getRange("C4:F4").setValue("Submit due:");
        }
        catch(e){
          console.log(e);
        console.log(ssFile.getName());
        }
                sheets[i].getRange("M2").setValue("O - absent, unexcused (or late by more than 15 mins)");
                sheets[i].getRange("M3").setValue("A - absent, legitimate conflict approved by HoE (and make up work assigned)");
                                sheets[i].getRange("M4").setValue("S - absent, sick/quarantined/unable to access the building, prior notification to the teacher and HoE (and make up plan arranged)");
        sheets[i].getRange("G4").setValue("07.11.2020, 23:59");
               sheets[i].getRange("M5").setValue("");
               sheets[i].getRange("P1:P5").clear();
               sheets[i].getRange("Q1:Q5").clear();
              sheets[i].createTextFinder("O – absent (includes students who miss more than 15 minutes of a class)").replaceAllWith("O - absent, unexcused (or late by more than 15 mins)")
            sheets[i].createTextFinder("S – notified sickness (confirmed before the class with instructor and sas_education@utmn.ru on CC)").replaceAllWith("S - absent, sick/quarantined/unable to access the building, prior notification to the teacher and HoE (and make up plan arranged)")

      sheets[i].createTextFinder("A – approved absence (either permission granted by HoE two weeks in advance)").replaceAllWith("A - absent, legitimate conflict approved by HoE (and make up work assigned)")

      sheets[i].createTextFinder("O – absent (includes students who miss more than 15 minutes of a class)").replaceAllWith("O - absent, unexcused (or late by more than 15 mins)")
      }
      catch(e){
        console.log(e);
        console.log(ssFile.getName());
      }
      }
      else {
         try {

           if(teacherName.length > 1){
          sheets[i].getRange('I2').setValue(teacherName);
        }
           sheets[i].getRange("I1:4").setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);
                     sheets[i].getRange("I4").setValue("07.11.2020, 23:59");
                     }
                      catch(e){
        console.log(e);
        console.log(ssFile.getName());
      }
      }




      }
    }

  }

  var dictOnline = [
'a.ashba.sas@gmail.com',
'a.bologov.sas@gmail.com',
'a.plokhikh.sas@gmail.com',
'a.siniutkin.sas@gmail.com',
'd.berdnikov.sas@gmail.com',
'e.sigareva.sas@gmail.com',
'i.safronov.sas@gmail.com',
'r.raemgulova.sas@gmail.com',
's.brudkova.sas@gmail.com',
'a.bugorkov.media@gmail.com',
'a.klimishin.media@gmail.com',
'd.sharashkina.media@gmail.com',
'l.tikhonchuk.media@gmail.com',
'l.arutiunian.media@gmail.com',
'd.kochetov.media@gmail.com',
'a.banyukevich.sas@gmail.com',
'a.bekchentaeva.sas@gmail.com',
'a.bekmanova.sas@gmail.com',
'a.bogdanova.sas@gmail.com',
'a.boiarinova.sas@gmail.com',
'a.budahina.sas@gmail.com',
'a.chernyak.sas@gmail.com',
'a.demov.sas@gmail.com',
'a.dolgushin.sas@gmail.com',
'a.dudnichenko.sas@gmail.com',
'a.eifert.sas@gmail.com',
'a.goncharenko.sas@gmail.com',
'a.grachyova.sas@gmail.com',
'a.kleshchenok.sas@gmail.com',
'a.kozadaeva.sas@gmail.com',
'a.kravchenko.sas@gmail.com',
'a.kuznetsova.sas@gmail.com',
'a.kyosya.sas@gmail.com',
'a.malchikhina.sas@gmail.com',
'a.mysova.sas@gmail.com',
'a.nagornova.sas@gmail.com',
'a.ohmush.sas@gmail.com',
'a.ponich.sas@gmail.com',
'a.rakhmatullina.sas@gmail.com',
'a.rozmanov.sas@gmail.com',
'a.sidenko.sas@gmail.com',
'a.strekalina.sas@gmail.com',
'a.uskova.sas@gmail.com',
'a.zalyaletdinova.sas@gmail.com',
'a.zavarzina.sas@gmail.com',
'a.zhuravleva.sas@gmail.com',
'alexandr.li.sas@gmail.com',
'b.babkin.sas@gmail.com',
'ch.evseyeva.sas@gmail.com',
'd.balandin.sas@gmail.com',
'd.grin.sas@gmail.com',
'd.kakenova.sas@gmail.com',
'd.kolisnichenko.sas@gmail.com',
'd.lumpova.sas@gmail.com',
'd.makarova.sas@gmail.com',
'd.novikova.sas@gmail.com',
'd.parusimova.sas@gmail.com',
'd.savchenko.sas@gmail.com',
'd.tukhvatullin.sas@gmail.com',
'd.yagafarova.sas@gmail.com',
'e.alexandrova.sas@gmail.com',
'e.azanova.sas@gmail.com',
'e.belousova.sas@gmail.com',
'e.chekhonatskiy.sas@gmail.com',
'e.drozdova.sas@gmail.com',
'e.fedorova.sas@gmail.com',
'e.filatova.sas@gmail.com',
'e.kaverina.sas@gmail.com',
'e.kolesnikova.sas@gmail.com',
'e.kolosova.sas@gmail.com',
'e.masleeva.sas@gmail.com',
'e.morokov.sas@gmail.com',
'e.moskvicheva.sas@gmail.com',
'e.permyakov.sas@gmail.com',
'e.sutulova.sas@gmail.com',
'e.sychyova.sas@gmail.com',
'e.taratunina.sas@gmail.com',
'e.ukhanyova.sas@gmail.com',
'e.zhila.sas@gmail.com',
'e.zhuravets.sas@gmail.com',
'g.chunarev.sas@gmail.com',
'g.kaplunkov.sas@gmail.com',
'i.bogatyrev.sas@gmail.com',
'i.karasev.sas@gmail.com',
'i.leonyuk.sas@gmail.com',
'i.malyshev.sas@gmail.com',
'i.sclyuev.sas@gmail.com',
'i.vostriakova.sas@gmail.com',
'i.yakovlev.sas@gmail.com',
'j.arkhipova.sas@gmail.com',
'j.simbirtseva.sas@gmail.com',
'k.dergacheva.sas@gmail.com',
'k.ekimova.sas@gmail.com',
'k.kurepova.sas@gmail.com',
'k.meydi.sas@gmail.com',
'k.ponomaryov.sas@gmail.com',
'k.razumova.sas@gmail.com',
'k.simonova.sas@gmail.com',
'k.terleev.sas@gmail.com',
'kh.farukov.sas@gmail.com',
'l.gorbushina.sas@gmail.com',
'm.abdulahadova.sas@gmail.com',
'm.aljadeed.sas@gmail.com',
'm.gurich.sas@gmail.com',
'm.iampolskaia.sas@gmail.com',
'm.pestunova.sas@gmail.com',
'm.posokhova.sas@gmail.com',
'm.rodina.sas@gmail.com',
'm.vasenina.sas@gmail.com',
'n.dier.sas@gmail.com',
'n.kudin.sas@gmail.com',
'n.salmin.sas@gmail.com',
'p.avgustenyak.sas@gmail.com',
'p.chernigova.sas@gmail.com',
'p.garyaeva.sas@gmail.com',
'p.ningrum.sas@gmail.com',
'p.shishkina.sas@gmail.com',
'p.shlegel.sas@gmail.com',
'r.murzagulova.sas@gmail.com',
's.abdireukov.sas@gmail.com',
's.fedorova.sas@gmail.com',
's.gorshkova.sas@gmail.com',
's.kazarnovich.sas@gmail.com',
's.kolusheva.sas@gmail.com',
's.malygin.sas@gmail.com',
's.patrakeeva.sas@gmail.com',
't.ivanchencko.sas@gmail.com',
'u.habibulina.sas@gmail.com',
'v.aleksandrova.sas@gmail.com',
'v.bahareva.sas@gmail.com',
'v.kibukevich.sas@gmail.com',
'v.matsakova.sas@gmail.com',
'v.matushkin.sas@gmail.com',
'v.mizyakov.sas@gmail.com',
'v.orlova.sas@gmail.com',
'v.panikarovskikh.sas@gmail.com',
'v.petukhov.sas@gmail.com',
'v.pulnikova.sas@gmail.com',
'v.scherbakova.sas@gmail.com',
'v.shcherbakov.sas@gmail.com',
'v.stryukov.sas@gmail.com',
'v.tikhonenko.sas@gmail.com',
'v.vtorushina.sas@gmail.com',
'v.zemlyanukhina.sas@gmail.com',
'y.trofimova.sas@gmail.com',
'y.yanisheva.sas@gmail.com',
'andrey.volkov.media@gmail.com',
'a.azarova.media@gmail.com',
'o.dmitrieva.media@gmail.com',
'i.guliev.media@gmail.com',
'a.kirilova.media@gmail.com',
'r.rafikov.media@gmail.com',
'm.yurkina.media@gmail.com',
'i.kashapov.sas@gmail.com',
'm.zhirenkova.media@gmail.com'
]

function myFunction() {

  var sourceFolder = DriveApp.getFolderById('11CiE3MA4glrcdLvaX2Iey8HJW6UMVGv6');


  var folders = sourceFolder.getFolders();
  while (folders.hasNext()) {
    var folder = folders.next();
      var sourceFiles = folder.getFiles();
 while (sourceFiles.hasNext()) {
      var file = sourceFiles.next();
      sortByColor(file)
   }
}


function sortByColor(file){
  let ssFile = SpreadsheetApp.open(file);
    console.log(ssFile.getName());
    let sheets = ssFile.getSheets();


    const regex = RegExp('@');
    const bgColor = '#76d8ff';
    for (var i=0;i<sheets.length;i++){
      let sheet = sheets[i];
      let startRow = regex.test(sheet.getRange('B10').getValue()) ? 10 : 15;
      let isGradesSheet = startRow === 15 ? true : false;
      let endColumnNumber = isGradesSheet ? 29 : 34;
      let endColumnLiteral = isGradesSheet ? 'AD' : 'AI';

      // GET LAST ROW IN THE STUDENTS LIST, IGNORING MAJORS AS ELECTIVES PART BELOW
      var emails = sheet.getRange(`B${startRow}:B150`).getValues();
      var lastRow = 0;
      sheet.insertColumnAfter(endColumnNumber);

      for (let i = 0;i<emails.length;i++){
        if (!emails[i][0].length){
          lastRow = i + startRow - 1;
          break;
        }
        var rowToColor = sheet.getRange(`A${i+startRow}:D${i+startRow}`);
        if (dictOnline.includes(emails[i][0])){
          rowToColor.setBackground(bgColor);
          sheet.getRange(`${endColumnLiteral}${i+startRow}`).setValue('1');
        }
        else {
          //rowToColor.setBackground('#ffffff');
          sheet.getRange(`${endColumnLiteral}${i+startRow}`).setValue('0');
        }

      }

      var rangeToSort = sheet.getRange(`A${startRow}:${endColumnLiteral}${lastRow}`)
      let columnToSort = endColumnNumber + 1;
      if (sheet.getRange(`C${startRow-1}`).getValue() === 'Group' || sheet.getRange(`C${startRow-1}`).getValue() === 'Group:'){
        rangeToSort.sort([{column: 3, ascending: true},{column: columnToSort, ascending: true}, {column: 1, ascending: true}]);
      }
      else {
        rangeToSort.sort([{column: columnToSort, ascending: true}, {column: 1, ascending: true}]);
      }
           // console.log(lastRow);
      SpreadsheetApp.flush();
      Utilities.sleep(1000);
      sheet.deleteColumn(endColumnNumber + 1);


}
}

  }

  var dictOnline = [
'a.ashba.sas@gmail.com',
'a.bologov.sas@gmail.com',
'a.plokhikh.sas@gmail.com',
'a.siniutkin.sas@gmail.com',
'd.berdnikov.sas@gmail.com',
'e.sigareva.sas@gmail.com',
'i.safronov.sas@gmail.com',
'r.raemgulova.sas@gmail.com',
's.brudkova.sas@gmail.com',
'a.bugorkov.media@gmail.com',
'a.klimishin.media@gmail.com',
'd.sharashkina.media@gmail.com',
'l.tikhonchuk.media@gmail.com',
'l.arutiunian.media@gmail.com',
'd.kochetov.media@gmail.com',
'a.banyukevich.sas@gmail.com',
'a.bekchentaeva.sas@gmail.com',
'a.bekmanova.sas@gmail.com',
'a.bogdanova.sas@gmail.com',
'a.boiarinova.sas@gmail.com',
'a.budahina.sas@gmail.com',
'a.chernyak.sas@gmail.com',
'a.demov.sas@gmail.com',
'a.dolgushin.sas@gmail.com',
'a.dudnichenko.sas@gmail.com',
'a.eifert.sas@gmail.com',
'a.goncharenko.sas@gmail.com',
'a.grachyova.sas@gmail.com',
'a.kleshchenok.sas@gmail.com',
'a.kozadaeva.sas@gmail.com',
'a.kravchenko.sas@gmail.com',
'a.kuznetsova.sas@gmail.com',
'a.kyosya.sas@gmail.com',
'a.malchikhina.sas@gmail.com',
'a.mysova.sas@gmail.com',
'a.nagornova.sas@gmail.com',
'a.ohmush.sas@gmail.com',
'a.ponich.sas@gmail.com',
'a.rakhmatullina.sas@gmail.com',
'a.rozmanov.sas@gmail.com',
'a.sidenko.sas@gmail.com',
'a.strekalina.sas@gmail.com',
'a.uskova.sas@gmail.com',
'a.zalyaletdinova.sas@gmail.com',
'a.zavarzina.sas@gmail.com',
'a.zhuravleva.sas@gmail.com',
'alexandr.li.sas@gmail.com',
'b.babkin.sas@gmail.com',
'ch.evseyeva.sas@gmail.com',
'd.balandin.sas@gmail.com',
'd.grin.sas@gmail.com',
'd.kakenova.sas@gmail.com',
'd.kolisnichenko.sas@gmail.com',
'd.lumpova.sas@gmail.com',
'd.makarova.sas@gmail.com',
'd.novikova.sas@gmail.com',
'd.parusimova.sas@gmail.com',
'd.savchenko.sas@gmail.com',
'd.tukhvatullin.sas@gmail.com',
'd.yagafarova.sas@gmail.com',
'e.alexandrova.sas@gmail.com',
'e.azanova.sas@gmail.com',
'e.belousova.sas@gmail.com',
'e.chekhonatskiy.sas@gmail.com',
'e.drozdova.sas@gmail.com',
'e.fedorova.sas@gmail.com',
'e.filatova.sas@gmail.com',
'e.kaverina.sas@gmail.com',
'e.kolesnikova.sas@gmail.com',
'e.kolosova.sas@gmail.com',
'e.masleeva.sas@gmail.com',
'e.morokov.sas@gmail.com',
'e.moskvicheva.sas@gmail.com',
'e.permyakov.sas@gmail.com',
'e.sutulova.sas@gmail.com',
'e.sychyova.sas@gmail.com',
'e.taratunina.sas@gmail.com',
'e.ukhanyova.sas@gmail.com',
'e.zhila.sas@gmail.com',
'e.zhuravets.sas@gmail.com',
'g.chunarev.sas@gmail.com',
'g.kaplunkov.sas@gmail.com',
'i.bogatyrev.sas@gmail.com',
'i.karasev.sas@gmail.com',
'i.leonyuk.sas@gmail.com',
'i.malyshev.sas@gmail.com',
'i.sclyuev.sas@gmail.com',
'i.vostriakova.sas@gmail.com',
'i.yakovlev.sas@gmail.com',
'j.arkhipova.sas@gmail.com',
'j.simbirtseva.sas@gmail.com',
'k.dergacheva.sas@gmail.com',
'k.ekimova.sas@gmail.com',
'k.kurepova.sas@gmail.com',
'k.meydi.sas@gmail.com',
'k.ponomaryov.sas@gmail.com',
'k.razumova.sas@gmail.com',
'k.simonova.sas@gmail.com',
'k.terleev.sas@gmail.com',
'kh.farukov.sas@gmail.com',
'l.gorbushina.sas@gmail.com',
'm.abdulahadova.sas@gmail.com',
'm.aljadeed.sas@gmail.com',
'm.gurich.sas@gmail.com',
'm.iampolskaia.sas@gmail.com',
'm.pestunova.sas@gmail.com',
'm.posokhova.sas@gmail.com',
'm.rodina.sas@gmail.com',
'm.vasenina.sas@gmail.com',
'n.dier.sas@gmail.com',
'n.kudin.sas@gmail.com',
'n.salmin.sas@gmail.com',
'p.avgustenyak.sas@gmail.com',
'p.chernigova.sas@gmail.com',
'p.garyaeva.sas@gmail.com',
'p.ningrum.sas@gmail.com',
'p.shishkina.sas@gmail.com',
'p.shlegel.sas@gmail.com',
'r.murzagulova.sas@gmail.com',
's.abdireukov.sas@gmail.com',
's.fedorova.sas@gmail.com',
's.gorshkova.sas@gmail.com',
's.kazarnovich.sas@gmail.com',
's.kolusheva.sas@gmail.com',
's.malygin.sas@gmail.com',
's.patrakeeva.sas@gmail.com',
't.ivanchencko.sas@gmail.com',
'u.habibulina.sas@gmail.com',
'v.aleksandrova.sas@gmail.com',
'v.bahareva.sas@gmail.com',
'v.kibukevich.sas@gmail.com',
'v.matsakova.sas@gmail.com',
'v.matushkin.sas@gmail.com',
'v.mizyakov.sas@gmail.com',
'v.orlova.sas@gmail.com',
'v.panikarovskikh.sas@gmail.com',
'v.petukhov.sas@gmail.com',
'v.pulnikova.sas@gmail.com',
'v.scherbakova.sas@gmail.com',
'v.shcherbakov.sas@gmail.com',
'v.stryukov.sas@gmail.com',
'v.tikhonenko.sas@gmail.com',
'v.vtorushina.sas@gmail.com',
'v.zemlyanukhina.sas@gmail.com',
'y.trofimova.sas@gmail.com',
'y.yanisheva.sas@gmail.com',
'andrey.volkov.media@gmail.com',
'a.azarova.media@gmail.com',
'o.dmitrieva.media@gmail.com',
'i.guliev.media@gmail.com',
'a.kirilova.media@gmail.com',
'r.rafikov.media@gmail.com',
'm.yurkina.media@gmail.com',
'i.kashapov.sas@gmail.com',
'm.zhirenkova.media@gmail.com'
]

  /* Change the FOLDER NAME to generate tree for any specify folder */

  function generateFolderTree() {

 // If you want a tree of any sub folder
    var parent = DriveApp.getFolderById("1a_k3P4ALF6kCsHtB2jDOeMBbUfbkcBZS");
    /* Change the FOLDER NAME to generate tree for any specify folder */
    var html = '';

  try {

    // If you want a tree of any sub folder
    // If you want to search from the top (root) folder
    //var parentFolder = DriveApp.getRootFolder();

    getChildFolders(parent);

  } catch (e) {

    Logger.log(e.toString());

  }

  function getChildFolders(parent) {

  html += '<ul>';

  var childFolders = parent.getFolders();

  while (childFolders.hasNext()) {

    var childFolder = childFolders.next();

    if (childFolder.getName() !== 'Positioning' && childFolder.getName() !== 'SAS Essays (2017-)'){

    html += `<li><a target="_blank"  href="${childFolder.getUrl()}">${childFolder.getName()}</a>`

    //Logger.log("Folder Name: " + childFolder.getName());
    //Logger.log("Folder URL:  " + childFolder.getUrl());

    var files = childFolder.getFiles();

    if (files.hasNext()){

    html += '<ul>';

    while (files.hasNext()) {

      var file = files.next();

      html += `<li><a target="_blank" href="${file.getUrl()}">${file.getName()}</a></li>`

      // Print list of files inside the folder
      //Logger.log(files.next().getName());
    }

    html += '</ul>';

    }

    // Recursive call for any sub-folders
    getChildFolders(childFolder);
  }
  html += '</li>';
  }

  html += '</ul>';
  //Logger.log(html);
}

DriveApp.createFile('SAS Google Drive Folder Tree', html, MimeType.HTML);
}

    // var res = FilesApp.createTree("1a_k3P4ALF6kCsHtB2jDOeMBbUfbkcBZS", null, "files(name)");

function myFunction() {
  // MA
  //  var sourceFolder = DriveApp.getFolderById('1JhT9lSsrWhzYwbiQXLjZwDfQ52QT58Pi');
  // var combinedFile = DriveApp.getFileById('19ENRo3aXT1Lh-F9PcxsgG2yZp3s_sNNwhDrjagtdv3o');

  //BA
  var sourceFolder = DriveApp.getFolderById('1YLxWXErG6GlDnk0Im3LVW9xqc1SBI_R5');
   var combinedFile = DriveApp.getFileById('1MA_EzOj6MD6fMSpNA5vsUDXaKWPHywqrTnDwaPBKy_k');

  var destFolder = DriveApp.getFolderById('1iYtfWoIfaobkZM91bYz0XCepWbuR_-2w');
  var templateFile = DriveApp.getFileById('1lT9DRuoovJxkWpigCVpZMTMkWZPrY0i3mER2xwxIq-8');


  var destSS = SpreadsheetApp.open(combinedFile);
  var destSheet = destSS.getSheets()[0];

  var templateSheet = SpreadsheetApp.open(templateFile).getSheets()[0];
  var templateSheetHeader = templateSheet.getRange('A1:G1').getValues();

  var templateSheetRussian = SpreadsheetApp.open(templateFile).getSheets()[1];
    var templateSheetRussianHeader = templateSheetRussian.getRange('A1:G1').getValues();


  var sourceFiles = sourceFolder.getFiles();
  var blobs = [];

   while (sourceFiles.hasNext()) {
    var file = sourceFiles.next();
    combineFiles(file);
   }

  function combineFiles(file){
    var ss = SpreadsheetApp.open(file);
    var sheets = ss.getSheets();
    var sheet;
    for (i=0;i<sheets.length;i++){
      if (sheets[i].getName() === "Reporting to UTMN"){
        sheet = sheets[i];
      }
    }

    var copiedSheet = sheet.copyTo(destSS);
    SpreadsheetApp.flush();
    var rowsToDelete = [];

    var dateRowsEnded = true;

    function deleteDateRows(){
    var startingRow = null;
      var endingRow;
      dateRowsEnded = true;
     var dates = copiedSheet.getRange("F:F").getValues();

    for (var z=2;z<dates.length;z++){
      if(dates[z][0] === 'Date' || dates[z][0] === 'Date and Topic') { startingRow = z + 1; dateRowsEnded = false;}
      else if ((!dateRowsEnded && (dates[z][0] !=='Date' && dates[z][0])) || z == dates.length-1) {
        endingRow = z + 1;
        break;
      }
    }

     if (startingRow !== null ) {
     //Logger.log(startingRow,endingRow-1);
     //Logger.log(copiedSheet.getRange(`A${startingRow}:G${endingRow-1}`).getValues());
     //copiedSheet.getRange(`A${startingRow}:G${endingRow-1}`).breakApart();
     copiedSheet.deleteRows(startingRow,endingRow - startingRow);
     }
    }

    do {
    deleteDateRows();
    } while (dateRowsEnded === false)

    //copiedSheet.deleteRow(copiedSheet.getLastRow());


    var copiedLastRow = getLastDateRow(copiedSheet);
    //Logger.log(copiedLastRow);
    var rangeToExport = copiedSheet.getRange("A3:G"+ (copiedLastRow));

    var last_row = destSheet.getLastRow();
    if (last_row > 0) {
    destSheet.insertRowAfter(last_row);
    destSheet.insertRowAfter(last_row)
    }
   // Logger.log(last_row);
    var target_range = destSheet.getRange(last_row + 1, 1);
    //Logger.log(target_range);
    var copiedRange = copiedSheet.getRange(rangeToExport.getA1Notation());
    copiedRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    rangeToExport.copyTo(target_range);
    SpreadsheetApp.flush();
    destSS.deleteSheet(copiedSheet);


    function getLastDateRow(sheet){
      var values = sheet.getRange('F:F').getValues();
      //Logger.log(values);
      for (var i=0;i<values.length;i++){
        var FRange = sheet.getRange('F'+(i+1)).getValues()[0][0];
        //Logger.log(FRange);
        if ((values[i][0] === "Date and Topic" || values[i][0] === "Date") && !FRange) return i;
      }
      return sheet.getRange('B:B').getLastRow();
    }
  }



  function emailSpreadsheetAsPDF(file) {

  // Get the currently active spreadsheet URL (link)
  // Or use SpreadsheetApp.openByUrl("<<SPREADSHEET URL>>");
    var ss = SpreadsheetApp.open(file);
    var sheet = ss.getSheets()[3];

    sheet.getRange('A1:I1').setValues(templateSheetRussianHeader);

    SpreadsheetApp.flush();

  // Base URL
  var url = "https://docs.google.com/spreadsheets/d/SS_ID/export?".replace("SS_ID", ss.getId());

  /* Specify PDF export parameters
  From: https://code.google.com/p/google-apps-script-issues/issues/detail?id=3579
  */

  var url_ext = 'exportFormat=pdf&format=pdf'        // export as pdf / csv / xls / xlsx
  + '&size=A4'                       // paper size legal / letter / A4
  + '&portrait=false'                    // orientation, false for landscape
  + '&fitw=true&source=labnol'           // fit to page width, false for actual size
  + '&sheetnames=false&printtitle=false' // hide optional headers and footers
  + '&pagenumbers=false&gridlines=true' // hide page numbers and gridlines
  + '&fzr=false'                         // do not repeat row headers (frozen rows) on each page
  + '&gid=';                             // the sheet's Id

  var token = ScriptApp.getOAuthToken();


  //make an empty array to hold your fetched blobs
    // Convert your specific sheet to blob
    var response = UrlFetchApp.fetch(url + url_ext + sheet.getSheetId(), {
      headers: {
        'Authorization': 'Bearer ' +  token
      }
    });

    //convert the response to a blob and store in our array
    blobs.push(response.getBlob().setName(sheet.getRange('A3').getValues() + " — " + sheet.getRange('D3').getValues() + '.pdf'));


  // Define the scope
  Logger.log("Storage Space used: " + DriveApp.getStorageUsed());

    sheet.getRange('A1:I1').setValues(templateSheetHeader);
}

  // If allowed to send emails, send the email with the PDF attachment
  if (MailApp.getRemainingDailyQuota() > 0)
    GmailApp.sendEmail("m.agliulin@utmn.ru", "SheetsToPDF", "", {
      htmlBody: "",
      attachments:blobs
    });

  function createAttendanceSheets(file){
    var ssFile = SpreadsheetApp.open(file);
    var ss = ssFile.getSheets()[2];
    var title = ss.getRange('G1').getValues();
    var professor = ss.getRange('G2').getValues();
    var dates = ss.getRange('E9:J9').getValues();
    var arrayStudents = ss.getRange('A10:A90').getValues();
    var filteredArrayStudents = arrayStudents.reduce(function(ar, e) {
  if (e[0]) ar.push([e[0]])
  return ar;
}, []);
    var firstEmptyRow = filteredArrayStudents.length + 10;
    Logger.log(filteredArrayStudents);
    var names = ss.getRange('A10:B'+(firstEmptyRow)).getValues();
    var attendance = ss.getRange('E10:J'+(firstEmptyRow)).getValues();



    var rosterLength = Math.ceil(filteredArrayStudents.length);
    Logger.log(rosterLength);

    if (ssFile.getSheets()[3]) ssFile.deleteSheet(ssFile.getSheets()[3]);
    if (ssFile.getSheets()[3]) ssFile.deleteSheet(ssFile.getSheets()[3]);

    templateSheet.copyTo(ssFile);
    templateSheet.copyTo(ssFile);

    var newSheet = ssFile.getSheets()[3];
    var newSheet2 = ssFile.getSheets()[4];

    newSheet.setName('Reporting Week 7');
    newSheet2.setName('Reporting Week 8');

    var initialRowToPaste = 3;
    var initialColumnToCopyFrom = 'E';

    function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    Logger.log(dates);

    for (var i=0;i<dates[0].length;i++){
      var lastRow = initialRowToPaste+rosterLength;

      newSheet.getRange("A"+(lastRow-1)+":I"+(lastRow-1)).setBorder(null, null, true, null, true, false);
      newSheet.getRange("B"+initialRowToPaste+":C"+(lastRow)).setValues(names);
      newSheet.getRange("D"+initialRowToPaste).setValues(title);
      newSheet.getRange("A"+initialRowToPaste).setValues(professor);
      newSheet.getRange("E"+initialRowToPaste).setValue(dates[0][i]);
      newSheet.getRange("G"+initialRowToPaste+":G"+(lastRow)).setValues(ss.getRange(initialColumnToCopyFrom+"10:"+initialColumnToCopyFrom+(rosterLength+10)).getValues());

      newSheet.getRange("A"+initialRowToPaste+":A"+(lastRow-1)).mergeVertically();
      newSheet.getRange("D"+initialRowToPaste+":D"+(lastRow-1)).mergeVertically();
      newSheet.getRange("E"+initialRowToPaste+":E"+(lastRow-1)).mergeVertically();
      newSheet.getRange("F"+initialRowToPaste+":F"+(lastRow-1)).mergeVertically();
      newSheet.getRange("I"+initialRowToPaste+":I"+(lastRow-1)).mergeVertically();

      newSheet2.getRange("A"+(lastRow-1)+":I"+(lastRow-1)).setBorder(null, null, true, null, true, false);
      newSheet2.getRange("B"+initialRowToPaste+":C"+(lastRow)).setValues(names);
      newSheet2.getRange("D"+initialRowToPaste).setValues(title);
      newSheet2.getRange("A"+initialRowToPaste).setValues(professor);
      newSheet2.getRange("E"+initialRowToPaste).setValue('Date and Topic');

      newSheet2.getRange("A"+initialRowToPaste+":A"+(lastRow-1)).mergeVertically();
      newSheet2.getRange("D"+initialRowToPaste+":D"+(lastRow-1)).mergeVertically();
      newSheet2.getRange("E"+initialRowToPaste+":E"+(lastRow-1)).mergeVertically();
      newSheet2.getRange("F"+initialRowToPaste+":F"+(lastRow-1)).mergeVertically();
      newSheet2.getRange("I"+initialRowToPaste+":I"+(lastRow-1)).mergeVertically();


      initialRowToPaste += rosterLength;
      initialColumnToCopyFrom = nextChar(initialColumnToCopyFrom);
    }

    // newSheet2.getRange('A10:C95').setValues(names);
    // newSheet2.getRange('G1').setValues(title);
    // newSheet2.getRange('G2').setValues(professor);
  }

}
function myFunction() {
  var sourceFolder = DriveApp.getFolderById('1nBIcJrRWh7jbPNu3Ni3ThQBkzPIKoy_P');
  var destFolder = DriveApp.getFolderById('1iYtfWoIfaobkZM91bYz0XCepWbuR_-2w');
  var templateFile = DriveApp.getFileById('1lT9DRuoovJxkWpigCVpZMTMkWZPrY0i3mER2xwxIq-8');

  var templateSheet = SpreadsheetApp.open(templateFile).getSheets()[0];
  var templateSheetHeader = templateSheet.getRange('A1:I1').getValues();

  var templateSheetRussian = SpreadsheetApp.open(templateFile).getSheets()[1];
    var templateSheetRussianHeader = templateSheetRussian.getRange('A1:I1').getValues();


  var sourceFiles = sourceFolder.getFiles();
  var blobs = [];

  //while (sourceFiles.hasNext()) {
    var file = sourceFiles.next();
    Logger.log(file.getName());
  //  emailSpreadsheetAsPDF(file);
  //}

  var file = sourceFiles.next();
    Logger.log(file.getName());
  //  emailSpreadsheetAsPDF(file);

  function emailSpreadsheetAsPDF(file) {

  // Get the currently active spreadsheet URL (link)
  // Or use SpreadsheetApp.openByUrl("<<SPREADSHEET URL>>");
    var ss = SpreadsheetApp.open(file);
    var sheet = ss.getSheets()[3];

    sheet.getRange('A1:I1').setValues(templateSheetRussianHeader);

    SpreadsheetApp.flush();

  // Base URL
  var url = "https://docs.google.com/spreadsheets/d/SS_ID/export?".replace("SS_ID", ss.getId());

  /* Specify PDF export parameters
  From: https://code.google.com/p/google-apps-script-issues/issues/detail?id=3579
  */

  var url_ext = 'exportFormat=pdf&format=pdf'        // export as pdf / csv / xls / xlsx
  + '&size=A4'                       // paper size legal / letter / A4
  + '&portrait=false'                    // orientation, false for landscape
  + '&fitw=true&source=labnol'           // fit to page width, false for actual size
  + '&sheetnames=false&printtitle=false' // hide optional headers and footers
  + '&pagenumbers=false&gridlines=true' // hide page numbers and gridlines
  + '&fzr=false'                         // do not repeat row headers (frozen rows) on each page
  + '&gid=';                             // the sheet's Id

  var token = ScriptApp.getOAuthToken();


  //make an empty array to hold your fetched blobs
    // Convert your specific sheet to blob
    var response = UrlFetchApp.fetch(url + url_ext + sheet.getSheetId(), {
      headers: {
        'Authorization': 'Bearer ' +  token
      }
    });

    //convert the response to a blob and store in our array
    blobs.push(response.getBlob().setName(sheet.getRange('A3').getValues() + " — " + sheet.getRange('D3').getValues() + '.pdf'));


  // Define the scope
  Logger.log("Storage Space used: " + DriveApp.getStorageUsed());

    sheet.getRange('A1:I1').setValues(templateSheetHeader);
}

  // If allowed to send emails, send the email with the PDF attachment
  if (MailApp.getRemainingDailyQuota() > 0)
    GmailApp.sendEmail("m.agliulin@utmn.ru", "SheetsToPDF", "", {
      htmlBody: "",
      attachments:blobs
    });

  function createAttendanceSheets(file){
    var ssFile = SpreadsheetApp.open(file);
    var ss = ssFile.getSheets()[2];
    var title = ss.getRange('G1').getValues();
    var professor = ss.getRange('G2').getValues();
    var dates = ss.getRange('E9:J9').getValues();
    var arrayStudents = ss.getRange('A10:A90').getValues();
    var filteredArrayStudents = arrayStudents.reduce(function(ar, e) {
  if (e[0]) ar.push([e[0]])
  return ar;
}, []);
    var firstEmptyRow = filteredArrayStudents.length + 10;
    Logger.log(filteredArrayStudents);
    var names = ss.getRange('A10:B'+(firstEmptyRow)).getValues();
    var attendance = ss.getRange('E10:J'+(firstEmptyRow)).getValues();



    var rosterLength = Math.ceil(filteredArrayStudents.length);
    Logger.log(rosterLength);

    if (ssFile.getSheets()[3]) ssFile.deleteSheet(ssFile.getSheets()[3]);
    if (ssFile.getSheets()[3]) ssFile.deleteSheet(ssFile.getSheets()[3]);

    templateSheet.copyTo(ssFile);
    templateSheet.copyTo(ssFile);

    var newSheet = ssFile.getSheets()[3];
    var newSheet2 = ssFile.getSheets()[4];

    newSheet.setName('Reporting Week 7');
    newSheet2.setName('Reporting Week 8');

    var initialRowToPaste = 3;
    var initialColumnToCopyFrom = 'E';

    function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    Logger.log(dates);

    for (var i=0;i<dates[0].length;i++){
      var lastRow = initialRowToPaste+rosterLength;

      newSheet.getRange("A"+(lastRow-1)+":I"+(lastRow-1)).setBorder(null, null, true, null, true, false);
      newSheet.getRange("B"+initialRowToPaste+":C"+(lastRow)).setValues(names);
      newSheet.getRange("D"+initialRowToPaste).setValues(title);
      newSheet.getRange("A"+initialRowToPaste).setValues(professor);
      newSheet.getRange("E"+initialRowToPaste).setValue(dates[0][i]);
      newSheet.getRange("G"+initialRowToPaste+":G"+(lastRow)).setValues(ss.getRange(initialColumnToCopyFrom+"10:"+initialColumnToCopyFrom+(rosterLength+10)).getValues());

      newSheet.getRange("A"+initialRowToPaste+":A"+(lastRow-1)).mergeVertically();
      newSheet.getRange("D"+initialRowToPaste+":D"+(lastRow-1)).mergeVertically();
      newSheet.getRange("E"+initialRowToPaste+":E"+(lastRow-1)).mergeVertically();
      newSheet.getRange("F"+initialRowToPaste+":F"+(lastRow-1)).mergeVertically();
      newSheet.getRange("I"+initialRowToPaste+":I"+(lastRow-1)).mergeVertically();

      newSheet2.getRange("A"+(lastRow-1)+":I"+(lastRow-1)).setBorder(null, null, true, null, true, false);
      newSheet2.getRange("B"+initialRowToPaste+":C"+(lastRow)).setValues(names);
      newSheet2.getRange("D"+initialRowToPaste).setValues(title);
      newSheet2.getRange("A"+initialRowToPaste).setValues(professor);
      newSheet2.getRange("E"+initialRowToPaste).setValue('Date and Topic');

      newSheet2.getRange("A"+initialRowToPaste+":A"+(lastRow-1)).mergeVertically();
      newSheet2.getRange("D"+initialRowToPaste+":D"+(lastRow-1)).mergeVertically();
      newSheet2.getRange("E"+initialRowToPaste+":E"+(lastRow-1)).mergeVertically();
      newSheet2.getRange("F"+initialRowToPaste+":F"+(lastRow-1)).mergeVertically();
      newSheet2.getRange("I"+initialRowToPaste+":I"+(lastRow-1)).mergeVertically();


      initialRowToPaste += rosterLength;
      initialColumnToCopyFrom = nextChar(initialColumnToCopyFrom);
    }

    // newSheet2.getRange('A10:C95').setValues(names);
    // newSheet2.getRange('G1').setValues(title);
    // newSheet2.getRange('G2').setValues(professor);
  }

}
function myFunction() {
  // MA
  //  var sourceFolder = DriveApp.getFolderById('1JhT9lSsrWhzYwbiQXLjZwDfQ52QT58Pi');
  // var combinedFile = DriveApp.getFileById('19ENRo3aXT1Lh-F9PcxsgG2yZp3s_sNNwhDrjagtdv3o');

  //BA
  var sourceFolder = DriveApp.getFolderById('1YLxWXErG6GlDnk0Im3LVW9xqc1SBI_R5');
   var combinedFile = DriveApp.getFileById('1MA_EzOj6MD6fMSpNA5vsUDXaKWPHywqrTnDwaPBKy_k');

  var destFolder = DriveApp.getFolderById('1iYtfWoIfaobkZM91bYz0XCepWbuR_-2w');
  var templateFile = DriveApp.getFileById('1lT9DRuoovJxkWpigCVpZMTMkWZPrY0i3mER2xwxIq-8');


  var destSS = SpreadsheetApp.open(combinedFile);
  var destSheet = destSS.getSheets()[0];

  var templateSheet = SpreadsheetApp.open(templateFile).getSheets()[0];
  var templateSheetHeader = templateSheet.getRange('A1:G1').getValues();

  var templateSheetRussian = SpreadsheetApp.open(templateFile).getSheets()[1];
    var templateSheetRussianHeader = templateSheetRussian.getRange('A1:G1').getValues();


  var sourceFiles = sourceFolder.getFiles();
  var blobs = [];

   while (sourceFiles.hasNext()) {
    var file = sourceFiles.next();
    combineFiles(file);
   }

  function combineFiles(file){
    var ss = SpreadsheetApp.open(file);
    var sheets = ss.getSheets();
    var sheet;
    for (i=0;i<sheets.length;i++){
      if (sheets[i].getName() === "Reporting to UTMN"){
        sheet = sheets[i];
      }
    }

    var copiedSheet = sheet.copyTo(destSS);
    SpreadsheetApp.flush();
    var rowsToDelete = [];

    var dateRowsEnded = true;

    function deleteDateRows(){
    var startingRow = null;
      var endingRow;
      dateRowsEnded = true;
     var dates = copiedSheet.getRange("F:F").getValues();

    for (var z=2;z<dates.length;z++){
      if(dates[z][0] === 'Date' || dates[z][0] === 'Date and Topic') { startingRow = z + 1; dateRowsEnded = false;}
      else if ((!dateRowsEnded && (dates[z][0] !=='Date' && dates[z][0])) || z == dates.length-1) {
        endingRow = z + 1;
        break;
      }
    }

     if (startingRow !== null ) {
     //Logger.log(startingRow,endingRow-1);
     //Logger.log(copiedSheet.getRange(`A${startingRow}:G${endingRow-1}`).getValues());
     //copiedSheet.getRange(`A${startingRow}:G${endingRow-1}`).breakApart();
     copiedSheet.deleteRows(startingRow,endingRow - startingRow);
     }
    }

    do {
    deleteDateRows();
    } while (dateRowsEnded === false)

    //copiedSheet.deleteRow(copiedSheet.getLastRow());


    var copiedLastRow = getLastDateRow(copiedSheet);
    //Logger.log(copiedLastRow);
    var rangeToExport = copiedSheet.getRange("A3:G"+ (copiedLastRow));

    var last_row = destSheet.getLastRow();
    if (last_row > 0) {
    destSheet.insertRowAfter(last_row);
    destSheet.insertRowAfter(last_row)
    }
   // Logger.log(last_row);
    var target_range = destSheet.getRange(last_row + 1, 1);
    //Logger.log(target_range);
    var copiedRange = copiedSheet.getRange(rangeToExport.getA1Notation());
    copiedRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    rangeToExport.copyTo(target_range);
    SpreadsheetApp.flush();
    destSS.deleteSheet(copiedSheet);


    function getLastDateRow(sheet){
      var values = sheet.getRange('F:F').getValues();
      //Logger.log(values);
      for (var i=0;i<values.length;i++){
        var FRange = sheet.getRange('F'+(i+1)).getValues()[0][0];
        //Logger.log(FRange);
        if ((values[i][0] === "Date and Topic" || values[i][0] === "Date") && !FRange) return i;
      }
      return sheet.getRange('B:B').getLastRow();
    }
  }



  function emailSpreadsheetAsPDF(file) {

  // Get the currently active spreadsheet URL (link)
  // Or use SpreadsheetApp.openByUrl("<<SPREADSHEET URL>>");
    var ss = SpreadsheetApp.open(file);
    var sheet = ss.getSheets()[3];

    sheet.getRange('A1:I1').setValues(templateSheetRussianHeader);

    SpreadsheetApp.flush();

  // Base URL
  var url = "https://docs.google.com/spreadsheets/d/SS_ID/export?".replace("SS_ID", ss.getId());

  /* Specify PDF export parameters
  From: https://code.google.com/p/google-apps-script-issues/issues/detail?id=3579
  */

  var url_ext = 'exportFormat=pdf&format=pdf'        // export as pdf / csv / xls / xlsx
  + '&size=A4'                       // paper size legal / letter / A4
  + '&portrait=false'                    // orientation, false for landscape
  + '&fitw=true&source=labnol'           // fit to page width, false for actual size
  + '&sheetnames=false&printtitle=false' // hide optional headers and footers
  + '&pagenumbers=false&gridlines=true' // hide page numbers and gridlines
  + '&fzr=false'                         // do not repeat row headers (frozen rows) on each page
  + '&gid=';                             // the sheet's Id

  var token = ScriptApp.getOAuthToken();


  //make an empty array to hold your fetched blobs
    // Convert your specific sheet to blob
    var response = UrlFetchApp.fetch(url + url_ext + sheet.getSheetId(), {
      headers: {
        'Authorization': 'Bearer ' +  token
      }
    });

    //convert the response to a blob and store in our array
    blobs.push(response.getBlob().setName(sheet.getRange('A3').getValues() + " — " + sheet.getRange('D3').getValues() + '.pdf'));


  // Define the scope
  Logger.log("Storage Space used: " + DriveApp.getStorageUsed());

    sheet.getRange('A1:I1').setValues(templateSheetHeader);
}

  // If allowed to send emails, send the email with the PDF attachment
  if (MailApp.getRemainingDailyQuota() > 0)
    GmailApp.sendEmail("m.agliulin@utmn.ru", "SheetsToPDF", "", {
      htmlBody: "",
      attachments:blobs
    });

  function createAttendanceSheets(file){
    var ssFile = SpreadsheetApp.open(file);
    var ss = ssFile.getSheets()[2];
    var title = ss.getRange('G1').getValues();
    var professor = ss.getRange('G2').getValues();
    var dates = ss.getRange('E9:J9').getValues();
    var arrayStudents = ss.getRange('A10:A90').getValues();
    var filteredArrayStudents = arrayStudents.reduce(function(ar, e) {
  if (e[0]) ar.push([e[0]])
  return ar;
}, []);
    var firstEmptyRow = filteredArrayStudents.length + 10;
    Logger.log(filteredArrayStudents);
    var names = ss.getRange('A10:B'+(firstEmptyRow)).getValues();
    var attendance = ss.getRange('E10:J'+(firstEmptyRow)).getValues();



    var rosterLength = Math.ceil(filteredArrayStudents.length);
    Logger.log(rosterLength);

    if (ssFile.getSheets()[3]) ssFile.deleteSheet(ssFile.getSheets()[3]);
    if (ssFile.getSheets()[3]) ssFile.deleteSheet(ssFile.getSheets()[3]);

    templateSheet.copyTo(ssFile);
    templateSheet.copyTo(ssFile);

    var newSheet = ssFile.getSheets()[3];
    var newSheet2 = ssFile.getSheets()[4];

    newSheet.setName('Reporting Week 7');
    newSheet2.setName('Reporting Week 8');

    var initialRowToPaste = 3;
    var initialColumnToCopyFrom = 'E';

    function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    Logger.log(dates);

    for (var i=0;i<dates[0].length;i++){
      var lastRow = initialRowToPaste+rosterLength;

      newSheet.getRange("A"+(lastRow-1)+":I"+(lastRow-1)).setBorder(null, null, true, null, true, false);
      newSheet.getRange("B"+initialRowToPaste+":C"+(lastRow)).setValues(names);
      newSheet.getRange("D"+initialRowToPaste).setValues(title);
      newSheet.getRange("A"+initialRowToPaste).setValues(professor);
      newSheet.getRange("E"+initialRowToPaste).setValue(dates[0][i]);
      newSheet.getRange("G"+initialRowToPaste+":G"+(lastRow)).setValues(ss.getRange(initialColumnToCopyFrom+"10:"+initialColumnToCopyFrom+(rosterLength+10)).getValues());

      newSheet.getRange("A"+initialRowToPaste+":A"+(lastRow-1)).mergeVertically();
      newSheet.getRange("D"+initialRowToPaste+":D"+(lastRow-1)).mergeVertically();
      newSheet.getRange("E"+initialRowToPaste+":E"+(lastRow-1)).mergeVertically();
      newSheet.getRange("F"+initialRowToPaste+":F"+(lastRow-1)).mergeVertically();
      newSheet.getRange("I"+initialRowToPaste+":I"+(lastRow-1)).mergeVertically();

      newSheet2.getRange("A"+(lastRow-1)+":I"+(lastRow-1)).setBorder(null, null, true, null, true, false);
      newSheet2.getRange("B"+initialRowToPaste+":C"+(lastRow)).setValues(names);
      newSheet2.getRange("D"+initialRowToPaste).setValues(title);
      newSheet2.getRange("A"+initialRowToPaste).setValues(professor);
      newSheet2.getRange("E"+initialRowToPaste).setValue('Date and Topic');

      newSheet2.getRange("A"+initialRowToPaste+":A"+(lastRow-1)).mergeVertically();
      newSheet2.getRange("D"+initialRowToPaste+":D"+(lastRow-1)).mergeVertically();
      newSheet2.getRange("E"+initialRowToPaste+":E"+(lastRow-1)).mergeVertically();
      newSheet2.getRange("F"+initialRowToPaste+":F"+(lastRow-1)).mergeVertically();
      newSheet2.getRange("I"+initialRowToPaste+":I"+(lastRow-1)).mergeVertically();


      initialRowToPaste += rosterLength;
      initialColumnToCopyFrom = nextChar(initialColumnToCopyFrom);
    }

    // newSheet2.getRange('A10:C95').setValues(names);
    // newSheet2.getRange('G1').setValues(title);
    // newSheet2.getRange('G2').setValues(professor);
  }

}
function myFunction() {
  // MA
    var sourceFolder = DriveApp.getFolderById('1JhT9lSsrWhzYwbiQXLjZwDfQ52QT58Pi');
  //
  // BA
  //var sourceFolder = DriveApp.getFolderById('1YLxWXErG6GlDnk0Im3LVW9xqc1SBI_R5');
  //
  var templateFile = DriveApp.getFileById('1lT9DRuoovJxkWpigCVpZMTMkWZPrY0i3mER2xwxIq-8');

  var templateSheet = SpreadsheetApp.open(templateFile).getSheets()[0];

  var logSheet = SpreadsheetApp.open(templateFile).getSheets()[2];

  var sourceFiles = sourceFolder.getFiles();

  while (sourceFiles.hasNext()) {
    var file = sourceFiles.next();
    createAttendanceSheets(file)
    logSheet.getRange('A1').setValue(file.getName());
  }

  function createAttendanceSheets(file){
    var ssFile = SpreadsheetApp.open(file);
    var sheets = ssFile.getSheets();
    var ss;
    for (i=0;i<sheets.length;i++){
      if (sheets[i].getName() === "Attendance (combined)" || sheets[i].getName() === "Attendance"){
        ss = sheets[i];
      }
    }
    var title = ss.getRange('I1').getValues();
    var professor = ss.getRange('I2').getValues();
    var dates = ss.getRange('E9:U9').getValues();
    var arrayStudents = ss.getRange(`A10:A${ss.getLastRow()}`).getValues();
    var filteredArrayStudents = arrayStudents.reduce(function(ar, e) {
  if (e[0]) ar.push([e[0]])
  return ar;
}, []);
    var firstEmptyRow = filteredArrayStudents.length + 10;
    var names = ss.getRange('A10:C'+(firstEmptyRow)).getValues();
    var attendance = ss.getRange('E10:J'+(firstEmptyRow)).getValues();



    var rosterLength = Math.ceil(filteredArrayStudents.length);

    templateSheet.copyTo(ssFile);

    for (i=0;i<sheets.length;i++){
      if (sheets[i].getName() === "Copy of Reporting to UTMN" || sheets[i].getName() === "Reporting to UTMN"){
        ssFile.deleteSheet(sheets[i]);
      }
    }
    templateSheet.copyTo(ssFile);

       sheets = ssFile.getSheets();
       var newSheet = sheets[sheets.length-1];
        newSheet.setName('Reporting to UTMN');

        for (i=0;i<sheets.length;i++){
      if (sheets[i].getName() === "Copy of Reporting to UTMN"){
        ssFile.deleteSheet(sheets[i]);
      }
    }

    var initialRowToPaste = 3;
    var initialColumnToCopyFrom = 'E';

    function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
    }

//    Logger.log(dates);

    for (var i=0;i<dates[0].length;i++){
      var lastRow = initialRowToPaste+rosterLength;
      var attendanceValues = ss.getRange(initialColumnToCopyFrom+"10:"+initialColumnToCopyFrom+(rosterLength+10)).getValues();

      attendanceValues = attendanceValues.map(function(el){ return el[0] ? ["-"] : ["+"]});


      newSheet.getRange("A"+(lastRow-1)+":G"+(lastRow-1)).setBorder(null, null, true, null, true, false);
      newSheet.getRange("B"+initialRowToPaste+":D"+(lastRow)).setValues(names);
      newSheet.getRange("E"+initialRowToPaste).setValues(title);
      newSheet.getRange("A"+initialRowToPaste).setValues(professor);
      newSheet.getRange("F"+initialRowToPaste).setValue(dates[0][i]);
      newSheet.getRange("G"+initialRowToPaste+":G"+(lastRow)).setValues(attendanceValues);

      newSheet.getRange("A"+initialRowToPaste+":A"+(lastRow-1)).mergeVertically();
      newSheet.getRange("E"+initialRowToPaste+":E"+(lastRow-1)).mergeVertically();
      newSheet.getRange("F"+initialRowToPaste+":F"+(lastRow-1)).mergeVertically();

      initialRowToPaste += rosterLength;
      initialColumnToCopyFrom = nextChar(initialColumnToCopyFrom);
    }

    newSheet.deleteRow(newSheet.getLastRow());


    // newSheet2.getRange('A10:C95').setValues(names);
    // newSheet2.getRange('G1').setValues(title);
    // newSheet2.getRange('G2').setValues(professor);
  }

}

function doGet() {
  return HtmlService
  .createTemplateFromFile('Index')
  .evaluate();
}

function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .createMenu('Dialog')
      .addItem('Open', 'openDialog')
      .addToUi();
}

function openDialog() {
  var html = HtmlService.createHtmlOutputFromFile('Index');
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showModalDialog(html, 'Dialog title');
}

function myFunction() {

  var sourceFolder = DriveApp.getFolderById('1nBIcJrRWh7jbPNu3Ni3ThQBkzPIKoy_P');
  var destFolder = DriveApp.getFolderById('1iYtfWoIfaobkZM91bYz0XCepWbuR_-2w');
  var destFile = DriveApp.getFileById('1tiHMwYcsq8_9Eacc_7mNH1EpwJ0zZiWS6fZyeYsWau4');

  var destSheet = SpreadsheetApp.open(destFile).getSheets()[0];

  var grades = {};

  var students = [];
  var emails;
  var names;
  var years;
  var subjects = [];

  var sourceFiles = sourceFolder.getFiles();


  while (sourceFiles.hasNext()) {
    var file = sourceFiles.next();
    Logger.log(file.getName());
    collectGrades(file);
  }

  createArraysForPasting(grades);
  pasteGrades(students,subjects);

  Logger.log(grades);

 function collectGrades (file){
   var ss = SpreadsheetApp.open(file);
    var sheet = ss.getSheets()[0];
    var title = sheet.getRange('G1').getValues();

   var emails = sheet.getRange('A15:A100').getValues();
   var names = sheet.getRange('B15:B100').getValues();
   var years = sheet.getRange('C15:C100').getValues();

   var finalGrades = sheet.getRange('D15:D100').getValues();
   for (var i=0;i<emails.length;i++){
     if (grades[emails[i][0]]) {
       grades[emails[i][0]][title] = finalGrades[i][0];
     }
     else {
       if(emails[i][0].length > 1){
         grades[emails[i][0]] = {};
       grades[emails[i][0]][title] = finalGrades[i][0];
       grades[emails[i][0]].name = names[i][0];
       grades[emails[i][0]].year = years[i][0];
       }
     }
   }
 }

 function createArraysForPasting(grades){
   for (entry in grades){
     var sumOfgrades = 0;
     grades[entry].rating = 0;
     grades[entry].numberOfCoursesTaken = 0;
     grades[entry].numberOfCoursesGraded = 0;
     if (!students.includes(entry)) students.push(entry);
     for (subj in grades[entry]){
       if (subj !== 'name' && subj !== 'year' && subj !== 'numberOfCoursesTaken' && subj !== 'numberOfCoursesGraded' && subj !== 'rating') {
         sumOfgrades += grades[entry][subj];
         grades[entry].numberOfCoursesTaken++;
         if (grades[entry][subj] && grades[entry][subj] > 0) grades[entry].numberOfCoursesGraded++;
         if (!subjects.includes(subj)){
           subjects.push(subj);
         }
       }
     }
     grades[entry].rating = grades[entry].numberOfCoursesGraded === 0 ? 0 : sumOfgrades/grades[entry].numberOfCoursesGraded;
   }
 }

 function pasteGrades(students,subjects){
   destSheet.getRange('A2:E300').clearContent();
   destSheet.getRange('G2:BY300').clearContent();
   var columnIndex = 'G';
   for (var i=0;i<students.length;i++){
     destSheet.getRange('A'+(i+2)).setValue(students[i]);
     destSheet.getRange('B'+(i+2)).setValue(grades[students[i]].name);
     destSheet.getRange('C'+(i+2)).setValue(grades[students[i]].year);
     destSheet.getRange('D'+(i+2)).setValue(grades[students[i]].numberOfCoursesTaken);
     destSheet.getRange('E'+(i+2)).setValue(grades[students[i]].numberOfCoursesGraded);
     //destSheet.getRange('F'+(i+2)).setValue(grades[students[i]].rating);
     for (var j=0;j<subjects.length;j++){
       if (grades[students[i]][subjects[j]]){
         destSheet.getRange('A'+(i+2)).setValue(students[i]);
       }
     }
   }
   for (var k=0;k<subjects.length;k++){
     destSheet.getRange(`${columnIndex}1`).setValue(subjects[k]);
     for (var j=0;j<students.length;j++){
       if (grades[students[j]][subjects[k]]){
         destSheet.getRange(`${columnIndex}${j+2}`).setValue(grades[students[j]][subjects[k]]);
       }
     }
     if (columnIndex === "Z"){
       columnIndex = "AA"
     }
     else if (columnIndex === "AZ"){
       columnIndex = "BA"
     }
     else if (columnIndex.length == 2){
       columnIndex = columnIndex[0] + nextChar(columnIndex[1])
     }
     else {
       columnIndex = nextChar(columnIndex);
     }
   }

   SpreadsheetApp.flush();
   destSheet.sort(6, false);

   function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
    }

 }

}

function myFunction() {

  var templateFile = DriveApp.getFileById('1vVIYgNhIkU9fk4IHbEGCkmPV7lNw0lDfR02NC_iwjIg');

  var templateSheet = SpreadsheetApp.open(templateFile).getSheets()[8];


 var stats = {};

 var pairs1_2 = [];

  for (var i=2;i<114;i++){
    var numberOfEl = templateSheet.getRange('C'+i).getValues()[0][0];
    if(numberOfEl === 2 || numberOfEl === 3){
        var pair = [];

        pair.push(templateSheet.getRange('G'+i).getValues()[0][0]);
        pair.push(templateSheet.getRange('H'+i).getValues()[0][0]);
        pair = pair.sort(function(a, b) {
          var nameA = a.toUpperCase(); // ignore upper and lowercase
          var nameB = b.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
            return 0;


           });

           if (stats[JSON.stringify(pair)]){
             stats[JSON.stringify(pair)].count += 1;
           }
           else {
             stats[JSON.stringify(pair)] = { count:1 };
           }

           //pairs1_2.push(pair);
    }
  }




  function printCount(stats){
    var string = "";
    for (entry in stats){
      string += stats[entry].count + ' — ' + JSON.parse(entry)[0] + ' + ' + JSON.parse(entry)[1] + '\n';
    }
    return string;
  }
  Logger.log(printCount(stats));

  }

function myFunction() {
  var sourceFolder = DriveApp.getFolderById('1nBIcJrRWh7jbPNu3Ni3ThQBkzPIKoy_P');
  var destFolder = DriveApp.getFolderById('1iYtfWoIfaobkZM91bYz0XCepWbuR_-2w');
  var templateFile = DriveApp.getFileById('17bw4JT0F_rY1NDeZJnQ_Dc9nCkcYvT1i7gDAC8ca8qQ');

  var templateSheet = SpreadsheetApp.open(templateFile).getSheets()[0];

  var sourceFiles = sourceFolder.getFiles();

  while (sourceFiles.hasNext()) {
    var file = sourceFiles.next();
    Logger.log(file.getName());
    createAttendanceSheets(file);
  }

  function createAttendanceSheets(file){
    var ssFile = SpreadsheetApp.open(file);
    var ss = ssFile.getSheets()[0];
    var names = ss.getRange('A15:C100').getValues();
    var title = ss.getRange('G1').getValues();
    var professor = ss.getRange('G2').getValues();

    templateSheet.copyTo(ssFile);
    templateSheet.copyTo(ssFile);

    var newSheet = ssFile.getSheets()[1];
    var newSheet2 = ssFile.getSheets()[2];

    newSheet.setName('Attendance, weeks 1-6');
    newSheet2.setName('Attendance, weeks 7-8');

    newSheet.getRange('A10:C95').setValues(names);
    newSheet.getRange('G1').setValues(title);
    newSheet.getRange('G2').setValues(professor);

    newSheet2.getRange('A10:C95').setValues(names);
    newSheet2.getRange('G1').setValues(title);
    newSheet2.getRange('G2').setValues(professor);

  }

}
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

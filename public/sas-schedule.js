// const GetSheetDone = require('get-sheet-done');
const moment = require('moment');

// Client ID and API key from the Developer Console
var CLIENT_ID = '1007112818313-kmg9btri07fnska7gb6l16eiue9rffj0.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAAFj5VWy_C91CluJnVyMs8rmub9_v8dF8';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

var sheet = [];

var sheetPitB = [];

var headers = [];
/**
 *  On load, called to load the auth2 library and API client library.
 */

window.onload = handleClientLoad();

function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }


/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
  //  if (!gapi.auth2.getAuthInstance().isSignedIn.get()) gapi.auth2.getAuthInstance().signIn();

    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    // signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    console.log(error);
  });
}



/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
  //  signoutButton.style.display = 'block';
    listMajors();
  } else {
    authorizeButton.style.display = 'block';
    // signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  console.log('obj');
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
// function handleSignoutClick(event) {
//   gapi.auth2.getAuthInstance().signOut();
// }

// /**
//  * Append a pre element to the body containing the given message
//  * as its text node. Used to display the results of the API call.
//  *
//  * @param {string} message Text to be placed in pre element.
//  */
// function appendPre(message) {
//   var pre = document.getElementById('content');
//   var textContent = document.createTextNode(message + '\n');
//   pre.appendChild(textContent);
// }

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajors() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '120_7j9FsFxBkoG2W0aX0d4wdgKP2r2RK52wNMq52frc',
    range: '\'' + moment().format('DD.MM ddd') + '\'!A1:Z20',
    // majorDimension: "COLUMNS",
  }).then(function(response) {
    // console.log('data retrieved');
    sheet = response.result.values;
    generateSchedule(sheet);
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  });
  listPitB();
}

function listPitB(){
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '120_7j9FsFxBkoG2W0aX0d4wdgKP2r2RK52wNMq52frc',
    range: '\'' + 'P in the Box' + '\'!A1:Z20',
  }).then(function(response) {
    // console.log('data retrieved');
    sheetPitB = response.result.values;
    generatePitB(sheetPitB);
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  });
}

// GetSheetDone.labeledCols('1lvG1lGsKc2x5r1a5C9_sihymy9SGswBUoJElxjJpLP4').then(sheet => generateSchedule(sheet));
const classNumbers = {
  "9:10":"1",
  "10:40":"2",
  "12:30":"3",
  "14:20":"4",
  "16:00":"5",
  "17:40":"6",
  "19:20":"7"
};
let firstHalf = true;
let firstHalfReverse = false;

function generatePitB(sheetPitB){

  let tableBody = document.querySelector('.flex-container-pitb .tbody');
  let rows = tableBody.querySelectorAll('.tr_pitb');
  for (let t=0;t<rows.length;t++){
    tableBody.deleteRow(0);
  }
  for (let i=1; i<sheetPitB.length;i++){
     let tr = document.createElement('tr');
     tr.classList.add('tr_pitb');
     let tdTime = document.createElement('td');
     tdTime.innerHTML = sheetPitB[i][0];
     tr.appendChild(tdTime);
     for (let l=1; l<sheetPitB[i].length;l++){
       let td = document.createElement('td');
       if (sheetPitB[i][l].length < 2) td.innerHTML = '&nbsp;';
       else td.innerHTML = sheetPitB[i][l];
       tr.appendChild(td);
     }
     tableBody.appendChild(tr);
  }
}


document.querySelector('.date').innerHTML = moment().format('dddd DD/MM, H:mm');
function generateSchedule(sheet){
  let data = sheet;
  //let delimiterPosition = headers[0].indexOf
  // if(!moment().isBefore(moment(data[0].changetime, 'HH:mm'))){firstHalf = false;}
  // console.log(sheet)
  let currentHalf;
  let indexOfDelimiter;
  if (data[0]) indexOfDelimiter = data[0].indexOf('changetime');

  if (firstHalf){
    countStart = 0;
    countEnd = indexOfDelimiter;
  }
  else { countStart = indexOfDelimiter + 1; countEnd = data[0].length}
  let rows = document.querySelectorAll('.row');
  for (let t=0;t<rows.length;t++){
    document.querySelector(".table").deleteRow(0);
  }
  for (let k=countStart;k<countEnd;k++){
    let row = document.createElement('tr');
    row.classList.add('row');
    let timeEntry = document.createElement('td');

    timeEntry.innerHTML = data[1][k].replace(/-/g,'–').replace(/—/g,' – ').replace(/–/g,' – ');
    let timeEntryStart = data[1][k].split('–')[0];
    let classNumber = document.createElement('td');
    let classNumberSpan = document.createElement('span');
    classNumberSpan.classList.add('classNumberSpan');
    classNumber.appendChild(classNumberSpan);

    if (classNumbers[timeEntryStart]){
      classNumberSpan.innerHTML = classNumbers[timeEntryStart];
    }
    var beginningTime = moment(timeEntryStart, 'H:mm');
    var endTime = moment(timeEntryStart, 'H:mm').add(90, 'minutes');
    if (timeEntryStart.indexOf('/') < 0 && beginningTime.isBefore(moment()) && moment().isBefore(endTime) ){
      classNumberSpan.classList.add('red_highlight');
      timeEntry.classList.add('red_highlight');
      timeEntry.style.color = "#fff";
    }

    classNumber.classList.add('classNumber');
    timeEntry.classList.add('time');
    row.appendChild(classNumber);
    row.appendChild(timeEntry);
    document.querySelector('.tbody').appendChild(row);

    let cell = document.createElement('td');
    cell.classList.add('classes');
    for (let i=2;i<data.length;i++){
      let entryText = data[i][k];
      if(entryText){
      entryText = entryText.split('(');
      let title = document.createElement('span');
      title.innerHTML = entryText[0];
      title.classList.add('title');
      let entry = document.createElement('p');
      let professor = document.createElement('span');
      professor.classList.add('professor');
      entryText.shift();
      let professorText = '';
      if (entryText.length) {
        professorText = '('+entryText.join('(');
      }
      professorText = professorText
      .replace(/\s/g,'&nbsp;')
      .replace(/(\d{3}[a-z]?),&nbsp;/g, '$1, ')
      .replace(/\d{3}[a-z]?/g, '&nbsp;<span class="room">$&</span>')
      .replace(/&nbsp;&nbsp;/g,'&nbsp;')
      .replace(/,&nbsp;([A-Z])/g,', $1')
      .replace(/–/g,'—')
      .replace(/-/g,'—')
      .replace(/lecture, /g,'lecture,&nbsp;');
      professor.innerHTML = professorText;
      entry.appendChild(title);
      entry.appendChild(professor);
      cell.appendChild(entry);
      }
    }
    row.appendChild(cell);
    if(!cell.innerHTML){row.remove()}
  }
  document.querySelector('.date').innerHTML = '<span class="red">' + moment().format('dddd') + "</span> " + moment().format('DD/MM, H:mm');

  var announcementContainer = document.querySelector('.flex-container-img');
  var pitbContainer = document.querySelector('.flex-container-pitb');

  if((moment().format('mm')%10 === 5 && moment().format('ss')<=32) && data['2'][indexOfDelimiter].length > 1){
    if (data['2'][indexOfDelimiter]) document.querySelector('.announcement').src = data['2'][indexOfDelimiter];
    else if (data['3'][indexOfDelimiter]) document.querySelector('.announcement').src = data['3'][indexOfDelimiter];
    announcementContainer.style.opacity = '1';
    announcementContainer.style.zIndex = '99';
    firstHalfReverse = false;
  }
  else if((moment().format('mm')%10 === 0 && moment().format('ss')<=32) && data['3'][indexOfDelimiter].length > 1){
    if (data['3'][indexOfDelimiter]) document.querySelector('.announcement').src = data['3'][indexOfDelimiter];
    else if (data['2'][indexOfDelimiter]) document.querySelector('.announcement').src = data['2'][indexOfDelimiter];

    announcementContainer.style.opacity = '1';
    announcementContainer.style.zIndex = '99';
    firstHalfReverse = true;
  }
  else if((moment().format('mm')%10 === 0 && moment().format('ss')<=32) && data['3'][indexOfDelimiter].length < 1){
    if (data['3'][indexOfDelimiter]) document.querySelector('.announcement').src = data['3'][indexOfDelimiter];
    else if (data['2'][indexOfDelimiter]) document.querySelector('.announcement').src = data['2'][indexOfDelimiter];
    pitbContainer.style.opacity = '1';
    pitbContainer.style.zIndex = '99';
    document.querySelector('.schedule').innerHTML = 'Professor in the Box';
    firstHalfReverse = true;
  }
  else if(((moment().format('mm')%10 === 2 || moment().format('mm')%10 === 4 || moment().format('mm')%10 === 6 || moment().format('mm')%10 === 8) && moment().format('ss')<=32) && data['4'][indexOfDelimiter].length > 1){
    if (data['4'][indexOfDelimiter]) document.querySelector('.announcement').src = data['4'][indexOfDelimiter];
    announcementContainer.style.opacity = '1';
    announcementContainer.style.zIndex = '99';
    firstHalfReverse = true;
  }
  else {
    announcementContainer.style.opacity = '0';
    announcementContainer.style.zIndex = '-1';
    document.querySelector('.schedule').innerHTML = 'Schedule';
    pitbContainer.style.opacity = '0';
    pitbContainer.style.zIndex = '-1';
  }

  if(moment().format('ss')<=30){
    !firstHalfReverse ? firstHalf = true : firstHalf = false;
  }
  else {
    !firstHalfReverse ? firstHalf = false : firstHalf = true;
  }



  // for (let i=1;i<data.length;i++){
  //   let cell = document.createElement('td');
  //   cell.classList.add('classes');
  //   for (let k=0;k<currentHalf.length;k++){
  //     let entry = document.createElement('p');
  //     entry.innerHTML = data[i][currentHalf[k]];
  //     try {
  //             cell.appendChild(entry);
  //     }
  //     catch(error){
  //
  //     }
  //     // console.log(data[0][currentHalf[k]]);
  //   }
    // document.querySelectorAll('.row')[k].appendChild(cell);
  // }
}

setInterval(function(){
  listMajors();
}, 10000);

// var justHidden = false;
// var j;
// document.getElementsByTagName('body')[0].style.cursor = 'none';
//
// function hide() {
//   document.getElementsByTagName('body')[0].style.cursor = 'none';
//   justHidden = true;
//   setTimeout(function() {
//     justHidden = false;
//   }, 500);
// }
// document.addEventListener("mousemove", function() {
//   if (!justHidden) {
//     justHidden = false;
//     clearTimeout(j);
//       document.getElementsByTagName('body')[0].style.cursor = 'default';
//     j = setTimeout(hide, 1000);
//   }
// });

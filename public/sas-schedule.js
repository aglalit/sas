const GetSheetDone = require('get-sheet-done');
const moment = require('moment');
GetSheetDone.labeledCols('1lvG1lGsKc2x5r1a5C9_sihymy9SGswBUoJElxjJpLP4').then(sheet => generateSchedule(sheet));
const classNumbers = {
  "8:00":"1",
  "9:40":"2",
  "11:30":"3",
  "14:00":"4",
  "15:45":"5",
  "17:30":"6",
  "19:10":"7"
};
let firstHalf = true;
let firstHalfReverse = false;

document.querySelector('.date').innerHTML = moment().format('dddd DD/MM, H:mm');
function generateSchedule(sheet){
  let data = sheet.data;
  console.log(data);
  let delimiterPosition = data[0].indexOf
  // if(!moment().isBefore(moment(data[0].changetime, 'HH:mm'))){firstHalf = false;}
  // console.log(sheet)
  let dataToArray = Object.getOwnPropertyNames(data[0]);
  let currentHalf;
  let indexOfDelimiter = dataToArray.indexOf('changetime');
  if (firstHalf){
    currentHalf = dataToArray.splice(0,indexOfDelimiter)
  }
  else { currentHalf = dataToArray.splice(indexOfDelimiter+1) }
  let rows = document.querySelectorAll('.row');
  for (let t=0;t<rows.length;t++){
    document.querySelector(".table").deleteRow(0);
  }
  for (let k=0;k<currentHalf.length;k++){
    let row = document.createElement('tr');
    row.classList.add('row');
    let timeEntry = document.createElement('td');
    timeEntry.innerHTML = data[0][currentHalf[k]].replace(/-/g,'–').replace(/—/g,' – ').replace(/–/g,' – ');;
    let timeEntryStart = data[0][currentHalf[k]].split('–')[0];
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
    for (let i=1;i<data.length;i++){
      let entryText = data[i][currentHalf[k]];
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

  if((moment().format('mm')%10 === 5 && moment().format('ss')<=32) && data['1'].changetime.length > 1){
    if (data['1'].changetime) document.querySelector('.announcement').src = data['1'].changetime;
    announcementContainer.style.opacity = '1';
    firstHalfReverse = false;
  }
  else if((moment().format('mm')%10 === 0 && moment().format('ss')<=32) && data['2'].changetime.length > 1){
    if (data['2'].changetime) document.querySelector('.announcement').src = data['2'].changetime;
    else if (data['1'].changetime) document.querySelector('.announcement').src = data['1'].changetime;

    announcementContainer.style.opacity = '1';
    firstHalfReverse = true;
  }
  else {
    announcementContainer.style.opacity = '0';
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
  GetSheetDone.labeledCols('1lvG1lGsKc2x5r1a5C9_sihymy9SGswBUoJElxjJpLP4').then(sheet => generateSchedule(sheet));
}, 20000);

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

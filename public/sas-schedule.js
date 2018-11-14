const GetSheetDone = require('get-sheet-done');
const moment = require('moment');
GetSheetDone.labeledCols('120_7j9FsFxBkoG2W0aX0d4wdgKP2r2RK52wNMq52frc').then(sheet => generateSchedule(sheet));
document.querySelector('.date').innerHTML = moment().format('MMMM, D');
function generateSchedule(sheet){
  let data = sheet.data;
  let firstHalf = true;
  let delimiterPosition = data[0].indexOf
  if(!moment().isBefore(moment(data[0].changetime, 'HH:mm'))){firstHalf = false;}
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
    row.classList.add('row')
    let timeEntry = document.createElement('td');
    timeEntry.innerHTML = data[0][currentHalf[k]];
    timeEntry.classList.add('time');
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
      let professorText = '('+entryText.join('(');
      professorText = professorText
      .replace(/\s/g,'&nbsp;')
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
  GetSheetDone.labeledCols('120_7j9FsFxBkoG2W0aX0d4wdgKP2r2RK52wNMq52frc').then(sheet => generateSchedule(sheet));
  console.log("refreshed"); }, 10000);

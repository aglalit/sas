const urlParams = new URLSearchParams(window.location.search);
var subjectUrl = urlParams.get('s');
var allAnswers, allNext, allPrev;

const classSizes = {

};

var dataToExportCSV = [];

if (subjectUrl === 'all') {
  document.querySelector('.allLinks').style.display = 'block';
  document.querySelectorAll('h2').forEach((el) => {
    el.style.display = 'none';
  });
  var dataParsedAll = {};
  data[0].forEach(function (el) {
    for (var i in el.polls) {
      var i_inner = i;
      if (i === 'ba_2020_q1_elective1' || i === 'ba_2020_q1_elective2' || i === 'ba_2020_q1_elective3' || i === 'ba_2020_q1_major1' || i === 'ba_2020_q1_major2' || i === 'ba_2020_q1_major3') {
        i_inner = 'ba_2020_q1_electives';
      }

      if (dataParsedAll[i_inner]) {
        dataParsedAll[i_inner].unshift({
          polls: {
            [i]: el.polls[i]
          }
        });
      } else {
        dataParsedAll[i_inner] = [];
      }
    }
  });
  for (var s in dataParsedAll) {
    displaySubject([dataParsedAll[s]], s);
  }
} else {
  displaySubject(data, subjectUrl);
}

function displaySubject (data, subject) {
  // console.log(data[0]);
  var dataParsed = [];
  var currentEntry = 0;
  var color;
  var currentAnswerCounter = document.querySelector('.currentAnswerCounter');

  // DISPLAY ALL LINKS

  if (subject === 'ba_2020_q1_electives') {
    data[0].forEach(function (el) {
      if (el.polls.ba_2020_q1_elective1) dataParsed.unshift(JSON.parse(el.polls.ba_2020_q1_elective1));
      if (el.polls.ba_2020_q1_elective2) dataParsed.unshift(JSON.parse(el.polls.ba_2020_q1_elective2));
      if (el.polls.ba_2020_q1_elective3) dataParsed.unshift(JSON.parse(el.polls.ba_2020_q1_elective3));
      if (el.polls.ba_2020_q1_major1) dataParsed.unshift(JSON.parse(el.polls.ba_2020_q1_major1));
      if (el.polls.ba_2020_q1_major2) dataParsed.unshift(JSON.parse(el.polls.ba_2020_q1_major2));
      if (el.polls.ba_2020_q1_major3) dataParsed.unshift(JSON.parse(el.polls.ba_2020_q1_major3));
    });
  } else {
    data[0].forEach(function (el) {
      if (typeof el.polls[subject] === 'object' && el.polls[subject] !== null) dataParsed.unshift(el.polls[subject]);
      else dataParsed.unshift(JSON.parse(el.polls[subject]));
    });
  }

  // console.log(dataParsed);

  var teacher = urlParams.get('t');
  if (teacher) {
    color = 'red';
    document.querySelectorAll('.displayTeacher').forEach((el) => {
      el.style.display = 'inline-block';
    });
    document.querySelectorAll('h2').forEach((el) => {
      el.style.display = 'block';
    });
  }

  var dataParsedFiltered = [];
  var teacherHeader = document.querySelector('.teacher');

  // dataParsed.forEach((el) => {
  //   if(el["Who taught this course"] === 'Louis Vervoort'){
  //     console.log(el);
  //   }
  // })

  // if (subject === 'ba_2020_year2_module5_art') {
  //   teacher = 'Erika Wolf';
  //   dataParsed.forEach((el) => {
  //     el["Who taught this course"] = teacher
  //   })
  //   teacherHeader.innerHTML = 'Interpreting Artworks';
  // }
  if (teacher) {
    var regex = new RegExp(teacher.replace(/\(/g, '\\(').replace(/\)/g, '\\)'), 'i');
    dataParsedFiltered = dataParsed.filter((entry) => {
      return entry['Who taught this course'].match(regex);
    });
    teacherHeader.innerHTML = dataParsedFiltered[0]['Who taught this course'];

    dataParsed = dataParsedFiltered;
  }

  var answersNumber = dataParsed.length;
  currentAnswerCounter.innerHTML = (currentEntry + 1) + '/' + answersNumber;

  allAnswers = function (currentEntry) {
    var table = document.querySelector('#all');
    table.innerHTML = '';
    for (var key in dataParsed[currentEntry]) {
      if (key === 'Who taught this course' && !dataParsed[currentEntry][key]) continue;
      if (key === 'subject') continue;
      var row = document.createElement('tr');
      table.appendChild(row);
      var td1 = document.createElement('td');
      td1.innerHTML = key;
      td1.classList.add('key');
      var td2 = document.createElement('td');
      td2.innerHTML = dataParsed[currentEntry][key];
      td2.classList.add('value');
      row.appendChild(td1);
      row.appendChild(td2);
      currentAnswerCounter.innerHTML = (currentEntry + 1) + '/' + answersNumber;
    }
  };

  allNext = function () {
    if (currentEntry == dataParsed.length - 1) currentEntry = 0;
    else {
      currentEntry += 1;
    }
    allAnswers(currentEntry);
  };

  allPrev = function () {
    if (currentEntry == 0) currentEntry = dataParsed.length - 1;
    else {
      currentEntry -= 1;
    }
    allAnswers(currentEntry);
  };

  if (subjectUrl !== 'all') {
    allAnswers(currentEntry);

    // COMMENTS

    var dataComments = {};
    dataParsed.forEach(function (el) {
      if (!el['Who taught this course']) el['Who taught this course'] = teacher;
      var entry = el['Who taught this course'];
      if (dataComments[entry] === undefined) {
        dataComments[entry] = {};
      }
    });

    for (var key in dataParsed[1]) {
      if (key !== 'subject') {
        if (isNaN(dataParsed[1][key]) || !dataParsed[1][key]) {
          for (var k in dataComments) {
            dataComments[k][key] = [];
          }
        }
      }
    }

    dataParsed.forEach(function (el) {
      var teacher = el['Who taught this course'];

      for (var key in dataComments[teacher]) {
        dataComments[teacher][key].push(el[key]);
      }
      delete dataComments[teacher]['Who taught this course'];
    });

    var commentsDiv = document.querySelector('.comments');
    for (var key in dataComments) {
      for (var k in dataComments[key]) {
        var question = document.getElementById(k);
        if (!question) {
          question = document.createElement('div');
          question.id = k;
          var header = document.createElement('h3');
          header.innerHTML = k;
          question.appendChild(header);
          commentsDiv.appendChild(question);
        }
        if (subject === 'ba_2020_year2_module8_gb' && k == 'Стоит ли предлагать этому преподавателю вести блок в рамках этого курса в следующем году') {
          var yesNoCounter = document.createElement('p');
          question.appendChild(yesNoCounter);
          yesNoCounter.innerHTML = `Да: ${dataComments[key][k].filter(function (value) { return value === 'Да'; }).length}/${dataComments[key][k].length} (${Math.round(dataComments[key][k].filter(function (value) { return value === 'Да'; }).length / dataComments[key][k].length * 100)}%)`;
        } else {
          dataComments[key][k].forEach(function (el) {
            if (el.length > 2 || el === 'Да') {
              var comment = document.createElement('p');
              comment.innerHTML = el;
              question.appendChild(comment);
            }
          });
        }
      }
    }
  }
  // END IF TEACHER

  // PLOTS
  var dataNumbers = {};

  dataParsed.forEach(function (el) {
    var entry = el['Who taught this course'];
    if (dataNumbers[entry] === undefined) {
      dataNumbers[entry] = {};
    }
  });

  for (var key in dataParsed[2]) {
    if (dataParsed[2][key] >= 1 && dataParsed[1][key] <= 10) {
      for (var k in dataNumbers) {
        dataNumbers[k][key] = [];
      }
    }
  }
  // console.log(JSON.stringify(dataParsed));

  dataParsed.forEach(function (el) {
    var teacher = el['Who taught this course'];

    for (var key in dataNumbers[teacher]) {
      if (key == 'What percentage of the mandatory readings were you able to do during the course') {
        el[key] = Math.round(el[key] / 10);
      }
      dataNumbers[teacher][key].push(el[key]);
    }
  });

  for (var key in dataNumbers[Object.keys(dataNumbers)[0]]) {
    if (key !== 'Who taught this course') {
      var graph = document.createElement('div');
      graph.style.width = '100%';
      graph.height = '70vw';
      document.querySelector('.graphs').appendChild(graph);

      var data = [];
      for (var i = 0; i < Object.keys(dataNumbers).length; i++) {
        var sum; var avg = 0;

        if (dataNumbers[Object.keys(dataNumbers)[i]][key].length) {
          var dataNumbersToReduce = dataNumbers;
          sum = dataNumbersToReduce[Object.keys(dataNumbersToReduce)[i]][key].reduce(function (a, b) {
            if (!b) return parseInt(a);
            else return parseInt(a) + parseInt(b);
          });
          avg = (sum / dataNumbersToReduce[Object.keys(dataNumbersToReduce)[i]][key].length).toPrecision(2);
        }
        data.push({
          histfunc: 'count',
          // x: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
          x: dataNumbers[Object.keys(dataNumbers)[i]][key],
          type: 'histogram',
          name: Object.keys(dataNumbers)[i],
          marker: {
            color: color
          },
          xbins: {
            start: 0.5,
            end: 10.5,
            size: 1
          }

        });
      }

      var layout = {
        title: key + '<br>(average: ' + avg + ')',
        barmode: 'group',
        font: {
          family: 'Agipo-Bold',
          size: 16
        },
        xaxis: {
          range: [0, 11],
          tick0: 1,
          dtick: 1,
          ticklen: 8
        },
        yaxis: {
          tick0: 0,
          dtick: 1,
          ticklen: 8
        }
      };
      if (subjectUrl !== 'all') {
        Plotly.newPlot(graph, data, layout);
      }
    }
  }
  if (subjectUrl === 'all') {
    for (var t in dataNumbers) {
      console.log(t);

      if (t !== undefined && t !== 'undefined' && t !== 'Anna Syrchina') {
      // var dataNumbersToExport = iterationCopy(dataNumbers[t]);
      //
      //
      // dataNumbersToExport['teacher'] = t;
      // dataNumbersToExport['subject'] = subject;
      //
      // dataToExportCSV.push(dataNumbersToExport);

      var table = document.createElement('table');
      table.classList.add('all');
      var tableHead = document.createElement('thead');
      var tableBody = document.createElement('tbody');
      var averageRow = document.createElement('tr');
      var medianRow = document.createElement('tr');
      tableBody.appendChild(averageRow);
      tableBody.appendChild(medianRow);
      var averageTd = document.createElement('td');
      averageTd.innerHTML = 'Average:';
      var medianTd = document.createElement('td');
      medianTd.innerHTML = 'Median:';
      tableHead.appendChild(document.createElement('td'));
      averageRow.appendChild(averageTd);
      medianRow.appendChild(medianTd);
      table.appendChild(tableHead);
      table.appendChild(tableBody);

      var tableHeader = document.createElement('h4');
      var responses;

      for (var q in dataNumbers[t]) {
        var question = document.createElement('td');
        responses = dataNumbers[t][q].length;
        question.innerHTML = q;
        tableHead.appendChild(question);
        var average = document.createElement('td');
        average.innerHTML = (dataNumbers[t][q].reduce(function (a, b) {
          if (!b) return a;
          else return parseInt(a) + parseInt(b);
        }) / dataNumbers[t][q].length).toPrecision(2);
        averageRow.appendChild(average);
        var median = document.createElement('td');
        median.innerHTML = medianFunc(dataNumbers[t][q]);

        medianRow.appendChild(median);

        function medianFunc (arr) {
          arr.sort(function (a, b) { return a - b; });
          var m = arr.length / 2;
          // console.log(arr);
          // console.log(m % 1 == 0 ? (parseInt(arr[m - 1]) + parseInt(arr[m])) / 2 : arr[Math.floor(m)]);
          return m % 1 == 0 ? (parseInt(arr[m - 1]) + parseInt(arr[m])) / 2 : arr[Math.floor(m)];
        }
      }

      console.log(subject);
      console.log(t);

      var elementToAppend = document.querySelector(`.${subject}`);
      var size;
      if (elementToAppend) {
        var teachersArray = elementToAppend.parentNode.querySelectorAll('a');
        teachersArray.forEach(function (el) {
          if (el.innerHTML.includes(t)) size = el.dataset.size;
        });
      }
      tableHeader.innerHTML = `${t}`; /* , response rate — <strong>${Math.round((responses / size) * 100)} %</strong> (${responses} / ${size}) */
      // console.log(subject);
      if (elementToAppend) {
        elementToAppend.appendChild(tableHeader);
        elementToAppend.appendChild(table);
      }
    }
    }
    document.querySelectorAll('.displayTeacher').forEach((el) => {
      el.style.display = 'none';
    });
    document.querySelectorAll('h2').forEach((el) => {
      el.style.display = 'none';
    });
    document.querySelector('.currentAnswerCounter').style.display = 'none';
  }
};

// function convertToCSV(objArray) {
//     var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
//     var str = '';
//     var keys = [];
//     for(var k in objArray[0]) keys.push(k);
//      for (var i = 0; i < keys.length; i++)
//      {
//          if(i==keys.length-1){str=str+keys[i]+'\r\n'}
//              else {str=str+keys[i]+','}
//          }
//      for (var i = 0; i < array.length; i++) {
//         var line = '';
//         for (var index in array[i]) {
//             if (line != '') line += ','
//                if(array[i][index].toString().includes(",") && typeof array[i][index] === 'string'){array[i][index]="\""+array[i][index]+"\""}
//                    line += array[i][index];
//            }
//            str += line + '\r\n';
//        }
//        return str;
//    }

// function exportCSVFile(items, fileTitle) {
//
//     // Convert Object to JSON
//     // var itemsStripped = [];
//     // items.forEach(function(item){itemsStripped.push(item.polls)})
//     var jsonObject = JSON.stringify(items);
//
//     var csv = this.convertToCSV(jsonObject);
//
//     var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
//
//     var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     if (navigator.msSaveBlob) { // IE 10+
//         navigator.msSaveBlob(blob, exportedFilenmae);
//     } else {
//         var link = document.createElement("a");
//         if (link.download !== undefined) { // feature detection
//             // Browsers that support HTML5 download attribute
//             var url = URL.createObjectURL(blob);
//             link.setAttribute("href", url);
//             link.setAttribute("download", exportedFilenmae);
//             link.style.visibility = 'hidden';
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         }
//     }
// }
//
// function isObject(obj) {
//   var type = typeof obj;
//   return type === 'function' || type === 'object' && !!obj;
// };
// function iterationCopy(src) {
//   let target = {};
//   for (let prop in src) {
//     if (src.hasOwnProperty(prop)) {
//       // if the value is a nested object, recursively copy all it's properties
//       if (isObject(src[prop])) {
//         target[prop] = iterationCopy(src[prop]);
//       } else {
//         target[prop] = src[prop];
//       }
//     }
//   }
//   return target;
// }

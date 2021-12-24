const urlParams = new URLSearchParams(window.location.search);
var subjectUrl = urlParams.get('s');
var allAnswers, allNext, allPrev;

var allResponses = 0;

const classSizes = {

};

if (subjectUrl === 'all') {
  document.querySelector('.allLinks').style.display = 'block';
  document.querySelectorAll('h2').forEach((el) => {
    el.style.display = 'none';
  });
  var dataParsedAll = {};
  data[0].forEach(function (el) {
    for (var i in el.polls) {
      var i_inner = i;
      if (i === 'ba_2021_q2_elective1' || i === 'ba_2021_q2_elective2' || i === 'ba_2021_q2_elective3' || i === 'ba_2021_q2_elective4' || i === 'ba_2021_q2_major1' || i === 'ba_2021_q2_major2' || i === 'ba_2021_q2_major3' || i === 'ba_2021_q2_major4') {
        i_inner = 'ba_2021_q2_electives';
      }

      if (dataParsedAll[i_inner]) {
        dataParsedAll[i_inner].unshift({
          polls: {
            [i]: el.polls[i]
          }
        });
      } else {
        dataParsedAll[i_inner] = [{
          polls: {
            [i]: el.polls[i]
          }
        }];
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

  if (subject === 'ba_2021_q2_electives') {
    data[0].forEach(function (el) {
      if (el.polls.ba_2021_q2_elective1) dataParsed.unshift(JSON.parse(el.polls.ba_2021_q2_elective1));
      if (el.polls.ba_2021_q2_elective2) dataParsed.unshift(JSON.parse(el.polls.ba_2021_q2_elective2));
      if (el.polls.ba_2021_q2_elective3) dataParsed.unshift(JSON.parse(el.polls.ba_2021_q2_elective3));
      if (el.polls.ba_2021_q2_elective4) dataParsed.unshift(JSON.parse(el.polls.ba_2021_q2_elective4));
      if (el.polls.ba_2021_q2_major1) dataParsed.unshift(JSON.parse(el.polls.ba_2021_q2_major1));
      if (el.polls.ba_2021_q2_major2) dataParsed.unshift(JSON.parse(el.polls.ba_2021_q2_major2));
      if (el.polls.ba_2021_q2_major3) dataParsed.unshift(JSON.parse(el.polls.ba_2021_q2_major3));
      if (el.polls.ba_2021_q2_major4) dataParsed.unshift(JSON.parse(el.polls.ba_2021_q2_major4));
    });
  } else {
    data[0].forEach(function (el) {
      if (typeof el.polls[subject] === 'object' && el.polls[subject] !== null) dataParsed.unshift(el.polls[subject]);
      else dataParsed.unshift(JSON.parse(el.polls[subject]));
    });
  }

  console.log(dataParsed);

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
      if (key === 'online') continue;
      var row = document.createElement('tr');
      table.appendChild(row);
      var td1 = document.createElement('td');

      let title = key;
      if (title.match(new RegExp('—', 'g')) && title.match(new RegExp('—', 'g')).length > 1) {
        td1.innerHTML = title.replace(/ — [\w\s]+$/gi, '');
      } else {
        td1.innerHTML = title;
      }

      td1.innerHTML = key;
      td1.classList.add('key');
      var td2 = document.createElement('td');
      td2.innerHTML = dataParsed[currentEntry][key];
      if (td2.innerHTML === "4") td2.innerHTML = "Not applicable";
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

  displayAllAnswers = function () {
    var table = document.querySelector('#all');
    table.innerHTML = '';
    for (let entry in dataParsed) {
      for (let key in dataParsed[entry]) {
        if (key === 'Who taught this course' && !dataParsed[entry][key]) continue;
        if (key === 'subject') continue;
        if (key === 'online') continue;
        var row = document.createElement('tr');
        table.appendChild(row);
        var td1 = document.createElement('td');

        let title = key;
        if (title.match(new RegExp('—', 'g')) && title.match(new RegExp('—', 'g')).length > 1) {
          td1.innerHTML = title.replace(/ — [\w\s]+$/gi, '');
        } else {
          td1.innerHTML = title;
        }
        td1.classList.add('key');
        var td2 = document.createElement('td');
        td2.innerHTML = dataParsed[entry][key];
        if (td2.innerHTML === "4") td2.innerHTML = "Not applicable";
        td2.classList.add('value');
        row.appendChild(td1);
        row.appendChild(td2);
        currentAnswerCounter.innerHTML = (currentEntry + 1) + '/' + answersNumber;
      }
      var emptyRow = document.createElement('tr');
      table.appendChild(emptyRow);
      var emptytd1 = document.createElement('td');
      emptytd1.innerHTML = ' <br><br>';
      emptytd1.classList.add('key');
      var emptytd2 = document.createElement('td');
      emptytd2.innerHTML = ' <br><br>';
      emptytd2.classList.add('value');
      emptyRow.appendChild(emptytd1);
      emptyRow.appendChild(emptytd2);
    }
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

    for (var key in dataParsed[0]) {
      if (key !== 'subject') {
        if (isNaN(dataParsed[0][key]) || !dataParsed[0][key]) {
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
      delete dataComments[teacher]['Title'];
      delete dataComments[teacher]['online'];
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
  // END IF TEACHER

  // PLOTS
  const dataNumbers = {};
  const courseTitles = {}
  dataParsed.forEach(function (el, index) {
    const entry = el['Who taught this course'];
    if (courseTitles[entry] === undefined) {
      courseTitles[entry] = el['Title'];
    }
    if (dataNumbers[entry] === undefined) {
      dataNumbers[entry] = {};
      for (const key in el) {
        if (key !== 'online' && parseInt(el[key]) >= 0 && parseInt(el[key]) <= 10) {
          dataNumbers[entry][key] = [];
        }
      }
    }

    for (const key in dataNumbers[entry]) {
      if (el[key].toString() === "4") continue;
      dataNumbers[entry][key].push(el[key]);
    }
  });

  if (subjectUrl !== 'all') {
    for (var key in dataNumbers[Object.keys(dataNumbers)[0]]) {
      if (key !== 'Who taught this course') {

        var graph = document.createElement('div');
        graph.style.width = '100%';
        graph.height = '70vw';
        document.querySelector('.graphs').appendChild(graph);

        var data = [];
        for (var i = 0; i < Object.keys(dataNumbers).length; i++) {
          var sum; var median = 0;

          if (dataNumbers[Object.keys(dataNumbers)[i]][key].length) {
            var dataNumbersToReduce = dataNumbers;
            sum = dataNumbersToReduce[Object.keys(dataNumbersToReduce)[i]][key].reduce(function (a, b) {
              if (!b) return parseInt(a);
              else return parseInt(a) + parseInt(b);
            });
            median = medianFunc(dataNumbersToReduce[Object.keys(dataNumbersToReduce)[i]][key]);
            // (sum / dataNumbersToReduce[Object.keys(dataNumbersToReduce)[i]][key].length).toPrecision(2);
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
              start: -0.5,
              end: 3.5,
              size: 1
            }

          });
        }
        var title = '';
        if (key.match(new RegExp('—', 'g')) && key.match(new RegExp('—', 'g')).length > 1) {
          title = key.replace(/ — [\w\s]+$/gi, '');
        } else {
          title = key;
        }
        var layout = {
          title: title + '<br>(median: ' + median + ')',
          barmode: 'group',
          font: {
            family: 'Agipo-Bold',
            size: 16
          },
          xaxis: {
            range: [-1,4],
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
        Plotly.newPlot(graph, data, layout);
      }
    }
  }
  if (subjectUrl === 'all') {
    for (var t in dataNumbers) {
      if (t !== undefined && t !== 'undefined') {
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

          var title = q;
          if (title.match(new RegExp('—', 'g')) && title.match(new RegExp('—', 'g')).length > 1) {
            question.innerHTML = title.replace(/ — [\w\s]+$/gi, '');
          } else {
            question.innerHTML = title;
          }
          tableHead.appendChild(question);
          var average = document.createElement('td');
          if (!dataNumbers[t][q].length) { console.log(subject);
          console.log(t);}
          var sum = dataNumbers[t][q].reduce(function (a, b) {
            if (!b) return a;
            else return parseInt(a) + parseInt(b);
          });

          average.innerHTML = (sum / dataNumbers[t][q].length).toPrecision(2);
          averageRow.appendChild(average);
          var median = document.createElement('td');
          median.innerHTML = medianFunc(dataNumbers[t][q]);

          medianRow.appendChild(median);
        }

        allResponses += responses;

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
        if (courseTitles[t]) {
          tableHeader.innerHTML = `${t.replace(/ — [\w\s]+/gi, '')} — ${courseTitles[t]}, response rate — <strong>${Math.round((responses / size) * 100)} %</strong> (${responses} / ${size})`;
        } else {
          tableHeader.innerHTML = `${t}, response rate — <strong>${Math.round((responses / size) * 100)} %</strong> (${responses} / ${size})`;
        }

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

function medianFunc (arr) {
  arr.sort(function (a, b) { return a - b; });
  var m = arr.length / 2;
  // console.log(arr);
  // console.log(m % 1 == 0 ? (parseInt(arr[m - 1]) + parseInt(arr[m])) / 2 : arr[Math.floor(m)]);

  return m % 1 == 0 ? (parseInt(arr[m - 1]) + parseInt(arr[m])) / 2 : arr[Math.floor(m)];
}

console.log(allResponses);

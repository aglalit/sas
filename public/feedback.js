var dataParsed = [];
var currentEntry = 0;
var color;
const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get('s');
var currentAnswerCounter = document.querySelector('.currentAnswerCounter');

// DISPLAY ALL LINKS
if (subject === 'all') {
  document.querySelector('.allLinks').style.display = 'block';
  document.querySelectorAll('h2').forEach((el) => {
    el.style.display = 'none';
  })
}


if (subject === 'ba_2019_electives') {
  data[0].forEach(function(el) {
    if (el.polls.ba_2019_year1_module4_electives) dataParsed.unshift(JSON.parse(el.polls.ba_2019_year1_module4_electives));
    if (el.polls.ba_2019_year2_module8_electives) dataParsed.unshift(JSON.parse(el.polls.ba_2019_year2_module8_electives));
    if (el.polls.ba_2019_year2_module8_electives2) dataParsed.unshift(JSON.parse(el.polls.ba_2019_year2_module8_electives2));
  });
} else {
  data[0].forEach(function(el) {
    dataParsed.unshift(JSON.parse(el.polls[subject]));
  });
}

const teacher = urlParams.get('t');
if (teacher || subject === 'ba_2019_year1_module4_history' || subject === 'ba_2019_year2_module8_design_thinking') {
  color = 'red';
  document.querySelectorAll('.displayTeacher').forEach((el) => {
    el.style.display = 'inline-block';
  })
  document.querySelectorAll('h2').forEach((el) => {
    el.style.display = 'block';
  })

  var dataParsedFiltered = [];
  var teacherHeader = document.querySelector('.teacher');

  if (subject === 'ba_2019_year1_module4_history'){
    teacherHeader.innerHTML = 'History';
    dataParsedFiltered = dataParsed;
  }
  if (subject === 'ba_2019_year2_module8_design_thinking'){
    teacherHeader.innerHTML = 'Design Thinking';
    dataParsedFiltered = dataParsed;
  }


  if (subject !== 'ba_2019_year1_module4_history' && subject !== 'ba_2019_year2_module8_design_thinking' && subject !== 'ba_2019_year2_module8_gb') {
    var regex = new RegExp(teacher, 'i');
    if (teacher === 'duskin') regex = 'Duskin Drum';
    dataParsedFiltered = dataParsed.filter((entry) => {
      return entry["Who taught this course"].match(regex)
    });
    teacherHeader.innerHTML = dataParsedFiltered[0]["Who taught this course"];
  } else if (subject === 'ba_2019_year2_module8_gb'){
    var allowed;
    if (teacher === 'щербенок') {
      allowed = Object.keys(dataParsed[0]).filter(function(key) {
        return /1/.test(key);
      });
      teacherHeader.innerHTML = 'Andrey Shcherbenok';
    }
    else if (teacher === 'ушакова') {
      allowed = Object.keys(dataParsed[0]).filter(function(key) {
        return /2/.test(key);
      });
      teacherHeader.innerHTML = 'Olga Ushakova';
    }
    else if (teacher === 'tangney') {
      allowed = Object.keys(dataParsed[0]).filter(function(key) {
        return /3/.test(key);
      });
      teacherHeader.innerHTML = 'John Tangney';
    }
    else if (teacher === 'mulhall') {
      allowed = Object.keys(dataParsed[0]).filter(function(key) {
        return /4/.test(key);
      });
      teacherHeader.innerHTML = 'Anne Mulhall';
    }
      dataParsed.forEach((entry) => {
        dataParsedFiltered.push(Object.keys(entry)
          .filter(key => allowed.includes(key))
          .reduce((obj, key) => {
            obj[key.slice(0,-1)] = entry[key];
            return obj;
          }, {})
        );
      })
      // dataParsedFiltered = dataParsed.map((entry) => {
      //   return entry["Who taught this course"].match(regex)
      //   })
  }
  dataParsed = dataParsedFiltered;
  var answersNumber = dataParsed.length;
  currentAnswerCounter.innerHTML = (currentEntry + 1) + "/" + answersNumber;

  function allAnswers(currentEntry) {
    var table = document.querySelector('#all');
    table.innerHTML = '';
    for (var key in dataParsed[currentEntry]) {
      if (key == "Who taught this course") continue;
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
      currentAnswerCounter.innerHTML = (currentEntry + 1) + "/" + answersNumber;
    }
  }

  function allNext() {
    if (currentEntry == dataParsed.length - 1) currentEntry = 0;
    else {
      currentEntry += 1;
    }
    allAnswers(currentEntry)
  }

  function allPrev() {
    if (currentEntry == 0) currentEntry = dataParsed.length - 1;
    else {
      currentEntry -= 1;
    }
    allAnswers(currentEntry)
  }
  allAnswers(currentEntry);

  // COMMENTS

  var dataComments = {};
  dataParsed.forEach(function(el) {
    if (!el['Who taught this course']) el['Who taught this course'] = teacher;
    var entry = el['Who taught this course'];
    if (dataComments[entry] === undefined) {
      dataComments[entry] = {};
    }
  });

  for (var key in dataParsed[0]) {
    if (isNaN(dataParsed[0][key])) {
      for (var k in dataComments) {
        dataComments[k][key] = []
      }
    }
  }

  dataParsed.forEach(function(el) {
    var teacher = el['Who taught this course'];

    for (var key in dataComments[teacher]) {
      dataComments[teacher][key].push(el[key])
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
      if (subject === 'ba_2019_year2_module8_gb' && k == 'Стоит ли предлагать этому преподавателю вести блок в рамках этого курса в следующем году'){
        var yesNoCounter = document.createElement('p');
        question.appendChild(yesNoCounter);
        yesNoCounter.innerHTML = `Да: ${dataComments[key][k].filter(function(value){ return value === 'Да';}).length}/${dataComments[key][k].length} (${Math.round(dataComments[key][k].filter(function(value){ return value === 'Да';}).length/dataComments[key][k].length*100)}%)`
      }
      else {
        dataComments[key][k].forEach(function(el) {
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
dataParsed.forEach(function(el) {
  var entry = el['Who taught this course'];
  if (dataNumbers[entry] === undefined) {
    dataNumbers[entry] = {};
  }
});

for (var key in dataParsed[1]) {
  if (!isNaN(dataParsed[1][key])) {
    for (var k in dataNumbers) {
      dataNumbers[k][key] = []
    }
  }
}


dataParsed.forEach(function(el) {
  var teacher = el['Who taught this course'];

  for (var key in dataNumbers[teacher]) {
    if (key == 'What percentage of the mandatory readings were you able to do during the course') {
      el[key] = Math.round(el[key] / 10);
    }
    dataNumbers[teacher][key].push(el[key])
  }
});


for (var key in dataNumbers[Object.keys(dataNumbers)[0]]) {
  var graph = document.createElement('div');
  graph.style.width = "100%";
  graph.height = "70vw";
  document.querySelector('.graphs').appendChild(graph);

  var data = [];
  for (var i = 0; i < Object.keys(dataNumbers).length; i++) {
    var sum, avg = 0;

    if (dataNumbers[Object.keys(dataNumbers)[i]][key].length) {
      var dataNumbersToReduce = dataNumbers;
      sum = dataNumbersToReduce[Object.keys(dataNumbersToReduce)[i]][key].reduce(function(a, b) {
        if (!b) return a;
        else return parseInt(a) + parseInt(b);
      });
      avg = (sum / dataNumbersToReduce[Object.keys(dataNumbersToReduce)[i]][key].length).toPrecision(2);
    }
    data.push({
      histfunc: 'count',
      //x: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      x: dataNumbers[Object.keys(dataNumbers)[i]][key],
      type: 'histogram',
      name: Object.keys(dataNumbers)[i],
      marker: {
        color: color
      },
      xbins: {
        start: 1,
        end: 10,
        size: 1,
      }
    })
  }

  var layout = {
    title: key + ' (average: ' + avg + ')',
    barmode: 'group',
    font: {
      family: 'Agipo-Bold',
      size: 16
    },
  }
  Plotly.newPlot(graph, data, layout);
}

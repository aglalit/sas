const urlParams = new URLSearchParams(window.location.search);
var subjectUrl = urlParams.get('s');
var allAnswers, allNext, allPrev;

if (subjectUrl === 'all') {
  document.querySelector('.allLinks').style.display = 'block';
  document.querySelectorAll('h2').forEach((el) => {
    el.style.display = 'none';
  });
  var dataParsedAll = {};
  data[0].forEach(function(el) {
    for (var i in el.polls) {
      var i_inner = i;
      if (i === 'ba_2019_module1_elective1' || i === 'ba_2019_module1_elective2' || i === 'ba_2019_module1_elective3' || i === 'ba_2019_module1_major1' || i === 'ba_2019_module1_major2') {
        i_inner = 'ba_2019_electives';
      }
      if (i === 'ba_2019_year2_module5_poms_louis' || i === 'ba_2019_year2_module5_poms_krishna' || i === 'ba_2019_year2_module5_poms_juliette') {
        i_inner = 'ba_2019_year2_module5_poms';
      }
      if (dataParsedAll[i_inner]) {

        dataParsedAll[i_inner].unshift({
          'polls': {
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



function displaySubject(data, subject) {

  // console.log(data[0]);
  var dataParsed = [];
  var currentEntry = 0;
  var color;
  var currentAnswerCounter = document.querySelector('.currentAnswerCounter');

  // DISPLAY ALL LINKS

  if (subject === 'ba_2019_electives') {
    data[0].forEach(function(el) {
      if (el.polls.ba_2019_module1_elective1) dataParsed.unshift(JSON.parse(el.polls.ba_2019_module1_elective1));
      if (el.polls.ba_2019_module1_elective2) dataParsed.unshift(JSON.parse(el.polls.ba_2019_module1_elective2));
      if (el.polls.ba_2019_module1_elective3) dataParsed.unshift(JSON.parse(el.polls.ba_2019_module1_elective3));
      if (el.polls.ba_2019_module1_major1) dataParsed.unshift(JSON.parse(el.polls.ba_2019_module1_major1));
      if (el.polls.ba_2019_module1_major2) dataParsed.unshift(JSON.parse(el.polls.ba_2019_module1_major2));
    });
  }
  else if (subject === 'ba_2019_year2_module5_poms') {
    data[0].forEach(function(el) {
      if (el.polls.ba_2019_year2_module5_poms_krishna) dataParsed.unshift(JSON.parse(el.polls.ba_2019_year2_module5_poms_krishna));
      if (el.polls.ba_2019_year2_module5_poms_louis) dataParsed.unshift(JSON.parse(el.polls.ba_2019_year2_module5_poms_louis));
      if (el.polls.ba_2019_year2_module5_poms_juliette) dataParsed.unshift(JSON.parse(el.polls.ba_2019_year2_module5_poms_juliette));
    });
  }
  else {
    data[0].forEach(function(el) {
      dataParsed.unshift(JSON.parse(el.polls[subject]));
    });
  }



  var teacher = urlParams.get('t');
  if (teacher){
    color = 'red';
    document.querySelectorAll('.displayTeacher').forEach((el) => {
      el.style.display = 'inline-block';
    })
    document.querySelectorAll('h2').forEach((el) => {
      el.style.display = 'block';
    })
  }

    var dataParsedFiltered = [];
    var teacherHeader = document.querySelector('.teacher');

    dataParsed.forEach((el) => {
      if(el["Who taught this course"] === 'Svetlana Erpyleva'){
        console.log(el);
      }
    })

    if (subject === 'ba_2019_year1_module4_history') {
      teacher = 'Tomasz Blusiewisz';
      dataParsed.forEach((el) => {
        el["Who taught this course"] = teacher
      })
      teacherHeader.innerHTML = 'History';
    }
    if (subject === 'ba_2019_year2_module8_design_thinking') {
      teacherHeader.innerHTML = 'Design Thinking';
      teacher = 'Sergey Lukas';
      dataParsed.forEach((el) => {
        el["Who taught this course"] = teacher
      });
    }
    if (subject === 'ba_2019_year2_module5_poms') {
      dataParsed.forEach((el) => {
        if (el.subject == 'ba-2019-year2-module5-poms-louis'){
          el["Who taught this course"] = 'Louis Vervoort';
        }
        else if (el.subject == 'ba-2019-year2-module5-poms-juliette'){
          el["Who taught this course"] = 'Juliette Colinas';
        }
        else if (el.subject == 'ba-2019-year2-module5-poms-krishna'){
          el["Who taught this course"] = 'Krishna K';
        }
      })
      teacherHeader.innerHTML = 'History';
    }
    if (subject === 'ba_2019_year2_module5_art') {
      teacher = 'Erika Wolf';
      dataParsed.forEach((el) => {
        el["Who taught this course"] = teacher
      })
      teacherHeader.innerHTML = 'History';
    }
    if (subject === 'ba_2019_year2_module8_gb') {
      dataParsedFiltered = [];
      dataParsedTeachers = ['Андрей Щербенок', 'Ольга Ушакова', 'John Tangney', 'Anne Mulhall'];
      var allowed;
      for (var k = 1; k < 5; k++) {
          allowed = Object.keys(dataParsed[0]).filter(function(key) {
          var reg = new RegExp(k)
          return reg.test(key);
        });
        allowed.push('Who taught this course' + k);
        dataParsed.forEach((entry) => {
          // console.log(entry);
          entry['Who taught this course' + k] = dataParsedTeachers[k - 1];
          dataParsedFiltered.push(Object.keys(entry)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
              obj[key.slice(0, -1)] = entry[key];
              return obj;
            }, {})
          );
        });
      }
      if (teacher){
        var regex = new RegExp(teacher, 'i');
        if (teacher === 'duskin') regex = 'Duskin Drum';
        dataParsedFiltered = dataParsedFiltered.filter((entry) => {
          return entry["Who taught this course"].match(regex)
        });
        teacherHeader.innerHTML = dataParsedFiltered[0]["Who taught this course"];
      }
      dataParsed = dataParsedFiltered;
    } else {
      if (teacher){
        var regex = new RegExp(teacher, 'i');
        if (teacher === 'duskin') regex = 'Duskin Drum';
        dataParsedFiltered = dataParsed.filter((entry) => {
          return entry["Who taught this course"].match(regex)
        });
        teacherHeader.innerHTML = dataParsedFiltered[0]["Who taught this course"];

        dataParsed = dataParsedFiltered;
      }
    }

    var answersNumber = dataParsed.length;
    currentAnswerCounter.innerHTML = (currentEntry + 1) + "/" + answersNumber;

    allAnswers = function(currentEntry) {
      var table = document.querySelector('#all');
      table.innerHTML = '';
      for (var key in dataParsed[currentEntry]) {
        if (key == "Who taught this course" && !dataParsed[currentEntry][key]) continue;
        if (key == "subject") continue;
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

    allNext = function() {
      if (currentEntry == dataParsed.length - 1) currentEntry = 0;
      else {
        currentEntry += 1;
      }
      allAnswers(currentEntry)
    }

    allPrev = function() {
      if (currentEntry == 0) currentEntry = dataParsed.length - 1;
      else {
        currentEntry -= 1;
      }
      allAnswers(currentEntry)
    }

    if (subjectUrl !== 'all') {
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
        if (key !== 'subject'){
            if (isNaN(dataParsed[0][key])) {
              for (var k in dataComments) {
                dataComments[k][key] = []
              }
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
          if (subject === 'ba_2019_year2_module8_gb' && k == 'Стоит ли предлагать этому преподавателю вести блок в рамках этого курса в следующем году') {
            var yesNoCounter = document.createElement('p');
            question.appendChild(yesNoCounter);
            yesNoCounter.innerHTML = `Да: ${dataComments[key][k].filter(function(value){ return value === 'Да';}).length}/${dataComments[key][k].length} (${Math.round(dataComments[key][k].filter(function(value){ return value === 'Да';}).length/dataComments[key][k].length*100)}%)`
          } else {
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

  for (var key in dataParsed[31]) {
    if (!isNaN(dataParsed[31][key])) {
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
    if (key !== 'Who taught this course'){
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
            if (!b) return parseInt(a);
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
        title: key + '<br>(average: ' + avg + ')',
        barmode: 'group',
        font: {
          family: 'Agipo-Bold',
          size: 16
        },
      }
      if (subjectUrl !== 'all') {
        Plotly.newPlot(graph, data, layout);
      }
    }
  }
  if (subjectUrl === 'all') {

    for (var t in dataNumbers) {
      var table = document.createElement('table');
      table.classList.add('all');
      var tableHead = document.createElement('thead');
      var tableBody = document.createElement('tbody');
      table.appendChild(tableHead);
      table.appendChild(tableBody);

      var tableHeader = document.createElement('h4');
      tableHeader.innerHTML = t;
      for (var q in dataNumbers[t]) {
        var question = document.createElement('td');
        question.innerHTML = q;
        tableHead.appendChild(question);
        var answer = document.createElement('td');
        answer.innerHTML = (dataNumbers[t][q].reduce(function(a, b) {
          if (!b) return a;
          else return parseInt(a) + parseInt(b);
        }) / dataNumbers[t][q].length).toPrecision(2);
        tableBody.appendChild(answer);
      }
      if(subject !== 'ba_2019_year1_module1_spb'){
        document.querySelector(`.${subject}`).appendChild(tableHeader);
        document.querySelector(`.${subject}`).appendChild(table);
      }
    }
    document.querySelectorAll('.displayTeacher').forEach((el) => {
      el.style.display = 'none';
    })
    document.querySelectorAll('h2').forEach((el) => {
      el.style.display = 'none';
    })
    document.querySelector('.currentAnswerCounter').style.display = 'none';
  }
};

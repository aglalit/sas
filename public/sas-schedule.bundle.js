window.onload = function () {
  var postWrapper = document.querySelector('.schedule');
  fetch('https://schoolofadvancedstudies.herokuapp.com/schedule_data')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      generateSchedule(JSON.parse(data), postWrapper);
    });
};

function generateSchedule (data, postWrapper) {
  // set to Monday of this week
  var monday = new Date();
  var sunday = new Date();
  if (monday.getDay() === 0)	{
    monday.setDate(monday.getDate() + 1);
    sunday.setDate(sunday.getDate() + 1);
  }
  monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7);
  var mondayDateString = String.prototype.concat('0', monday.getDate()).slice(-2);
  var mondayMonthString = String.prototype.concat('0', monday.getMonth() + 1).slice(-2);
  sunday.setDate(sunday.getDate() + (7 - sunday.getDay()) % 7);

  var sundayMonthString = String.prototype.concat('0', sunday.getMonth() + 1).slice(-2);
  var sundayDateString = String.prototype.concat('0', sunday.getDate()).slice(-2);
  var currentWeekString = `${mondayDateString}.${mondayMonthString}-${sundayDateString}.${sundayMonthString}`;

  var currentWeek = data[currentWeekString];

  var dates = Object.keys(data)[0].split(' ')[1];

  var scheduleHeader = document.querySelector('.schedule-header');

  scheduleHeader.innerHTML += `<span class="red">${currentWeekString.replace('-', '–')}</span>`;
  scheduleHeader.classList.add('row_padding-bottom_half');
  postWrapper.innerHTML = '';

  for (dayProp in currentWeek) {
    var day = currentWeek[dayProp];

    // SKIPPING EMPTY DAYS
    var isEmptyDay = true;
    for (timeProp in day) {
      if (Object.keys(day[timeProp]).length) isEmptyDay = false;
    }
    if (isEmptyDay) continue;
    // SKIPPING EMPTY DAYS

    var tableWrapper = document.createElement('div');
    var flexContainer = document.createElement('div');

    var dateHeader = document.createElement('div');
    dateHeader.classList.add('date', 'accordeon__row-title');
    dateHeader.setAttribute('onclick', 'expandAccordeon(event)');
    dateHeader.innerHTML = `<a class="accordeon__row-link" href="javascript:void(0);">${dayProp}</a>`;
    tableWrapper.appendChild(dateHeader);
    flexContainer.classList.add('accordeon__row-content');
    tableWrapper.classList.add('accordeon__row', 'accordeon__row_standalone', 'nopadding-top');
    tableWrapper.appendChild(flexContainer);
    postWrapper.appendChild(tableWrapper);
    var tableContainer = document.createElement('div');
    tableContainer.classList.add('tablecontainer');
    flexContainer.appendChild(tableContainer);
    var table = document.createElement('table');
    table.classList.add('table');
    tableContainer.appendChild(table);
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    var rowIndex = 0;

    for (timeProp in day) {
      var timeEntry = day[timeProp];
      rowIndex++;
      if (Object.keys(timeEntry).length) {
        var row = document.createElement('tr');
        row.classList.add('row');
        tbody.appendChild(row);
        var classNumber = document.createElement('td');
        classNumber.classList.add('classNumber');
        var classNumberSpan = document.createElement('span');
        classNumberSpan.classList.add('classNumberSpan');
        classNumberSpan.innerHTML = rowIndex;
        row.appendChild(classNumber);
        classNumber.appendChild(classNumberSpan);
        var time = document.createElement('td');
        time.classList.add('time');
        time.innerHTML = timeProp;
        var classes = document.createElement('td');
        classes.classList.add('classes');
        row.appendChild(time);
        row.appendChild(classes);

        for (classEntry in timeEntry) {
          var teacher = timeEntry[classEntry].teacher;
          var room = timeEntry[classEntry].room;
          var isURL = room.match(/^http(s)?:\/\/((\d+\.\d+\.\d+\.\d+)|(([\w-]+\.)+([a-z,A-Z][\w-]*)))(:[1-9][0-9]*)?(\/([\w-.\/:%+@&=]+[\w- .\/?:%+@&=]*)?)?(#(.*))?$/i);
          var classParagraph = document.createElement('p');
          var title = document.createElement('span');
          title.classList.add('title');

          if (isURL) {
            title.innerHTML = `<a href="${room}" target="_blank">${classEntry}</a>`;
          } else title.innerHTML = classEntry;
          classParagraph.appendChild(title);
          var professor = document.createElement('span');
          professor.classList.add('professor');
          classParagraph.appendChild(professor);

          if (room && teacher && !isURL) professor.innerHTML = ` (${timeEntry[classEntry].teacher} — ${timeEntry[classEntry].room})`;
          else if (room && !isURL) professor.innerHTML = ` (${timeEntry[classEntry].room})`;
          else if (teacher) professor.innerHTML = ` (${timeEntry[classEntry].teacher})`;
          classes.appendChild(classParagraph);
        }
      }
    }
  }
}

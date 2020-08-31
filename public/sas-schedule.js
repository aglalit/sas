const moment = require('moment');
var firstHalf = true;
var firstHalfReverse = false;
var postWrapper = document.querySelector('.schedule');

window.onload = function () {
  window.setInterval(function () {
    generateSchedule();
  }, 5000);
};

function generateSchedule () {
  fetch('https://schoolofadvancedstudies.herokuapp.com/schedule_data')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var dataParsed = JSON.parse(data);
      // set to Monday of this week
      var monday = new Date();
      var sunday = new Date();
      var now = new Date();
      if (monday.getDay() === 0) {
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

      var currentWeek = dataParsed[currentWeekString];
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      var day = currentWeek[days[now.getDay()]];
      var tableWrapper = document.createElement('div');
      var flexContainer = document.createElement('div');
      tableWrapper.appendChild(flexContainer);
      var tableContainer = document.createElement('div');
      tableContainer.classList.add('tablecontainer');
      flexContainer.appendChild(tableContainer);
      var table = document.createElement('table');
      table.classList.add('table');
      tableContainer.appendChild(table);
      var tbody = document.createElement('tbody');
      table.appendChild(tbody);
      var rowIndex = 0;

      var timeIndex = 0;
      var dayKeys = Object.keys(day);
      lastEntryIndex = day.divider - 1;

      if (!firstHalf) {
        timeIndex = parseInt(day.divider) - 1;
        lastEntryIndex = parseInt(day.divider) + timeIndex;
      }
      for (var i = timeIndex; i < lastEntryIndex; i++) {
        if (!dayKeys[i] || dayKeys[i] === 'announcement1') break;
        var timeEntry = day[dayKeys[i]];
        rowIndex++;
        if (timeEntry && Object.keys(timeEntry).length) {
          var row = document.createElement('tr');
          row.classList.add('row');
          tbody.appendChild(row);
          var classNumber = document.createElement('td');
          classNumber.classList.add('classNumber');
          var classNumberSpan = document.createElement('span');
          classNumberSpan.classList.add('classNumberSpan');
          classNumberSpan.innerHTML = i+1;
          row.appendChild(classNumber);
          classNumber.appendChild(classNumberSpan);
          var time = document.createElement('td');
          time.classList.add('time');
          time.innerHTML = dayKeys[i].replace(/-/g, '–');
          var classes = document.createElement('td');
          classes.classList.add('classes');
          row.appendChild(time);
          row.appendChild(classes);

          // RED HIGHLIGHTING
          const timeEntryStart = dayKeys[i].split('-')[0];
          const timeEntryEnd = dayKeys[i].split('-')[1];
          var beginningTime = moment(timeEntryStart, 'H:mm');
          var endTime = moment(timeEntryEnd, 'H:mm');
          if (timeEntryStart.indexOf('/') < 0 && beginningTime.isBefore(moment()) && moment().isBefore(endTime)) {
            classNumberSpan.classList.add('red_highlight');
            time.classList.add('red_highlight');
            time.style.color = '#fff';
          }

          for (classEntry in timeEntry) {
            var teacher = timeEntry[classEntry].teacher;
            var room = timeEntry[classEntry].room;
            var isURL = false;
            // NO URLS ON THE WALL
            // room.match(/^http(s)?:\/\/((\d+\.\d+\.\d+\.\d+)|(([\w-]+\.)+([a-z,A-Z][\w-]*)))(:[1-9][0-9]*)?(\/([\w-.\/:%+@&=]+[\w- .\/?:%+@&=]*)?)?(#(.*))?$/i);
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

        document.querySelector('.date').innerHTML = '<span class="red">' + moment().format('dddd') + '</span> ' + moment().format('DD/MM, H:mm');

        var announcementContainer = document.querySelector('.flex-container-img');
        var pitbContainer = document.querySelector('.flex-container-pitb');

        if ((moment().format('mm') % 10 === 5 && moment().format('ss') <= 32) && day.announcement1) {
          if (day.announcement1) document.querySelector('.announcement').src = day.announcement1;
          else if (day.announcement2) document.querySelector('.announcement').src = day.announcement2;
          announcementContainer.style.opacity = '1';
          announcementContainer.style.zIndex = '99';
          firstHalfReverse = false;
        } else if ((moment().format('mm') % 10 === 0 && moment().format('ss') <= 32) && day.announcement2) {
          if (day.announcement2) document.querySelector('.announcement').src = day.announcement2;
          else if (day.announcement1) document.querySelector('.announcement').src = day.announcement1;

          announcementContainer.style.opacity = '1';
          announcementContainer.style.zIndex = '99';
          firstHalfReverse = true;
        } else if ((moment().format('mm') % 10 === 0 && moment().format('ss') <= 32) && day.announcement2) {
          if (day.announcement2) document.querySelector('.announcement').src = day.announcement2;
          else if (day.announcement1) document.querySelector('.announcement').src = day.announcement1;
          // pitbContainer.style.opacity = '1';
          // pitbContainer.style.zIndex = '99';
          // document.querySelector('.schedule-title').innerHTML = 'Professor in the Box';
          firstHalfReverse = true;
        } else if (((moment().format('mm') % 10 === 2 || moment().format('mm') % 10 === 4 || moment().format('mm') % 10 === 6 || moment().format('mm') % 10 === 8) && moment().format('ss') <= 32) && day.announcement3) {
          if (day.announcement3) document.querySelector('.announcement').src = day.announcement3;
          announcementContainer.style.opacity = '1';
          announcementContainer.style.zIndex = '99';
          firstHalfReverse = true;
        } else {
          announcementContainer.style.opacity = '0';
          announcementContainer.style.zIndex = '-1';
          document.querySelector('.schedule-title').innerHTML = 'Schedule';
          pitbContainer.style.opacity = '0';
          pitbContainer.style.zIndex = '-1';
        }

        if (moment().format('ss') <= 30) {
          !firstHalfReverse ? firstHalf = true : firstHalf = false;
        } else {
          !firstHalfReverse ? firstHalf = false : firstHalf = true;
        }
      }
      postWrapper.innerHTML = '';
      postWrapper.appendChild(tableWrapper);
      // console.log('updated');
    });
}

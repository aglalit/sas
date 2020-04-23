fetch('https://schoolofadvancedstudies.herokuapp.com/schedule_data')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        generateSchedule(JSON.parse(data))
    });

function generateSchedule(data) {
    var postWrapper = document.querySelector('.post-wrapper');
    var index = 0;
    var currentWeek = data[Object.keys(data)[0]];
    var dates = Object.keys(data)[0].split(' ')[1];

    console.log(currentWeek)
    for (dayProp in currentWeek) {
        var day = currentWeek[dayProp];
        index++;

        var tableWrapper = document.createElement('div');
        var flexContainer = document.createElement('div');
        var scheduleHeader = document.createElement('h2');

        scheduleHeader.classList.add('schedule');
        flexContainer.appendChild(scheduleHeader);
        if (index === 1) {
            scheduleHeader.innerHTML = `Schedule, <span class="red">${dates}</span>`;
        }
        var dateHeader = document.createElement('h2');
        dateHeader.classList.add('date');
        dateHeader.innerHTML = dayProp;
        flexContainer.appendChild(dateHeader);
        flexContainer.classList.add('flex-container');
        tableWrapper.classList.add('schedule-wrapper')
        tableWrapper.appendChild(flexContainer);
        postWrapper.appendChild(tableWrapper);
        var tableContainer = document.createElement('div');
        tableContainer.classList.add('flex-container', 'tablecontainer');
        tableWrapper.appendChild(tableContainer);
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
            classNumber.classList.add('classNumber')
            var classNumberSpan = document.createElement('span');
            classNumberSpan.classList.add('classNumberSpan')
            classNumberSpan.innerHTML = rowIndex;
            row.appendChild(classNumber);
            classNumber.appendChild(classNumberSpan);
            var time = document.createElement('td');
            time.classList.add('time');
            time.innerHTML = timeProp;
            var classes = document.createElement('td');
            classes.classList.add('classes')
            row.appendChild(time);
            row.appendChild(classes);


                for (classEntry in timeEntry) {
                    var teacher = timeEntry[classEntry]['teacher'];
                    var room = timeEntry[classEntry]['room'];
                    var classParagraph = document.createElement('p');
                    var title = document.createElement('span');
                    title.classList.add('title');
                    title.innerHTML = classEntry;
                    classParagraph.appendChild(title);
                    var professor = document.createElement('span');
                    professor.classList.add('professor');
                    classParagraph.appendChild(professor);

                    if (room && teacher) professor.innerHTML = ` (${timeEntry[classEntry]['teacher']} — ${timeEntry[classEntry]['room']})`;
                    else if (room) professor.innerHTML = ` (${timeEntry[classEntry]['room']})`;
                    else if (teacher) professor.innerHTML = ` (${timeEntry[classEntry]['teacher']})`;
                    classes.appendChild(classParagraph);
                }
            }
        }
    }
}
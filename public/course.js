var form = document.getElementById('form');
var inputGroup = document.getElementById('input-group');
const urlParams = new URLSearchParams(window.location.search);
var teachers = urlParams.get('teachers');
var lecturers = urlParams.get('lecturers');
var teacherSelector = urlParams.get('select');

if (teachers && teacherSelector) {
  teachers = [' '].concat(teachers.split(','));
} else if (teachers) {
  teachers = teachers.split(',');
} else {
  teachers = [' '];
}

if (lecturers) {
  lecturers = lecturers.split(',');
}

var subject = urlParams.get('subject');
var subjectId = urlParams.get('subject_id');
var isESL = urlParams.get('esl');
var isXHE = urlParams.get('xhe');
var teacherSelectorInput;

if (teacherSelector) teacherSelector = teacherSelector.split(',');

document.getElementById('title').innerHTML += ` ${subject}`;
if (!teacherSelector) document.getElementById('teachersTitle').innerHTML += `${teachers.join(', ')}`;
document.getElementById('subject').value = subjectId;

if (!teacherSelector) {
  var teacherHiddenInput = document.createElement('input');
  teacherHiddenInput.type = 'hidden';
  teacherHiddenInput.value = `${lecturers ? lecturers.join(', ') + ', ' : ''}${teachers.join(', ')}`;
  teacherHiddenInput.name = 'Who taught this course';
  form.appendChild(teacherHiddenInput);

  var titleHiddenInput = document.createElement('input');
  titleHiddenInput.type = 'hidden';
  titleHiddenInput.value = subject;
  titleHiddenInput.name = 'Title';
  form.appendChild(titleHiddenInput);
} else {
  teacherSelectorInput = document.createElement('select');
  teacherSelectorInput.name = 'Who taught this course';
  teacherSelectorInput.id = 'Who taught this course';
  teacherSelectorInput.required = 'required';
  let selectorEntry = document.createElement('option');
  selectorEntry.value = '';
  selectorEntry.innerHTML = 'None';
  teacherSelectorInput.appendChild(selectorEntry);
  for (let i = 0; i < teacherSelector.length; i++) {
    let selectorEntry = document.createElement('option');
    selectorEntry.value = teacherSelector[i];
    selectorEntry.innerHTML = teacherSelector[i];
    teacherSelectorInput.appendChild(selectorEntry);
  }
  wrapAndAppend({ elementOuter: teacherSelectorInput, name: 'Who taught this course', fullname: `${lecturers ? "Who taught your seminars?" : "Who taught this course?"}` });
}

// if (isESL) {
//   wrapAndAppend({
//     name: 'To what extent was this course an improvement over English language courses you have had previously?',
//     fullname: 'To what extent was this course an improvement over English language courses you have had previously? Give a score from 1 to 10, where 1 = It is not helping at all and 10 = It is helping significantly.',
//     type: 'number'
//   });
//
//   wrapAndAppend({
//     name: 'In what ways was this course useful in terms of improving your English language skills? Put your thoughts.',
//     fullname: 'In what ways was this course useful in terms of improving your English language skills? Put your thoughts.',
//     tag: 'textarea',
//     rows: '4'
//   });
//
//   wrapAndAppend({
//     name: 'If you had the chance to change some aspects of the course what would they be? Put your thoughts.',
//     fullname: 'If you had the chance to change some aspects of the course what would they be? Put your thoughts.',
//     tag: 'textarea',
//     rows: '4'
//   });
//
//   wrapAndAppend({
//     name: 'To what extent did the instructor focus on speaking skills? Put your thoughts.',
//     fullname: 'To what extent did the instructor focus on speaking skills? Put your thoughts.',
//     tag: 'textarea',
//     rows: '4'
//   });
//
//   wrapAndAppend({
//     name: 'To what extent did the instructor focus on grammar skills? Put your thoughts.',
//     fullname: 'To what extent did the instructor focus on grammar skills? Put your thoughts.',
//     tag: 'textarea',
//     rows: '4'
//   });
// } else {
inputGroup.innerHTML += `
<label for="How would you describe the effort you put into studying for this course?">How would you describe the effort you put into studying for this course?</label>
<input name="How would you describe the effort you put into studying for this course?" id="ex1" type="text"/>`;

inputGroup.innerHTML += `
<label for="Rate the quality of the course materials required for study outside of class">Rate the quality of the course materials required for study outside of class (were they relevant, informative, current, highly stimulating etc.).</label>
<input name="Rate the quality of the course materials required for study outside of class" id="ex2" type="text"/>`;

if (lecturers) {
  for (let t = 0; t < lecturers.length; t++) {
    let name = '';
    if (lecturers.length > 1 && lecturers[t] !== ' ') name = ` — ${lecturers[t]}`;
    inputGroup.innerHTML += `
      <label for="Rate the quality of lectures${name}">Rate the quality of lectures${name} (did the professor teach in an informative, engaging, well-structured way, were the slides well-designed, did the teacher use multiple ways of transmitting information).</label>
      <input name="Rate the quality of lectures${name}" id="ex3lecturers${lecturers[t].split(' ')[0]}" type="text"/>`;
  }
}

for (let t = 0; t < teachers.length; t++) {
  let name = '';
  if (teachers.length > 1 && teachers[t] !== ' ') name = ` — ${teachers[t]}`;
  inputGroup.innerHTML += `
      <label for="Rate the quality of instruction${name}">Rate the quality of instruction${name} (did the professor teach in an informative, engaging, well-structured way, were the slides well-designed, did the teacher use multiple ways of transmitting information).</label>
      <input name="Rate the quality of instruction${name}" id="ex3${teachers[t].split(' ')[0]}" type="text"/>`;

  inputGroup.innerHTML += `
      <label for="Rate the classroom discussions in this course${name}">Rate the classroom discussions in this course${name} (were they insightful, interactive, respectful, balanced, open to everybody, productive, were other students engaged? etc.).</label>
      <input name="Rate the classroom discussions in this course${name}" id="ex4${teachers[t].split(' ')[0]}" type="text"/>`;

  inputGroup.innerHTML += `
      <label for="Rate the written and oral feedback received from the teacher throughout the course?${name}">Rate the written and oral feedback received from the teacher throughout the course?${name} (did you receive it unprompted within a week from submitting an assignment, were the comments detailed, respectful and helpful, did the teacher answer your questions in the box or outside?).</label>
      <input name="Rate the written and oral feedback received from the teacher throughout the course?${name}" id="ex6${teachers[t].split(' ')[0]}" type="text"/>`;

  // wrapAndAppend({
  //   name: `Evaluate the overall quality of the course${name}`,
  //   fullname: `Evaluate the overall quality of the course, which involves both course design and teaching, as compared to other courses that you took at SAS, [where 1 is “The quality of the course was terrible, incomparably worse than other SAS courses I have taken, 6 is “The quality of the course was average,” 10 is “The quality of the course is the best I have seen at SAS by a large margin”].${name}`,
  //   type: 'number'
  // });
  // wrapAndAppend({
  //   name: `Evaluate the impact of the course on your knowledge${name}`,
  //   fullname: `Evaluate the impact of the course on your knowledge, skills, competencies, personal qualities and worldview, [where 1 is no development has taken place, 6 is a generally satisfactory development has taken place in several of the parameters, 10 is “I have become a different person”].${name}`,
  //   type: 'number'
  // });
  // wrapAndAppend({
  //   name: `How well did your teacher integrate interactive communication within the course seminars?${name}`,
  //   fullname: `How well did your teacher integrate interactive communication within the course seminars?${name}`,
  //   type: 'number'
  // });
  // wrapAndAppend({
  //   name: `Evaluate the level of feedback from the professor${name}`,
  //   fullname: `Evaluate the level of feedback from the professor (comments on essays and other works, answers to questions during classes, individual consultations during office hours), [where 1 is “There was no feedback from the professor at all”, 6 is “Feedback was present in half of the cases when it was necessary and was of average quality”, 10 is “The professor provided a comprehensive high-level feedback whenever it was needed"']${name}`,
  //   type: 'number'
  // });
  // wrapAndAppend({
  //   name: `Was the course syllabus followed (and if not, what changed and why)?${name}`,
  //   fullname: `Was the course syllabus followed (and if not, what changed and why)?${name}`,
  //   type: 'text'
  // });
}

inputGroup.innerHTML += `
  <label for="Rate the assignments in this course">Rate the assignments in this course (were they clearly described, announced in a timely manner, helpful in achieving learning goals stated in the syllabus, engaging, diverse?).</label>
  <input name="Rate the assignments in this course" id="ex5" type="text"/>`;

var slider1 = new Slider('#ex1', {
  ticks: [0, 1, 2, 3],
  ticks_labels: ['No real effort', 'I made some effort', 'I worked hard', 'I gave 125%'],
  ticks_snap_bounds: 30,
  value: 0
});

var slider2 = new Slider('#ex2', {
  ticks: [0, 1, 2, 3, 4],
  ticks_labels: ['Low', 'Average', 'High', 'Very high', 'Not<br>applicable'],
  ticks_snap_bounds: 30,
  value: 4
});

if (lecturers){
for (let t = 0; t < lecturers.length; t++) {
  window['slider3' + lecturers[t].split(' ')[0]] = new Slider(`#ex3lecturers${lecturers[t].split(' ')[0]}`, {
    ticks: [0, 1, 2, 3, 4],
    ticks_labels: ['Low', 'Average', 'High', 'Very high', 'Not<br>applicable'],
    ticks_snap_bounds: 30,
    value: 4
  });
}
}

for (let t = 0; t < teachers.length; t++) {
  window['slider3' + teachers[t].split(' ')[0]] = new Slider(`#ex3${teachers[t].split(' ')[0]}`, {
    ticks: [0, 1, 2, 3, 4],
    ticks_labels: ['Low', 'Average', 'High', 'Very high', 'Not<br>applicable'],
    ticks_snap_bounds: 30,
    value: 4
  });

  window['slider4' + teachers[t].split(' ')[0]] = new Slider(`#ex4${teachers[t].split(' ')[0]}`, {
    ticks: [0, 1, 2, 3, 4],
    ticks_labels: ['Low', 'Average', 'High', 'Very high', 'Not<br>applicable'],
    ticks_snap_bounds: 30,
    value: 4
  });

  window['slider6' + teachers[t].split(' ')[0]] = new Slider(`#ex6${teachers[t].split(' ')[0]}`, {
    ticks: [0, 1, 2, 3, 4],
    ticks_labels: ['Low', 'Average', 'High', 'Very high', 'Not<br>applicable'],
    ticks_snap_bounds: 30,
    value: 4
  });
}

window.slider5 = new Slider('#ex5', {
  ticks: [0, 1, 2, 3, 4],
  ticks_labels: ['Low', 'Average', 'High', 'Very high', 'Not<br>applicable'],
  ticks_snap_bounds: 30,
  value: 4
});

// inputGroup.innerHTML += `<div class="flex-container column"><label for="">Was there a mid-course evaluation?</label></div><div class="flex-container row"><input class="radio" id="Yes" type="radio" name="Was there a mid-course evaluation?" value="Yes"><label for="Yes">Yes</label></div><div class="flex-container row"><input class="radio" id="No" type="radio" name="Was there a mid-course evaluation?" value="No"><label for="No">No</label></div>`

wrapAndAppend({
  name: 'What did you find the most instructive / informative / helpful?',
  fullname: 'What did you find the most instructive / informative / helpful? (you might think about course content, value/impact, delivery, organisation)',
  tag: 'textarea',
  rows: '8',
  required: false
});

wrapAndAppend({
  name: 'What did you find the least instructive / informative / helpful?',
  fullname: 'What did you find the least instructive / informative / helpful? (you might think about course content, value/impact, delivery, organisation)',
  tag: 'textarea',
  rows: '8',
  required: false
});

wrapAndAppend({
  name: 'Overall, did this course add to your educational experience and trajectory? If yes, why? If no, why not? Is there another course you could imagine taking instead?',
  fullname: 'Overall, did this course add to your educational experience and trajectory? If yes, why? If no, why not? Is there another course you could imagine taking instead?',
  tag: 'textarea',
  rows: '8',
  required: false
});

wrapAndAppend({
  name: 'Please leave here any other comments that you might have.',
  fullname: 'Please leave here any other comments that you might have. You might want to comment on course coordination, course design, expectations vs. reality issues, or any issues concerning SAS teaching policies.',
  tag: 'textarea',
  rows: '8',
  required: false
});

// @params {elementOuter: object, required: boolean, tag: string, type: string, name: string, fullname: string, rows: string}
function wrapAndAppend (params) {
  let elementInner;
  if (!params.elementOuter) {
    if (!params.tag) elementInner = document.createElement('input');
    else elementInner = document.createElement(params.tag);
    elementInner.name = params.name;
    elementInner.id = params.name;
    if (params.type) elementInner.type = params.type;
    if (params.type === 'number') {
      elementInner.min = '1';
      elementInner.max = '10';
    }
    if (params.rows) elementInner.rows = params.rows;
  } else elementInner = params.elementOuter;
  if (params.required !== false) elementInner.required = 'required';
  elementInner.classList.add('form-control');
  var flexContainer = document.createElement('div');
  flexContainer.classList.add('flex-container');
  var label = document.createElement('label');
  label.setAttribute('for', elementInner.name || params.name);
  label.innerHTML = params.fullname;
  flexContainer.appendChild(label);
  flexContainer.appendChild(elementInner);
  inputGroup.appendChild(flexContainer);
}

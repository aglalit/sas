var form = document.getElementById('form');
var inputGroup = document.getElementById('input-group');
const urlParams = new URLSearchParams(window.location.search);
var teachers = urlParams.get('teachers');
if (teachers) teachers = teachers.split(',');
var subject = urlParams.get('subject');
var subjectId = urlParams.get('subject_id');
var teacherSelector = urlParams.get('select')
if (teacherSelector) teacherSelector = teacherSelector.split(',');

document.getElementById('title').innerHTML += ` ${subject}.`;
document.getElementById('subject').value = subjectId;

if (!teacherSelector) {
  var teacherHiddenInput = document.createElement('input');
  teacherHiddenInput.type = 'hidden';
  teacherHiddenInput.value = teachers.join(', ');
  teacherHiddenInput.name = 'Who taught this course';
  form.appendChild(teacherHiddenInput);
} else {
  var teacherSelectorInput = document.createElement('select');
  teacherSelectorInput.required = 'required';
  teacherSelectorInput.name = 'Who taught this course';
  for (let i = 0; i < teacherSelector.length; i++) {
    const selectorEntry = document.createElement('option');
    selectorEntry.value = teacherSelector[i];
    selectorEntry.innerHTML = teacherSelector[i];
    teacherSelectorInput.appendChild(selectorEntry);
  }

  wrapAndAppend(teacherSelectorInput, true);
}

wrapAndAppend({
  name: 'Evaluate the overall quality of the course',
  fullname:'Evaluate the overall quality of the course, which involves both course design and teaching, as compared to other courses that you took at SAS, [where 1 is “The quality of the course was terrible, incomparably worse than other SAS courses I have taken”, 6 is “The quality of the course was average,” 10 is “The quality of the course is the best I have seen at SAS by a large margin”].',
  type:'number'
});

wrapAndAppend({
  name: 'Evaluate the impact of the course on your knowledge',
  fullname:'Evaluate the impact of the course on your knowledge, skills, competencies, personal qualities and worldview, [where 1 is no development has taken place, 6 is a generally satisfactory development has taken place in several of the parameters, 10 is “I have become a different person”].',
  type:'number'
});


for (let t=0;t<teachers.length;t++){
  let name = '';
  if (teachers.length > 1) name = ` — ${teachers[t]}`
  wrapAndAppend({
    name: `How well did your teacher integrate interactive communication within the course seminars?${name}`,
    fullname:`How well did your teacher integrate interactive communication within the course seminars?${name}`,
    type:'number'
  });
  wrapAndAppend({
    name: `Evaluate the level of feedback from the professor${name}`,
    fullname:`Evaluate the level of feedback from the professor (comments on essays and other works, answers to questions during classes, individual consultations during office hours), [where 1 is “There was no feedback from the professor at all”, 6 is “Feedback was present in half of the cases when it was necessary and was of average quality”, 10 is “The professor provided a comprehensive high-level feedback whenever it was needed"]${name}`,
    type:'number'
  });
  wrapAndAppend({
    name: `Was the course syllabus followed (and if not, what changed and why)?${name}`,
    fullname:`Was the course syllabus followed (and if not, what changed and why)?${name}`,
    type:'text'
  });
}

wrapAndAppend({
  name: `What did you find  most instructive / informative / useful? Consider the course organisation (optional).`,
  fullname:`What did you find  most instructive / informative / useful? Consider the course organisation (optional).`,
  tag:'textarea',
  rows:'4'
});

wrapAndAppend({
  name: `What did you find  most instructive / informative / useful? Consider the course content (optional).`,
  fullname:`What did you find  most instructive / informative / useful? Consider the course content (optional).`,
  tag:'textarea',
  rows:'4'
});

wrapAndAppend({
  name: `What did you find  most instructive / informative / useful? Consider the course teaching / delivery (optional).`,
  fullname:`What did you find  most instructive / informative / useful? Consider the course teaching / delivery (optional).`,
  tag:'textarea',
  rows:'4'
});

wrapAndAppend({
  name: `Do you have any specific recommendations for improving the course? Consider the course organisation (optional).`,
  fullname:`Do you have any specific recommendations for improving the course? Consider the course organisation (optional).`,
  tag:'textarea',
  rows:'4'
});

wrapAndAppend({
  name: `Do you have any specific recommendations for improving the course? Consider the course content (optional).`,
  fullname:`Do you have any specific recommendations for improving the course? Consider the course content (optional).`,
  tag:'textarea',
  rows:'4'
});

wrapAndAppend({
  name: `Do you have any specific recommendations for improving the course? Consider the course teaching / delivery (optional).`,
  fullname:`Do you have any specific recommendations for improving the course? Consider the course teaching / delivery (optional).`,
  tag:'textarea',
  rows:'4'
});

wrapAndAppend({
  name: `Please leave any other comments, suggestions, or feedback on the course you might have.`,
  fullname:`Please leave any other comments, suggestions, or feedback on the course you might have.`,
  tag:'textarea',
  rows:'8'
});

// @params {element: string, required: boolean, tag: string, type: string, name: string, fullname: string, rows: string}
function wrapAndAppend (params) {
  let element;
  if (!params.element) {
    if (!params.tag) element = document.createElement('input');
    else element = document.createElement(params.tag);
    element.name = params.name;
    if (params.type) element.type = params.type;
    if (params.type === 'number'){
      element.min = '1';
      element.max = '10';
    }
    if (params.rows) element.rows = params.rows;
  }
  else element = params.element;
  if (params.required !== false) element.required = 'required';
  element.classList.add('form-control');
  var flexContainer = document.createElement('div');
  var label = document.createElement('label');
  label.for = element.name || params.name;
  label.innerHTML = element.name || params.fullname;
  flexContainer.appendChild(label);
  flexContainer.appendChild(element);
  inputGroup.appendChild(flexContainer);
}

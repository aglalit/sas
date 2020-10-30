var form = document.getElementById('form');
var inputGroup = document.getElementById('input-group');
const urlParams = new URLSearchParams(window.location.search);
var teachers = urlParams.get('teachers').split(',');
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
  name:'Evaluate the overall quality of the course, which involves both course design and teaching, as compared to other courses that you took at SAS, [where 1 is “The quality of the course was terrible, incomparably worse than other SAS courses I have taken”, 6 is “The quality of the course was average,” 10 is “The quality of the course is the best I have seen at SAS by a large margin”].',
  type:'number'
});

// @params {element: string, required: boolean, tag: string, type: string, name: string, rows: string}
function wrapAndAppend (params) {
  let element;
  if (!params.element) {
    if (!params.tag) element = document.createElement('input');
    else element = document.createElement(params.tag);
    element.name = params.name;
    element.type = params.type;
    if (params.type === 'number'){
      element.min = '1';
      element.max = '10';
    }
    if (params.rows) element.rows = params.rows;
  }
  else element = params.element;
  if (params.required !== False) element.required = 'required';
  element.classList.add('form-control');
  var flexContainer = document.createElement('div');
  var label = document.createElement('label');
  label.for = element.name || params.name;
  label.innerHTML = element.name || params.name;
  flexContainer.appendChild(label);
  flexContainer.appendChild(element);
  inputGroup.appendChild(flexContainer);
}

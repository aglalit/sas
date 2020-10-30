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
function wrapAndAppend (element, required, type) {
  if (required) element.required = 'required';
  element.classList.add('form-control');
  var flexContainer = document.createElement('div');
  var label = document.createElement('label');
  label.for = element.name;
  label.innerHTML = element.name;
  flexContainer.appendChild(label);
  flexContainer.appendChild(element);
  inputGroup.appendChild(flexContainer);
}

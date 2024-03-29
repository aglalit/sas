var form = document.getElementById('form');
var inputGroup = document.getElementById('input-group');
const urlParams = new URLSearchParams(window.location.search);
var teachers = urlParams.get('teachers');
var teacherSelector = urlParams.get('select');

if (teachers && teacherSelector) {
  teachers = [' '].concat(teachers.split(','));
} else if (teachers) {
  teachers = teachers.split(',');
} else {
  teachers = [' '];
}
var subject = urlParams.get('subject');
var subjectId = urlParams.get('subject_id');
var isESL = urlParams.get('esl');
var isXHE = urlParams.get('xhe');
var teacherSelectorInput;
var lecturer = urlParams.get('lecturer');

if (teacherSelector) teacherSelector = teacherSelector.split(',');

document.getElementById('title').innerHTML += ` ${teachers[0]}`;
document.getElementById('subject').value = subjectId;

if (!teacherSelector) {
  var teacherHiddenInput = document.createElement('input');
  teacherHiddenInput.type = 'hidden';
  teacherHiddenInput.value = teachers.join(', ');
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
  for (let i = 0; i < teacherSelector.length; i++) {
    const selectorEntry = document.createElement('option');
    selectorEntry.value = teacherSelector[i];
    selectorEntry.innerHTML = teacherSelector[i];
    teacherSelectorInput.appendChild(selectorEntry);
  }
  wrapAndAppend({ elementOuter: teacherSelectorInput, name: 'Who taught this course', fullname: 'Who taught this course?' });
}



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


  wrapAndAppend({
    name: 'What was good about this demo class? What worked particularly well?',
    fullname: 'What was good about this demo class? What worked particularly well?',
    tag: 'textarea',
    rows: '8',
    required: false
  });

  wrapAndAppend({
    name: 'What do you find flawed? What do you think could be improved?',
    fullname: 'What do you find flawed? What do you think could be improved?',
    tag: 'textarea',
    rows: '8',
    required: false
  });

  wrapAndAppend({
    name: `How would you rate this class on a 1-10 scale? (assume that 7 is an average SAS class)`,
    fullname: `How would you rate this class on a 1-10 scale? (assume that 7 is an average SAS class)`,
    type: 'number'
  });

  wrapAndAppend({
    name: 'General impressions and additional comments',
    fullname: 'General impressions and additional comments',
    tag: 'textarea',
    rows: '8',
    required: false
  });

  // if (isXHE) {
  //   wrapAndAppend({
  //     name: 'Please leave any comments or feedback on the teacher assistants (X-HE students) (optional).',
  //     fullname: 'Please leave any other comments or feedback on the teacher assistants (X-HE students) (optional).',
  //     tag: 'textarea',
  //     rows: '4',
  //     required: false
  //   });
  // }

  // wrapAndAppend({
  //   name: 'What did you find  most instructive / informative / useful? Consider the course organisation (optional).',
  //   fullname: 'What did you find  most instructive / informative / useful? Consider the course organisation (optional).',
  //   tag: 'textarea',
  //   rows: '4',
  //   required: false
  // });
  //
  // wrapAndAppend({
  //   name: 'What did you find  most instructive / informative / useful? Consider the course content (optional).',
  //   fullname: 'What did you find  most instructive / informative / useful? Consider the course content (optional).',
  //   tag: 'textarea',
  //   rows: '4',
  //   required: false
  // });
  //
  // wrapAndAppend({
  //   name: 'What did you find  most instructive / informative / useful? Consider the course teaching / delivery (optional).',
  //   fullname: 'What did you find  most instructive / informative / useful? Consider the course teaching / delivery (optional).',
  //   tag: 'textarea',
  //   rows: '4',
  //   required: false
  // });
  //
  // wrapAndAppend({
  //   name: 'Do you have any specific recommendations for improving the course? Consider the course organisation (optional).',
  //   fullname: 'Do you have any specific recommendations for improving the course? Consider the course organisation (optional).',
  //   tag: 'textarea',
  //   rows: '4',
  //   required: false
  // });
  //
  // wrapAndAppend({
  //   name: 'Do you have any specific recommendations for improving the course? Consider the course content (optional).',
  //   fullname: 'Do you have any specific recommendations for improving the course? Consider the course content (optional).',
  //   tag: 'textarea',
  //   rows: '4',
  //   required: false
  // });
  //
  // wrapAndAppend({
  //   name: 'Do you have any specific recommendations for improving the course? Consider the course teaching / delivery (optional).',
  //   fullname: 'Do you have any specific recommendations for improving the course? Consider the course teaching / delivery (optional).',
  //   tag: 'textarea',
  //   rows: '4',
  //   required: false
  // });
  //
  // wrapAndAppend({
  //   name: 'Please leave any other comments, suggestions, or feedback on the course you might have.',
  //   fullname: 'Please leave any other comments, suggestions, or feedback on the course you might have.',
  //   tag: 'textarea',
  //   rows: '8'
  // });
// }

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

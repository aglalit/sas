// Vue.component('checkbox', {
//   props: ['subject', 'disabled', 'checked','checkedNames'],
//   model: {
//     prop: 'checkedNames',
//     event: 'change'
//   },
//   template: `<div>
//         <input type="checkbox" :disabled="disabled" :id="subject" :value="subject"
//       v-bind:checked="checkedNames"
//       v-on:change="$emit('change', $event.target.value)"></input>
//       <label :for="subject">{{subject}}</label>
//             </div>`
// })
const subjectsDict = {
  Экономика: {
    html: `01. Экономика (профиль <a href="https://sas.utmn.ru/ru/major-courses/#Economics" rel="noopener" target="_blank">«Экономика»</a>)<br>
          ЕГЭ: математика, обществознание, русский язык<br>
          7 бесплатных + платные места`
  },
  История: {
    html: `
02. История (профиль <a href="https://sas.utmn.ru/ru/major-courses/#Historical-Studies" rel="noopener" target="_blank">«Исторические исследования»</a>)<br>

ЕГЭ: история, обществознание, русский язык<br>

7 бесплатных + платные места
`
  },
  Биология: {
    html: `03. Биология (профиль <a href="https://sas.utmn.ru/ru/major-courses/#Life-Sciences" rel="noopener" target="_blank">«Науки о жизни»</a>)<br>

ЕГЭ: биология, математика, русский язык<br>

15 бесплатных мест + платные места`
  },
  Медиакоммуникации: {
    html: `04. Медиакоммуникации (профиль <a href="https://sas.utmn.ru/ru/major-courses/#Film-and-Media-Studies" rel="noopener" target="_blank">«Кино и медиа»</a>)<br>

ЕГЭ: обществознание, русский язык, литература<br>

7 бесплатных + платные места`
  },
  Искусства: {
    html: `05. Искусства и гуманитарные науки (профиль <a href="https://sas.utmn.ru/ru/major-courses/#Cultural-Studies" rel="noopener" target="_blank">«Культурные исследования»</a>)<br>

ЕГЭ: история, иностранный язык, русский язык<br>

7 бесплатных + платные места`
  },
  Социология: {
    html: `06. Социология (профиль <a href="https://sas.utmn.ru/ru/major-courses/#Sociology-and-Anthropology" rel="noopener" target="_blank">«Социология и антропология»</a>)<br>

ЕГЭ: математика, обществознание, русский язык<br>

9 бесплатных + платные места`
  },
  Информатика: {
    html: `07. Прикладная информатика (профиль <a href="https://sas.utmn.ru/ru/major-courses/#it" rel="noopener" target="_blank">«Информационные технологии и цифровое общество»</a>)<br>

ЕГЭ: математика, информатика и ИКТ, русский язык<br>

15 бесплатных мест + платные места`
  }
}

function containsAll (arr, values) {
  return values.every((val) => arr.indexOf(val) !== -1)
}

var vm = new Vue({
  el: '#app',
  data: {
    checkedNames: [],
    hideResult: true,
    noResult: false,
    resultHeader: 'Вам подходят следующие направления:'
  },
  computed: {
    findSubjects: function () {
      var subjects = []
      this.resultHeader = 'Вам подходят следующие направления:';

      if (containsAll(this.checkedNames, ['математика', 'обществознание'])) {
        subjects.push(subjectsDict.Экономика.html)
      }
      if (containsAll(this.checkedNames, ['история', 'обществознание'])) {
        subjects.push(subjectsDict.История.html)
      }
      if (containsAll(this.checkedNames, ['биология', 'математика'])) {
        subjects.push(subjectsDict.Биология.html)
      }
      if (containsAll(this.checkedNames, ['обществознание', 'литература'])) {
        subjects.push(subjectsDict.Медиакоммуникации.html)
      }
      if (containsAll(this.checkedNames, ['история', 'иностранный язык'])) {
        subjects.push(subjectsDict.Искусства.html)
      }
      if (containsAll(this.checkedNames, ['математика', 'обществознание'])) {
        subjects.push(subjectsDict.Социология.html)
      }
      if (containsAll(this.checkedNames, ['информатика и ИКТ', 'математика'])) {
        subjects.push(subjectsDict.Информатика.html)
      }
      if (!subjects.length) this.resultHeader = 'К сожалению, ни одно из направлений вам не подходит.';

      return subjects
    }
  }
})

var inputs = document.querySelectorAll('input[type="radio"]');
inputs.forEach(function(input){
  input.addEventListener('click', function(){
    var inp = input;
    inputs.forEach(function(i){
      if (inp.value === i.value){
        i.disabled = true;
      }
      else {
        i.disabled = false;
        }
    });
    inputs.forEach(function(i){
    if (i.checked) {
      var checked = document.querySelectorAll('input[value="'+i.value+'"]');
      checked.forEach(function(el){el.disabled = true;});
  }
  });
  });
});

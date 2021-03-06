window.onload=function(){
  var urlParams = new URLSearchParams(window.location.search);
  var yearUrl = urlParams.get('year3');
  if (!yearUrl) {
      var cardsToDelete = document.querySelectorAll('.major');
      cardsToDelete.forEach(function(card){
        card.parentNode.removeChild(card);
      })
    }

// var localCards = localStorage.getItem('cards' + (yearUrl ? '14':'10'));
// if (localCards){
//     $('.cards').html(localCards);
// }

createForm();

function createForm(){
  $( ".portlet-header" ).each(function(index){
      var input;
      if ($(this).hasClass('excluded')) {
        input = $("<input>", {type: "hidden", name: index+1, value: `EXCLUDED: ${$(this).attr('id')}`})
      }
      else input = $("<input>", {type: "hidden", name: index+1, value: $(this).attr('id')})
      $('form').append(input);
  });
}

$( ".cards" ).sortable({
    connectWith: ".column",
    handle: ".portlet-header",
    cancel: ".portlet-toggle",
    start: function (event, ui) {
        ui.item.addClass('tilt');
        tilt_direction(ui.item);
    },
    stop: function (event, ui) {
        ui.item.removeClass("tilt");
        $("html").unbind('mousemove', ui.item.data("move_handler"));
        ui.item.removeData("move_handler");
        $('button[type="submit"]').attr('disabled','disabled');
        $('form input[type="hidden"]').each(function(index){
            if (index>0){
                $(this).remove();
            }
        })
        createForm();
        localStorage.setItem('cards'+(yearUrl ? '14':'10'), $('.cards').html());
        $('button[type="submit"]').removeAttr('disabled');

    }
});

function tilt_direction(item) {
    var left_pos = item.position().left,
        move_handler = function (e) {
            if (e.pageX >= left_pos) {
                item.addClass("right");
                item.removeClass("left");
            } else {
                item.addClass("left");
                item.removeClass("right");
            }
            left_pos = e.pageX;
        };
    $("html").bind("mousemove", move_handler);
    item.data("move_handler", move_handler);
}

$( ".portlet" )
    .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
    .find( ".portlet-header" )
    .addClass( "ui-widget-header ui-corner-all" )
    .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

$( ".portlet-toggle" ).click(function() {
    var icon = $( this );
    icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
    icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
});

};

function excludeCard(event){
  var event = event || window.event;
  var excluded = $(event.target.parentNode.parentNode.parentNode).addClass('excluded');
  excluded.parent().hide();
}

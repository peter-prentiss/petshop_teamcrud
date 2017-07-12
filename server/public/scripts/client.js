$(document).ready(function(){
  refreshData();
});

function refreshData() {
  $.ajax({
    type: 'GET',
    url: '/petshop',
    success: function(response) {
      //console.log(response);
      appendToDom(response);
    }
  });
}

function appendToDom(response){
  var displays = response.arrayX;

  $('.table').empty();

  for(var i=0; i < doinks.length; i++){
    var display = displays[i];

    $tr = $('<tr></tr>');
    //$tr.data('pet', dink);
    //$tr.append('<td>' + dink)
    $tr.append('<td>' + display.owner + '</td>');
    $tr.append('<td>' + display.pet + '</td>');
    $tr.append('<td>' + display.breed + '</td>');
    $tr.append('<td>' + display.color + '</td>');
    $tr.append('<td>' + '<button>Go</button>' + '</td>');
    $tr.append('<td>' + '<button>Go</button>' + '</td>');
    $tr.append('<td>' + '<button>IN</button>' + '</td>');

    $('#showInfo').append($tr);
  }

}

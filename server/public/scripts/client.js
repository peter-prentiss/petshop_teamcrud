$(document).ready(function(){
  refreshData(); //refresh the page for data changes
});

//button listener to add owners
$('#submitOwner').on('click', function(){
  $.ajax({
    type: 'POST',
    url: '/owner',
    data : {

    },
    success: function(response){
      refreshData(); // refresh the page
    }
  });
});

function refreshData() {
  $.ajax({
    type: 'GET',
    url: '/petshop',
    success: function(response) {
      console.log(response);
      appendToDom(response); // append the changes
    }
  });
}

function appendToDom(response){
  var displays = response.arrayX;
  console.log(displays);
  $('#showInfo').empty();

  for(var i=0; i < displays.length; i++){
    var display = displays[i];
    console.log(display);
    var $tr = $('<tr></tr>');
    //$tr.data('pet', dink);
    //$tr.append('<td>' + dink)
    $tr.append('<td>' + display.first_name + ' ' + display.last_name + '</td>');
    $tr.append('<td>' + display.name + '</td>');
    $tr.append('<td>' + display.breed + '</td>');
    $tr.append('<td>' + display.color + '</td>');
    $tr.append('<td>' + '<button>Go</button>' + '</td>');
    $tr.append('<td>' + '<button>Go</button>' + '</td>');
    $tr.append('<td>' + '<button>IN</button>' + '</td>');

    $('#showInfo').append($tr);
  }

}

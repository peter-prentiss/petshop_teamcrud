$(document).ready(function(){
  refreshData(); //refresh the page for data changes

  //add owner to database
  $('#submitOwner').on('click', function(){
    var owner = {};
    owner.firstName = $('#firstName').val();
    owner.lastName = $('#lastName').val();
    console.log('new owner');
    $.ajax({
      type: 'POST',
      url: '/petshop/owner',
      data : owner,
      success: function(response){
        console.log('Added a new owner!');
        refreshData(); // refresh the page
      }
    });
  });
  //add a pet to the database
  $('#submitPet').on('click', function(){
    var pet = {};
    pet.owner_id = $('#dropDown option:selected').val();
    console.log(pet.owner_id);
    pet.name = $('#name').val();
    pet.breed = $('#breed').val();
    pet.color = $('#color').val();

    $.ajax({
      type : 'POST',
      url: '/petshop/pet',
      data : pet,
      success : function(response){
        console.log('added a new pet!');
        refreshData();
      }
    });
  });

});


function refreshData() {
  $.ajax({
    type: 'GET',
    url: '/petshop',
    success: function(response) {
      // console.log(response);
      populateDropdown(response); //populate the drop down with owner name options
      appendToDom(response); // append the changes
    }
  });
}

function appendToDom(response){
  var displays = response.arrayX;
  // console.log(displays);
  $('#showInfo').empty();

  for(var i=0; i < displays.length; i++){
    var display = displays[i];
    // console.log(display);

    if (display.name === null){ //if the owner is added without any pet data, null values come to table
      display.name = 'No pets yet!';
    } if (display.breed === null){
      display.breed = 'No pets yet!';
    } if (display.color === null){
      display.color = 'No pets yet!';
    }
    //$tr.data('pet', dink);
    //$tr.append('<td>' + dink)
    var $tr = $('<tr></tr>');
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

function populateDropdown(response) {
  $('#dropDown').empty();
  var ownerArray = response.arrayX;
  for (var i=0;i<ownerArray.length;i++){
    var doink = ownerArray[i];
    // console.log('I am in the populateDropdown function, in the array.', doink.first_name , doink.last_name + ' is also here.');
    //$("#dropDown").append(new Option( doink.first_name + ' ' + doink.last_name ));
    $('#dropDown').append($(`<option value="${i + 1}">${doink.first_name}</option>`));
    console.log($('#dropDown option:selected').val());
  }

}

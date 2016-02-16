// Initialize F5
$(document).foundation();

// Scroll to the top of the page
$( "#top").on('click', function() {
  $('html, body').animate({ scrollTop: 0 }, 'slow');
});

// Highlight selected table row
$("tbody tr").on('click', function() {
    $(this).toggleClass('selected').siblings().removeClass('selected');
});

// Export Main Modal triggers
$( "#export_main_btn").on('click', function() {
  $('#export_main' + viewID).foundation('reveal', 'close');
});

// Show/ Hide password values
function concealPass(fieldID) {
  $('#toggle_' + fieldID + '_pass').on('click', function() {
      type = $('#' + fieldID + '_pass').attr('type');
      if (type == 'password') {
        $('#' + fieldID + '_pass').attr('type','text');
        $(this).text('Hide');
      } else {
        $('#' + fieldID + '_pass').attr('type','password');
        $(this).text('Show');
      }
  });
}

// Show/ hide passwords
$('#toggle_current_pass').on('click', function() {
    type = $('#current_pass').attr('type');
    if (type == 'password') {
      $('#current_pass').attr('type','text');
      $(this).text('Hide');
    } else {
      $('#current_pass').attr('type','password');
      $(this).text('Show');
    }
});
$('#toggle_new_pass').on('click', function() {
    type = $('#new_pass').attr('type');
    if (type == 'password') {
      $('#new_pass').attr('type','text');
      $(this).text('Hide');
    } else {
      $('#new_pass').attr('type','password');
      $(this).text('Show');
    }
});

// Count passwork chars
$('#new_pass').keyup(function () {

  var val = $(this).val();
  var len = $(this).val().length;
  var matches_num = val.match(/\d+/g);
  var min_char = 6;

  // Error everythign if one char is entered
  if (len !='' && len > 0) {
    $('#field_not_blank').removeClass().addClass('idle-icon icon-checkmark2');
    $('#field_length,#field_has_num')
      .removeClass('success-icon idle-icon').addClass('alert-icon');
  }
  // Do I have 6 or more chars?
  if (len < min_char && (len != 0 || len !='')) {
    $('#field_length').removeClass().addClass('alert-icon icon-checkmark');
  } else {
    $('#field_length').removeClass().addClass('success-icon icon-checkmark');
  }
  // Do I have numbers
  if (matches_num == null && len !=0) {
    $('#field_has_num').removeClass().addClass('alert-icon icon-checkmark');
  } else {
    $('#field_has_num').removeClass().addClass('success-icon icon-checkmark');
  }

  // Reset everything
  if (len == 0) {
    $('#field_not_blank').removeClass().addClass('icon-checkmark success-icon');
    $('#field_length,#field_has_num').removeClass().addClass('icon-checkmark2 idle-icon')
  }

});

// Close account settings modal
$(".account-modal a").click(function(){
  $('#user_settings').foundation('reveal', 'close');
});

// Animations
duration = 250;
durationLong = 450

//toggle chart
function toggleChart(viewID){
  $( "#chart_toggle_btn_" + viewID ).on('click', function() {
    $("#table_" + viewID ).hide();
    $("#table_toggle_btn_" + viewID).removeClass('active');
    $("#chart_" + viewID ).show();
    $(this).addClass('active');
  });
}

//toggle table
function toggleTable(viewID){
  $( "#table_toggle_btn_" + viewID ).on('click', function() {
    $("#chart_" + viewID ).hide();
    $("#chart_toggle_btn_" + viewID).removeClass('active');
    $("#table_" + viewID ).show();
    $(this).addClass('active');
  });
}

// Destroy any given output on CLOSE
function destroyOutput(viewID) {
  $( "#confirm_destroy_" + viewID).on('click', function() {
    $('#confirm_close_' + viewID).foundation('reveal', 'close');
    $("#output_" + viewID ).slideUp(duration);
    setTimeout(function() {$("#output_" + viewID ).remove();}, durationLong);
  });
}
// Cancel the modal to Destroy
function cancelDestroyOutput(viewID) {
  $( "#cancel_destroy_" + viewID).on('click', function() {
    $('#confirm_close_' + viewID).foundation('reveal', 'close');
  });
}

// Hide any given view on HIDE
function hideOutput(viewID) {
  $( "#hide_output_" + viewID).on('click', function() {
    $('#report_data_' + viewID).slideUp(duration);
    $(this).hide();
    $('#show_output_' + viewID).show();
  });
}
// Show any given view on SHOW
function showOutput(viewID) {
  $( "#show_output_" + viewID).on('click', function() {
    $('#report_data_' + viewID).slideDown(duration);
    $(this).hide();
    $('#hide_output_' + viewID).show();
  });
}

// Export Modal triggers
function exportOutput(viewID) {
  $( "#export_action_" + viewID).on('click', function() {
    $('#export_output_' + viewID).foundation('reveal', 'close');
  });
}

// How many reports are on the page
reports = $('[id^=output_]').length;
console.log(reports + " reports");

// Now we know how many reports we have, loop through them for consistent functionality
for (var i = 0; i < reports; i++) {
  toggleChart(i);
  toggleTable(i);
  destroyOutput(i);
  cancelDestroyOutput(i);
  hideOutput(i);
  showOutput(i);
  exportOutput(i);
}
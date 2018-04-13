$(document).ready(function(){
/* for calendar*/
  $(function() {

  $('input[class="daterange"]').daterangepicker({
      autoUpdateInput: false,
      locale: {
          cancelLabel: 'Clear'
      }
  });

  $('input[class="daterange"]').on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
  });

  $('input[class="daterange"]').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('');
  });

});

});
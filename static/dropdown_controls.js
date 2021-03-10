$(document).ready(function() {
  console.log('loaded')

  // Initially opened
  $('.dropdown#dd0').slideToggle(500);
  $('.toggle-button#tb0').addClass('toggle-button-active');

  // On click function
  $('.toggle-button').on('click',function(e){
    
    // Get button and dropdown ids
    tg_id = this.id;
    dd_id=$(this).data('target');
    
    // If dropdown visible 
    if($('.dropdown'+'#'+dd_id).is(':visible') ) {
      $('.dropdown'+'#'+dd_id).slideUp(500);
      $('.toggle-button'+'#'+tg_id).removeClass('toggle-button-active');
    } 
    // If dropdown not visible
    else {
      $('.dropdown'+'#'+dd_id).slideToggle(500);
      $('.dropdown'+'#'+dd_id).siblings('.dropdown').slideUp(500);
      $('.toggle-button').removeClass('toggle-button-active');
      $('.toggle-button'+'#'+tg_id).addClass('toggle-button-active');
    }   
  });
});


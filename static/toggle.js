$(document).ready(function() {
  console.log('loaded')
  $(".dropdown#row0").slideToggle(500);
  $(".toggle-button").on("click",function(e){
  
    id=$(this).data('target');
    console.log(id);
    
    if($('.dropdown' +'#'+id).is(":visible") ) {
  
      $(".dropdown"+'#'+id).slideUp(500);
  
    } 
    else {
      $(".dropdown"+'#'+id).slideToggle(500);
      $(".dropdown"+'#'+id).siblings('.dropdown').slideUp(500);
    }   
  });

});
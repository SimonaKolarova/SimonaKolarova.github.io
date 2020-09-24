jQuery(document).ready(function() {
    // code from: https://www.sitepoint.com/community/t/collapsible-bootstrap-panels-not-collapsing-after-another-panel-is-selected/225826/2
    jQuery(".panel-heading").click(function() {
        jQuery('#accordion .panel-heading').not(this).removeClass('isOpen');
        jQuery(this).toggleClass('isOpen');
        jQuery(this).next(".panel-collapse").addClass('thePanel');
        jQuery('#accordion .panel-collapse').not('.thePanel').slideUp(300);
        jQuery(".thePanel").slideToggle(800).removeClass('thePanel');
    });
});
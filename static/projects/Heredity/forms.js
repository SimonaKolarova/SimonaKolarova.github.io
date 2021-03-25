$(function()
{
    // Add more input fields
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();
        var controlForm = $('.controls form:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="glyphicon glyphicon-minus"><i class="fas fa-minus"></i></span>');
    })

    // Remove input fields
    .on('click', '.btn-remove', function(e)
    {
		$(this).parents('.entry:first').remove();

		e.preventDefault();
		return false;
    })
    // Submit form
    .on('click', '#formSubmit',function (e) {
        var form = $('#heredityForm')
        if(!form[0].checkValidity()) {
            $('<input type="submit">').hide().appendTo(form).click().remove();
            return
        }
        var data= {}
        var controlForm= $('.controls form .entry')
    
        controlForm.each(function(i,heredity){
            var set={}
            var name = ""
            $(heredity).find(":input").each(function(i,value){
                if($(value).val() === "True" || $(value).val() === "False") {
                    set[$(value).attr("name")]  = $(value).val() == "True"
                } else {
                    set[$(value).attr("name")] = $(value).val() != "" ? $(value).val()  : null;
                }
                if ($(value).attr("name") === 'name') {
                    name = $(value).val();
                }
            });
            data[name] = set

            // Print output in console
            console.log(set)
        })
        console.log(data) 

        // Send ajax
        $.ajax({
            url: 'https://gjb2-gene-mutation-probability.herokuapp.com/', // Heroku to submit the request 
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json'
            },
            dataType : 'json', // json data
            data : JSON.stringify(data), // post data 
            success : function(result) {
                console.log(result); // print results in developer tools console 
                // $('<span></span>').hide().appendTo(form).click().remove();
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })     
    });
});


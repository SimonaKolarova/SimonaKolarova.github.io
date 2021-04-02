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
                console.log(result) // print results in developer tools console 
                var resultselement = $('#results'); // The results element
                var resultContainer = $('.card-deck'); // The card deck element
                var container = $('.card-deck .container:first'); // The container for each card
                var containerClone = $(container.clone()) // clone the container to keep as base
                resultContainer.empty(); //Clear any contents that might exist
                for (const [personName, value] of Object.entries(result)){ // people
                    console.log(`${personName}: ${value}`);
                    var newPerson = $(containerClone.clone()) //Create specific container for each person
                    currentEntry = newPerson.find('.card:first');
                    currentEntry.find('.card-header:first').text(personName); //set the name to the card header
                    for (const [attributeName, attributeValues] of Object.entries(value)) // trait or gene objects
                    {
                        console.log(`${attributeName}: ${attributeValues}`);
                        if (attributeName === 'gene') {
                            currentEntry = newPerson.find('#gene_2').text('2: ' + attributeValues[2] + '%')
                            currentEntry = newPerson.find('#gene_1').text('1: ' + attributeValues[1] + '%')
                            currentEntry = newPerson.find('#gene_0').text('0: ' + attributeValues[0] + '%')
                        } else if (attributeName === 'trait') {
                            if (attributeValues['true'] == 100) {
                                currentEntry = newPerson.find('#trait_true').text('True')
                            } else if (attributeValues['false'] == 100) {
                                currentEntry = newPerson.find('#trait_true').text('False')
                            } else {
                                currentEntry = newPerson.find('#trait_true').text('True: ' + attributeValues['true']+ '%')
                                currentEntry = newPerson.find('#trait_false').text('False: ' + attributeValues['false'] + '%')
                            }
                        }
                    }
                    newPerson.appendTo(resultContainer); // Finally add it to the card deck   
                }  
                resultselement.show()            
                resultContainer.show()
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })     
    });
});




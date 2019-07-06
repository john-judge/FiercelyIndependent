
function incrScore() {
    $.ajax({
        url: '/score',
        type: 'POST',
        success: function(result) {
            console.log("attempted score incr");
        },
        error: function(error) {
            console.log(error);
        }
    });
}
/*    var url = '/score'
    var data = {score: newScore}
    function success(response) {
        console.log("attempted to post score:" + newScore);
    }
    var datatype = 'jsonp';

    $.get(url,data,success,datatype)
    .fail(function() {
        console.log("error: post updated score");
    });
}*/


/*
    $.ajax({
        url: '/score',
        data: {
            "score": newScore + 1
        },
        dataType: "json",
        cache: false,
        type: 'POST',
        success: function(result) {
            console.log("attempted log score: " + (newScore + 1));
            //console.log(result);
        },
        error: function(error) {
            console.log(error);
        }
    });
}*/
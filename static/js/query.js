
function updateScore(score) {
    $.ajax({
        url: '/score',
        data: {
            score: score
        },
        type: 'POST',
        success: function(res) {
            console.log(res);
        },
        error: function(error) {
            console.log(error);
        }
    });
}
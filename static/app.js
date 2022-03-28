let words_correct = 0

async function postAns(answer){
    // Sends answer to /ans-sub route to be validated and returns the response to be displayed
    console.debug('Called postAns() in app.js >', answer)

    const ansResponse = await axios.post('/ans-sub', answer)
    const response = ansResponse.data.result
    const val = answer.Answer
    const score = val.length

    switch (response){
        case "ok":
            const highScore = checkHighScore(score);
            if (highScore === true){
                return displayResponse(`Excellent! ${score} letters is your new high score!` )
            }
            words_correct += 1;
            return displayResponse(`Great answer! There are ${score} letters in ${val}!`);
        case "not-word":
            return displayResponse(`Sorry, ${val} is not a valid word! Try again.`);
        case "not-on-board":
            return displayResponse(`Sorry, ${val} is not found on board! Try again."`)
    }
}

$('#ans-form').on('submit', function(event){
    // Takes answer from the text input in board.html file without page reload
    event.preventDefault();
    const answerObj = {Answer: $('#ans-input').val()};
     // Passes answer to be posted and empties the input
    postAns(answerObj);
    $('#ans-input').val('');
})

function displayResponse(str){
    console.debug("Called displayResponse() in app.js", "Response:", str)

    const alertHTML =
        `<div class="display-result">
            <h3>${str}</h3>
        </div>`

    setTimeout(removeRes, 3000);

    return $('body').append(alertHTML)
}

function checkHighScore(currentScore){
    // Check local storage for high score compared to current score
    let highScore = localStorage.getItem('highScore')

    if (!highScore) {
        highScore = localStorage.setItem('highScore', currentScore)
    }
    // when you set a new high score it is saved in local storage
    if (highScore < currentScore) {
        localStorage.setItem('highScore', currentScore)
    }
    else {
        return false
    }
    return true
}

function gameStart(){
    alert("Start Game Timer")
    setTimeout(endGame, 60000)
}

function endGame(){
    $('#ans-form').remove();
    displayResponse(`Time's up! You found ${words_correct} words! Refresh to try again.`)
}

function removeRes(){
    $('.display-result').remove()
}

gameStart()

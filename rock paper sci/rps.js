let userMove='';
let computerMove='';
let result='';
let game=JSON.parse(localStorage.getItem('game')) || {
    win:0,
    tie:0,
    lose:0  
}
let gameHistory= JSON.parse(localStorage.getItem('gameHistory')) || [];

renderGameHistory();
renderGameSummary();


function generateComputerMove()
{
    const randNum = Math.random();
    if(randNum<1/3)
    {
        computerMove='Rock';
    }
    else if(randNum<2/3)
    {
        computerMove='Paper';
    }
    else{
        computerMove='Scissor';
    }
}

function evaluateMoves()
{
    if( computerMove === userMove )
    {
        result='tie';
        game.tie+= 1;
    }
       
    

    else if( (userMove==='Rock' && computerMove==='Scissor') || (userMove==='Paper' && computerMove==='Rock') || (userMove==='Scissor' && computerMove==='Paper')  )
    {
        result='win';
        game.win+= 1;
    }

    else 
    {
       result='lose';
       game.lose+= 1;
    }

    gameHistory.push({
        userMove:userMove,
        computerMove: computerMove,
        result:result
       });
       localStorage.setItem('game',JSON.stringify(game));
       localStorage.setItem('gameHistory',JSON.stringify(gameHistory));


}



function renderGameSummary(){
    document.getElementById('Wins').innerHTML=game.win;
    document.getElementById('Looses').innerHTML=game.lose;
    document.getElementById('Ties').innerHTML=game.tie;
    document.getElementById('Games').innerHTML=game.win + game.lose + game.tie;
}

function renderGameHistory(){
    let gameHistoryHTML =  `<tr>
    <th>#</th>
    <th>User Move</th>
    <th>Computer Move</th>
    <th>Result</th>
  </tr>`;
    for(let i = 0; i < gameHistory.length; i++){
      const gameItem = gameHistory[i];
      gameHistoryHTML +=  
      `<tr>
        <td>${i+1}</td>
        <td>${gameItem.userMove}</td>
        <td>${gameItem.computerMove}</td>
        <td>${gameItem.result}</td>
      </tr>`
      }
      
  document.getElementById('gameHistory').innerHTML = gameHistoryHTML;
}


function resetGame() {
    console.log("Resetting the game...");
    game = {
        win: 0,
        tie: 0,
        lose: 0 
    };
    gameHistory = [];
    localStorage.setItem('game', JSON.stringify(game));
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
    console.log("Game reset successfully.");
    renderGameSummary(); // Update summary table
    renderGameHistory(); // Update history table
}




// function resetGame()
// {
//     game={
//     win:0,
//     tie:0,
//     lose:0 
//     };
//     gameHistory=[];
//     localStorage.setItem('game',JSON.stringify(game));
//     localStorage.setItem('gameHistory',JSON.stringify(gameHistory));
//     // renderGameHistory();
//     // renderGameSummary();

   
// }

// function resetGameHistory()
// {

//     let gameHistoryHTML =  `<tr>
//     <th>#</th>
//     <th>User Move</th>
//     <th>Computer Move</th>
//     <th>Result</th>
//   </tr>`;
//     document.getElementById('gameHistory').innerHTML = gameHistoryHTML;
// }

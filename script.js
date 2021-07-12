var originalBoard;
const human='human';
const computer='computer';
const cells=document.querySelectorAll('.cells')
const replay=document.querySelector('#restart');

play();
function play(){
    document.querySelector('.tie').style.display='none';
    originalBoard=Array.from(Array(9).keys());
    cells.forEach(cells=>{
        cells.innerText='';
        cells.addEventListener('click',turnClick,false);
    });
}
function turnClick(square){
    if(typeof originalBoard[square.target.id]==='number'){
        turn(square.target.id,human);
        if(checkWinner(originalBoard,human)==false&&!checkTie())
        {
            turn(findBestMove(),computer);
        }
    }
}
function turn(squareId,player){
    originalBoard[squareId]=player;
    if(player==human){
        document.getElementById(squareId).classList.add('cross');
    }
    else if(player==computer){
        document.getElementById(squareId).classList.add('circle');
    }
    let winner=checkWinner(originalBoard,player);
    if(winner){endGame(winner)}
}
function findBestMove(){
    // console.log(minimax(originalBoard,computer).index)
    return minimax(originalBoard,computer).index;
}
function minimax(newBoard,player){
    var availSpot=emptyCell();
 
    if(checkWinner(newBoard,human))
    {
        return {score:-10};
    }
    else if(checkWinner(newBoard,computer))
    {
        return {score:10};
    }
    else if(availSpot.length===0){
        return {score:0};
    }
   
    var moves=[];
    for(var i=0;i<availSpot.length;i++){
        var move={};
        move.index=newBoard[availSpot[i]];
        newBoard[availSpot[i]]=player;
        if(player==computer){
            var result=minimax(newBoard,human);
            move.score=result.score;
        }
        else{
            var result=minimax(newBoard,computer);
            move.score=result.score;
        }
        newBoard[availSpot[i]]=move.index;
        moves.push(move);
    }
    var bestMove;
    if(player===computer){
        var bestScore=-10000;
        for(var i=0;i<moves.length;i++){
            if(moves[i].score>bestScore){
            bestScore=moves[i].score;
            bestMove=i;
        }
        
        }
    }
    else{
        var bestScore=10000;
        for(var i=0;i<moves.length;++i){
            if(moves[i].score<bestScore){
            bestScore=moves[i].score;
            bestMove=i;
            }
           
        }
    }
    return moves[bestMove];
}
function endGame(winner){
    for(let i=0;i<winner.length-1;++i){
        if(winner[winner.length-1]==human){
            document.getElementById(winner[i]).style.backgroundColor='blue';
            cells.forEach(cells=>cells.removeEventListener('click',turnClick,false));
        }
        else{
            document.getElementById(winner[i]).style.backgroundColor='red';
            cells.forEach(cells=>cells.removeEventListener('click',turnClick,false));
        }
        
    }
}
function emptyCell(){
    // console.log(originalBoard.filter(s=>typeof s=='number'));
    return originalBoard.filter(s=>typeof s=='number');
}
function checkTie(){
    if(emptyCell().length==0){
        declareTie();
        return true;
    }
    return false;
    
}
function declareTie(){
    document.querySelector('.tie').style.display='flex';
}
function checkWinner(board,player){
    //row
    if(board[0]===board[1]&&board[1]===board[2]){
        if(board[0]==player)
        return [0,1,2,player];
    }
    if(board[3]===board[4]&&board[4]===board[5]){
        if(board[3]==player)
       return [3,4,5,player];
    }
    if(board[6]===board[7]&&board[7]===board[8]){
        if(board[6]==player)
       return [6,7,8,player];
    }
    //col
    if(board[0]===board[3]&&board[3]===board[6]){
        if(board[0]==player)
       return [0,3,6,player];
    }
    if(board[1]===board[4]&&board[4]===board[7]){
        if(board[1]==player)
       return [1,4,7,player];
    }
    if(board[2]===board[5]&&board[5]===board[8]){
        if(board[2]==player)
       return [2,5,8,player];
    }
    //diagonal
    if(board[0]===board[4]&&board[4]===board[8]){
        if(board[0]==player)
        return [0,4,8,player];
    }
    if(board[2]===board[4]&&board[4]===board[6]){
        if(board[2]==player)
        return [2,4,6,player];
    }
    return false;
}
replay.addEventListener('click',restart);
function restart(square){
    console.log("hey")
    document.querySelector('.tie').style.display='none';
    const cells=document.querySelectorAll('cells');
    for(let i=0;i<9;i++){
        if(document.getElementById(i).classList.contains('cross')){
            document.getElementById(i).classList.remove('cross');
            
            originalBoard[i]=i;
            // console.log(originalBoard[i]);
        }
        if(document.getElementById(i).classList.contains('circle')){
            document.getElementById(i).classList.remove('circle');
            originalBoard[i]=i;
        }
       
    }
}
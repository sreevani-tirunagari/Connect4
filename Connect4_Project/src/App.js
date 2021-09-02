import React, {Component} from 'react';
import './App.css'

import { BrowserRouter as Router, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';



const about = ()=>{
  return ( 
    <div className="container mt-5" align="center">
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">About Connect4</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            Connect Four is a two-player connection board game, in which the players choose a color and then take turns dropping colored discs into a seven-column, six-row vertically suspended grid.
             The pieces fall straight down, occupying the lowest available space within the column. 
             The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs. Connect Four is a solved game. The first player can always win by playing the right moves.
            
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        <div class="card text-center text-white bg-dark mb-3 col-6">
        <div class="card-header" aria-hidden="true" data-toggle="modal" data-target="#exampleModal">
        <p> To know about the game click <i  className="fa fa-info"></i></p>
        </div>
        <div class="card-body">
          <h5 class="card-title">Connect4</h5>
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Connect_Four.gif" className="my-4" alt="Game Instruction"/><br/>
          <a href="/player" class="btn btn-primary"><i class="fa fa-gamepad"></i> Game</a>
        </div>
        <div class="card-footer text-muted">
          Copyright | @Sreevani | All rights reserved
        </div>
      </div>
    </div>
    
  );
}


class App extends Component {


      constructor(props){
        super(props);
        this.state={
          player1: "",
          player2: "",
          yellow : "",
          blue: "", 
          setName: false   
        }
      }

      componentWillUnmount(){
        localStorage.clear();
      }
      menu = () =>{
        return(
          <div className="container menu">
            <div className="row col-sm">
            <div className="col">
              <button className="btn btn-primary btn-lg mx-5 col-1" disabled> </button><br/>
              <div class="input-group mb-3 my-5">
              <input type="text" class="form-control" placeholder="Enter Name" aria-label="Recipient's username" onInput={this.input1} value={this.state.player1} aria-describedby="basic-addon2"/>
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">Player1</span>
              </div>
              </div>
            </div>
            <div className="col">
              <button className="btn btn-warning btn-lg mx-5 col-1" disabled> </button><br/>
              <div class="input-group mb-3 my-5">
              <input type="text" class="form-control" placeholder="Enter Name" aria-label="Recipient's username" onInput={this.input2} value={this.state.player2} aria-describedby="basic-addon2"/>
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">Player2</span>
              </div>
              </div>
            </div>
            </div>
                <button type="button" class="btn btn-outline-success" onClick={this.setCoin}><i class="fa fa-play" aria-hidden="true"></i>  Play</button>
          </div>
        );
      }

    input1 = (event)=>{
      this.setState({
        player1: event.target.value
      })
    }

    input2 = (event)=>{
      this.setState({
        player2: event.target.value
      })
    }

    setCoin = () =>{
      if(this.state.player1 === "" || this.state.player2 ===""){
        alert("Fill the names"); 
        return;
      }
      this.setState({
        blue:this.state.player1,
        yellow:this.state.player2
      })
      localStorage.setItem("Yellow",this.state.player2);
      localStorage.setItem("Blue",this.state.player1);
      localStorage.setItem("blueScore",0);
      localStorage.setItem("yellowScore",0);
      window.location.replace("/game");
    }

    render() {
        return (
            <Router>
                <div className="App">

                 <Route path="/" exact component={about}/>  

                 <Route path="/player" exact component={this.menu}/> 

                <Route path="/game" exact render={() =>(
                 localStorage.getItem("Blue") != null? (<Board />): (<Redirect to="/player" />))
                }/>  

              </div>
            </Router>
        );
    }
}

class Board extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      blue: "bg-primary",
      yellow: "bg-warning",
      board: [["bg-light","bg-light","bg-light","bg-light","bg-light","bg-light","bg-light"],
              ["bg-light","bg-light","bg-light","bg-light","bg-light","bg-light","bg-light"],
              ["bg-light","bg-light","bg-light","bg-light","bg-light","bg-light","bg-light"],
              ["bg-light","bg-light","bg-light","bg-light","bg-light","bg-light","bg-light"],
              ["bg-light","bg-light","bg-light","bg-light","bg-light","bg-light","bg-light"],
              ["bg-light","bg-light","bg-light","bg-light","bg-light","bg-light","bg-light"],
        ],
      blueStatus: true
    };
  }

  render(){
    return(
      <div className="container">
            <h1>Connect4</h1>
            <div class="dropdown sticky-top">
            <button type="button" class={this.state.blueStatus?"btn btn-primary btn-lg":"btn btn-warning btn-lg"}  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.blueStatus?localStorage.getItem("Blue")+" : "+localStorage.getItem("blueScore"):localStorage.getItem("Yellow")+" : "+localStorage.getItem("yellowScore")}</button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" >{!this.state.blueStatus?localStorage.getItem("Blue")+" : "+localStorage.getItem("blueScore"):localStorage.getItem("Yellow")+" : "+localStorage.getItem("yellowScore")}</a>
            </div>
          </div>

       <button type="button" class="btn btn-dark" onClick={this.restart}>Restart</button>
            <table class="col-lg-7 table table-dark" align="center">
            <tbody>
              {this.state.board.map((colors,i) =>
                  <tr key={i}>
                     <td onClick={() =>this.game(0)} className={colors[0]}></td>
                     <td onClick={() =>this.game(1)} className={colors[1]}></td>
                     <td onClick={() =>this.game(2)} className={colors[2]}></td>
                     <td onClick={() =>this.game(3)} className={colors[3]}></td>
                     <td onClick={() =>this.game(4)} className={colors[4]}></td>
                     <td onClick={() =>this.game(5)} className={colors[5]}></td>
                     <td onClick={() =>this.game(6)} className={colors[6]}></td>
                  </tr>    
              )}
            </tbody>
          </table>
        </div>
    )
  }

  game(col){
    let row=5
    console.log(localStorage.getItem("Blue"))
    while(row>=0)
    {
      if(this.state.board[row][col] === "bg-light" && row>=0 && col>=0)
      {
        var board = this.state.board
        board[row][col] = this.state.blueStatus? this.state.blue:this.state.yellow;
        this.setState(state =>({
          board:board,
          blueStatus: !state.blueStatus
        }))
        if(this.winCheck(board,this.state.board[row][col]))
        {
          let winner=this.state.board[row][col]
          if(winner === this.state.blue)
          {
              var message=localStorage.getItem("Blue")+" is the winner!.."
              localStorage.setItem("blueScore",parseInt(localStorage.getItem("blueScore"))+1)
          }
          else
          {
            var message=localStorage.getItem("Yellow")+" is the winner!.."
            localStorage.setItem("yellowScore",parseInt(localStorage.getItem("yellowScore"))+1)
          }
          alert(message)
          if(localStorage.getItem("Blue") === null)
          {
            window.location.replace("/player")
          }
          else
          {
            window.location.replace("/game")
          }
        }
        break;
      }
      row--;
    }
  }

  restart(){
    localStorage.clear();
    window.location.replace("/player");
  }

  winCheck(board,piece){
    // Check horizontal locations for win
    for(let c=0;c<4;c++)
    {
      for(let r=0;r<6;r++)
      {
        if(board[r][c] === piece && board[r][c+1] === piece && board[r][c+2] ===piece && board[r][c+3] === piece)
        {
          return true
        }
      }
    }

    // Check vertical locations for win
    for(let c=0;c<7;c++)
    {
      for(let r=0;r<3;r++)
      {
        if(board[r][c] === piece && board[r+1][c] === piece && board[r+2][c] ===piece && board[r+3][c] === piece)
        {
          return true
        }
      }
    }

    // Check positively sloped diaganols
    for(let c=0;c<4;c++)
    {
      for(let r=0;r<3;r++)
      {
        if(board[r][c] === piece && board[r+1][c+1] === piece && board[r+2][c+2] ===piece && board[r+3][c+3] === piece)
        {
          return true
        }
      }
    }

    // Check negatively sloped diaganols
    for(let c=0;c<4;c++)
    {
      for(let r=3;r<6;r++)
      {
        if(board[r][c] === piece && board[r-1][c+1] === piece && board[r-2][c+2] ===piece && board[r-3][c+3] === piece)
        {
          return true
        }
      }
    }
  }
}

export default App;

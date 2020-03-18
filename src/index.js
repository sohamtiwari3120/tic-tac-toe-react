import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// class Square extends React.Component {
//   // constructor(props){
//   //   super(props)
//   //   this.state={
//   //     null_value:null
//   //   };
//   // }
//     render() {
//       return (
//         <button 
//         className="square" 
//         onClick={()=>{
//           // this.props.onClick(this.state.null_value)
//           // this.setState({null_value:1})
//           this.props.onClick();
//         }}>
//           {this.props.value}
//         </button>
//       );
//     }
//   }
// we will now use function componenets,ie if a react componenet does not have any state, we can use functional componenets which are less tedious t write
class Square extends React.Component {
  constructor(props){
    super(props);
    this.state={
      not_clicked:true
    }
  }
  render(){
    if(this.props.winner && this.props.value===null)
    return(
      <button className='square' onClick={this.props.onClick}>{this.props.value}</button>
    );
    if(this.props.value===null){
      if(this.props.value_flag){
        // this.setState({not_clicked:false})
        return(
          <button className='square squareX' onClick={this.props.onClick}>{this.props.value}</button>
        );
      }
      else
        return(
         <button className='square squareO' onClick={this.props.onClick}>{this.props.value}</button>
        );
    }
    else if(this.props.value==='X')
    return(
      <button className='squareXclicked' onClick={this.props.onClick}>{this.props.value}</button>
    );
    else if(this.props.value==='O')
    return(
      <button className='squareOclicked' onClick={this.props.onClick}>{this.props.value}</button>
    );
  }
  
}
  class Board extends React.Component {
    // constructor(props){
    //   super(props)
    //   this.state={
    //     flag:true,
    //     squares: Array(9).fill(null),
    //   }
    // }
    renderSquare(i) {
      return <Square 
      value={this.props.squares[i]} 
      // onClick={(value)=>{
      //   const squares = this.state.squares.slice()
      //   if(value===null){
      //     if(this.state.flag===0){
      //       squares[i]='X'
      //       this.setState({squares:squares, flag: 1})
      //     }else if(this.state.flag===1){
      //       squares[i]='O'
      //       this.setState({squares:squares, flag: 0})
      //     }
      //   }
        
      // }}
      onClick={()=>{
        this.props.onClick(i);
      }}
      value_flag={this.props.flag}
      winner={this.props.winner}
      />;
    }
    
    render() {

      // const winner = calculateWinner(this.state.squares);
      // let status;
      // if(winner){
      //   status = 'Winner: '+winner;
      // }else{
      //   status = 'Next player: '+(this.state.flag?'X':'O');
      // }
  
      return (
        <div>
          {/* <div className="status"><b>{this.props.status}</b></div> */}
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <br></br>
          {/* <button onClick={()=>{
            const squares = Array(9).fill(null)
            this.setState({squares:squares, flag:true})
          }}>Reset</button> */}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state={
        history: [{
          squares:Array(9).fill(null)
        }],
        flag:true,
        stepNumber:0
      }
    }

    handleClick(i){
      const history = this.state.history.slice(0,this.state.stepNumber+1);
      const current = history[this.state.stepNumber];
      const squares= current.squares.slice();
      if(calculateWinner(squares)||squares[i]!=null)
      {
        return;
      }
      squares[i]=this.state.flag?'X':'O';
      this.setState({
        history:history.concat([{squares:squares,}]), 
        stepNumber:history.length,

        flag:!this.state.flag});
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        flag:(step%2)===0
      });
    }

    render() {
      const history = this.state.history.slice(0, this.state.stepNumber+1);
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares.slice())
      let status;
      if(winner){
        status = 'Winner: '+winner;
      }else if(this.state.stepNumber===9){
        status="It's a tie!"
      }else{
        status = 'Next player: '+(this.state.flag?'X':'O');
      }
      // let temp=[[1],[2],[3],[]]
      // const moves=temp.map((value,index)=>{})

      // const moves = history.map(
      //   (step, move)=>{
      //     // console.log('step:'+step.squares)
      //     // console.log('move:'+move)
      //     const desc = move!==0 ? 
      //     'Go to move #'+move:
      //     'Go to game start';
        
      //     return(
      //      <li key={move}>
      //        <button onClick={ ()=>this.jumpTo(move) } > 
      //        {desc} 
      //        </button>
      //      </li>
      //     );
      //   });
      let moves =[
      <button onClick={ ()=>this.jumpTo(0) } disabled> 
        Reset
      </button>,
      <button onClick={ ()=>this.jumpTo(Math.max(this.state.stepNumber-1,0)) } disabled> 
      Undo
    </button>]
    if(history.length>1)
      moves[0] =
        <button onClick={ ()=>this.jumpTo(0) } > 
          Reset
        </button>
    if(history.length>2)
      moves[1] =
        <button onClick={ ()=>this.jumpTo(Math.max(this.state.stepNumber-1,0)) } > 
        Undo
      </button>
  
          
      
      console.log(moves)
      return (
        <div className="game">
        <div className='title'>Tic Tac Toe</div>
          <div className="game-board">
            <Board 
            // status={status} 
            squares={history[this.state.stepNumber].squares}  
            // flag={this.state.flag} 
            onClick={(i)=>this.handleClick(i)}
            flag={this.state.flag}
            winner={winner}
            />
          </div>
          <div className="game-info">
            <div className='status'>{ status }</div>
            <div className='controls'>{moves}</div>
          </div>
        </div>
      );
    }
  }
  function calculateWinner(squares){
    const lines=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,4,6],
      [2,5,8],
      [0,4,8]
    ];
    for( let i = 0; i<lines.length; i++){
      const [a,b,c]=lines[i];
      if(squares[a]!=null && squares[a]===squares[b] && squares[b]===squares[c])
      {
        return squares[a];
      }
    }
    return null;
  }
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
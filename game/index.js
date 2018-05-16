import { Map } from 'immutable'

export const move = (player, position) => {
  return { type: 'MOVE', player, position }
}

function winner(board) {
  let result = null;

  // Horizontal rows
  board.map(row => {
    if (streak(row)){
      result = streak(row);
    }
  });

  // Vertical rows
  board.map((row, key) => {

  });

  // Diagonals

  return result;
}

function streak(row) {
  let countX = 0;
  let countO = 0;

  row.map((cell) => {
    if (cell === 'X'){
      countX++;
    } else if (cell === 'O'){
      countO++;
    }
  });

  if (countX === 3){
    return 'X';
  } else if (countO === 3){
    return 'O';
  }
}

let initalBoard = Map();

const initialState = {
  turn: 'X',
  position: [],
  board: initalBoard
}

/*
Map {
  0: Map { 0: "X", 1: "O", 2: "X" },
  1: Map { 0: "O", 1: "X", 2: "O" },
  2: Map { 0: "X", 1: "O", 2: "X" }
  }
}
*/

export default function reducer(state = initialState, action) {
  if (action.type === 'MOVE') {
    console.log('BOARD', state.board)
    const currentPlayer = action.player === 'X' ? 'O' : 'X'

    const newBoard = state.board.setIn(action.position, action.player);

    // check the winner
    if (winner(newBoard)){
      console.log('WINNER!! ->', winner(newBoard));
      process.exit(0);
      // return state.board;
    }

    return {
      turn: currentPlayer,
      position: action.position,
      board: newBoard,
    };
  } else {
    return state;
  }
}

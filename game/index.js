import { Map } from 'immutable'

export const move = (player, position) => {
  return { type: 'MOVE', player, position }
}

function winner(board) {
  let result = null
  // Horizontal rows

  let row = []
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      row.push(board.getIn([r, c]))
    }
    if (streak(row)) {
      result = streak(row)
      break
    }
    row = []
  }
  // Vertical rows
  let col = []
  for (let c = 0; c < 3; c++) {
    for (let r = 0; r < 3; r++) {
      col.push(board.getIn([r, c]))
    }
    if (streak(col)) {
      result = streak(col)
      break
    }
    col = []
  }
  // Diagonal
  let diagonal = [board.getIn([0, 2]), board.getIn([1, 1]), board.getIn([2, 0])]
  if (streak(diagonal)) result = streak(diagonal)

  diagonal = [board.getIn([0, 0]), board.getIn([1, 1]), board.getIn([2, 2])]
  if (streak(diagonal)) result = streak(diagonal)

  return result
}

function streak(coordinates) {
  let countX = 0
  let countO = 0

  coordinates.map(cell => {
    if (cell === 'X') {
      countX++
    } else if (cell === 'O') {
      countO++
    }
  })

  if (countX === 3) {
    return 'X'
  } else if (countO === 3) {
    return 'O'
  }
}

let initalBoard = Map()

const initialState = {
  turn: 'X',
  position: [],
  board: initalBoard,
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

    const newBoard = state.board.setIn(action.position, action.player)

    // check the winner
    if (winner(newBoard)) {
      console.log('WINNER!! ->', winner(newBoard))
      process.exit(0)
      // return state.board;
    }

    return {
      turn: currentPlayer,
      position: action.position,
      board: newBoard,
    }
  } else {
    return state
  }
}

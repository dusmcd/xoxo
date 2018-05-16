import { Map } from 'immutable'

export const move = (player, position) => {
  return { type: 'MOVE', player, position }
}

function winner(board) {
  // returns X, O, cat's game, or null (if ongoing)
  board.map(row => {
    streak(row)
  })
}

function streak(board, ...coordinates) {}

const initialState = {
  turn: 'X',
  position: [],
  board: Map(),
}

export default function reducer(state = initialState, action) {
  if (action.type === 'MOVE') {
    console.log('BOARD', state.board)
    const currentPlayer = action.player === 'X' ? 'O' : 'X'
    // check the winner
    return {
      turn: currentPlayer,
      position: action.position,
      board: state.board.setIn(action.position, action.player),
    }
  } else {
    return state
  }
}

import {Map} from 'immutable';

export const move = (player, position) => ({type: 'MOVE', player, position});

const initialState = {
  player: 'X',
  position: [],
  board: Map()
};

export default function reducer(state = initialState, action) {
  if (action.type === 'MOVE'){
    return {
      player: action.player,
      position: action.position,
      board: state.getIn(action.position, action.player)
    };
  } else {
    return state;
  }
}

// DEPENDENCY
import alt from '../alt';

class CanvasActions {
  constructor() {
    this.generateActions(
      'loading',
      'selectPlayers',
      'togglePlayer',
    );
  }

  // fetchGithub() {
  //   return (dispatch) => {
  //     fetch('https://api.github.com/users/github')
  //     .then((response) => {
  //       return response.json();
  //     }).then((json) => {
  //       dispatch(json);
  //     }); 
  //   };
  // }
}

export default alt.createActions(CanvasActions);

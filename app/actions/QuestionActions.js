// DEPENDENCY
import alt from '../alt';

class QuestionActions {
  constructor() {
    this.generateActions(
      'buzz',
      'recordAnswer',
      'setClue',
      'setAnswer',
    );
  }

  fetchQuestion() {
    // return (dispatch) => {
    //   fetch('QUESTION_API')
    //   .then((response) => {
    //     return response.json();
    //   }).then((json) => {
    //     dispatch(json);
    //   });
    // };
  }
}

export default alt.createActions(QuestionActions);

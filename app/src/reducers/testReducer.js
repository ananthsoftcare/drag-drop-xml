const testReducer = (state = [], action) => {
  switch(action.type) {
    case 'GET_CONTENT':
      console.log("GET_CONTENT",action.data);
      return action.data;
      // return {
      //   ...state,
      //   content: action.data
      // };
      // break;
    default:
      return state;
  }
}
export default testReducer;

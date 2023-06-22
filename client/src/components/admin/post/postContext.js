export const articleState = {
    articles : [],
    addPostModal: false,
    editPostModal: {
      modal: false,
      poId: null,
      des: "",
      status: "",
    },
    loading: false,
}
export const articleReducer = (state,action) =>{
    switch (action.type) {
        case "fetchPostAndChangeState":
            return {
              ...state,
              categories: action.payload,
            };
        case "addArticle":
            return  {
                ...state,
                articles: action.payload
            }
        case "loading":
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
}
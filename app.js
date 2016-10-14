console.log("app js connected dd");



const commentReducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return Object.assign(state, {
                rating: 5
            })
    }
};

const commentsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [
                {
                    id: new Date().getTime(),
                    text:action.text,
                    rating:0
                },
                ...state
            ];
         case 'INCREMENT':
             return state.map(com => 
                commentReducer(com, action)
            );
        case 'COMMENT_VOTEUP':
            return state.map(com => {
                    if(com.id !== action.id){
                        return com;
                    }
                    else{
                        return Object.assign(com, {
                            rating: this.rating+1
                        })
                    }
                }
            )
        default:
            return state;
    }
}

const {Component} = React;

class Rating extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.onIncrement}>+</button>
                <button onClick={this.props.onDecrement}>-</button>
            </div>
        )
    }
}

class Comments extends Component{
    render(){
        if(this.props.comments !== undefined && this.props.comments.length > 0){
            return(
            <div>
                {this.props.comments.map(com => 
                    <Comment comment={com}/>
                )}
            </div>
            )}
        else return <div>NO COMMENTS</div>
    }
}

Comments.proptypes = {
    comments: React.PropTypes.array.isRequired
}

class Comment extends Component{
    onIncrement(){
        store.dispatch({
            type:'INCREMENT'
        })
    }
    onDecrement(){
        store.dispatch({
            type:'DECREMENT'
        })
    }
    render() {
        return(
            <div>
                Text: {this.props.comment.text}
                Rating: {this.props.comment.rating}
                <button onClick={() => {
                    store.dispatch({
                        type: 'COMMENT_VOTEUP',
                        id: this.props.comment.id
                    }) 
                }}>+</button>
            </div>
        )
    }
}



class Controls extends Component{
    render() {
        return(
            <div>
            <input type="text" ref={node => {
                this.input = node;
            }}></input>
                Enter Comment here
            <button onClick={() => {
                store.dispatch({
                    type:'ADD_COMMENT',
                    text:this.input.value
                });
                this.input.value = '';
            }}>Add Comment</button>
            </div>
        )
    }
}

class App extends Component{
    render() {
        return(
            <div>
                <Controls/>
                <Comments comments={this.props.comments}/>
            </div>
        )
    }
}

// const Counter = ({
//         value,
//         onIncrement,
//         onDecrement
//     }) => (
//         <div>
//             <h1>{value}</h1>
//             <button onClick={onIncrement}>+</button>
//             <button onClick={onDecrement}>-</button>
//         </div>
//     );

const {createStore} = Redux;
const {combineReducers} = Redux;

const reducers = combineReducers({
    commentsReducer
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())



const render = () => {
    ReactDOM.render(
        <App comments = {store.getState().commentsReducer}/>,
        document.getElementById("body")
    )
}

store.subscribe(render);
render();
import React from 'react';
import {Component} from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
    constructor(props){
        super(props);




        this.state = {
            requested: false,
            loadedUsers: false,
            loadedTodos: false,
            articles: null,
            users: null,
            todos: null,
            filter: ''
        };

    }

    handleClick() {
        this.setState({
            requested: true
        });

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://my-json-server.typicode.com/mate-academy/literary-blog/articles');

        xhr.addEventListener('load', () => {
            this.setState({
                loaded: true,
                articles: JSON.parse(xhr.response)
            });
        });

        xhr.send();
    }

    filterChanged(event) {
        this.setState(
            {filter: event.target.value}
        );
    }


    render() {
        if(!this.state.requested){
            return <button onClick={this.handleClick}>Fetch articles!</button>;
        } else if(this.state.loadedUsers&&this.state.loadedTodos){
            const articleComponents = this.state.todos.filter(post => );

            this.userMap = this.state.users.reduce((acc, user) => ({...acc, [user.id]: user,}), {});
            this.items = this.state.todos.map(item => <TodoItem title={item.title}
                                                                completed={item.completed}
                                                                userId={item.userId}
                                                                key={item.id}
                                                                userMap={this.userMap}/>);
        }
        return (
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Completed</th>
                        <th>User</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.items}
                    </tbody>
                </table>
        );
    }
}

export default TodoList;

// export default function TodoList() {
//     const userMap = users.reduce((acc, user) => ({...acc, [user.id]: user,}), {});
//     const items = todos.map(item => <TodoItem title={item.title}
//                                               completed={item.completed}
//                                               userId={item.userId}
//                                               key={item.id}
//                                               userMap={userMap}/>);
//
//     return (
//         <table>
//             <thead>
//             <tr>
//                 <th>Title</th>
//                 <th>Completed</th>
//                 <th>User</th>
//             </tr>
//             </thead>
//             <tbody>
//             {items}
//             </tbody>
//         </table>
//     )
// }

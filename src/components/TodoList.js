import React, { Component } from 'react';
import { TodoItem } from './TodoItem';

export class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requested: false,
            loadedUsers: false,
            loadedTodos: false,
            articles: null,
            users: null,
            todos: null,
            todoComponents: null
        };

        this.handleClick = this.handleClick.bind(this);
        this.filterChanged = this.filterChanged.bind(this);
    }

    handleClick() {
        this.setState({
            requested: true
        });

        const xhrTodos = new XMLHttpRequest();
        const xhrUsers = new XMLHttpRequest();
        const url = 'https://jsonplaceholder.typicode.com/';

        xhrTodos.open('GET', `${url}todos`);
        xhrUsers.open('GET', `${url}users`);

        xhrTodos.addEventListener('load', () => {
            const dataTodos = JSON.parse(xhrTodos.response);
            this.setState({
                loadedTodos: true,
                todos: dataTodos,
                todoComponents: dataTodos
            });
        });
        xhrUsers.addEventListener('load', () => {
            this.setState({
                loadedUsers: true,
                users: JSON.parse(xhrUsers.response)
            });
        });

        xhrTodos.send();
        xhrUsers.send();
    }

    filterChanged(event) {
        const filteredTodos = this.state.todos.filter(post => {
            return post.title.includes(event.target.value);
        });
        this.setState(
            {todoComponents: filteredTodos}
        );
    }

    render() {
        if (!this.state.requested) {

            return <input type="button" onClick={this.handleClick} value="Download todos!" />;
        } else if (this.state.loadedUsers && this.state.loadedTodos) {
            this.userMap = this.state.users.reduce((acc, user) => ({...acc, [user.id]: user,}), {});
            const items = this.state.todoComponents.map(item => (
              <TodoItem title={item.title}
                completed={item.completed}
                userId={item.userId}
                key={item.id}
                userMap={this.userMap}
              />
            ));

            return (
                <div>
                    <input type="text" placeholder="search by title" onChange={this.filterChanged}/>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Completed</th>
                                <th>User</th>
                            </tr>
                        </thead>
                            <tbody>
                                {items}
                            </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <input type="button" disabled={true} value="Loading..."/>
            );
        }
    }
}

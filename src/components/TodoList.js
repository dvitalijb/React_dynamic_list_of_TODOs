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
            filter: ''
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
            this.setState({
                loadedTodos: true,
                todos: JSON.parse(xhrTodos.response)
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
        this.setState(
            {filter: event.target.value}
        );
    }

    render() {
        if (!this.state.requested) {

            return <button onClick={this.handleClick}>Download posts!</button>;
        } else if (this.state.loadedUsers && this.state.loadedTodos) {
            const postComponents = this.state.todos.filter(post => {
                return post.title.includes(this.state.filter);
            });

            this.userMap = this.state.users.reduce((acc, user) => ({...acc, [user.id]: user,}), {});
            const items = postComponents.map(item => (<TodoItem title={item.title}
                                                                completed={item.completed}
                                                                userId={item.userId}
                                                                key={item.id}
                                                                userMap={this.userMap}
                                                                />));

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
                <div>Loading...</div>
            )
        }
    }
}

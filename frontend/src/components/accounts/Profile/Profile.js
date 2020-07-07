import React from 'react';
import {Link} from 'react-router-dom';

class Profile extends React.Component {

    state = {
        lists: [],
    }

    getMyListsHandler = () => {
        fetch(`http://localhost:5000/api/my-lists/`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ lists: data })
                console.log(data)
            })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        event.target.reset();
        let object = {};
        formData.forEach((value, key) => { object[key] = value });
        fetch(`http://localhost:5000/api/my-lists/`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.getMyListsHandler()
            })
            .catch((error) => {
                console.error(error);
            })
    }

    componentDidMount() {
        this.getMyListsHandler()
    }

    render() {
        return (
            <div>
                <h1>Profile Page</h1>
                <form className="AddListForm" onSubmit={this.submitHandler}>
                    <label>
                        Name of the list:
                        <input type="text" name="list_name" placeholder="Name of the list..." required />
                    </label>
                    <button type="submit">Add</button>
                </form>
                <div className="Lists">
                    {
                        this.state.lists.map((list) => {
                            return (
                                <Link key={list.id} to={`/list/${list.id}`}>
                                    <h4>{list.id} --&gt; {list.list_name}</h4>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Profile;
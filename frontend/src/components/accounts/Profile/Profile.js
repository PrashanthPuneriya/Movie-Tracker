import React from 'react';

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
                <div className="Lists">
                    {
                        this.state.lists.map((list) => {
                            return (
                                <h4 key={list.id}>{list.id} --&gt; {list.list_name}</h4>
                            )
                        })
                    }
                </div>
                <form className="AddListForm" onSubmit={this.submitHandler}>
                    <label>
                        Name of the list:
                        <input type="text" name="list_name" placeholder="Name of the list..." required />
                    </label>
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}

export default Profile;
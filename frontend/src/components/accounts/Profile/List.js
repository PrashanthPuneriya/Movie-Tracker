import React from 'react';

class List extends React.Component {

    state = {
        currentListID: null,
        movies: []
    }

    getListDetailsHandler = (currentListID) => {
        fetch(`http://localhost:5000/api/my-lists/${currentListID}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ movies: data })
                console.log(data)
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
    }

    deleteListHandler = (event) => {
        event.preventDefault();
        const currentListID = this.state.currentListID;
        fetch(`http://localhost:5000/api/my-lists/${currentListID}`, {
            method: 'DELETE', headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                console.log(response);
                return response.json()
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    }

    componentDidMount() {
        const currentListID = this.props.match.params.id;
        this.setState({ currentListID: currentListID });
        this.getListDetailsHandler(currentListID)
    }

    render() {
        return (
            <div>
                <button onClick={this.deleteListHandler}>Delete this list</button>
            </div>
        );
    }
}

export default List;
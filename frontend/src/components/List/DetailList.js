import React from 'react';

class DetailList extends React.Component {

    state = {
        currentListID: null,
        movies: []
    }

    getListDetailsHandler = (currentListID) => {
        fetch(`http://localhost:5000/api/my-lists/${currentListID}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ movies: data })
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
    }

    deleteListHandler = (event) => {
        event.preventDefault();
        const currentListID = this.state.currentListID;
        fetch(`http://localhost:5000/api/my-lists/${currentListID}`, {
            method: 'DELETE',
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
                <div className="ListOfMovies">
                    {
                        this.state.movies.map((movie) => {
                            return (
                                <h4 key={movie.movie_id}>{movie.movie_title}</h4>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default DetailList;
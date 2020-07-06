import React from 'react';

class Profile extends React.Component {

    getMyListsHandler = () => {
        fetch(`http://localhost:5000/api/my-lists/`)
            .then((response) => response.json())
            .then((data) => {
                // console.log(response)
                console.log(data)
            })
    }

    componentDidMount() {
        this.getMyListsHandler()
    }

    render() {
        return (
            <div>
                <h1>Profile Page</h1>
            </div>
        );
    }
}

export default Profile;
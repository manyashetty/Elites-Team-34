import React, { Component } from 'react';
import Axios from 'axios';

export class ScoreBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [], // Updated state to store fetched users
    };
  }

  componentDidMount() {
    // Fetch user data with role='supplier' from the backend API
    Axios.get('http://localhost:4000/users', {
      params: { role: 'user' } // Add query parameter to filter by role
    })
      .then((response) => {
        const userData = response.data.data; // Assuming data is an array of user objects

        // Set the state with the fetched users
        this.setState({ users: userData });
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Leaderboard</h5>
            <table className="table table-borderless">
              {/* Table headers */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Supplier</th>
                  <th>Scores</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        {/* Display user data */}
                        <img
                          src={user.profile_pic || ' '}
                          style={{ width: '50px', height: '50px' }}
                          alt="image-thumbnail"
                        />
                        <div className="align-self-centre pl-3">
                          <span className="font-weight-bold">{user.name}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      {/* Placeholder for user score */}
                      <b>{user.user_score || 'No score available'}</b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ScoreBoard;

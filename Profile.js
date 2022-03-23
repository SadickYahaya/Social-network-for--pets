import React from 'react';
import { fetchUserData, cancelFetch } from './dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userData: null};
  }

  loadUserData() {
    this.setState({userData: this.state.userData});
    this.fetchID = fetchUserData(this.props.username, (userData) => {
  this.setState({ userData });
});
  }

  componentDidMount(){
    this.loadUserData();
  }

  componentWillUnmount() {
    cancelFetch(this.fetchID);
  }

  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username){
      cancelFetch(this.fetchID);
      this.loadUserData()
    }
  }

  render() {
    const isLoading = this.state.userData === null;

    let className = 'Profile';
    if (isLoading) {
      className += ' loading';
    }
    let name;
    if (isLoading){
      name = 'Loading...';
    } else {
      name = this.state.userData.name;
    }

    let bio;
    if(isLoading){
      bio = 'Life goes on';
    } else {
      bio = this.state.userData.bio;
    }

    let friends;
    if(isLoading){
      friends = [];
    } else {
      friends = this.state.userData.friends;
    }

    let profilePic;
    if(isLoading){
      profilePic = null;
    }else {
   profilePic = <img src={this.state.userData.profilePictureUrl} alt="" />
    }
    return (
      <div className={className}>
        <div className="profile-picture">{profilePic}</div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio}</p>
          <h3>My friends</h3>
          <Userlist usernames={[]} onChoose={friends} />
        </div>
      </div>
    );
  }
}
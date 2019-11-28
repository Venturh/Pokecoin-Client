import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Badge } from 'reactstrap';

import { blockchainActions } from '../../actions/BlockchainAction';
import { UsersApi } from '../../server';
import { cookies } from '../../constants/Cookie';


import { userActions } from '../../actions/UserAction';

class Balance extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
        };
        this.usersAPI = new UsersApi();
        this.usersAPI.apiClient.authentications.token.apiKey = cookies.get('token');

        
    }

    componentDidMount() {
      this.fetchUsers();
      this.timer = setInterval(() => this.fetchUsers(), 20000);
  }

    componentWillUnmount() {
      clearInterval(this.timer);
      this.timer = null;
  }



    fetchUsers(){
      this.props.getBalance();
    }

      render() {
        return (
          <div >
            Coins:  <Badge color="info">{this.props.blockchain.balance }</Badge>
          </div>

        );
      }
}

function mapState(state) {
  const { blockchain } = state;
  return { blockchain  };
}

const actionCreators = {
  getBalance: blockchainActions.getBalance

};

export default connect(mapState, actionCreators)(Balance);
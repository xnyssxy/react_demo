import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {login} from '../../model/actions';

class ReduxDemo extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    loginUserName: PropTypes.string,
    loginError: PropTypes.string,
    listData:PropTypes.array
  };

  componentDidMount() {
    console.log('login');
    this.props.login();
  }

  render() {
    console.log(this.props);
    if (this.props.isLoading) {
      return (<p>loading...</p>);
    }
    if (this.props.loginUserName) {
      return (<p>{this.props.loginUserName}</p>)
    }
    if (this.props.loginError) {
      return (<p>{this.props.loginError}</p>)
    }
    if(this.props.listData.length>0){
      return (
        <div>
          <ul>
            {this.props.listData.map((item,id) => {
              console.log(item);
              return <li key={id}>{item.url}</li>
            })}
          </ul>
        </div>

      )
    }
    return null;
  }
}

const mapStateToProps = (state,ownProps) => ({
  isLoading:state.loginPageData.loading,
  loginUserName:state.entities.loginUser && state.entities.loginUser.name || null,
  loginError:state.loginPageData.error && state.loginPageData.error.toString() || null,
  listData:state.entities.loginUser
});

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps,mapDispatchToProps)(ReduxDemo);

import React from 'react';

export default class AsyncLoader extends React.Component{

  static propTypes = {
    path : React.PropTypes.string.isRequired,
    loading:React.PropTypes.element
  };

  static defaultProps = {
    path:'',
    loading:<p>Loading...</p>,
    error:<p>Error!</p>
  };

  constructor(props){
    super(props);
    this.state = {
      module:null
    };
  }

  componentDidMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.path !== this.props.pathname
    || nextProps.error !== this.props.console.error
    || nextProps.loading !== this.props.loading){
      this.load(nextProps);
    }
  }

  load(props){
    this.setState({module:props.loading});

    //TODO 异步代码的路径希望做成可以配置的方式
    import(`ASYNC/${props.path}`)
    .then((m) => {
      let Module = m.default ? m.default : m;
      console.log("module",Module);
      this.setState({module:<Module/>});
    }).catch(() => {
      this.setState({module:props.error});
    });
  }

  render(){
    return this.state.module;
  }
}

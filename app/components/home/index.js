import React                 from 'react';
import { connect }           from 'react-redux';
import { withRouter }        from 'react-router-dom';

//Actions 
import { testAction }        from '../../actions/test';

import './style.css';

class Index extends React.Component{

    static loadData(store) {
        return store.dispatch( testAction() );
    }

    constructor(props){
        super(props);
        this.state = {
            test : props.test
        }
    }

    componentDidMount() {
        this.props.dispatch( testAction() );
    }

    render(){
        return(
            <div>
                {
                    this.props.test.map((item,i)=>{
                        return(
                            <div key={i}>{`${item['name']['first']} ${item['name']['last']}`}</div>
                        );
                    })
                } 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        test : state.test
    }
}

export default withRouter(connect(mapStateToProps)(Index));
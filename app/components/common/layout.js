import React from 'react';

//Components
import Header from './header';
import Footer from './footer';

export default class Layout extends React.Component{
    render(){
        return(
            <div className="container">
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}
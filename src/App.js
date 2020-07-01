import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import classes from './App.module.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

import Main from '../src/conteiners/Main/Main'
import About from './conteiners/About/About';
import Products from './conteiners/Products/Products';
import ActiveProduct from './conteiners/ActiveProduct/ActiveProduct';
import Delivery from './conteiners/Delivery/Delivery';
import Articles from './conteiners/Articles/Articles';
import Contact from './conteiners/Contact/Contact';
import Add from './conteiners/Add/Add';
import AddArticles from './conteiners/AddArticles/AddArticles';
import ActiveArticle from './conteiners/ActiveArticle/ActiveArticle'
import Logout from './comonents/Logout/Logout';


class App extends Component {
  render(){

    let routes = (
      <Switch>
            <Route path='/products' component={Products} exact/>
            <Route path='/products/:id' component={ActiveProduct}  />
            <Route path='/delivery' component={Delivery}/>
            <Route path='/articles' component={Articles} exact/>
            <Route path='/articles/add' component={AddArticles} exact/>
            <Route path='/articles/:id' component={ActiveArticle}/>
            <Route path='/contact' component={Contact}/>         
            <Route path='/about' component={About}/>
            <Route path='/' component={Main}/>
            <Redirect to='/'/>
      </Switch>
    )

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
            <Route path='/products' component={Products} exact/>
            <Route path='/products/add' component={Add} exact/>
            <Route path='/products/:id' component={ActiveProduct}  />
            <Route path='/delivery' component={Delivery}/>
            <Route path='/articles' component={Articles} exact/>
            <Route path='/articles/add' component={AddArticles} exact/>
            <Route path='/articles/:id' component={ActiveArticle}/>
            <Route path='/contact' component={Contact}/>         
            <Route path='/about' component={About}/>
            <Route path='/' component={Main}/>
            <Route path='/logout' component={Logout}/>
            <Redirect to='/'/>
        </Switch>
      )
    }
    
    return (
      <div className={classes.App}>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(App);

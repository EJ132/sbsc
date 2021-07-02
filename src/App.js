import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home'
import Navigation from './Components/Navigation/Navigation';
import Memberships from './Components/Memberships/Memberships';
import Services from './Components/Services/Services';
import ServiceTeamSBSC from './Components/ServiceTeamSBSC/ServiceTeamSBSC';
import PhysicalTherapy from './Components/PhysicalTherapy/PhysicalTherapy';
import PersonalSessions from './Components/PersonalSessions/PersonalSessions';
import MeetPrep from './Components/MeetPrep/MeetPrep'
import ContactUs from './Components/ContactUs/ContactUs'
import Shop from './Components/Shop/Shop';

import ShopProvider from './shopContext'
import ApiContext from './ApiContext'
import Cart from './Components/Cart/Cart';
import Checkout from './Components/Checkout/Checkout';
import Square from './Components/Square/Square';
import { Component } from 'react';
import SchedulePt from './Components/SchedulePt/SchedulePt';
import Schedule1on1 from './Components/Schedule1on1/Schedule1on1';
import Category from './Components/Category/Category';
import Product from './Components/Product/Product';
import ShopHelper from './Helpers/shopHelper'
import ShopSandbox from './Components/Shop/ShopSandbox';
import Success from './Components/Checkout/Success';

export default class App extends Component {

  state = {
    load: false,
    products: [],
  }

  async componentDidMount(){
    let sqPaymentScript = document.createElement("script");
    // sandbox: https://js.squareupsandbox.com/v2/paymentform
    // production: https://js.squareup.com/v2/paymentform
    sqPaymentScript.src = "https://js.squareupsandbox.com/v2/paymentform";
    sqPaymentScript.type = "text/javascript";
    sqPaymentScript.async = false;
    sqPaymentScript.onload = () => {
      this.setState({
        load: true
      })
    };
    document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
    let products = await ShopHelper.getAllProducts();
    this.setState({
      products: products
    })
  }

  squarePayment = this.state.load ? ( <Square paymentForm={ window.SqPaymentForm }/> ) : ( null ) 
  
  render(){
    const value = {
      products: this.state.products,
    };
    return (
      <div className="App">
        <ShopProvider>
          <Navigation />
          <Switch>
            {/* <Route path='/panda' component={Panda}/>  
            <Route path='/gorilla' component={Gorilla}/>               
            <Route path='/rhino' component={Rhino}/> 
            <Route path='/seaTurtle' component={SeaTurtle}/>   */}
            <Route exact path='/' component={Home}/>
            <Route path='/memberships' component={Memberships}/> 
            <Route exact path='/services' component={Services}/>
            <Route exact path='/services/team-sbsc' component={ServiceTeamSBSC}/>
            <Route exact path='/services/physical-therapy' component={PhysicalTherapy}/>
            <Route exact path='/services/personal-sessions' component={PersonalSessions}/>
            <Route exact path='/services/meet-prep' component={MeetPrep}/>
            <Route exact path='/services/schedule-pt' component={SchedulePt}/>
            <Route exact path='/services/schedule-one-on-one' component={Schedule1on1}/>
            <Route exact path='/shop' component={Shop} />
            <Route exact path='/shopSandbox' component={ShopSandbox} />
            <Route exact path='/shop/:category' component={Category} />
            <Route exact path='/shop/product/:id' component={Product} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/contact' component={ContactUs} />
            <Route exact path='/checkout' render={(props) => <Checkout {...props} />} />
            <Route exact path='/success/:receipt' component={Success} />
          </Switch> 
        </ShopProvider>
      </div>  
    );
  }  
}

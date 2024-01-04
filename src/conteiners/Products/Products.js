import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import axios from '../../axios/axios'
import classes from './Products.module.css'
import Loader from '../../comonents/UI/Loader/Loader'
import Button from '../../comonents/UI/Button/Button'
import firebase from '../../firebase/Config'



class Products extends Component{

    onCart(){
        var ref = firebase.database().ref();
        const userId = localStorage.userId
        console.log(userId)
        ref.on("value", function(snapshot) {

        return snapshot.val().users
        }, function (error) {
        console.log("Error: " + error.code);
        });
    }
   

    state = {
        products: [],
        loading: true,
        productsCart: []
    }
   

    onPropductAddCart=(productName)=>{
        console.log(localStorage.userId)
        console.log(productName)
        let productsCarte = this.state.productsCart
        productsCarte.Name = productName
        productsCarte.col = '1'
        console.log(productsCarte)
        let addProduct = {...productsCarte}
        console.log(addProduct)
        this.setState({
            productsCart: addProduct
        })
        console.log(this.state.productsCart)
        let productsCart = this.state.productsCart
        let UserRef = firebase.database().ref('users/' + localStorage.userId + '/cart')
        console.log(productsCart)
        UserRef.push({
            ...productsCart
        });

    }


    renderProductes=()=>{
        return this.state.products.map((product, index) => {
            return (
                
                <li key={index}>
                    <NavLink to={'/products/'+ product.id}
                    >
                    <h1>{product.name}</h1>
                    <img src={product.img} alt={product.name}/>
                    <p>Цена: {product.prise}</p>
                    </NavLink>
                    <Button
                        onClick = {this.onPropductAddCart.bind(this, product.name)}
                    >Купить</Button>
                </li>
            )
        })
    }

    async componentDidMount(){
        try{
            const response = await axios.get('/products.json')
            const res = await axios.get('/users/'+ localStorage.userId + 'cart/' + '.json')
            console.log(response)
            console.log(res)
            const products = []
            const productsCart = []
            Object.keys(response.data).forEach((key, index) => {
                
                products.push({
                    name: response.data[key].name,
                    prise: response.data[key].prise,
                    img: response.data[key].img,
                    id: key
                })
            })
            console.log(products)
            console.log(res)
            if(res.data){Object.keys(res.data).forEach((key, index) => {
                productsCart.push({
                    name: res.data[key].name,
                })
            })}
            
            this.setState({
                products,
                productsCart,
                loading:false
            })
        }catch(e){
            console.log(e)
        }
        
    }


    render(){
        return(
            <div className={classes.Products}>
                <div className={classes.Conteiner}> 
                    <div className={classes.Link}><NavLink to='/products/add'>
                            Добавить
                        </NavLink>
                        {console.log(this.state)}
                    </div>
                    <div className={classes.ProductsList}>
                        <h1>Список товаров</h1>
                        {this.state.loading
                        ?<Loader/>
                        :<ul>
                            {this.renderProductes()}
                        </ul>
                        }
                        

                    </div>
                </div>
            </div>
        )
    }
}

export default Products
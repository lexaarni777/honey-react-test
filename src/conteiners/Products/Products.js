import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import axios from '../../axios/axios'
import classes from './Products.module.css'
import Loader from '../../comonents/UI/Loader/Loader'


class Products extends Component{

    state = {
        products: [],
        loading: true,
    }

    renderProductes(){
        return this.state.products.map((product, index) => {
            return (
                <li key={index}>
                    <NavLink to={'/products/'+ product.id}
                    >
                    <h1>{product.name}</h1>
                    <img src={product.img} alt={product.name}/>
                    <p>Цена: {product.prise}</p>
                    
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount(){
        try{
            const response = await axios.get('/products.json')

            const products = []
            Object.keys(response.data).forEach((key, index) => {
                
                products.push({
                    name: response.data[key].name,
                    prise: response.data[key].prise,
                    img: response.data[key].img,
                    id: key
                })
            })
            this.setState({
                products,
                loading:false
            })
            console.log(this.state.products)
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
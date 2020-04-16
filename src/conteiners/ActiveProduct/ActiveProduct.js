import React, {Component} from 'react'
import axios from '../../axios/axios'
import Loader from '../../comonents/UI/Loader/Loader'


class ActiveProduct extends Component{
    state = {
        product: {},
        loading: true
    }

    renderProduct = () => {
        return(
            <React.Fragment>
                <h1>{this.state.product.name}</h1>
                <img src={this.state.product.img}/>
                <p>{this.state.product.description}</p>
                <p>Цена: {this.state.product.prise}</p>
            </React.Fragment>
        )
    }

    async componentDidMount(){
        try{
            const response = await axios.get(`/products/${this.props.match.params.id}.json`)
            const product = response.data
            this.setState({
                product,
                loading: false
            })
        }catch(e){
            console.log(e)
        }
        
    }

    render(){

        return(
            <div>
                {this.state.loading
                ?<Loader/>
                :this.renderProduct()
                }
                
            </div>
        )
    }
}

export default ActiveProduct
import React, {Component} from 'react'
import axios from '../../axios/axios'
import Loader from '../../comonents/UI/Loader/Loader'


class ActiveArticle extends Component{
    state = {
        article: {},
        loading: true
    }

    renderArticle = () => {
        return(
            <React.Fragment>
                <h1>{this.state.article.name}</h1>
                <img src={this.state.article.img}/>
                <p>{this.state.article.description}</p>
            </React.Fragment>
        )
    }

    async componentDidMount(){
        try{
            const response = await axios.get(`/articles/${this.props.match.params.id}.json`)
            const article = response.data
            this.setState({
                article,
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
                :this.renderArticle()
                }
                
            </div>
        )
    }
}

export default ActiveArticle
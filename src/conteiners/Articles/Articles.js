import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import axios from '../../axios/axios'
import classes from './Articles.module.css'
import Loader from '../../comonents/UI/Loader/Loader'


class Articles extends Component{
    state = {
        articles: [],
        loading: true,
    }

    renderArticles(){
        return this.state.articles.map((article, index) => {
            return (
                <li key={index}>
                    <NavLink to={'/articles/'+ article.id}
                    >
                    <h1>{article.name}</h1>
                    <img src={article.img} alt={article.name}/>
                    
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount(){
        try{
            const response = await axios.get('/articles.json')

            const articles = []
            Object.keys(response.data).forEach((key, index) => {
                
                articles.push({
                    name: response.data[key].name,
                    img: response.data[key].img,
                    id: key
                })
            })
            this.setState({
                articles,
                loading:false
            })
        }catch(e){
            console.log(e)
        }
        
    }


    render(){
        return(
            <div className={classes.Articles}>
                <div className={classes.Conteiner}> 
                    <div className={classes.Link}><NavLink to='/articles/add'>
                            Добавить
                        </NavLink>
                    </div>
                    <div className={classes.ArticlesList}>
                        <h1>Статьи</h1>
                        {this.state.loading
                        ?<Loader/>
                        :<ul>
                            {this.renderArticles()}
                        </ul>
                        }
                        

                    </div>
                </div>
            </div>
        )
    }
}

export default Articles
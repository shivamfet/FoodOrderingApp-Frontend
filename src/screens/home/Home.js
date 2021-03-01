
import React, { Component } from 'react';
import Header from '../../common/header/Header'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import { CardContent, CardHeader } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';


class Home extends Component {

    constructor() {
        super();
        this.state = {
            restaurants: []
        }
    }

    componentWillMount() {
        this.getAllRestaurants();
    }

    getAllRestaurants = () => {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                that.setState({
                    restaurants: JSON.parse(this.responseText).restaurants
                });
                console.log(that.state.restaurants);
            }
        });

        xhr.open("GET", this.props.baseUrl + "/restaurant");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    searchRestaurantsHandler = (e) => {
        let data = null;
        let restaurant = e.target.value;
        if (restaurant === "") {
            this.getAllRestaurants();
        }
        console.log(restaurant);
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
                if (JSON.parse(this.responseText).restaurants != null) {
                    that.setState({
                        restaurants: JSON.parse(this.responseText).restaurants
                     });
                } else {
                    that.setState({
                        restaurants: []
                     });
                }
                console.log(that.state.restaurants);
            }
        });

        xhr.open("GET", this.props.baseUrl + "/restaurant/name/" + restaurant);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.send(data);
    }

    render() {
        return (<div>
            <Header baseUrl={this.props.baseUrl} searchRestaurantsHandler = {this.searchRestaurantsHandler}/>
            <GridList cellHeight={350} cols={4} style = {{margin : 25}}>
                {this.state.restaurants.length !=0 && this.state.restaurants.map(restaurant => (
                    <GridListTile key={restaurant.id} style = {{padding : 10}}>
                        <Card >
                            <CardActionArea>
                                <CardMedia component="img" height={180} image={restaurant.photo_URL}>
                                </CardMedia>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {restaurant.restaurant_name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {restaurant.categories}
                                    </Typography>
                                    <br />

                                    <div style = {{display : 'flex' , flexDirection : 'row' , alignItems: 'center', justifyContent: 'space-between'}}>
                                        <div style={{ width: 150, backgroundColor: 'gold' }}>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: 'white', 'paddingLeft': 10, 'paddingTop': 10, 'paddingBottom': 10, width: 80 }}>
                                                <StarIcon></StarIcon>
                                                <span>{restaurant.customer_rating}</span>
                                                <span>({restaurant.number_customers_rated})</span>
                                            </div>
                                        </div>
                                        <div>
                                        <i className="fa fa-inr" aria-hidden="true"></i>
                                            <span>{restaurant.average_price} for two</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </GridListTile>
                ))}
                {this.state.restaurants.length === 0 && <span>No restaurants with the gven name</span>}
            </GridList>
        </div>)
    }
}

export default Home

import React, {Component} from 'react';
import Header from "../../common/header/Header";
import '../home/Home.css';
import {Redirect} from 'react-router-dom';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Divider,
    FormControl,
    Grid,
    TextField, Typography
} from '@material-ui/core'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import profilePicture from '../../assets/tejas.jpeg';
import {red} from '@material-ui/core/colors';
import Profile from '../profile/Profile';
class Home extends Component {

    constructor() {
        super();
        this.state = {
            accessToken: sessionStorage.getItem("access-token"),
            loggedIn: sessionStorage.getItem("access-token") === null ? false : true,
            profile_picture: '../',
            filtered_media: null,
            media: [],
            likes: [],
            likesCount:[],
            comments: [],
            searchText: '',
            isLoaded:false,
            error:false,
            counter:0,
            isProfile:false
        }
    }

    /*
        Function to call the api and get all the necessary details required on mounting
    */
    componentDidMount() {
           // this.fetchOwnerInfo();
             this.fetchMostRecentMedia();
    
    }
     /*
        Function to get the api results and set the states
    */

    fetchMostRecentMedia = () => {
      let url = "https://graph.instagram.com/me/media?fields=id,caption,media_url,username,timestamp&access_token=" + sessionStorage.getItem("access-token");
      let likesCount=[];
      fetch(url)
       .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            filtered_media: result.data,
            media: result.data
          });
          this.state.media.map((details,index)=>{
              likesCount.push(3);
          })   
          this.setState({'likesCount':likesCount});
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      ) 
       

    }

    /*
    Function to handle the changes on click of Like Button
    */
    onFavIconClick = (index) => {
        let currentLikes = this.state.likes;
        currentLikes[index] = !currentLikes[index];
        let likesCount = this.state.likesCount;
        if(currentLikes[index]){
            likesCount[index]=likesCount[index]+1;
        }else{
            likesCount[index]=likesCount[index]-1;
        }
        this.setState({likesCount:likesCount});
        this.setState({likes: currentLikes});

    }
   
    /*
    Function to handle changes on Adding comment
    */
    onAddComment = (index) => {
        var textfield = document.getElementById("textfield-" + index);
        if (textfield.value == null || textfield.value.trim() === "") {
            return;
        }
        let currentComment = this.state.comments;
        if (currentComment[index] === undefined) {
            currentComment[index] = [textfield.value];
        } else {
            currentComment[index] = currentComment[index].concat([textfield.value]);
        }

        textfield.value = '';

        this.setState({'comments': currentComment})
    }
     /*
    Function to implement filtering on Search
    */
    onSearch = (e) => {

        if (e.target.value == null || e.target.value.trim() === "") {
            console.log('media',this.state.filtered_media);
            this.setState({media: this.state.filtered_media});
        } else {
            let filteredRecentMedia = this.state.filtered_media.filter((element) => {
                if(element.caption !== undefined)
                    return element.caption.toUpperCase().split("\n")[0].indexOf(e.target.value.toUpperCase()) > -1
            });
            this.setState({media: filteredRecentMedia});
        }
    }

    /*
    Function to implement dom Manipulations on like and comment
    */
    onIsProfileClicked=(e)=>{
        this.setState({isProfile:true});
    }

    /*
    Function to render the home component on successful login
    */
    render() {
        const display= <Container className='posts-card-container'>
        <Grid container spacing={2} alignContent='center' justify='flex-start' direction='row'>
            {
                (this.state.media || []).map((details, index) => {
                    return(
                    <Grid item xs={6} key={details.id}>
                        <Card key={details.id + '_card'}>
                            <CardHeader
                                avatar={<Avatar variant="circle" src={profilePicture}/>}
                                title={details.username}
                                subheader={new Date(details.timestamp).toLocaleString()}/>
                                <div style={{display: "none"}}>{details.media_type}</div>
                            <CardMedia style={{height: 0, paddingTop: '56.25%', marginBottom: 5}}

                                       image={details.media_url}/>
                                       
                            <Divider variant="middle" className='divider'/>
                            <CardContent>
                                <div
                                    className='post-caption'>{details.caption}</div>

                                <div className='post-tags'>
                                    #fresh #upgrad
                                </div>
                                <br/>
                                <div className='likes'>
                                    {
                                        this.state.likes[index] ?
                                            <FavoriteIcon fontSize='default' style={{color: red[500]}}
                                                          onClick={() => this.onFavIconClick(index)}/>
                                            :
                                            <FavoriteBorderIcon fontSize='default'
                                                                onClick={() => this.onFavIconClick(index)}/>
                                    }

                                    <pre> </pre>
                                    <Typography>
                                        <span>{this.state.likesCount[index] + ' likes'}</span>
                                    </Typography>
                                </div>

                                <div id='all-comments'>
                                    {
                                        this.state.comments[index] ?
                                            (this.state.comments)[index].map((comment, index) => (
                                                <p key={index}>
                                                    <b>{details.username}</b> : {comment}
                                                </p>
                                            ))
                                            :
                                            <p></p>
                                    }
                                </div>

                                <div className='post-comment'>
                                    <FormControl className='post-comment-form-control'>
                                        <TextField id={'textfield-' + index} label="Add a comment"/>
                                    </FormControl>
                                    <div className='add-button'>
                                        <FormControl>
                                            <Button variant='contained' color='primary'
                                                    onClick={() => this.onAddComment(index)}>ADD</Button>
                                        </FormControl>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                )})
            }
        </Grid>
        </Container> 
        if (!this.state.loggedIn) {
            return <Redirect to='/'/>
        }
        if(this.state.isProfile){
            return <Redirect to={{pathname:'/profile',state: {loginSuccess:true,liked:this.state.likes,likes:this.state.likesCount,comments:this.state.comments},function:{onLike:this.onFavIconClick,onComment:this.onAddComment} }}></Redirect>
        }
       if (this.state.loggedIn === true) {
            return <div>
                 <div><Header {...this.props} isLoggedIn={true} showSearchBox={true}
                             profilePictureUrl={this.state.profile_picture}
                             onSearch={this.onSearch} showMyAccount={true} onLike={this.onFavIconClick} onComment={this.onAddComment} likes={this.state.likesCount} 
                             liked={this.state.likes} comments={this.state.comments} isProfile={this.state.isProfile}
                             onIsProfileClicked={this.onIsProfileClicked} 
                             /></div>
                 {display}
            </div>
        }  
    }

    

}

export default Home;
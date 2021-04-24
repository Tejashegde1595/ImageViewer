import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Profile.css';
import Header from '../../common/Header/Header';
import profilePic from '../../assets/tejas.jpeg';
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {Card,CardContent,CardHeader,CardMedia,Divider} from '@material-ui/core'
import profilePicture from '../../assets/tejas.jpeg';
const styles = theme => ({
    avatar: {
        width: 150,
        height: 150
    },
    editIcon: {
        margin: '10px 0 0 10px',
    },
    modal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: 200,
        padding: 25,
        borderRadius: 4,
        border: 'none'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: 600,
        height: 450,
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.54)',
      },
      cardMedia:{
          height:400,
          width:500,
          float:'left'
      },
      card:{
          height:'fit-content',
          width:'fit-conent'
      },
      profileMedia:{
        display: '-webkit-box',
        flexDirection: 'column',
      },
      profileMediaAvatar:{
        float:'right'
      },
      profileContent:{
        padding:25
      }
});

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToken: sessionStorage.getItem("access-token"),
            loggedIn: sessionStorage.getItem("access-token") === null ? false : true,
            username: '',
            media: [],
            numOfPosts: 0,
            followers: 300,
            following: 250,
            name: 'Tejas Hegde',
            modalIsopen: false,
            mediaModalIsOpen:false,
            individualMedia:'',
            fullName: '',
            fullNameRequired: 'dispNone',
            likes: [],
            likesCount:[],
            comments: [],
            
        };
    }

    componentWillMount() {
      let url = "https://graph.instagram.com/me/media?fields=id,caption,media_url,username,timestamp&access_token=" + sessionStorage.getItem("access-token");
      const likesCount=[]
      fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            media: result.data,
            username:result.data[0].username!==undefined?result.data[0].username:'Tejas Hegde',
            numOfPosts:result.data.length
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

    openEditModalHandler = () => {
        this.setState({ modalIsopen: !this.state.modalIsopen })
    }

    closeModalHandler = () => {
        this.setState({ modalIsopen: !this.state.modalIsopen })
    }

    closeMediaModalHandler = () => {
        this.setState({ mediaModalIsOpen: !this.state.mediaModalIsOpen })
    }

    inputFullNameChangeHandler = (event) => {
        this.setState({ fullName: event.target.value })
    }

    updateHandler = () => {
        if (this.state.fullName === "" ) {
            this.setState({ fullNameRequired: 'dispBlock' })
            return;
        } else {
            this.setState({ fullNameRequired: 'dispNone' });
        }

        this.setState({
            modalIsopen: !this.state.modalIsopen,
            name: this.state.fullName
        })
    }

    openMediaModalHandler=(details)=>{
        const individualMedia = this.state.media.filter((image,index)=>{
            if(image.id===details)
                return image;
        })[0];
        this.setState({individualMedia:individualMedia});
        this.setState({mediaModalIsOpen:!this.state.mediaModalIsOpen});
        console.log(individualMedia);
    }

    onFavIconClick = (index) => {
        console.log('likesCounter',this.state.likesCount);
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

    render() {
        if (!this.state.loggedIn) {
            return (
                <Redirect to="/" />
            )
        }
        const { classes } = this.props;
        return (
            <div>
                <Header loggedIn={this.state.loggedIn} history={this.props.history} />
                <div className="info-section">
                    <Avatar variant="circular" alt="Profile Picture" src={profilePic}
                        className={classes.avatar}></Avatar>
                    <div className="profile-details">
                        <div>
                            <Typography variant="h4">{this.state.username}</Typography>
                        </div>
                        <div className="middle-line">
                            <div>
                                <Typography>
                                    <span>Posts: </span>{this.state.numOfPosts}
                                </Typography>
                            </div>
                            <div>
                                <Typography>
                                    <span>Follows: </span>{this.state.following}
                                </Typography>
                            </div>
                            <div>
                                <Typography>
                                    <span>Followed By: </span>{this.state.followers}
                                </Typography>
                            </div>
                        </div>
                        <div>
                            <Typography variant="h6">
                                <span>{this.state.name}</span>
                                <Fab size="medium" color="secondary" aria-label="edit"
                                    className={classes.editIcon} onClick={this.openEditModalHandler}>
                                    <EditIcon />
                                </Fab>
                            </Typography>

                        </div>
                    </div>
                </div>
                <div className="image-section">
                    <div className={classes.root}>
                        <GridList cellHeight={180} className={classes.gridList}>
                                {this.state.media.map((image) => (
                                <GridListTile cols={0} key={image.id}  style={{ width: '33.3%',cursor:'pointer' }} >
                                    <img onClick={()=>this.openMediaModalHandler(image.id)} src={image.media_url} alt={image.caption} />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
                <Modal open={this.state.modalIsopen} onClose={this.closeModalHandler}
                    className={classes.modal}>
                    <div className={classes.modalContent}>
                        <FormControl className="modal-heading">
                            <Typography variant="h4">
                                Edit
                        </Typography>
                        </FormControl>
                        <br />
                        <br />
                        <FormControl required>
                            <InputLabel htmlFor='fullName'>Full Name</InputLabel>
                            <Input id='fullName' type='text' onChange={this.inputFullNameChangeHandler} />
                            <FormHelperText className={this.state.fullNameRequired}>
                                <span className='required'>required</span>
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <br />
                        <br />
                        <Button variant='contained' color='primary' onClick={this.updateHandler}>
                            UPDATE
                        </Button>
                    </div>
                </Modal>
                <Modal open={this.state.mediaModalIsOpen} onClose={this.closeMediaModalHandler}
                    className={classes.modal}>
                    
                    <Card key={this.state.individualMedia.id + '_card'} className={classes.card}>
                    <div className={classes.profileMedia}>
                        <div>
                        <CardMedia className={classes.cardMedia} style={{height: 0, paddingTop: '56.25%', marginBottom: 5}} image={this.state.individualMedia.media_url}/>
                        </div>
                        <div className={classes.profileContent}>
                                <CardHeader
                                    avatar={<Avatar variant="circle" src={profilePicture}/>}
                                    
                                />                                      
                                <Divider variant="middle" className='divider'/>
                                <CardContent>
                                    <div
                                        className='post-caption'>{this.state.individualMedia.caption}</div>

                                    <div className='post-tags'>
                                        {this.state.individualMedia.username}
                                    </div>
                                    <br/>
                                    <div className='likes'>
                                        
                                    </div>

                                    <div id='all-comments'>
                                    
                                    </div>

                                    <div className='post-comment'>
                                        
                                    </div>
                                    </CardContent>
                                </div>
                        </div>
                        </Card>
                </Modal>
            </div>
        )
    }
}

export default withStyles(styles)(Profile);
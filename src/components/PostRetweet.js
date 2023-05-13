import React, { forwardRef, useState } from 'react'
import './Post.css'

import { Avatar } from "@mui/material"
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import db from './firebase';

const PostRetweet = forwardRef(({
    id,
    retweet_id,
    displayName,
    username,
    verified,
    text,
    image,
    avatar, 

    comments,
    retweets,
    likes,

    timestampO
}, ref) => {

    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        if (!liked)
        {
            db.collection("posts")
            .where("id", "==", id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.update({
                    likes: doc.data().likes + 1,
                    });
                });
                setLiked(true)
            })
            .catch((error) => {
                console.log("Error updating document:", error);
            });
        }else{
            db.collection("posts")
            .where("id", "==", id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.update({
                    likes: doc.data().likes - 1,
                    });
                });
                setLiked(false)
            })
            .catch((error) => {
                console.log("Error updating document:", error);
            });
        }
    }

    const handleRetweet = (e, retweet_id) => {
        e.preventDefault();


        db.collection("posts")
        .where("id", "==", id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.update({
                retweets: doc.data().retweets + 1,
                });
            });
        })
        .catch((error) => {
            console.log("Error updating document:", error);
        });

        const timestamp = timestampO-1;

        db.collection('posts')
            .add({
            id: timestamp,
            displayName: 'svxf',
            username: 'svxf',
            verified: true,
            text: `retweet: ${text}`,
            image: ``,
            avatar:
                "https://avatars.githubusercontent.com/u/60079016",
            comments: 0,
            retweets: 0,
            retweet_id: id,
            likes: 0,
            timestamp,
            })
        .catch(error => console.log('Error adding post:', error));
    }

    return (
        <div className='post' ref={ref}>
            <div className='post__avatar'>
                <Avatar src={avatar} />

            </div>
            <div className='post__line' />

            <div className='post__body'>
                {/* Header */}
                <span className='post__headerSpecial'>Retweeted</span>
                <div className='post__header'>
                    <div className='post__headerText'>
                        <h3>
                            {displayName}{" "}
                            <span className='post__headerSpecial'>
                                {verified && <VerifiedUserIcon className='post__badge' />} @{username}
                            </span>
                        </h3>
                    </div>
                    <div className='post__headerDescription'>
                        <div className='post__retweetHolder'>
                            <p>{text}</p>
                        </div>
                    </div>
                </div>
                <div className='post__retweetHolder'>
                {image && <img src={image} alt='' />}
                </div>
                {/* Footer */}
                <div className='post__footer'>
                    <ModeCommentOutlinedIcon fontSize="small" /><span>{comments}</span>
                    <RepeatIcon onClick={handleRetweet} fontSize="small" /><span>{retweets}</span>
                    {liked ? (
                    <FavoriteOutlinedIcon onClick={() => handleLike({id})} fontSize="small" color="error" />
                    ) : (
                    <FavoriteBorderIcon onClick={handleLike} fontSize="small" />
                    )}
                    <span>{likes}</span>
                    <FileUploadOutlinedIcon fontSize="small" />
                </div>
            </div>
        </div>
    );
});

export default PostRetweet
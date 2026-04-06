import React from "react";
import appwriteService from '../appwrite/configure'
import {Link} from 'react-router-dom';

function PostCard({$id, title, featuredImage}){
    return(
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300'>
                <div className='w-full h-48 overflow-hidden'>
                    <img 
                        src={appwriteService.getFilePreview(featuredImage)} 
                        alt={title}
                        className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                    />
                </div>
                <div className='p-4'>
                    <h2 className='text-base font-bold text-gray-900 leading-snug'>{title}</h2>
                    <p className='text-xs mt-1' style={{color: '#94a3b8'}}>Read more →</p>
                </div>
            </div>
        </Link>
    )
}

export default PostCard;
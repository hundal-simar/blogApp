import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/configure";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        if (authStatus) {
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
        } else {
            setPosts([])
        }
    }, [authStatus])
    
    if (!authStatus || posts.length === 0) {
        return (
            <div className="w-full min-h-[60vh] flex items-center justify-center bg-[#f5f0e8]">
                <Container>
                    <div className="bg-slate-900 rounded-xl px-16 py-12 text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-3">Login to read posts</h2>
                        <p className="text-sm" style={{color: '#64748b'}}>Create a free account and unlock the full archive.</p>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8 bg-[#f5f0e8]'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;
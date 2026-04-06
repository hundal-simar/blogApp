import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configure";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="min-h-screen bg-[#f5f0e8] py-10">
            <Container>
                <div className="max-w-3xl mx-auto">

                    {/* Image */}
                    <div className="relative w-full rounded-2xl overflow-hidden mb-8 border border-gray-100">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full object-contain max-h-[320px]"
                        />
                        {isAuthor && (
                            <div className="absolute right-4 top-4 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    onClick={deletePost}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Divider */}
                    <div className="border-t border-gray-200 mb-6" />

                    {/* Content */}
                    <div className="prose max-w-none text-slate-700 leading-relaxed browser-css">
                        {parse(post.content)}
                    </div>

                </div>
            </Container>
        </div>
    ) : null;
}
import React,{useCallback, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {Button, Input, RTE, Select} from "../index"
import appwriteService from "../../appwrite/configure"

export default function PostForm({Post}){
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: Post?.title || "",
            slug: Post?.$id || "",
            content: Post?.content || "",
            status: Post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit= async(data)=>{
        if(Post){
            const file= data.image[0]? await appwriteService.uploadFile(data.image[0]) : null;
            if(file){ appwriteService.deleteFile(Post.featuredImage); }
            const dbPost = await appwriteService.updatePost(Post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
            if (dbPost) { navigate(`/post/${dbPost.$id}`); }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
                if (dbPost) { navigate(`/post/${dbPost.$id}`); }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value.trim().toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, []);

    useEffect(()=>{
        const subscription = watch((value, {name})=>{
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }
        })
        return ()=> subscription.unsubscribe()
    },[watch, slugTransform, setValue])

    return (
        <div className="min-h-screen bg-[#f5f0e8] py-10">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">{Post ? "Edit Post" : "Create New Post"}</h1>
                    <p className="text-sm mt-1" style={{color: '#94a3b8'}}>{Post ? "Update your post details below" : "Fill in the details to publish a new post"}</p>
                </div>

                <form onSubmit={handleSubmit(submit)} className="flex gap-6">

                    {/* Left Column */}
                    <div className="flex-1 flex flex-col gap-5">
                        <div className="bg-white rounded-xl p-6 border border-gray-100">
                            <h2 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-widest">Post Details</h2>
                            <Input
                                label="Title"
                                placeholder="Enter post title"
                                className="mb-4"
                                {...register("title", { required: true })}
                            />
                            <Input
                                label="Slug"
                                placeholder="post-slug"
                                className="mb-0"
                                {...register("slug", { required: true })}
                                onInput={(e) => {
                                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                }}
                            />
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-gray-100">
                            <h2 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-widest">Content</h2>
                            <RTE label="" name="content" control={control} defaultValue={getValues("content")} />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-72 flex flex-col gap-5">
                        <div className="bg-white rounded-xl p-6 border border-gray-100">
                            <h2 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-widest">Featured Image</h2>
                            <Input
                                label=""
                                type="file"
                                className="mb-0"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image", { required: !Post })}
                            />
                            {Post && (
                                <div className="w-full mt-4">
                                    <img
                                        src={appwriteService.getFilePreview(Post.featuredImage)}
                                        alt={Post.title}
                                        className="rounded-lg w-full object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-gray-100">
                            <h2 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-widest">Visibility</h2>
                            <Select
                                options={["active", "inactive"]}
                                label="Status"
                                className="mb-0"
                                {...register("status", { required: true })}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl text-white font-semibold text-sm tracking-wide transition-colors duration-200"
                            style={{background: Post ? '#22c55e' : '#0f172a'}}
                        >
                            {Post ? "Update Post" : "Publish Post"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
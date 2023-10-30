// import axios from 'axios';

// const api = axios.create({
//     baseURL: "http://localhost:8080",
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// export default api;


import axios from "axios";
import { setLogin, setRegister } from "redux/authSlice";
import { setComments } from "redux/commentSlice";
import { setPost, setPosts } from "redux/postSlice";

const API_URL = "http://localhost:8080";

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json",
});

export const apiRequest = async ({ url, token, data, method }) => {
    try {
        const result = await API(url, {
            method: method || "GET",
            data: data,
            headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            },
        });
        return result?.data;
    } catch (error) {
        const err = error.response.data;
        console.log(err);
        return { status: err.success, message: err.message };
    }
};

export const handleFileUpload = async (uploadFile) => {
    let formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "hiveSocialMedia");
    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/images/upload/`,
            formData
        );
        return response.data.secure_url
    } catch (error) {
        console.log(error)
    }
};

export const register = async (dispatch, uri, data) => {
    try {
        const res = await apiRequest({
            url: uri,
            method: 'POST',
            data: data || {}
        })
        dispatch(setRegister(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const login = async (dispatch, uri, data) => {
    try {
        const res = await apiRequest({
            url: uri,
            method: 'POST',
            data: data || {}
        })
        dispatch(setLogin(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const fetchTimeLinePost = async (token, dispatch, uri, data) => {
    try {
        const res = await apiRequest({
            url: uri,
            token: token,
            data: data || {},
            method: "GET"
        })
        dispatch(setPosts(res.data))
        return;
    } catch (error) {
        console.log(error)
    }
}

export const createPost = async (token, dispatch, uri, data) => {
    try {
        const res = await apiRequest({
            url: uri,
            token: token,
            data: data || {},
            method: "POST"
        })
        dispatch(setPosts(res.data));
        return;
    } catch (error) {
        console.log(error)
    }
}

export const createComment = async (token, uri, data) => {
    try {
        const res = await apiRequest({
            url: uri,
            token: token,
            data: data || {},
            method: "POST"
        });
        return res
    } catch (error) {
        console.log(error)
    }
}

export const fetchComment = async (postId, dispatch, uri, data) => {
    try {
        const res = await apiRequest({
            url: uri,
            data: data || {},
            method: 'GET'
        })
        dispatch(setComments({ postId: postId, comments: res.data }))
        return
    } catch (error) {
        console.log(error)
    }
}

export const likePost = async (token, dispatch, uri) => {
    try {
        const res = await apiRequest({
            url: uri,
            token: token,
            method: "PUT"
        })
        dispatch(setPost({ post: res.data.post }))
    } catch (error) {
        console.log(error)
    }
}

export const bookmarkPost = async (token, dispatch, uri) => {
    try {
        const res = await apiRequest({
            url: uri,
            token: token,
            method: "PUT"
        })
        dispatch(setPost({ post: res.data.post }))
    } catch (error) {
        console.log(error)
    }
}

export const hidePost = async (token, dispatch, uri) => {
    try {
        const res = await apiRequest({
            url: uri,
            token: token,
            method: "PUT",
        })
        dispatch(setPost({ post: res.data.post }))
    } catch (error) {
        console.log(error)
    }
}

export const editPost = async (token, dispatch, uri, data) => {
    try {
        const res = await apiRequest({
            url: uri,
            token: token,
            method: 'POST',
            data: data,
        })
        dispatch(setPost({ post: res.data }));
    } catch (error) {
        console.log(error)
    }
}

export const getUserDetails = async(uri, data) =>{
    try {
        const res = await apiRequest({
            url: uri,
            method:'GET' ,
            data: data,
        })
        return res
    } catch (error) {
        console.log(error)
    }
}
import axios from "./axios";

//////////////////////////////////
///// GET - TUTTI I COMMENTI /////
//////////////////////////////////
export async function getAllComments(id) {
    try {
        const response = await axios.get(`/${id}/comments`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//////////////////////////////////
///// GET - SINGOLO COMMENTO /////
//////////////////////////////////
export async function getSingleComment(id, commentId) {
    try {
        const response = await axios.get(`/${id}/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error
    }
}

///////////////////////////////////
///// POST - SINGOLO COMMENTO /////
///////////////////////////////////
export async function createComment(id, newComment) {
    try {
        const response = await axios.post(`/${id}/comments`, newComment);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error
    }
}

//////////////////////////////////
///// PUT - SINGOLO CO MMENTO/////
//////////////////////////////////
export async function updateComment(id, commentId, updatedComment) {
    try {
        const response = await axios.put(`${id}/comments/${commentId}`, updatedComment);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error
    }
}

/////////////////////////////////////
///// DELETE - SINGOLO COMMENTO /////
/////////////////////////////////////
export async function deleteComment(id, commentId) {
    try {
        const response = await axios.delete(`${id}/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error
    }
}

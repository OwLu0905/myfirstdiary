// import { Navigate } from "react-router-dom";
const NewPost = ({postTitle, setPostTitle, postBody, setPostBody, handleSubmit}) => {
    return (
        <main className="NewPost">
           <h2>New Post</h2> 
           <form className="PostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Post Title: </label>
                <input 
                    id="postTitle" 
                    type="text" 
                    required
                    autoFocus
                    placeholder="add title"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post Body: </label>
                <textarea
                    id="postBody" 
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">submit</button> 
            </form>
        </main>
    )
}

export default NewPost

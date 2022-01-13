import { Link, useParams } from "react-router-dom";
const PostPage = ({ posts, handleDelete }) => {
    const { id } = useParams();
    // use find function to select the specific post
    const post = posts.find(post => (post.id).toString() === id);
    return (
        <main className="PostPage">
            { post && 
            <>
                <h2>{post.title}</h2>
                <p>{post.datetime}</p>
                <p>{post.body}</p>
                <Link to={`/edit/${post.id}`} >
                    <button>
                        Edit 
                    </button>
                </Link>
                <button type="button" onClick={()=> handleDelete(post.id)}>Delete</button>
                </>}
            {!post &&      
            <h2>Error post!!</h2>
            }
  
        </main>
    )
}

export default PostPage

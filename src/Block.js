import { Link, useParams } from "react-router-dom";
const Block = ({ post }) => {
    // const { id } = useParams();
    return (
        <article className="Block">
            <Link to={`/post/${post.id}`}>
            
            <h2>{post.title}</h2>
            <p>{post.datetime}</p>
            <p>{post.body}</p>
            </Link>
        </article>
    )
}

export default Block

import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import format from "date-fns/format";
const EditPost = ({ posts, editTitle, setEditTitle, editBody, setEditBody, handleEdit }) => {
    // find id  (destructuring)
    const { id } = useParams();

    // use id to find the post
    const post = posts.find(post => (post.id).toString() === id)

    // once the page is render, set the edit usestate (using useEffect)
    useEffect(() => {
        if (post) {
            // const editTime = format(new Date(), "MMMM dd, yyyy pp ")
            setEditTitle(post.title)
            setEditBody(post.body)
        }
        //[] didn't change, the useEffect will not re-render the page.
    }, [post, setEditTitle, setEditBody]) 


    return (
        <main>
            {editTitle &&
           <form className="EditPost" onSubmit={(e) => e.preventDefault()}>
               <label htmlFor="editTitle">Title : </label>
               <input 
                    id="editTitle"
                    type="text"
                    required
                    autoFocus
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <label htmlFor="editBody">Content : </label>
                <textarea
                    id="editBody"
                    type="text"
                    required
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                />
                <button type="submit" onClick={(() => handleEdit(post.id))}>Submit</button>
           </form>
            }
        </main>
    )
}

export default EditPost

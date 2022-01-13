import { Link } from "react-router-dom"
import Feed from "./Feed"

const Home = ({posts}) => {
    return (
        <main className="Home">
            {posts.length ? 
            (
                <Feed posts={posts} />
            ) : (
                <p>There is no post. Add one?</p>,
                <Link to={'/post'}>
                    <button>return to home</button>
                </Link>
                )
            }
        </main>
    )       
}

export default Home

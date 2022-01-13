import { Link } from "react-router-dom";
const Nav = () => {

    return (
        <nav className="Nav">
            {/* <ul> */}
                {/* <li><Link to="/">Home</Link></li> */}
                {/* <li><Link to="post">Posts</Link></li> */}
                {/* <li><Link to="about">About</Link></li> */}
                <Link to="/">Home</Link> 
                <Link to="post">Posts</Link>
                <Link to="about">About</Link>
            {/* </ul> */}
        </nav>
    )
}

export default Nav

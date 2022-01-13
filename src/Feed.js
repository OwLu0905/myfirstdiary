import Block from "./Block"

const Feed = ({posts}) => {
    return (
        <>
            {posts.map((post) => (
                <Block key={post.id} post={post} />
            ))}
        </>
    )
}

export default Feed

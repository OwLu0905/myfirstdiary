import './App.css';
import Header from './Header';
import Home from './Home';
import Nav from './Nav';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PostPage from './PostPage';
import Footer from './Footer';
import {useState, useEffect} from 'react';
import NewPost from './NewPost';
import Missing from './Missing';
import About from './About';
import { format } from 'date-fns';
import EditPost from './EditPost';
import api from './api/posts';


function App() {

  const [posts, setPosts] = useState([]);

  // setSearch 會在Nav搜尋時找，並且更新search，
  // 當search = ''時，setSearchResult經過filter得到的searchResult會跟posts相同
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  // need to set the navigate when we edit/submit the post.
  let Navigate = useNavigate();


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get("/posts")
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data)
        } else {
          console.log(`Error: ${err.message}`)
        }
      }
    }
    fetchPost()
  }, [])

  useEffect(() => {
    const filteredResults = posts.filter(post =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResult(filteredResults.reverse());
  }, [posts, search])



  // function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // get the id number, find last post id plus 1 , else set id as 1 (which means there is no post)
    const id = posts.length? posts[posts.length-1].id + 1 : 1 ;

    // get the current Datetime. use date-fns 
    const newDate = format(new Date(), 'MMMM dd, yyyy pp');

    // get the json structor
    const newPost = { id: id, title: postTitle, datetime: newDate, body: postBody }

    try {
      const response = await api.post('posts', newPost)
      // add the new json to dataset
      const allPost = [...posts, newPost];
      setPosts(allPost);
      setPostTitle('');
      setPostBody('');
      Navigate('/');
    }
    catch (err) {
      console.log(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const deletePost = posts.filter((post) => (post.id) !== id)
      setPosts(deletePost);
      Navigate('/');
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleEdit = async (id) => {
    // get the new time
    const newDate = format(new Date(), 'MMMM dd, yyyy pp');
    // reset the post
    const newPost = {id: id, title: editTitle, datetime: newDate, body: editBody}
    // console.log(newPost);

    try {
      const response = await api.put(`/posts/${id}`,  newPost)
    // update the json file 
    const allPost = posts.map((post) => (
      (post.id) === id ? ({...response.data}) : (post)
    ))
    
    // useState to update
    setPosts(allPost)
    setEditTitle('')
    setEditBody('')
    // Navigate(`/post/${id}`);
    Navigate('/')
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home posts={searchResult} />} />
        <Route path="/post" element=
        {<NewPost 
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
          handleSubmit={handleSubmit}
        />
        } />
        <Route path="/edit/:id" element=
        {<EditPost
          posts={posts}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editBody={editBody}
          setEditBody={setEditBody}
          handleEdit={handleEdit}
        />
        } />

        <Route path="/post/:id" element=
        {<PostPage 
          posts={posts}
          handleDelete={handleDelete}
        />
        } />

        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
     <Footer /> 
    </div>
  );
}

export default App;

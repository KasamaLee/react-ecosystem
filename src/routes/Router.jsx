import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Feed from '../pages/Feed';
import Friend from '../pages/Friend';
import Profile from '../pages/Profile';

function Router() {
    const router = createBrowserRouter([
        { path: "/", element: <div>HomePage</div> },
        { path: "/profile", element: <div>ProfilePage</div> },
        { path: "/profile/:userId", element: <div>FriendPage</div> },
        { path: "/feed", element: <div>FeedPage</div> },
        { path: "*", element: <Navigate to='/' /> },
    ]);
    return <RouterProvider router={router}/>;
}

export default Router;
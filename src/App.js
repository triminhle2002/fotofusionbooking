import { Routes, Route } from 'react-router-dom';
import { router } from './routes/index';
import { Layout } from './pages/index';
//import LayoutAdmin from './pages/LayoutAdmin';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout hideHeaderPaths={['/login', '/signup', '/forgotpassword', '/resetpassword', '/dashboard']} />}>
          {router.map((route, index) => {
            return <Route key={index} path={route.path} element={

              <route.component />

            }></Route>;
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
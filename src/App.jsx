import  React,{ useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { login , logout} from './store/authSlice'
import authService from './appwrite/Auth'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from './components/index'


function App() {

  const [loading, setLoading]= useState(true);
  const dispatch= useDispatch();

  useEffect(() => {
  const checkUser = async () => {
    try {
      const userData = await authService.getUser();

      if (userData) {
        dispatch(login(userData));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  };

  checkUser();
}, []);
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-[#f5f0e8]'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App

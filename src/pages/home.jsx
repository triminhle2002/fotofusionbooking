import React, { useEffect } from 'react';
import MainHome from '../components/Home/home';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
    document.title = 'Trang chủ';
    const location = useLocation();
    const navigate = useNavigate();
    const notify = (message) => {
        return toast.success(message, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    useEffect(() => {
        if (location.state?.toastMessage !== '') {
            notify(location.state?.toastMessage);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, []);
    return (
        <>
            <ToastContainer />
            <div>
                <MainHome />
            </div>
        </>
    );
};

export default Home;
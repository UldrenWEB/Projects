import React, { useState, Suspense } from 'react';
import FormDatas from './FormData';
import Loader from './Loader';
import '../styles/content.css'

const Content = () => {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <Suspense fallback={<Loader />} />
            {loading && <Loader />}
            <div className='container'>
                <FormDatas isLoading={setLoading} />
            </div>
        </>
    )
}

export default Content;
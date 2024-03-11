import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import '@/01_app/assets/index.css';
import {Routing} from "@/02_pages";
import {Loading} from "@/05_shared/ui/loading";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Suspense fallback={<Loading/>}>
            <Routing/>
        </Suspense>
    </React.StrictMode>
);

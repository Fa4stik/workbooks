import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Main} from "@/02_pages/main";

type RoutingProps = {

}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>
    }
])

export const Routing: React.FC<RoutingProps> = ({
        
}) => {
    
    return (
        <RouterProvider router={router}/>
    );
};
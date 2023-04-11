import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useFetch from './useFetch';
import apiConfig from '@constants/apiConfig';

const useQueryParams = () => {
    const { data , execute:executeCategory }=useFetch(apiConfig.category.autocomplete);
    let [ searchParams, setSearchParams ] = useSearchParams();
    const [ akey, setAkey ]= useState();
    // return a URLSearchParams object
    const serializeParams = (object = {}) => {
        const params = new URLSearchParams();
        Object.keys(object).forEach(key => {
            if(object[key] !== undefined && object[key] !== '')
                params.set(key, object[key]);
        });
        console.log("paramsssssssssssss",params);
        return params;
    };

    // return a plain object
    const deserializeParams = (params) => {
        const object = {};
        params.forEach((value, key) => {
            if(value !== undefined && value !== '')
                // if(value=="Technology"){
                //     object[key] = 1;
                // }     
                object[key]=value;   
                        
        });

        return object;
    };

    const setQueryParams = (queryObj) => {
        console.log("queryObj",queryObj);
        setSearchParams(queryObj);
    };

    return { params: searchParams, setQueryParams, serializeParams, deserializeParams };
};

export default useQueryParams;

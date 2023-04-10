import React, { useEffect, useState } from 'react';
import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import { Avatar } from 'antd';
import BaseTable from '@components/common/table/BaseTable';
import { UserOutlined, PushpinOutlined } from '@ant-design/icons';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE, STATUS_ACTIVE, STATUS_DELETE, STATUS_INACTIVE, STATUS_PENDING } from '@constants';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import useFetch from '@hooks/useFetch';
import { IconPinnedOff, IconPin } from '@tabler/icons-react';
const NewsListPage = () => {
    const [ listcategory, setListCategory ] = useState([]);
    const { execute:executeCategory, data:dataCategory }=useFetch(apiConfig.category.autocomplete);
    let mainListdatacategory=[];
    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.news,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: 'News',
        },
        override: (funcs) => {
            // console.log("liscategory",listcategory);
            funcs.mappingData = (response) => {                                            
                if (response.result === true) {                                     
                    return {
                        // data: response.data.data.map(obj1 => {
                        //     const obj2= listcategory.data.find(obj2 => obj2.id === obj1.categoryId);
                        //     return { id: obj1.id, categoryId: obj1.categoryId, categoryName: obj2.categoryName, ...obj1 };
                        // }),
                        data: response.data.data,
                        total: response.data.totalElements,                                            
                    };
                }
            };
           
        },
    });
    const listStatus=[ { value:STATUS_PENDING , label:"Pending" },  { value:STATUS_ACTIVE , label:"Active" },  { value:STATUS_DELETE , label:"Delete" },  { value:STATUS_INACTIVE , label:"Inactive" }  ];
    
    let updatedListcategory=[];
    if(listcategory.data){
        updatedListcategory = listcategory?.data.map(({ categoryName: value, categoryName: label }) => ({ value, label })); 
    }
    // mergedArray 
    // let mergedArray=[];
    // if(listcategory.data){
    //     mergedArray = data.map(obj1 => {
    //         const obj2 = listcategory.data.find(obj2 => obj2.id === obj1.categoryId);
    //         // return { id: obj1.id, categoryId: obj1.categoryId, categoryName: obj2.categoryName, avatar: obj1.avatar, banner: obj1.banner, createdBy: obj1.createdBy, createdDate: obj1.createdDate, kind: obj1.kind, modifiedBy: obj1.modifiedBy, modifiedDate: obj1.modifiedDate, pinTop: obj1.pinTop, ...obj1 };
    //         return { id: obj1.id, categoryId: obj1.categoryId, categoryName: obj2.categoryName, ...obj1 };
    //     });
    // }
    // console.log("mergedArray", mergedArray);
    const handleCategoryName = (id) => {
        let categoryname="";
        if(listcategory.data){
            listcategory.data.map((item) => {
                if(id==item.id){
                    categoryname=item.categoryName;
                }
            });
        }
       
        return categoryname;
    };
    const columns = [
        {
            title: '#',
            dataIndex: 'avatar',
            align: 'center',
            width: 100,
            render: (avatar) => (
                <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    src={avatar ? `${AppConstants.contentRootUrl}${avatar}` : null}
                />
            ),
        },
        { title: 'title', dataIndex: 'title' },
        { title: 'Category',align: "center", dataIndex: 'categoryId', render:(categoryId) => (handleCategoryName(categoryId)), width:"150px" },     
        { title: 'Created Date', dataIndex: 'createdDate', width:"200px", align:"center", color:"red" },
        { title: 'Pin top',align: "center", dataIndex: 'pinTop', width: '90px', render:(pinTop) => ( pinTop==1 ? ( <IconPin size={"18px"}/> ) : (<IconPinnedOff size={"18px"}/>) )  },
        mixinFuncs.renderStatusColumn({ width: '90px' }),
        mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '90px' }),
    ];

    const searchFields = [
        {
            key: 'title',
            placeholder: 'Title',
        },
        {   
            type:"SELECT", 
            key: "status",
            placeholder: 'Status',
            options:  listStatus ,
            optionValue: 'value',
            optionLabelProp: "label",
        },
        {   
            type:"SELECT", 
            key: "categoryName",
            placeholder: 'Category',
            options:  updatedListcategory ,
            optionLabelProp: "label",
            optionValue: 'value',
        },
    ];
    useEffect(() => {
        executeCategory({
            onCompleted: (respone) => {
                if (respone.result===true){ 
                    setListCategory(respone.data);
                } 
            },          
        });
    },[]);
    return (
        <PageWrapper routes={[ { breadcrumbName: 'Home' }, { breadcrumbName: 'News' } ]}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter  })}
                actionBar={mixinFuncs.renderActionBar()}
                baseTable={
                    <BaseTable
                        onChange={mixinFuncs.changePagination}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        rowKey={(record) => record.id}
                        pagination={pagination}
                    />
                }
            />
        </PageWrapper>
    );
};

export default NewsListPage;
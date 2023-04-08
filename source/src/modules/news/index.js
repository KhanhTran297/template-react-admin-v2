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
import SelectField from '@components/common/form/SelectField';
const NewsListPage = () => {
    const [ listcategory, setListCategory ] = useState([]);
    
    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.news,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: 'News',
        },
        override: (funcs) => {
            funcs.mappingData = (response) => {
                if (response.result === true) {
                    return {
                        data: response.data.data,
                        total: response.data.totalElements,
                    };
                }
            };
        },
    });
    const listStatus=[ { value:STATUS_PENDING , label:"Pending" },  { value:STATUS_ACTIVE , label:"Active" },  { value:STATUS_DELETE , label:"Delete" },  { value:STATUS_INACTIVE , label:"Inactive" }  ];
    const { execute:executeCategory, data:dataCategory }=useFetch(apiConfig.category.autocomplete);
    let updatedListcategory=[];
    if(listcategory.data){
        updatedListcategory = listcategory?.data.map(({ id: value, categoryName: label }) => ({ value, label }));
    }
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
        { title: 'Category',align: "center", dataIndex: 'categoryId', render:( categoryId ) => ( handleCategoryName(categoryId) ) },     
        { title: 'Created Date', dataIndex: 'createdDate', width: '130px' },
        { title: 'Pin top',align: "center", dataIndex: 'pinTop', width: '200px', render:(pinTop) => ( pinTop==1 ? ( <PushpinOutlined/> ) : 0 )  },
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
            key: "categoryId",
            placeholder: 'Category',
            options:  updatedListcategory ,
            optionValue: 'value',
            optionLabelProp: "label",
        },
    ];
    useEffect(() => {
        executeCategory({
            onCompleted: (respone) => {
                if (respone.result===true) setListCategory(respone.data);
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
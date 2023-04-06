import React from 'react';
import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import { Avatar } from 'antd';
import BaseTable from '@components/common/table/BaseTable';
import { UserOutlined, PushpinOutlined } from '@ant-design/icons';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
const NewsListPage = () => {
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
    console.log(data);
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
        { title: 'Category',align: "center", dataIndex: 'categoryId' },
        { title: 'Created Date', dataIndex: 'createdDate', width: '130px' },
        { title: 'Pin top',align: "center", dataIndex: 'pinTop', width: '200px', render:(pinTop) => ( pinTop==1 ? ( <PushpinOutlined/> ) : 0 )  },
        // {
        //     title: 'Created date',
        //     dataIndex: 'createdDate',
        //     width: '180px',
        //     // render: (createdDate) => convertUtcToTimezone(createdDate),
        // },
        mixinFuncs.renderStatusColumn({ width: '90px' }),
        mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '90px' }),
    ];

    const searchFields = [
        {
            key: 'title',
            placeholder: 'Title',
        },
        // {
        //     key: 'fullName',
        //     placeholder: 'Full name',
        // },
    ];

    return (
        <PageWrapper routes={[ { breadcrumbName: 'Home' }, { breadcrumbName: 'News' } ]}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
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
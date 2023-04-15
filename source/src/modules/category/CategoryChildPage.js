import PageWrapper from '@components/common/layout/PageWrapper';
import { STATUS_ACTIVE, categoryKind, categoryOrdering } from '@constants';
import apiConfig from '@constants/apiConfig';
// import useFetch from '@hooks/useFetch';
import useSaveBase from '@hooks/useSaveBase';
import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryForm from './CategoryForm';
import CategoryChildForm from './CategoryChildListPage';
const CategoryChildPage = () => {
    const { id } = useParams();
    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title, detailId } = useSaveBase({
        apiConfig: {
            getDetail: apiConfig.category.getById,
            create: apiConfig.category.create,
            update: apiConfig.category.update,
        },
        options: {
            getListUrl: `/category/child`,
            objectName: 'category',
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                // console.log(data);
                return {
                    status: STATUS_ACTIVE,
                    kind: categoryKind.news,
                    avatarPath: data.avatar,
                    ...data,
                    id: id,
                };
            };
            funcs.prepareCreateData = (data) => {
                console.log(data);
                return {
                    ...data,
                    categoryKind: categoryKind.news,
                    avatarPath: data.avatar,
                    parentId: id,
                    categoryOrdering: 0,
                };
            };

            funcs.mappingData = (data) => {
                // console.log(data);
                return {
                    ...data.data,
                };
            };
        },
    });
    // console.log("detail",detail);
    console.log("id",detailId);
    return (
        <PageWrapper
            loading={loading}
            routes={[
                { breadcrumbName: 'Home' },
                { breadcrumbName: 'category', path: `/category` },
                { breadcrumbName: 'child' },
            ]}
        >
            <CategoryChildForm parentId={id}></CategoryChildForm>
        </PageWrapper>
    );
};

export default CategoryChildPage;

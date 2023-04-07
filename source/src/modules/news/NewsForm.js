import React from 'react';
import { Card, Col, Form, Row } from 'antd';
import { useEffect, useState } from 'react';
import useBasicForm from '@hooks/useBasicForm';
import TextField from '@components/common/form/TextField';
import CropImageField from '@components/common/form/CropImageField';
import { AppConstants } from '@constants';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import DropdownField from '@components/common/form/DropdownField';
import SelectField from '@components/common/form/SelectField';
const NewsForm = (props) => {
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues, groups, branchs, isEditing, listcategory } = props;
    const { execute: executeUpFile, data } = useFetch(apiConfig.file.upload);
    const [ imageUrl, setImageUrl ] = useState(null);
    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });
    let datalist=[];
    const uploadFile = (file, onSuccess, onError) => {
        executeUpFile({
            data: {
                type: 'AVATAR',
                file: file,
            },
            onCompleted: (response) => {
                if (response.result === true) {
                    onSuccess();
                    setImageUrl(response.data.filePath);
                }
            },
            onError: (error) => {
                onError();
            },
        });
    };

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({ ...values, avatar: imageUrl });
    };
    let updatedListcategory=[];
    if(listcategory.data){
        updatedListcategory = listcategory?.data.map(({ id: value, categoryName: label }) => ({ value, label }));
    }
   
    console.log("Updatetest",updatedListcategory);

    console.log(datalist);
    console.log(listcategory?.data);
    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
        });
        setImageUrl(dataDetail.avatar);
    }, [ dataDetail ]);
    return (
        <Form
            style={{ width: '70%' }}
            id={formId}
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            onValuesChange={onValuesChange}
        >
            <Card className="card-form" bordered={false}>
                <Row gutter={16}>
                    <Col span={12}>
                        <CropImageField
                            label="Avatar"
                            name="avatar"
                            imageUrl={imageUrl && `${AppConstants.contentRootUrl}${imageUrl}`}
                            aspect={1 / 1}
                            uploadFile={uploadFile}
                        />
                    </Col>
                    <Col span={12}>
                        <CropImageField
                            label="Banner"
                            name="avatar"
                            imageUrl={imageUrl && `${AppConstants.contentRootUrl}${imageUrl}`}
                            aspect={1 / 1}
                            uploadFile={uploadFile}
                        />
                    </Col>
                </Row>
               
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField label="Title" name="title" />
                    </Col>
                    <Col span={12}>
                        <TextField label="Description" required name="description" />
                    </Col>
                </Row>

              

                <Row gutter={16}>
                    <Col span={12}>
                        <TextField label="Content" name="content" type="content" />
                    </Col>
                    <Col span={12}>
                       
                        <SelectField label='Category' options={updatedListcategory} optionValue='value' optionLabelProp="label" name='categoryId' ></SelectField>
                    </Col>
                </Row>
                <div className="footer-card-form">{actions}</div>
            </Card>
        </Form>
    );
};

export default NewsForm;
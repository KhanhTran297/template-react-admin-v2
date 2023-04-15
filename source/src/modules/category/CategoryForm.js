import CropImageField from '@components/common/form/CropImageField';
import TextField from '@components/common/form/TextField';
import { AppConstants } from '@constants';
import apiConfig from '@constants/apiConfig';
import useBasicForm from '@hooks/useBasicForm';
import useFetch from '@hooks/useFetch';
import { Card, Col, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';
const CategoryForm = (props) => {
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues, groups, branchs, isEditing } = props;
    const { execute:executeUpFile } = useFetch(apiConfig.file.upload);
    const [ imageUrl, setImageUrl ] = useState(null);
    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });
    // console.log("datadetail",dataDetail);
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
        return mixinFuncs.handleSubmit({ ...values, categoryImage: imageUrl });
    };
    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
        });
        setImageUrl(dataDetail.categoryImage);
    },[ dataDetail ]);
    return(        
        <Form 
            
            style={{ width: '70%' }}
            id={formId}
            onFinish={handleSubmit}
            form={form}
            layout="vertical"
            onValuesChange={onValuesChange}
        >
            <Card className='card-form' bordered={false}>
                <Row gutter={16}>
                    <Col span={12}>
                        <CropImageField
                            label="Category Image"
                            name="categoryImage"
                            imageUrl={imageUrl && `${AppConstants.contentRootUrl}${imageUrl}`}
                            aspect={1 / 1}
                            uploadFile={uploadFile}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField  label="categoryName" name="categoryName" required ></TextField>
                    </Col>
                    <Col span={12}>
                        <TextField label="Category Description"  name="categoryDescription" required type="textarea" />
                    </Col>                    
                </Row>              
                <div className="footer-card-form">{actions}</div>
            </Card>
        </Form>
    );
};

export default CategoryForm;

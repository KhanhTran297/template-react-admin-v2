import React, { useState } from 'react';

import useFormField from '@hooks/useFormField';
import { Form, Input } from 'antd';

const InputTextField = ({
    label = '',
    name = '',
    formItemProps,
    inputProps,
    size,
    type,
    allowClear= true,
    onSearch,
    onChange,
    ...props
}) => {
    const {
        rules,
        placeholder,
    } = useFormField(props);
    return (
        <Form.Item
            label={label}
            name={name}
            validateFirst
            rules={rules}
            {...formItemProps}
        >
            <Input
                {...inputProps}
                allowClear={allowClear}
                placeholder={placeholder}
                size={size}
                type={type}
                onChange={onChange}
                
            />
        </Form.Item>
    );
};

export default InputTextField;

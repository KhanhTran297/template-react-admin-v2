import React from 'react';

import useFormField from '@hooks/useFormField';
import { Form, Input } from 'antd';

const InputTextField = ({
    label = '',
    name = '',
    formItemProps,
    inputProps,
    size,
    type,
    allowClear = true,
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
            />
        </Form.Item>
    );
};

export default InputTextField;

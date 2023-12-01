import { TextField, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useField } from 'formik';
import IMask from 'imask';
import React, { useEffect } from 'react';

interface CustomTextFieldProps {
    label: string;
    name: string;
    disabled?: boolean;
    type?: React.InputHTMLAttributes<unknown>['type'];
    size?: 'small' | 'medium';
    mask?: string | IMask.AnyMaskedOptions;
    placeholder?: string;
}

const CustomTextField = ({
    label,
    name,
    type,
    disabled = false,
    size,
    mask,
    placeholder,
}: CustomTextFieldProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [field, meta, helpers] = useField(name);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const maskRef = React.useRef<IMask.InputMask<any> | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        helpers.setValue(event.target.value);
    };

    useEffect(() => {
        if (mask) {
            const options = typeof mask === 'string' ? { mask } : mask;
            const maskInstance = IMask(inputRef.current!, options);
            maskRef.current = maskInstance;

            return () => {
                maskInstance.destroy();
            };
        } else {
            maskRef.current = null;
        }
    }, [mask]);

    useEffect(() => {
        if (maskRef.current) {
            maskRef.current.unmaskedValue = field.value || '';
            maskRef.current.updateValue();
        }
    }, [field.value]);

    return (
        <TextField
            label={label}
            {...field}
            value={field.value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            variant="outlined"
            fullWidth
            disabled={disabled}
            type={type}
            size={size || (isMobile ? 'small' : 'medium')}
            inputRef={inputRef}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            InputProps={{
                autoComplete: 'off',
            }}
        />
    );
};

export default CustomTextField;

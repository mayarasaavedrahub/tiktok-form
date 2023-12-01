import {
    Button,
    ButtonProps,
    Dialog,
    DialogActions,
    DialogActionsProps,
    DialogContent,
    DialogContentProps,
    DialogContentText,
    DialogProps,
    DialogTitle,
    DialogTitleProps,
} from '@mui/material';
import React, { createContext, useCallback, useContext, useState } from 'react';

export interface AlertDialogOptions {
    title?: React.ReactNode;
    titleProps?: DialogTitleProps;
    description?: React.ReactNode;
    content?: React.ReactNode | null;
    contentProps?: DialogContentProps;
    closeText?: React.ReactNode;
    dialogProps?: Omit<DialogProps, 'open'>;
    dialogActionsProps?: DialogActionsProps;
    closeButtonProps?: ButtonProps;
    allowClose?: boolean;
}

interface AlertDialogProviderProps {
    children: React.ReactNode;
    defaultOptions?: AlertDialogOptions;
}

const DEFAULT_OPTIONS: AlertDialogOptions = {
    title: '',
    description: '',
    content: null,
    closeText: 'Ok',
    dialogProps: {},
    dialogActionsProps: {},
    closeButtonProps: {},
    titleProps: {},
    contentProps: {},
    allowClose: true,
};

const AlertDialogContext = createContext<(options: AlertDialogOptions) => Promise<any>>((_) => Promise.resolve());

const buildOptions = (defaultOptions: AlertDialogOptions, options: AlertDialogOptions) => {
    const dialogProps = {
        ...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
        ...(options.dialogProps || {}),
    };
    const dialogActionsProps = {
        ...(defaultOptions.dialogActionsProps || DEFAULT_OPTIONS.dialogActionsProps),
        ...(options.dialogActionsProps || {}),
    };
    const closeButtonProps = {
        ...(defaultOptions.closeButtonProps || DEFAULT_OPTIONS.closeButtonProps),
        ...(options.closeButtonProps || {}),
    };
    const titleProps = {
        ...(defaultOptions.titleProps || DEFAULT_OPTIONS.titleProps),
        ...(options.titleProps || {}),
    };
    const contentProps = {
        ...(defaultOptions.contentProps || DEFAULT_OPTIONS.contentProps),
        ...(options.contentProps || {}),
    };

    return {
        ...DEFAULT_OPTIONS,
        ...defaultOptions,
        ...options,
        dialogProps,
        dialogActionsProps,
        closeButtonProps,
        titleProps,
        contentProps,
    };
};

interface AlertDialogProps {
    open: boolean;
    options: AlertDialogOptions;
    onClose: () => void;
}

const AlertDialog = ({ open, options, onClose }: AlertDialogProps) => {
    const {
        title,
        description,
        content,
        closeText,
        dialogProps,
        dialogActionsProps,
        closeButtonProps,
        titleProps,
        contentProps,
        allowClose,
    } = options;

    return (
        <Dialog fullWidth maxWidth="xs" {...dialogProps} open={open} onClose={allowClose ? onClose : () => {}}>
            {title && (
                <DialogTitle {...titleProps} align="center">
                    {title}
                </DialogTitle>
            )}
            {content ? (
                <DialogContent {...contentProps}>{content}</DialogContent>
            ) : (
                description && (
                    <DialogContent {...contentProps}>
                        <DialogContentText>{description}</DialogContentText>
                    </DialogContent>
                )
            )}
            <DialogActions {...dialogActionsProps} sx={{ justifyContent: 'center', py: 4 }}>
                <Button color="primary" variant="contained" {...closeButtonProps} onClick={onClose}>
                    {closeText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const AlertDialogProvider = ({ children, defaultOptions = {} }: AlertDialogProviderProps) => {
    const [options, setOptions] = useState({});
    const [open, setOpen] = useState(false);
    const [resolveReject, setResolveReject] = useState<((value: unknown) => void)[]>([]);
    const [resolve] = resolveReject;

    const alert = useCallback((options = {}) => {
        return new Promise((resolve) => {
            setOptions(options);
            setOpen(true);
            setResolveReject([resolve]);
        });
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        setOptions(DEFAULT_OPTIONS);
        if (resolve) {
            resolve(undefined);
        }
    }, [resolve]);

    return (
        <>
            <AlertDialogContext.Provider value={alert}>{children}</AlertDialogContext.Provider>
            <AlertDialog open={open} options={buildOptions(defaultOptions, options)} onClose={handleClose} />
        </>
    );
};

export const useAlert = () => useContext(AlertDialogContext);

export default AlertDialogProvider;

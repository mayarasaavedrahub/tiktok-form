import { isValidMobilePhone, isValidCPF } from '@brazilian-utils/brazilian-utils';
import { Button, Paper, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { Timestamp } from 'firebase/firestore';
import { Form, Formik, FormikProps } from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { useAlert } from '../components/AlertDialogContext';
import CustomTextField from '../components/CustomTextField';
import { FlexBoxColumn, FlexBoxRow } from '../components/FlexBox';
import FullForm from '../components/FullForm';
import Layout from '../components/Layout';
import { useLoading } from '../context/LoadingContext';
import Validator, { ValidatorType } from '../helpers/Validator';
import {  createUser, findUserById } from '../services/UserService';

dayjs.extend(isToday);

const REQUIRED_FIELD_MESSAGE = 'Campo obrigatório';

interface UserEmail {
    email: string;
}

interface UserCreatePageProps {
    adidas?: boolean;
}

const phoneValidationSchema = yup.object().shape({
    email: yup
    .string()
    .transform((value: string) => value.replace(/D/g, ''))
    
    .required(REQUIRED_FIELD_MESSAGE),
});

const userValidationSchema = yup.object().shape({
    name: yup.string().required(REQUIRED_FIELD_MESSAGE),
    email: yup.string().required(REQUIRED_FIELD_MESSAGE),
    document: yup
        .string()
        .transform((value: string) => value.replace(/\D/g, ''))
        .test({
            name: 'is-cpf',
            message: 'CPF Inválido',
            test: (value) => (value && isValidCPF(value)) || false,
        })
        .required(REQUIRED_FIELD_MESSAGE),
    phone: yup
        .string()
        .transform((value: string) => value.replace(/\D/g, ''))
        .test({
            name: 'is-mobilePhone',
            message: 'Celular Inválido',
            test: (value) => (value && isValidMobilePhone(value)) || false,
        })
        .required(REQUIRED_FIELD_MESSAGE),
    optins: yup
        .array()
        .of(yup.string())
        .test(
            'array-contains-privacy',
            'Você deva aceitar o regulamento',
            (value) => value && value.includes('optin')
        ),
        email2: yup.string()
        .oneOf([yup.ref('email')], "O e-mail é diferente")
        .required('Required')
});

const UserCreatePage = ({ adidas }: UserCreatePageProps) => {
    const alert = useAlert();
    const phoneFormRef = useRef<FormikProps<UserEmail>>(null);
    const userFormRef = useRef<FormikProps<User>>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { setLoading } = useLoading();
    const [phoneSearched, setPhoneSearched] = useState(false);
    const [currentUser, setCurrentUser] = useState<User>();

    useEffect(() => {
        userFormRef.current?.setValues(currentUser || ({} as User));
    }, [currentUser]);

    const handlePhoneSearch = async ({ email }: UserEmail) => {
        setLoading(true);
        const user = (await findUserById(email)) || ({} as User);
        setCurrentUser({ ...user, email });
        setPhoneSearched(true);
        setLoading(false);
    };

    const handleUserCreate = async (user: User) => {
        setLoading(true);
        await createUser({ ...user, origin: adidas ? 'tiktok' : 'tiktok' });
        
        setLoading(false);
        alert({
            title: 'Usuário adicionado com sucesso',
        }).then(() => {
            handleCancelRegister();
        });
    };

    const handleCancelRegister = () => {
        setPhoneSearched(false);
        setCurrentUser(undefined);
        phoneFormRef.current?.resetForm();
        phoneFormRef.current?.setErrors({ email: REQUIRED_FIELD_MESSAGE });
    };




    return (
        <Layout adidas={adidas}>
            <FlexBoxColumn
                sx={{
                   
                    gap: 2,
                    flex: 1,
                    width: {
                        lg: '80%',
                        xs: '90%',
                    },
                   
                }}
            >
                <Paper
                    sx={{
                        p: {
                            sm: 8,
                            xs: 2,
                        },
                        py: {
                            sm: 8,
                            xs: 4,
                        },
                    }}
                >
                    <FlexBoxColumn gap={4}>
                   
                        <Formik
                            
                            initialValues={{} as UserEmail}
                            validationSchema={phoneValidationSchema}
                            onSubmit={handlePhoneSearch}
                            validateOnMount
                            innerRef={phoneFormRef}
                            getCountUser
                        >
                            {({ isValid }) => (
                                <Form>
                                    <FlexBoxRow gap={2}>
                                        <CustomTextField
                                            name="email"
                                            label="E-mail"
                                            type="email"
                                            disabled={phoneSearched}
                                        />
                                        <Button type="submit" variant="contained" disabled={!isValid || phoneSearched}>
                                            Buscar
                                        </Button>
                                    </FlexBoxRow>
                                </Form>
                            )}
                        </Formik>
                        {currentUser && (
                            <Formik
                                initialValues={currentUser}
                                validationSchema={userValidationSchema}
                                onSubmit={handleUserCreate}
                                validateOnMount
                                innerRef={userFormRef}
                            >
                                {(props) => (
                                    <FullForm
                                        formikProps={props}
                                        adidas={adidas}
                                        currentUser={currentUser}
                                        handleCancelRegister={handleCancelRegister}
                                    />
                                )}
                            </Formik>
                        )}
                    </FlexBoxColumn>
                </Paper>
            </FlexBoxColumn>
        </Layout>
    );
};

export default UserCreatePage;

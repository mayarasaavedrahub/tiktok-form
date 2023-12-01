import { Button, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { Form, FormikProps } from 'formik';
import { useConfirm } from 'material-ui-confirm';
import { t } from '../helpers/TextConverter';
import CustomTextField from './CustomTextField';
import { FlexBoxColumn, FlexBoxRow } from './FlexBox';
import OptIns from './OptIns';

interface FullFormProps {
    formikProps: FormikProps<User>;
    currentUser: User;
    adidas?: boolean;
    handleCancelRegister: () => void;
}

const FullForm = ({
    formikProps: { values: user, isValid, isSubmitting, setFieldValue },
    adidas,
    currentUser,
    handleCancelRegister,
}: FullFormProps) => {
    const confirm = useConfirm();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const filteresOptIns = OPT_INS.filter((optin) => adidas || optin.value !== 'brand-adidas');

    

    return (
        <Form>
            <FlexBoxColumn gap={4}>
                <CustomTextField name="email2" label="Confirme seu email" />
                <CustomTextField name="name" label="Nome Completo" />
                <CustomTextField name="phone" label="Telefone" type="tel" mask="(00) 00000-0000" />
                <CustomTextField name="birthDate" label="Data Nascimento" type="tel" mask="00/00/0000" />
                <CustomTextField name="document" label="CPF" type="tel" mask="000.000.000-00" />

                {!isMobile ? (
                    <FlexBoxRow gap={2}>
                        <FlexBoxColumn gap={2} flex={5}>
                      
                            <OptIns user={user} currentUser={currentUser} items={filteresOptIns} />
                        </FlexBoxColumn>
                    </FlexBoxRow>
                ) : (
                    <FlexBoxColumn gap={3} mt={2}>
                   
                        <OptIns user={user} currentUser={currentUser} items={filteresOptIns} />
                    </FlexBoxColumn>
                )}
                <FlexBoxRow gap={2}>
                    <Button
                        variant="outlined"
                        size={isMobile ? 'medium' : 'large'}
                        fullWidth
                        onClick={handleCancelRegister}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        size={isMobile ? 'medium' : 'large'}
                        fullWidth
                        disabled={(() => {
                            return isSubmitting || !isValid || JSON.stringify(user) === JSON.stringify(currentUser);
                        })()}
                    >
                        Salvar
                    </Button>
                </FlexBoxRow>
            </FlexBoxColumn>
        </Form>
    );
};



const OPT_INS: OptInItem[] = [
    {
        value: 'optin',
        label: 'Estou de acordo com o regulamento e declaro que eu e meu acompanhante somos maiores de 18 anos',
    },

];

export default FullForm;

import { Box, FormControlLabel, FormGroup, Switch, Typography } from '@mui/material';
import { useFormikContext } from 'formik';

interface OptInsProps {
    user: User;
    currentUser: User;
    items: OptInItem[];
}

const OptIns = ({ user, currentUser, items }: OptInsProps) => {
    const { setFieldValue } = useFormikContext<User>();
    const handleOptinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setFieldValue('optins', [...new Set([...(user.optins || []), event.target.name])]);
        } else {
            setFieldValue(
                'optins',
                user.optins.filter((optin) => optin !== event.target.name)
            );
        }
    };
    return (
        <Box
            p={1}
            order={{
                sm: 2,
            }}
        >
            <FormGroup sx={{ gap: { xs: 2, sm: 1 } }}>
                {items.map(({ value, label }, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Switch
                                checked={user?.optins?.includes(value) || false}
                                onChange={handleOptinChange}
                                size="small"
                                name={value}
                            />
                        }
                        disabled={value === 'privacy' && currentUser.optins?.includes('privacy')}
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: { xs: '0.8rem', sm: '1rem' } } }}
                        label={
                            <Typography
                                sx={{
                                    textAlign: 'justify',
                                    a: {
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        color: 'primary.main',
                                    },
                                }}
                                dangerouslySetInnerHTML={{ __html: label }}
                            />
                        }
                    />
                ))}
            </FormGroup>
        </Box>
    );
};

export default OptIns;

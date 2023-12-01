import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {
    Button,
    Chip,
    Dialog,
    DialogContent,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../components/CustomTextField';
import { FlexBoxColumn, FlexBoxRow } from '../components/FlexBox';
import Layout from '../components/Layout';
import { useLoading } from '../context/LoadingContext';
import { t } from '../helpers/TextConverter';
import { findUsers } from '../services/UserService';

const UserFilter = ({ open, onSuccess }: { open: boolean; onSuccess: (users: User[]) => void }) => {
    const { setLoading } = useLoading();

    const handleFilter = async (filter: UserFilter) => {
        setLoading(true);
        onSuccess(await findUsers(filter));
        setLoading(false);
    };

    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogContent sx={{ p: 4 }}>
                <Formik initialValues={{} as UserFilter} onSubmit={handleFilter}>
                    {() => (
                        <Form autoComplete="off">
                            <FlexBoxColumn gap={3}>
                                <CustomTextField name="name" label="Nome" />
                                <CustomTextField name="email" label="Email" type="email" />
                                <CustomTextField name="phone" label="Telefone" mask="(00) 00000-0000" />
                                <FlexBoxRow
                                    sx={{
                                        justifyContent: { xs: 'space-between', sm: 'flex-end' },
                                        width: '100%',
                                        pt: 2,
                                        gap: 2,
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={() => {
                                            onSuccess([]);
                                        }}
                                    >
                                        Limpar
                                    </Button>
                                    <Button variant="contained" type="submit" size="large">
                                        Filtrar
                                    </Button>
                                </FlexBoxRow>
                            </FlexBoxColumn>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

const UserPage = () => {
    const navigate = useNavigate();
    const [filterOpen, setFilterOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

    return (
        <Layout>
            <FlexBoxColumn
                sx={{
                    width: {
                        md: '80%',
                        xs: '95%',
                    },
                }}
                flex={1}
                gap={2}
            >
                <FlexBoxRow justifyContent="space-between">
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/')}
                        sx={{ maxWidth: 100 }}
                    >
                        Novo +
                    </Button>
                    <Button
                        size="large"
                        variant="outlined"
                        startIcon={<FilterAltOutlinedIcon />}
                        onClick={() => setFilterOpen(true)}
                    >
                        {users && users.length > 0 ? 'Filtrado' : 'Filtrar'}
                    </Button>
                </FlexBoxRow>
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                    }}
                >
                    <FlexBoxColumn gap={4}>
                        {users && users.length > 0 ? (
                            <TableContainer sx={{ maxHeight: '60vh' }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nome</TableCell>
                                            <TableCell align="center" width="25%">
                                                Email
                                            </TableCell>
                                            <TableCell align="center" width="20%">
                                                Telefone
                                            </TableCell>
                                            <TableCell align="center" width="15%">
                                                Ativação
                                            </TableCell>
                                            <TableCell align="right" width="10%">
                                                Criado em
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users?.map((user) => (
                                            <TableRow key={user.id} hover>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell align="center">{user.email}</TableCell>
                                                <TableCell align="center">{user.phone}</TableCell>
                                                <TableCell align="center">
                                              
                                                </TableCell>
                                                <TableCell align="right">
                                                    {new Timestamp(user.createdAt.seconds, user.createdAt.nanoseconds)
                                                        .toDate()
                                                        .toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Typography textAlign="center">Nenhum usuário encontrado</Typography>
                        )}
                    </FlexBoxColumn>
                </Paper>
            </FlexBoxColumn>

            <UserFilter
                open={filterOpen}
                onSuccess={(users) => {
                    setUsers(users);
                    setFilterOpen(false);
                }}
            />
        </Layout>
    );
};

export default UserPage;

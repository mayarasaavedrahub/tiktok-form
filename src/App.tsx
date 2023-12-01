import { Backdrop, CircularProgress, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import { Route, Routes } from 'react-router-dom';
import AlertDialogProvider from './components/AlertDialogContext';
import { LoadingContextProvider, useLoading } from './context/LoadingContext';
import UserCreatePage from './pages/UserCreatePage';
import UserPage from './pages/UserPage';
import theme from './theme';

const CustomBackdrop = () => {
    const { loading } = useLoading();
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.snackbar + 1 }} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

const App = () => (
    <LoadingContextProvider>
        <ThemeProvider theme={theme}>
            <ConfirmProvider
                defaultOptions={{
                    dialogProps: {
                        fullWidth: true,
                        maxWidth: 'xs',
                    },
                    dialogActionsProps: {
                        sx: { p: 4 },
                    },
                    titleProps: {
                        sx: { p: 4 },
                    },
                    confirmationButtonProps: {
                        variant: 'contained',
                        fullWidth: true,
                    },
                    cancellationButtonProps: {
                        variant: 'outlined',
                        fullWidth: true,
                    },
                    confirmationText: 'Sim',
                    cancellationText: 'Não',
                }}
            >
                <AlertDialogProvider>
                    <CssBaseline />
                    <Routes>
                        <Route path="/buscar" element={<UserPage />} />
                        <Route path="/adidas" element={<UserCreatePage adidas />} />
                        <Route path="/" element={<UserCreatePage />} />
                    </Routes>
                    <CustomBackdrop />
                </AlertDialogProvider>
            </ConfirmProvider>
        </ThemeProvider>
    </LoadingContextProvider>
);

export default App;

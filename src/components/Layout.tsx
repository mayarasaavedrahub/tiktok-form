import { makeStyles, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import adidasImg from '../assets/images/logo-adidas.png';
import logo from '../assets/images/logo.png';
import { FlexBoxColumn, FlexBoxRow } from './FlexBox';

interface LayoutProps {
    children: React.ReactNode;
    adidas?: boolean;
}

const Layout = ({ children, adidas }: LayoutProps) => {
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        document.body.style.backgroundColor = path === '/adidas' ? '#fff' : '#ffff';
    }, [path]);

    return (
        <FlexBoxColumn alignItems="center" justifyContent= "center"  gap={2} p={1} height="100%">
            
           <FlexBoxRow p={2}>               
                {children && <img src={logo} style={{ maxWidth: 550, padding: 20 }} />}               
           
            </FlexBoxRow>
            {children}
            <FlexBoxRow>
            <Typography
                component="a"
                href="https://hubbr.app/tiktok/regulamento.pdf"
                target="_blank"
                sx={{ textDecoration: 'none', color: 'WHITE', p: 2 }}
            >
               <strong>Regulamento</strong>
            </Typography>
           
            </FlexBoxRow>
            <Typography
                component="a"
                href="https://hubbrasil.com.br/"
                target="_blank"
                sx={{ textDecoration: 'none', color: 'black', p: 2 }}
            >
                POWERED BY <strong>HUB Brasil</strong>
            </Typography>
        </FlexBoxColumn>
    );
};

export default Layout;

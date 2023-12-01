import { red, blue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import BrandingMedium from './assets/fonts/tiktok/TikTok-Sans-Display-Medium-Oblique.otf'
import ImageBG from './assets/images/bg.png'


const brandingMedium = {
    fontFamily: 'BrandingMedium',
    fontDisplay: 'swap',
    src: `
        local('BrandingMedium'),
        url(${BrandingMedium}) format('opentype')
    `,
};

const theme = createTheme({
    typography: {
        fontFamily: ['"Open Sans"', 'BrandingMedium', 'Roboto'].join(','),
    },
    palette: {
        primary: {
            main: blue[500],
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@font-face': [brandingMedium],
                body: {
                    backgroundColor: '#fffff',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${ImageBG})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                },
            },
        },
        // MuiTextField: {
        //     styleOverrides: {
        //         root: {
        //             marginBottom: '1em',
        //         },
        //     },
        // },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    marginTop: 0,
                 
                    marginLeft: 0,
                },
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 4,
            },
        },
    },
});

export default theme;

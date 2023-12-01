import { createRoot } from 'react-dom/client';
import TagManager from 'react-gtm-module';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

TagManager.initialize({
    gtmId: 'GTM-K7GM8FR',
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

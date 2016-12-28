import Container from './container';

interface Provider {
    (container: Container): any;
}

export default Provider;

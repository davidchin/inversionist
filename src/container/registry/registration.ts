import Key from '../key';
import Provider from '../provider';
import Scope from '../scope';

interface Registration {
    key: Key;
    provider: Provider;
    scope: Scope;
}

export default Registration;

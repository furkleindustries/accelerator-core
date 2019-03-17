import 'web-audio-test-api';

import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const adapter = new Adapter();

Enzyme.configure({ adapter });

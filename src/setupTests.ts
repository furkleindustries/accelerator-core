import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

require('../scripts/generatePassagesManifest');
require('../scripts/generateFootersManifest');
require('../scripts/generateHeadersManifest');
require('../scripts/generatePluginsManifest');

Enzyme.configure({ adapter: new Adapter(), });

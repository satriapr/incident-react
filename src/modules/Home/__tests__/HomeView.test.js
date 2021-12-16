import Home from '../HomeView';
import { testSnapshots } from '../../../utils/TestUtil';

describe('Home Component', () => {
  testSnapshots(Home, [
    {
      description: 'Home props',
      props: {}
    }
  ]);
});

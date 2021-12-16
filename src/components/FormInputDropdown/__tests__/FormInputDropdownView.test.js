import FormInputDropdown from '../FormInputDropdownView';
import { testSnapshots } from '../../../utils/TestUtil';

describe('FormInputDropdown Component', () => {
  testSnapshots(FormInputDropdown, [
    {
      description: 'FormInputDropdown props',
      props: {
        name: '',
        control: {},
        label: '',
        options: []
      }
    }
  ]);
});

import FormInputText from '../FormInputTextView';
import { testSnapshots } from '../../../utils/TestUtil';

describe('FormInputText Component', () => {
  testSnapshots(FormInputText, [
    {
      description: 'FormInputText props',
      props: {
        name: '',
        control: {},
        label: '',
        isMultiline: false
      }
    }
  ]);
});

import CommonModal from '../CommonModalView';
import { testSnapshots } from '../../../utils/TestUtil';

describe('CommonModal Component', () => {
  testSnapshots(CommonModal, [
    {
      description: 'CommonModal props',
      props: {
        isOpen: false,
        handleClose: () => {},
        title: '',
        description: '',
        isConfirmationButtonVisible: false,
        handleConfirm: () => {}
      }
    }
  ]);
});

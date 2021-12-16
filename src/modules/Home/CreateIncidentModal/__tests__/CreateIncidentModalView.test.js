import CreateIncidentModal from '../CreateIncidentModalView';
import { testSnapshots } from '../../../../utils/TestUtil';

describe('CreateIncidentModal Component', () => {
  testSnapshots(CreateIncidentModal, [
    {
      description: 'CreateIncidentModal props',
      props: {
        isOpen: false,
        handleCloseCB: () => {},
        handleSubmitCB: () => {},
        userOptions: []
      }
    }
  ]);
});

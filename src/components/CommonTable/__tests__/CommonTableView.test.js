import CommonTable from '../CommonTableView';
import { testSnapshots } from '../../../utils/TestUtil';

describe('CommonTable Component', () => {
  testSnapshots(CommonTable, [
    {
      description: 'CommonTable props',
      props: {
        rows: [],
        cells: [
          {
            id: '',
            label: '',
            value: ''
          }
        ],
        selectedUser: {},
        handleDeleteCB: () => {},
        handleAcknowledgeCB: () => {},
        handleResolveCB: () => {}
      }
    }
  ]);
});

import test from 'tape'
import fetchMock from 'fetch-mock'
import Api from '../src/utils/Api'

test('api | trucks.fetch', (t1) => {
    const TRUCK_ONE = {
        cargoType: "Coffee, tea, Computer, Kidtoys, Electronic",
        description: "noope",
        dimension: "9.5-1.4-2.5",
        driver: "Donal Trump",
        index: true,
        parkingAddress: "22 Mai Anh Tuan, Hoang Cau, Dong Da, 145 Quan Nhan, Thanh Xuan",
        price: 3940000000,
        productionYear: 1999,
        publishedAt: "2018-11-01T08:12:35.941Z",
        status: "New",
        truckPlate: "16C-13534",
        truckType: "4",
        updatedAt: "2018-11-01T08:12:35.941Z",
        _id: "1234"
    }
    const TRUCK_TWO = {
        cargoType: "Coffee, tea, Computer, Kidtoys, Electronic",
        description: "noope",
        dimension: "9.5-1.4-2.5",
        driver: "Donal Trump",
        index: true,
        parkingAddress: "22 Mai Anh Tuan, Hoang Cau, Dong Da, 145 Quan Nhan, Thanh Xuan",
        price: 3940000000,
        productionYear: 1999,
        publishedAt: "2018-11-01T08:12:35.941Z",
        status: "New",
        truckPlate: "16C-13534",
        truckType: "4",
        updatedAt: "2018-11-01T08:12:35.941Z",
        _id: "1235"
      };
      const DUMMY_CREATE_RESPONSE = [ TRUCK_ONE, TRUCK_TWO ];
      t1.test('Returns trucks and truckIds', ({ deepEqual, end }) => {
        fetchMock.mock('/notes', DUMMY_CREATE_RESPONSE);
        Api.fetchTrucks(1)
          .then(({ notes, noteIds }) => {
            const expedtedNotes = {
              [TRUCK_ONE.id]: TRUCK_ONE,
              [TRUCK_TWO.id]: TRUCK_TWO,
            };
            const expectedNoteIds = [ 123, 456 ];
    
            deepEqual(noteIds, expectedNoteIds);
            deepEqual(notes, expedtedNotes);
    
            end();
          });
      });
})

const MobxEvent = require('./mobx-event');

describe('Testing simple Mobx-Event', () => {
  const teamEvent = new MobxEvent({ members: [] });
  test('expect members length be 0', () => {
    expect(teamEvent.getState().members.length).toBe(0);
  });
  teamEvent.state.color = 'red';
  test('expect color be red', () => {
    expect(teamEvent.getState().color).toBe('red');
  });

});

describe('Testing event Mobx-Event', async () => {
  let ParkingEvent = null;
  let cars = [];
  beforeEach(() => {
    ParkingEvent = new MobxEvent({ cars: [] });
    ParkingEvent.on('change', state => cars = state.cars);
    ParkingEvent.state.cars.push({ name: 'Ferrari' });
  });
  test('expect cars length be 1', () => {
    expect(cars.length).toBe(1);
  });
  test('expect cars length be 0', () => {
    ParkingEvent.rollback();
    expect(ParkingEvent.state.cars.length).toBe(0);
  }); 
  test('expect history length is 3', () => {
    ParkingEvent.state.active = true;
    expect(ParkingEvent.history().length).toBe(3);
  });     
  test('expect open on 3rd position is \'14h\'', () => {
    ParkingEvent.state.open = '12h'; // 2
    ParkingEvent.state.open = '14h'; // 3
    ParkingEvent.state.open = '16h'; // 4
    ParkingEvent.backTo(3);
    expect(ParkingEvent.getState().open).toBe('14h');
  });     
});
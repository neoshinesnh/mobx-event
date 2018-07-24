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
  let called = 0;
  beforeEach(() => {
    ParkingEvent = new MobxEvent({ cars: [] });
    ParkingEvent.on('change', state => cars = state.cars);
    ParkingEvent.on('change-title', () => called += 1);
    ParkingEvent.state.title = 'Old Jack Parking';
    ParkingEvent.state.cars.push({ name: 'Ferrari' });
  });
  test('expect change-title event was called 1x', () => {
    expect(called).toBe(1);
  });  
  test('expect cars length be 1', () => {
    expect(cars.length).toBe(1);
  });
  test('expect cars length be 0', () => {
    ParkingEvent.rollback();
    expect(ParkingEvent.state.cars.length).toBe(0);
  }); 
  test('expect history length is 4', () => {
    ParkingEvent.state.active = true;
    expect(ParkingEvent.history().length).toBe(4);
  });     
  test('expect open on 3rd position is \'14h\'', () => {
    ParkingEvent.state.open = '12h'; // 3
    ParkingEvent.state.open = '14h'; // 4
    ParkingEvent.state.open = '16h'; // 5
    ParkingEvent.backTo(4);
    expect(ParkingEvent.getState().open).toBe('14h');
  });     
});
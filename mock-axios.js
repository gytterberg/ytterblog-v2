import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

// allows us to fake API responses -- for testing front end?

const mock = new MockAdapter(axios);

console.log('Test??? are we getting here?');

afterEach(() => mock.reset());

export default mock;

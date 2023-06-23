const request = require('supertest');
const { app, server } = require('./server');

afterAll((done) => {
  // Close the server after all tests are completed
  server.close(done);
});

it('should send a notification', async () => {
    const notification = {
      category: 'Sports',
      message: 'Test notification',
      userName: 'John Doe',
    };
  
    const response = await request(app)
      .post('/notifications')
      .send(notification);
  
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({});
  });
  

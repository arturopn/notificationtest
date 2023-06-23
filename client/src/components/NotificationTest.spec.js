import { mount } from '@vue/test-utils';
import NotificationTest from './NotificationTest.vue';

describe('NotificationTest', () => {
  it('submits a notification', async () => {
    // Mock the axios module
    const axios = {
      post: jest.fn().mockResolvedValueOnce(),
      get: jest.fn().mockResolvedValueOnce({ data: [] }),
    };

    const wrapper = mount(NotificationTest, {
      data() {
        return {
          axios,
          category: 'Sports',
          message: 'Test notification',
          logHistory: [],
          selectedUser: '',
          selectedChannel: '',
          users: [],
        };
      },
    });

    // Simulate form submission
    wrapper.find('.notification-form').trigger('submit.prevent');

    await wrapper.vm.$nextTick();

    // Expect axios.post to have been called with the correct notification data
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/notifications', {
      category: 'Sports',
      message: 'Test notification',
      userName: '',
      type: '',
    });

    // Expect the message to be cleared
    expect(wrapper.vm.message).toBe('');

    // Expect axios.get to have been called to fetch log history
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/log');

    // Expect logHistory to be updated with the response data
    expect(wrapper.vm.logHistory).toEqual([]);

    // Ensure that no errors were logged
    expect(console.error).not.toHaveBeenCalled();
  });
});

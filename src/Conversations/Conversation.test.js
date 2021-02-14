import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Conversation from './Conversation.js';
import { getMessages } from '../apiCalls.js';
jest.mock('../apiCalls.js');

describe('Conversation', () => {
  it('should render expected elements', async () => {
    getMessages.mockResolvedValue([
      {
        message_id: 1,
        text: 'I like to snowboard.',
        date_sent: '2021-02-13 17:29:44.708606-07',
        time_sent: null,
        conversation_id: 1
      }  
      ])

    const mockConversationID = 1;
    const mockStartDate = '2021-01-14';
    const mockTitle = 'Activities'

    await act(async () => {
      await render(
      <Conversation 
        conversationID={mockConversationID}
        startDate={mockStartDate}
        title={mockTitle}
      />
    )})
    expect(screen.getByText('Activities')).toBeInTheDocument();
    expect(screen.getByText('2021-01-14')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'View Messages'})).toBeInTheDocument();
    
    screen.debug()
  })
})
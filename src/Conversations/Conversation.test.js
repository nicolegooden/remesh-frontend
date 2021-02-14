import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Conversation from './Conversation.js';
import { getMessages, getThoughts } from '../apiCalls.js';
jest.mock('../apiCalls.js');

describe('Conversation', () => {
  let mockConversationID, mockStartDate, mockTitle;

  beforeEach(async () => {
    mockConversationID = 1;
    mockStartDate = '2021-01-14';
    mockTitle = 'Activities';

    getThoughts.mockResolvedValue([
      {
        thought_id: 1,
        text: 'Snowboarding is okay, but skiing is better!',
        date_sent: '2021-02-13 17:29:44.712747-07',
        time_sent: null,
        message_id: 1
      }
    ])
  })

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
  })

  it('should allow user to view and hide messages', async () => {
    getMessages.mockResolvedValue([
      {
        message_id: 1,
        text: 'I like to snowboard.',
        date_sent: '2021-02-13 17:29:44.708606-07',
        time_sent: null,
        conversation_id: 1
      }  
      ])

      await act(async () => {
        await render(
        <Conversation 
          conversationID={mockConversationID}
          startDate={mockStartDate}
          title={mockTitle}
        />
      )})
    
    let viewButton = screen.getByRole('button', {name: 'View Messages'});
    userEvent.click(viewButton);
    const message = await waitFor(() => screen.getByText('I like to snowboard.'));
    expect(message).toBeInTheDocument();
    expect(screen.getByText('2021-02-13')).toBeInTheDocument();
    viewButton = screen.getByRole('button', {name: 'Hide Messages'})
    expect(viewButton).toBeInTheDocument();
    userEvent.click(viewButton);
    expect(screen.queryByText('I like to snowboard.')).toBeNull();
  })

  it('should indicate if a conversation doesn\'t have messages', async () => {
    getMessages.mockResolvedValue({
      error: 'No messages found with the conversation id 1'
    });

    await act(async () => {
      await render(
      <Conversation 
        conversationID={mockConversationID}
        startDate={mockStartDate}
        title={mockTitle}
      />
    )})
   
    let viewButton = screen.getByRole('button', {name: 'Add First Message'});
    expect(viewButton).toBeInTheDocument();
  })
})
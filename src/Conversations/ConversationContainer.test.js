import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import ConversationContainer from './ConversationContainer.js';
import { postConversation, getMessages } from '../apiCalls.js';
jest.mock('../apiCalls.js');

describe.skip('ConversationContainer', () => {
  let mockConversations;

  beforeEach(() => {
    mockConversations = [
      {
          conversation_id: 1,
          start_date: '2021-02-13 17:29:44.708606-07',
          title: 'Bernese Mountain Dogs'
        },
        {
          conversation_id: 2,
          start_date: '2021-02-12 17:29:44.708606-07',
          title: 'Turing'
        }
    ]

    getMessages.mockResolvedValue([
      {
        message_id: 1,
        text: 'I like the beach, but prefer mountains.',
        date_sent: '2021-02-13 17:29:44.708606-07',
        time_sent: null,
        conversation_id: 3
      }  
    ])
  })

  it('should render expected elements', async () => {
    postConversation.mockResolvedValue({
      conversation_id: 3,
      start_date: '2021-02-11 17:29:44.708606-07',
      title: 'Beaches'     
    })

    await act(async () => {
      await render(
        <ConversationContainer 
          conversations={mockConversations}
        />
      )
    })

    expect(screen.getByText('Let\'s Start a Conversation...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('title')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'SUBMIT'})).toBeInTheDocument();
    expect(screen.getByText('Existing Conversations')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('search by title...')).toBeInTheDocument();
    const title = await waitFor(() => screen.getByText('Turing'));
    expect(title).toBeInTheDocument();
  })

  it('should be able to create new conversations', async () => {
    postConversation.mockResolvedValue({
      conversation_id: 3,
      start_date: '2021-02-11 17:29:44.708606-07',
      title: 'East Coast'     
    })

    await act(async () => {
      await render(
        <ConversationContainer 
          conversations={mockConversations}
        />
      )
    })
    
    const input = screen.getByPlaceholderText('title');
    const button = screen.getByRole('button', {name: 'SUBMIT'});
    userEvent.type(input, 'East Coast');
    expect(input).toHaveValue('East Coast');
    userEvent.click(button);
  })
})
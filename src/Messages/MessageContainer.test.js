import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import MessageContainer from './MessageContainer.js';
import { postMessage, getThoughts, getMessages } from '../apiCalls.js';
jest.mock('../apiCalls.js');

describe('MessageContainer', () => {
  let mockMessages, mockConversationID, mockSetMessages;
  
  beforeEach(() => {
    mockConversationID = 1;
    mockSetMessages = jest.fn();
    mockMessages = [
      {
        message_id: 6,
        text: 'Has anyone been to Sweden?',
        date_sent: '2021-01-10 17:29:44.708606-07',
        time_sent: null,
        conversation_id: 1     
      },
      {
        message_id: 9,
        text: 'Anyone interested in traveling to Spain?',
        date_sent: '2021-01-10 17:29:44.708606-07',
        time_sent: null,
        conversation_id: 1 
      }
    ]

    getThoughts.mockResolvedValue([
      {
        thought_id: 1,
        text: 'I want to travel to Spain, too!',
        date_sent: '2021-01-11 17:29:44.708606-07',
        time_sent: null,
        message_id: 9
      },
      {
        thought_id: 2,
        text: 'Spain seems too overwhelming.',
        date_sent: '2021-01-15 17:29:44.708606-07',
        time_sent: null,
        message_id: 9
      }    
    ])

    postMessage.mockResolvedValue({
      message_id: 10,
      text: 'How about Mexico?',
      date_sent: '2021-01-10 17:29:44.708606-07',
      time_sent: null,
      conversation_id: 1  
    })

    getMessages.mockResolvedValue([
      {
        message_id: 6,
        text: 'Has anyone been to Sweden?',
        date_sent: '2021-01-10 17:29:44.708606-07',
        time_sent: null,
        conversation_id: 1     
      },
      {
        message_id: 9,
        text: 'Anyone interested in traveling to Spain?',
        date_sent: '2021-01-10 17:29:44.708606-07',
        time_sent: null,
        conversation_id: 1 
      },
      {
        message_id: 10,
        text: 'How about Mexico?',
        date_sent: '2021-01-16 17:29:44.708606-07',
        time_sent: null,
        conversation_id: 1 
      }
    ])
  })

  it('should render expected elements', async () => {
    await act(async () => {
      await render(
        <MessageContainer 
          messages={mockMessages} 
          conversationID={mockConversationID}
          setMessages={mockSetMessages}
        />
      )
    })

    expect(screen.getByPlaceholderText('message')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'ADD'})).toBeInTheDocument();
    expect(screen.getByText('Has anyone been to Sweden?')).toBeInTheDocument();
    expect(screen.queryAllByText('2021-01-10')).toHaveLength(2);
    expect(screen.queryAllByRole('button', {name: 'View Thoughts'})).toHaveLength(2);
    expect(screen.getByText('Anyone interested in traveling to Spain?')).toBeInTheDocument();
  })

  it('should allow user to add new messages', async () => {
    await act(async () => {
      await render(
        <MessageContainer 
          messages={mockMessages} 
          conversationID={mockConversationID}
          setMessages={mockSetMessages}
        />
      )
    })

    const input = screen.getByPlaceholderText('message');
    const submitButton = screen.getByRole('button', {name: 'ADD'});

    userEvent.type(input, 'How about Mexico?');
    expect(input).toHaveValue('How about Mexico?');
    
    await waitFor(() => userEvent.click(submitButton));
    expect(input).toHaveValue('');
    expect(mockSetMessages).toHaveBeenCalledTimes(1);
  })
})
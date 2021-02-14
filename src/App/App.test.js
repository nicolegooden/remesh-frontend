import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from './App.js';
import { getAllConversations, getMessages, getThoughts } from '../apiCalls.js';
jest.mock('../apiCalls.js');

describe('App integration', () => {
  beforeEach(() => {
    getAllConversations.mockResolvedValue([
      {
        conversation_id: 1,
        start_date: '2021-02-13 17:29:44.708606-07',
        title: 'Bernese Mountain Dogs'
      },
      {
        conversation_id: 2,
        start_date: '2021-02-12 17:29:44.708606-07',
        title: 'Travel'
      }
    ])

    getMessages.mockResolvedValue([
      {
        message_id: 1,
        text: 'Has anyone been to Spain recently?',
        date_sent: '2021-01-07 17:29:44.708606-07',
        time_sent: null,
        conversation_id: 2
      }  
    ])

    getThoughts.mockResolvedValue([
      {
        thought_id: 1,
        text: 'I want to travel to Spain, too!',
        date_sent: '2021-01-11 17:29:44.708606-07',
        time_sent: null,
        message_id: 1
      },
      {
        thought_id: 2,
        text: 'Spain seems too overwhelming.',
        date_sent: '2021-01-15 17:29:44.708606-07',
        time_sent: null,
        message_id: 1
      }    
    ])

  })

  it('should allow user to view all messages and thoughts per conversation', async () => {
    await act(async () => {
      await render(<App />)
    })

    const viewMessages = screen.queryAllByText('View Messages');
    const travelMessages = viewMessages[1];
    expect(screen.getByText('Welcome to Remesh')).toBeInTheDocument();
    expect(viewMessages).toHaveLength(2);

    userEvent.click(travelMessages);
    expect(screen.getByRole('button', {name: 'Hide Messages'})).toBeInTheDocument();
    expect(screen.getByText('Has anyone been to Spain recently?')).toBeInTheDocument();
    expect(screen.getByText('2021-01-07')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'View Thoughts'})).toBeInTheDocument();
    
    const viewThoughts = screen.getByRole('button', {name: 'View Thoughts'});
    await waitFor(() => userEvent.click(viewThoughts));
    expect(screen.getByText('I want to travel to Spain, too!')).toBeInTheDocument();
    expect(screen.getByText('Spain seems too overwhelming.')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Hide Thoughts'})).toBeInTheDocument();
  })
})


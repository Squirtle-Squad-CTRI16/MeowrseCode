import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MeowButton } from '../../src/components/MeowButton/MeowButton.tsx';

const mockEmit = jest.fn();

jest.mock('../../src/socket', () => ({
  socket: {
    emit: mockEmit,
  },
}));

jest.mock('../../src/components/MeowButton/MeowButton.scss', () => ({}));

describe('MeowButton', () => {
  it('should emit "meow" on button click', () => {
    const mockAudioPlay = jest.fn();

    jest.spyOn(window, 'Audio').mockImplementation(() => ({
      play: mockAudioPlay,
    }));

    const { getByText } = render(<MeowButton userID="testuser" />);

    fireEvent.click(getByText('Meow'));

    expect(mockEmit).toHaveBeenCalledWith('Meow', 'testuser');
    expect(mockAudioPlay).toHaveBeenCalled();
  });
});

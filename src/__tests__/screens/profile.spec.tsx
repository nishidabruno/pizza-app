import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '@screens/Profile';

test('Check if View is rendered', () => {
  const { debug } = render(<Profile />);

  debug();
});

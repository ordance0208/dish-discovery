import { useContext } from 'react';
import { UilSun, UilMoon } from '@iconscout/react-unicons';
import { WHITE, TEXT_DARK, ThemeColorContext } from '../../theme';
import IconButton from '../IconButton';

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useContext(ThemeColorContext);

  return (
    <IconButton onClick={toggleColorMode}>
      {colorMode === 'light' ? (
        <UilMoon color={TEXT_DARK} />
      ) : (
        <UilSun color={WHITE} />
      )}
    </IconButton>
  );
};

export default ThemeToggleButton;

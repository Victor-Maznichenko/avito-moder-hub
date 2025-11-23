import type { ActionIconProps } from '@mantine/core';
import type { MouseEvent } from 'react';

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

import { Icons } from '../icons';

const getThemeSwitchAnimation = (x: number, y: number, isReverse?: boolean) => {
  const finalCircleRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );
  const clipPath = [
    `circle(0% at ${x}px ${y}px)`,
    `circle(${finalCircleRadius}px at ${x}px ${y}px)`
  ];

  return {
    keyframes: {
      clipPath: isReverse ? clipPath.reverse() : clipPath,
      zIndex: [1, 1]
    },
    animation: {
      duration: 500,
      easing: 'cubic-bezier(.76,.32,.29,.99)',
      pseudoElement: isReverse ? '::view-transition-old(root)' : '::view-transition-new(root)'
    }
  };
};

interface ThemeSwitcherProps extends ActionIconProps {
  onClick?: (event: MouseEvent) => void;
}

export const ThemeSwitcher = ({ onClick, ...props }: ThemeSwitcherProps) => {
  const { setColorScheme } = useMantineColorScheme();
  const isLightTheme = useComputedColorScheme() === 'light';

  const handleClick = (event: MouseEvent) => {
    const transition = document.startViewTransition(() =>
      setColorScheme(isLightTheme ? 'dark' : 'light')
    );

    transition.ready.then(() => {
      const { keyframes, animation } = getThemeSwitchAnimation(
        event.clientX,
        event.clientY,
        !isLightTheme
      );
      document.documentElement.animate(keyframes, animation);
    });

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <ActionIcon size='md' variant='default' onClick={handleClick} {...props}>
      {isLightTheme ? <Icons.Sun /> : <Icons.Moon />}
    </ActionIcon>
  );
};

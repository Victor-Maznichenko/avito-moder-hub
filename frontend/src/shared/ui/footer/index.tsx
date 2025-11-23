import { Anchor, AppShellFooter, Text } from '@mantine/core';

export const Footer = () => (
  <AppShellFooter ta='center'>
    <Text>
      Develop by{' '}
      <Anchor
        href='https://victor-maznichenko.netlify.app/'
        c='teal.5'
        rel='noopener noreferrer'
        target='_blank'
      >
        Victor Maznichenko
      </Anchor>
    </Text>
  </AppShellFooter>
);

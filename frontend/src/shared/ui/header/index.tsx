import { Anchor, AppShellHeader, Container, Flex, Group } from '@mantine/core';
import { Link } from 'react-router';

import { ROUTES } from '@/shared/lib';

import { Icons } from '../icons';
import { ThemeSwitcher } from '../theme-switcher';

const links = [
  { link: ROUTES.HOME, label: 'Объявления' },
  { link: ROUTES.STATISTIC, label: 'Статистика' }
];

export const Header = () => (
  <AppShellHeader py='6' pos='static'>
    <Container size='lg'>
      <Flex align='center' justify='space-between'>
        <Link to={ROUTES.HOME}>
          <Icons.Logo />
        </Link>
        <Group gap='xl' visibleFrom='sm'>
          {links?.map(({ link, label }) => (
            <Anchor key={link} c='gray' component={Link} to={link}>
              {label}
            </Anchor>
          ))}
        </Group>
        <ThemeSwitcher />
      </Flex>
    </Container>
  </AppShellHeader>
);

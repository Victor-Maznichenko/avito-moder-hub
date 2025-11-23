import { Button, Container, Image, SimpleGrid, Text, Title } from '@mantine/core';
import { Link } from 'react-router';

import notFoundSrc from '@/shared/assets/images/not-found.svg';
import { ROUTES } from '@/shared/lib';

export const NotFoundPage = () => (
  <Container py={80}>
    <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
      <Image src={notFoundSrc} />
      <div>
        <Title mb='md'>Something is not right...</Title>
        <Text c='dimmed' size='lg'>
          Page you are trying to open does not exist. You may have mistyped the address, or the page
          has been moved to another URL. If you think this is an error contact support.
        </Text>
        <Button mt='xl' size='md' variant='outline' component={Link} to={ROUTES.HOME}>
          Get back to home page
        </Button>
      </div>
    </SimpleGrid>
  </Container>
);

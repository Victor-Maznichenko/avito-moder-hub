import { Carousel } from '@mantine/carousel';
import { AppShellMain, Container, Divider, Grid, Image, Stack, Text, Title } from '@mantine/core';
import { useGate, useUnit } from 'effector-react';
import { useParams } from 'react-router';

import { AdActions } from '@/features';
import { Condition } from '@/shared/ui';
import { AdModal } from '@/widgets/ad-modal';

import { model } from '../model';
import { AdCharacteristics } from './ad-characteristics';
import { AdModerationHistory } from './ad-moderation-history';
import { AdNavigation } from './ad-navigation';
import { AdSeller } from './ad-seller';

export const AdvertisementPage = () => {
  const { id } = useParams();
  useGate(model.Gate, Number(id));
  const advertisement = useUnit(model.$ad);

  if (!advertisement || !id) {
    return (
      <AppShellMain>
        <Container size='lg'>Загрузка...</Container>
      </AppShellMain>
    );
  }

  const { title, description, images, moderationHistory, characteristics, seller } = advertisement;

  return (
    <AppShellMain>
      <Container size='xl'>
        <Grid gutter='xl' grow>
          <Grid.Col span={8}>
            <Stack gap='xl'>
              <Title>{title}</Title>
              <Condition
                then={
                  <Carousel height={500} withIndicators>
                    {images.map((image, i) => (
                      <Carousel.Slide key={i}>
                        <Image h='100%' src={image} />
                      </Carousel.Slide>
                    ))}
                  </Carousel>
                }
                else={<Image src={images[0]} />}
                value={images.length > 1}
              />
              <AdCharacteristics characteristics={characteristics ?? {}} />
              <div>
                <Title mb='sm'>Описание:</Title>
                <Text c='dimmed' mb='md' size='sm'>
                  {description}
                </Text>
              </div>
              <AdActions />
            </Stack>
          </Grid.Col>
          <Grid.Col span={4}>
            <AdNavigation />
            <Divider my='xl' />
            <AdSeller seller={seller} />
            <Divider my='xl' />
            <AdModerationHistory moderationHistory={moderationHistory} />
          </Grid.Col>
        </Grid>
        <AdModal />
      </Container>
    </AppShellMain>
  );
};

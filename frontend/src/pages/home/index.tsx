import { AppShellMain, Container, Pagination, Stack } from '@mantine/core';
import { useGate, useUnit } from 'effector-react';

import { AdsOptions } from '@/features/ads-options';
import { Condition } from '@/shared/ui';

import { AdCard } from './ad-card';
import { AdsSleleton } from './ads-skeleton';
import { model } from './model';

export const HomePage = () => {
  useGate(model.PageGate);
  const [adsList, page, isLoading, totalPages, setPage] = useUnit([
    model.$ads,
    model.$page,
    model.$isLoading,
    model.$totalPages,
    model.pageChanged
  ]);

  return (
    <AppShellMain>
      <Container size='lg'>
        <AdsOptions />
        <Stack mb='md'>
          <Condition
            else={
              <Condition
                then={
                  <>
                    {adsList.map((ad) => (
                      <AdCard key={ad.id} {...ad} />
                    ))}
                  </>
                }
                else='Ничего не найдено 😢'
                value={adsList.length}
              />
            }
            then={<AdsSleleton />}
            value={isLoading}
          />
        </Stack>
        <Pagination value={page} onChange={setPage} total={totalPages} />
      </Container>
    </AppShellMain>
  );
};

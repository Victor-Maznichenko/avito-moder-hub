import type { ChangeEvent, FormEvent } from 'react';

import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Center,
  Group,
  Input,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';

import { CATEGORIES } from '@/shared/lib';
import { Icons } from '@/shared/ui';

import { MAX_PRICE, MIN_PRICE, sortByData, sortOrderData, statusesData } from './lib';
import { model } from './model';

export const AdsOptions = () => {
  const { fields } = useForm(model.form);
  const [searchValue, categoryId, searchQueryChanged, categoryChanged, formSubmit] = useUnit([
    model.$search,
    model.$categoryId,
    model.searchQueryChanged,
    model.categoryChanged,
    model.form.submit
  ]);

  const handleSearchChanged = (e: ChangeEvent<HTMLInputElement>) => {
    searchQueryChanged(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formSubmit();
  };

  return (
    <Stack>
      <Input
        maxLength={100}
        spellCheck='false'
        type='search'
        value={searchValue}
        w='100%'
        autoComplete='off'
        leftSection={<Icons.Search />}
        onChange={handleSearchChanged}
        placeholder='Поиск по объявлениям'
        rightSection={
          <ActionIcon
            aria-label='Clear search'
            style={{ display: searchValue ? undefined : 'none' }}
            variant='transparent'
            color='gray'
            onClick={() => searchQueryChanged('')}
          >
            <Icons.Close />
          </ActionIcon>
        }
        rightSectionPointerEvents='all'
      />
      <form onSubmit={handleFormSubmit}>
        <Group gap='lg' justify='space-between' my='md'>
          <Select
            label={
              <Center inline>
                <Icons.Sort />
                <Text size='sm'>Сортировка:</Text>
              </Center>
            }
            data={sortByData}
            value={fields.sortBy.value}
            w={200}
            allowDeselect={false}
            error={fields.sortBy.errorText()}
            onChange={fields.sortBy.onChange}
            placeholder='Выберите значение'
          />

          <Select
            label={
              <Center inline>
                <Icons.Sort />
                <Text size='sm'>Группировка:</Text>
              </Center>
            }
            data={sortOrderData}
            h={90}
            value={fields.sortOrder.value}
            w={200}
            allowDeselect={false}
            error={fields.sortOrder.errorText()}
            onChange={fields.sortOrder.onChange}
            placeholder='Выберите значение'
          />

          <MultiSelect
            clearable
            data={statusesData}
            label='Статусы'
            value={fields.status.value}
            w={300}
            error={fields.status.errorText()}
            onChange={fields.status.onChange}
            placeholder='Выберите значение'
          />

          <Group align='flex-start' gap='xs' h={80}>
            <NumberInput
              label='Цена от'
              max={fields.maxPrice.value ?? undefined}
              min={MIN_PRICE}
              step={1000}
              value={fields.minPrice.value ?? undefined}
              error={fields.minPrice.errorText()}
              onChange={(value) => fields.minPrice.onChange(Number(value))}
              placeholder='Введите цену'
            />
            <NumberInput
              label='Цена до'
              max={MAX_PRICE}
              min={fields.minPrice.value ?? undefined}
              step={1000}
              value={fields.maxPrice.value ?? undefined}
              error={fields.maxPrice.errorText()}
              onChange={(value) => fields.maxPrice.onChange(Number(value))}
              placeholder='Введите цену'
            />
          </Group>

          <Button type='submit'>Применить</Button>
        </Group>
      </form>

      <Box mb='md'>
        <Title mb={4} order={4}>
          Категории:
        </Title>
        <Group gap='xl'>
          {CATEGORIES.map(({ name, id }) => (
            <Anchor
              key={id}
              c={categoryId === id ? 'red' : 'gray'}
              size='sm'
              variant='transparent'
              onClick={() => categoryChanged(id)}
            >
              {name}
            </Anchor>
          ))}
        </Group>
      </Box>
    </Stack>
  );
};

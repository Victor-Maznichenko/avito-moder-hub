import { Flex, Table, Title } from '@mantine/core';

type AdCharacteristicsProps = Required<Pick<Advertisement, 'characteristics'>>;

export const AdCharacteristics = ({ characteristics }: AdCharacteristicsProps) => {
  const characteristicsArray = Object.entries(characteristics ?? {});

  if (!characteristicsArray.length) {
    return null;
  }

  const chunkSize = 4;
  const preparedTables: { body: [string, string][] }[] = [];

  for (let i = 0; i < characteristicsArray.length; i += chunkSize) {
    preparedTables.push({
      body: characteristicsArray.slice(i, i + chunkSize)
    });
  }

  return (
    <div>
      <Title mb='sm'>Характеристики:</Title>
      <Flex align='flex-start' gap='30px'>
        {preparedTables.map((tableData, i) => (
          <Table key={i} data={tableData} w='calc(50% - 15px)' withColumnBorders withTableBorder />
        ))}
      </Flex>
    </div>
  );
};

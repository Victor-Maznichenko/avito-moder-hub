/**
 * Фильтрует объект, удаляя пустые значения (null, undefined, пустые строки, пустые массивы)
 * @param object - Объект для фильтрации
 * @returns Отфильтрованный объект без пустых значений
 */
export const filterOptions = <T extends Record<string, unknown>>(object: T): Partial<T> => {
  const filteredEntries = Object.entries(object).filter(([_, value]) => {
    if (Array.isArray(value)) {
      return Boolean(value.length);
    }

    const incorrectValues = ['', null, undefined] as unknown[];

    return !incorrectValues.includes(value);
  });

  return Object.fromEntries(filteredEntries) as Partial<T>;
};

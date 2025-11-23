interface ConditionProps<T> {
  else?: React.ReactNode;
  then: React.ReactNode;
  value: T;
}

// Посмотреть может ли заменить Activity этот комопнент или нет
export const Condition = <T,>({ value, then, else: otherwise }: ConditionProps<T>) =>
  value ? then : (otherwise ?? null);

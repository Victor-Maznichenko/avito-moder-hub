import type { ElementType } from 'react';

export const Icon = <E extends ElementType = 'svg'>({
  as,
  children,
  ...props
}: PolymorphicProps<E>) => {
  const Component = as ?? 'svg';

  return <Component {...props}>{children}</Component>;
};

export type IconProps<E extends ElementType> = PolymorphicProps<E> & {
  size?: number;
};

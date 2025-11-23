/// <reference types="react" />

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

interface ElementOwnProps<E extends ElementType = ElementType> {
  as?: E;
}

type PolymorphicProps<E extends ElementType> = ElementOwnProps<E> &
  Omit<ComponentProps<E>, keyof ElementOwnProps>;

/** Exclude null and undefined from T */
type ValueOf<T> = T[keyof T];
type Nullable<T> = T | null;
type NonNullable<T> = T extends null | undefined ? never : T;

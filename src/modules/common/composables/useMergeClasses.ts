import clsx from 'clsx';
import { useAttrs } from 'vue';

export const useMergeClasses = () => {
  const attrs = useAttrs();

  const classToMerge: string = attrs['class']
    ? (attrs['class'] as string)
    : '';

  return {
    merger: (className: string, ...args: string[]) =>
      clsx(classToMerge, className, ...args),
  };
};

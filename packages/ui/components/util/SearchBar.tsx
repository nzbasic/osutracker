import classNames from 'classnames';

interface User {
  name: string;
}

interface Registry {
  getUser: User;
}

interface SearchBarProps<T extends keyof Registry> {
  className?: string;
  query: T;
  children: (items: Registry[T][]) => React.ReactNode;
}

export const SearchBar = <T extends keyof Registry>({ className, children, query }: SearchBarProps<T>) => {
  return (
    <input 
      className={classNames(className, "p-2 bg-white rounded-md border text-black")} 
      placeholder="Search..."
    />
  );
};

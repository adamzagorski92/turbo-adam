export type FilterNode = {
  id: string;
  label: string;
  children?: FilterNode[];
};

export type NavLevel = {
  label: string;
  items: FilterNode[];
};

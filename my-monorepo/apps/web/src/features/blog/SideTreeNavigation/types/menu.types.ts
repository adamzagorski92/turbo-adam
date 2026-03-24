export type FilterNode = {
  id: string;
  label: string;
  children?: FilterNode[];
};

export type NavLevel = {
  id?: string;
  label: string;
  items: FilterNode[];
};

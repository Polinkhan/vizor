export type GroupPermissionType = {
  view: number[];
  edit: number[];
  delete: number[];
};

export type GroupType = {
  id: number;
  name: string;
  photoUrl?: string;
  description?: string;
  permissions: GroupPermissionType;
};

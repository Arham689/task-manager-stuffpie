export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type Task = {
  _id: string;
  status: TaskStatus;
  title: string;
  description: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
  color : string ;
};

export type ColumnType = {
  id: TaskStatus;
  title: string;
  color : string 
};

export type TaskUpdate = {
  title?: string;
  description?: string;  
  status?: TaskStatus
};



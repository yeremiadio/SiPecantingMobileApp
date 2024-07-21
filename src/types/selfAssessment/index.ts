export type Option = {
  label: string;
  value: number;
};

export type Question = {
  id: number;
  questionText: string;
  options: Option[];
};

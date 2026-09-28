export interface SubSection {
  id: string;
  title: string;
}

export interface ModuleMeta {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  tags: string[];
  subsections?: SubSection[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SimStep {
  line: number;
  code: string;
  env: { name: string; val: string; type: string }[];
  console: string;
  annotation: string;
}

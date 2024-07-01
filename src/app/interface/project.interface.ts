export type TProject = {
  title: string;
  image: string;
  about: string;
  description?: string;
  technology: string[];
  features: string[];
  code: {
    client?: string;
    server?: string;
  };
  preview?: string;
  order?: number;
  createdAt: Date;
};

export interface ISocialMedea {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  github: string;
  discord: string;
  youtube: string;
  whatsapp: string;
  fiver: string;
  upwork: string;
}

export interface ISortDescriptions {
  introduction: string;
  about: string;
  skill: string;
  project: string;
  service: string;
  blog: string;
  testimonial: string;
  contact: string;
}

export interface IInformation {
  name: string;
  title: string[];
  email: string;
  phone: string;
  resume: string;
  about: string;
  speech: string;
  images: {
    introduction: string;
    about: string;
  };
  socialMedia: ISocialMedea;
  sortDescriptions: ISortDescriptions;
}

export interface IIntroduction {
  name: string;
  title: string[];
  image: string;
}

export interface IAbout {
  about: string;
  speech: string;
  image: string;
}

export interface IContactInfo {
  email: string;
  phone: string;
  resume: string;
  socialMedia: ISocialMedea;
}

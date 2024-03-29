export interface IMovie {
  id: string;
  groupID: string;
  title: string;
  screenFormat: string;
  language: string;
  imageURL: string;
}

export interface IMovieGroup {
  id: string;
  title: string;
  imageURL: string;
}

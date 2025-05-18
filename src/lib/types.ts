
export type Campus = {
  id: string;
  name: string;
  emailExtension: string;
  image: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  campus: Campus;
  profilePicture?: string;
  bio?: string;
  registrationNumber?: string;
  batch?: string;
  degreeProgram?: string;
  skills?: string[];
  interests?: string[];
  cv?: string;
};

export type Post = {
  id: string;
  user: User;
  content: string;
  images?: string[];
  video?: string;
  createdAt: Date;
  likes: number;
  comments: Comment[];
  hasLiked: boolean;
};

export type Comment = {
  id: string;
  user: User;
  content: string;
  createdAt: Date;
};

export type JobOpportunity = {
  id: string;
  jobTitle: string;
  companyName: string;
  workStyle: 'Hybrid' | 'Online' | 'On-Site';
  salary: string;
  officeLocation: string;
  package: string;
  workingHours: string;
  qualification: string;
  applyLink: string;
  companyWebsite: string;
  companyLinkedin: string;
  postedBy: User;
  postedAt: Date;
};

export type PastPaper = {
  id: string;
  courseCode: string;
  courseName: string;
  year: string;
  semester: string;
  fileUrl: string;
  uploadedBy: User;
  approved: boolean;
  category: 'Midterm' | 'Final';
};

export type Event = {
  id: string;
  title: string;
  type: 'Online' | 'Physical';
  date: Date;
  location: string;
  campus: string;
  joiningLink?: string;
  details: string;
  organizer: string;
  image?: string;
};

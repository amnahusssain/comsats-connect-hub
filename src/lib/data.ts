
import { Campus, Post, JobOpportunity, PastPaper, Event } from './types';

export const campuses: Campus[] = [
  {
    id: '1',
    name: 'Islamabad Campus',
    emailExtension: '@cuiislamabad.edu.pk',
    image: '/assets/islamabad-campus.jpg',
  },
  {
    id: '2',
    name: 'Lahore Campus',
    emailExtension: '@cuilahore.edu.pk',
    image: '/assets/lahore-campus.jpg',
  },
  {
    id: '3',
    name: 'Wah Campus',
    emailExtension: '@cuiwah.edu.pk',
    image: '/assets/wah-campus.jpg',
  },
  {
    id: '4',
    name: 'Vehari Campus',
    emailExtension: '@cuivehari.edu.pk',
    image: '/assets/vehari-campus.jpg',
  },
  {
    id: '5',
    name: 'Sahiwal Campus',
    emailExtension: '@cuisahiwal.edu.pk',
    image: '/assets/sahiwal-campus.jpg',
  },
  {
    id: '6',
    name: 'Attok Campus',
    emailExtension: '@cuiattok.edu.pk',
    image: '/assets/attock-campus.jpg',
  },
  {
    id: '7',
    name: 'Abbottabad Campus',
    emailExtension: '@cuiabbottabad.edu.pk',
    image: '/assets/abbottabad-campus.jpg',
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      id: '101',
      name: 'Ali Hassan',
      email: 'ali@cuiislamabad.edu.pk',
      campus: campuses[0],
      profilePicture: '/assets/user1.jpg',
    },
    content: 'Just submitted my final project for Software Engineering! #COMSATS #FinalYear',
    images: ['/assets/post1.jpg'],
    createdAt: new Date('2023-05-18T10:30:00'),
    likes: 45,
    comments: [
      {
        id: '201',
        user: {
          id: '102',
          name: 'Fatima Khan',
          email: 'fatima@cuiislamabad.edu.pk',
          campus: campuses[0],
          profilePicture: '/assets/user2.jpg',
        },
        content: 'Great job! How did it go?',
        createdAt: new Date('2023-05-18T11:20:00'),
      }
    ],
    hasLiked: false,
  },
  {
    id: '2',
    user: {
      id: '103',
      name: 'Usman Ali',
      email: 'usman@cuilahore.edu.pk',
      campus: campuses[1],
      profilePicture: '/assets/user3.jpg',
    },
    content: 'Our team won the regional programming contest! Proud to represent COMSATS Lahore 🎉',
    images: ['/assets/post2.jpg', '/assets/post3.jpg'],
    createdAt: new Date('2023-05-17T14:45:00'),
    likes: 87,
    comments: [
      {
        id: '202',
        user: {
          id: '104',
          name: 'Ayesha Malik',
          email: 'ayesha@cuilahore.edu.pk',
          campus: campuses[1],
          profilePicture: '/assets/user4.jpg',
        },
        content: 'Congratulations! Well deserved!',
        createdAt: new Date('2023-05-17T15:10:00'),
      }
    ],
    hasLiked: true,
  }
];

export const mockJobs: JobOpportunity[] = [
  {
    id: '1',
    jobTitle: 'Junior Software Engineer',
    companyName: 'TechSolutions Inc.',
    workStyle: 'Hybrid',
    salary: 'PKR 80,000 - 100,000',
    officeLocation: 'Blue Area, Islamabad',
    package: 'Health insurance, annual bonus',
    workingHours: '9 AM - 5 PM',
    qualification: 'BS Computer Science, knowledge of React and Node.js',
    applyLink: 'https://example.com/apply',
    companyWebsite: 'https://techsolutions.com',
    companyLinkedin: 'https://linkedin.com/company/techsolutions',
    postedBy: {
      id: '105',
      name: 'Ahmad Khan',
      email: 'ahmad@alumni.cuiislamabad.edu.pk',
      campus: campuses[0],
      profilePicture: '/assets/alumni1.jpg',
    },
    postedAt: new Date('2023-05-15'),
  },
  {
    id: '2',
    jobTitle: 'Data Analyst',
    companyName: 'Analytics Pro',
    workStyle: 'Online',
    salary: 'PKR 70,000 - 90,000',
    officeLocation: 'N/A (Remote)',
    package: 'Flexible hours, quarterly bonuses',
    workingHours: 'Flexible',
    qualification: 'BS Statistics or Computer Science, SQL and Python',
    applyLink: 'https://example.com/apply-data',
    companyWebsite: 'https://analyticspro.com',
    companyLinkedin: 'https://linkedin.com/company/analyticspro',
    postedBy: {
      id: '106',
      name: 'Sara Ahmed',
      email: 'sara@alumni.cuilahore.edu.pk',
      campus: campuses[1],
      profilePicture: '/assets/alumni2.jpg',
    },
    postedAt: new Date('2023-05-14'),
  }
];

export const mockPapers: PastPaper[] = [
  {
    id: '1',
    courseCode: 'CSC357',
    courseName: 'Business Process Engineering',
    year: '2023',
    semester: 'Spring',
    fileUrl: '/assets/papers/CSC357_Spring2023.pdf',
    uploadedBy: {
      id: '107',
      name: 'Hamza Khan',
      email: 'hamza@cuiwah.edu.pk',
      campus: campuses[2],
    },
    approved: true,
  },
  {
    id: '2',
    courseCode: 'CSC356',
    courseName: 'Human Computer Interaction',
    year: '2022',
    semester: 'Fall',
    fileUrl: '/assets/papers/CSC356_Fall2022.pdf',
    uploadedBy: {
      id: '108',
      name: 'Zainab Ali',
      email: 'zainab@cuisahiwal.edu.pk',
      campus: campuses[4],
    },
    approved: true,
  },
  {
    id: '3',
    courseCode: 'CSC354',
    courseName: 'Machine Learning',
    year: '2023',
    semester: 'Spring',
    fileUrl: '/assets/papers/CSC354_Spring2023.pdf',
    uploadedBy: {
      id: '109',
      name: 'Omar Shah',
      email: 'omar@cuiislamabad.edu.pk',
      campus: campuses[0],
    },
    approved: true,
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Expo 2023',
    type: 'Physical',
    date: new Date('2023-06-15T10:00:00'),
    location: 'Main Auditorium, COMSATS Islamabad',
    campus: 'Islamabad',
    details: 'Showcase of final year projects and innovative solutions by COMSATS students. Industry representatives will be present.',
    organizer: 'IEEE COMSATS Chapter',
    image: '/assets/event1.jpg',
  },
  {
    id: '2',
    title: 'Web Development Workshop',
    type: 'Online',
    date: new Date('2023-06-10T14:00:00'),
    location: 'Online',
    campus: 'All Campuses',
    joiningLink: 'https://zoom.us/j/example',
    details: 'Learn modern web development techniques with React and Node.js. Open to all COMSATS students.',
    organizer: 'Computing Society',
    image: '/assets/event2.jpg',
  }
];

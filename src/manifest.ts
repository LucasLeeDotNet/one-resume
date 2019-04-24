/**
 * Replace the content of this file with the manifest data copied by the export button
 */
import ManifestModel from './models/ManifestModel';

export const manifest:ManifestModel = { 
  experiences: [ 
      { 
          company: 'EAB Richmond',
          position: 'Senior Web Developer',
          date: 'May 2015 - Present',
          bulletPoints: [
              'Currently leading frontend development for the new Marketing Platform',
              'Lead frontend development for adding Stripe payment system to Student Application',
              'Lead frontend development for creating a platform for sending out SMS to large volume of Students',
              'Lead frontend development for adding Google Drive upload to Student Admission Application',
              'Lead frontend development for adding a passwordless login system for Student Application',
          ]
      },
      { 
          company: 'Point of Sales System for UMI Sushi Bistro, Short Pump',
          date: 'Nov 2014 - May 2015',
          position: 'Freelance',
          bulletPoints: [
              'Built a AngularJS Touch based POS system that has been in used to serve customer for the last 4 years',
              'Provided functionality for reporting, ordering using a touch interface, table editor, split check payment, orders/receipt printing and menu creation',
              'Still currently live in production'
          ]
      },   
      { 
          company: 'Shockoe | Mobile by Design',
          date: 'Mar 2014 - Nov 2014',
          position: 'Mobile Application Developer',
          bulletPoints: [
              'Built mobile application using a Javascript Platform (Appcelerator)',
              'Built Full Stack Web Application with node'
          ]
      },        
      { 
          company: 'Virginia Commonwealth University',
          date: '2009 - 2013',
          position: `Computer Science, Bachelor's Degree`,
          bulletPoints: []
      },
  ],
  intro: { 
      name: "Lucas Lee", 
      position: "Javascript / Frontend / Web Developer", 
      statement: `Passionate about Javascript, specializing in rapid development with strong sense of design. Lead frontend development on a new marketing platform for EAB. Experienced with a wide range of skillset that extends from frontend frameworks to containerized Devops and AWS.`
  },
  skills: [
      { name: 'Javascript', level: 8.5, interest: 'Highest', icon: 'Js', lastUsed: 'Current'},
      { name: 'Typescript', level: 7, interest: 'High', icon: '', lastUsed: 'Current'},
      { name: 'React', level: 7, interest: 'High', icon: 'React', lastUsed: 'Current'},
      { name: 'Angular', level: 7.5, interest: 'High', icon: 'Angular', lastUsed: 'This Month'},
      { name: 'Node.js', level: 7.5, interest: 'High', icon: 'Node', lastUsed: 'This Month'},
      { name: 'Docker', level: 7, interest: 'High', icon: 'Docker', lastUsed: 'Current'},
      { name: 'AWS', level: 6, interest: 'High', icon: 'Aws', lastUsed: 'Current'},
      { name: 'React Native', level: 6, interest: 'High', icon: 'React', lastUsed: 'Before This Year'},
      { name: 'MongoDB', level: 5, interest: 'Moderate', icon: '', lastUsed: 'This Year'},
      { name: 'SQL', level: 5, interest: 'Moderate', icon: '', lastUsed: 'This Year'},
      { name: 'Photoshop', level: 7, interest: 'Moderate', icon: 'Adobe', lastUsed: 'This Month'},
      { name: 'Java', level: 4, interest: 'Moderate', icon: 'Java', lastUsed: 'Before This Year'},
      { name: 'JQuery', level: 7.5, interest: 'Low', icon: 'Js', lastUsed: 'This Year'},
      { name: 'Coldfusion', level: 6, interest: 'Low', icon: '', lastUsed: 'This Year'},
      { name: 'CSS', level: 7, interest: 'High', icon: '', lastUsed: 'Current'},
  ]
};
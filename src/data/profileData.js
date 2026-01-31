import { USERNAME } from "../constants";

export const profile = {
  name: 'Shreeram Kushwaha',
  username: USERNAME,
  bio: 'Director of Engineering @UptimeAI',
  skills:
    'Python, Angular, Javascript, NodeJS, MongoDB, InfluxDB, TimescaleDB, Streamsets, Kafka, AWS, Azure, HTML5, CSS',
  followers: 11,
  following: 3,
  avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
  links: {
    company: '@UptimeAI',
    location: 'Bangalore, India',
    email: 'kushwaha.shreeram@gmail.com',
    website: 'http://shreeramk.com',
    linkedin: 'in/shreeramkushwaha',
    twitter: '@poon_fret',
  },
};

export const navTabs = [
  { label: 'Overview', path: '/', count: null },
  { label: 'Repositories', path: '/repositories', count: 31 },
  { label: 'Projects', path: '/projects', count: null },
  { label: 'Packages', path: '/packages', count: 5 },
  { label: 'Stars', path: '/stars', count: 6 },
];

export const pinnedRepos = [
  {
    name: 'Complete-Python-3-Bootcamp',
    forked: 'udemy',
    desc: 'Course Files for Complete Python 3 Bootcamp Course on Udemy',
    lang: 'Jupyter Notebook',
    langColor: '#da5b0b',
  },
  {
    name: 'flutter_login_ui',
    forked: 'flutter',
    desc: 'YouTube tutorial',
    lang: 'Dart',
    langColor: '#00B4AB',
  },
  {
    name: '.gitignore',
    forked: 'github',
    desc: 'A collection of useful .gitignore templates',
    lang: null,
    langColor: null,
  },
  {
    name: 'node-opcua-logger',
    forked: 'node-opcua',
    desc: 'An OPCUA Client for logging data to InfluxDB!',
    lang: 'Javascript',
    langColor: '#f1e05a',
  },
  {
    name: 'kafkaja',
    forked: 'tulios/kafkaja',
    desc: 'A modern Apache Kafka client for node.js',
    lang: 'Javascript',
    langColor: '#f1e05a',
  },
  {
    name: 'node-opcua-1',
    forked: 'node-opcua/node-opcua',
    desc: 'OPC UA stack in javascript and nodejs - http://node-opcua.github.io/',
    lang: 'Typescript',
    langColor: '#3178c6',
  },
];

export const contributionActivity = [
  { type: 'commits', text: 'Created 56 commits in 11 repositories' },
  {
    type: 'pull_requests',
    text: 'Opened 29 pull requests in 5 repositories',
    repos: [
      { name: 'UptimeAI/uptime_webapp', merged: 16, open: 1 },
      { name: 'UptimeAI/uptime_ml', merged: 6 },
      { name: 'UptimeAI/uptime_scripts', merged: 4 },
      { name: 'UptimeAI/uptime_engine', merged: 1 },
      { name: 'UptimeAI/uptime_ml_encrypted', merged: 1 },
    ],
  },
];

export const weekDays = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export const contributionYears = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013];

export const getContributionData = () => {
  const data = [];
  for (let i = 0; i < 371; i++) {
    data.push(Math.floor(Math.random() * 5));
  }
  return data;
};

export const getContributionCalendarData = (year) => {
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  const data = [];
  const d = new Date(start);
  while (d <= end) {
    const dateStr = d.toISOString().slice(0, 10);
    data.push([dateStr, Math.floor(Math.random() * 21)]);
    d.setDate(d.getDate() + 1);
  }
  return data;
};

import {Platform} from 'react-native';

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const Environments = {
  development: {
    BASE_URL:
      Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000',
  },
  production: {
    BASE_URL: 'http://ec2-35-183-30-168.ca-central-1.compute.amazonaws.com/',
  },
};

const getPlatform = () => {
  let platform;
  if (__DEV__) {
    platform = DEVELOPMENT;
  } else {
    platform = PRODUCTION;
  }

  return platform;
};

const getEnvironment = () => {
  const platform = getPlatform();
  return Environments[platform];
};

export const Environment = getEnvironment();

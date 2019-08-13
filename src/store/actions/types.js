export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILTURE = 'FAILTURE';
export const CREATE = 'CREATE';
export const RESET = 'RESET';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';
export const POST = 'POST';
export const PUT = 'PUT';
export const GET = 'GET';
export const IS_LOADING = 'IS_LOADING';
export const LOADING_DONE = 'LOADING_DONE';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SAVE_TO_DB = 'SAVE_TO_DB';

const createTypes = phases => events => name => events.reduce((acc, event) => {
  acc[event] = phases ? phases.reduce((acc, phase) => { 
    acc[phase] = `${name}_${event}_${phase}`.replace(/^\|+|\|+$/g, '');
    return acc;
  }, {}) :
    `${name}_${event}`;
  return acc;
}, {});

const createCRUDRequestTypes = createTypes([REQUEST, SUCCESS, FAILTURE])([PUT, POST, GET, DELETE]);
const createAuthTypes = createTypes(null)([REQUEST, SUCCESS, FAILTURE, IS_LOADING, LOADING_DONE]);
const createLocalTypes = createTypes(null)([CREATE, RESET, UPDATE, DELETE]);// it's all locally

export const SIGN_IN = createAuthTypes('SIGN_IN');
SIGN_IN.ERROR_MESSAGE = createLocalTypes('SIGN_IN_ERROR_MESSAGE');
export const SIGN_UP = createAuthTypes('SIGN_UP');
SIGN_UP.ERROR_MESSAGE = createLocalTypes('SIGN_UP_ERROR_MESSAGE');
export const SIGN_OUT = createAuthTypes('SIGN_OUT');

export const DATE= createTypes(null)([RESET, UPDATE, SAVE_TO_DB])('DATE');
export const DATES = createTypes(null)([RESET, UPDATE, ADD_ITEM, DELETE_ITEM])('DATES');
export const CALENDAR = createTypes(null)([RESET, UPDATE])('CALENDAR');
export const WORK_TIME = createTypes(null)([RESET, UPDATE])('WORK_TIME');
export const VISIBILITY = createTypes(null)([RESET, UPDATE])('VISIBILITY');

export const USER = createLocalTypes('USER');
export const SIGN_IN_FIELDS = createLocalTypes('SIGN_IN_FIELDS');
export const SIGN_UP_FIELDS = createLocalTypes('SIGN_UP_FIELDS');


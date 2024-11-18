/**
 * User signin object
 * @typedef {object} UserSignin
 * @property {string} firstname - user's firstname
 * @property {string} lastname - user's lastname
 * @property {string} email - user's email
 * @property {string} password - user's password
 * @property {string} repeatPassword - user's repeat password
 * @property {string} city - user's city
 * @property {string} phone_number - user's phone number
 */

/**
 * User login object
 * @typedef {object} UserLogin
 * @property {string} email - user's email
 * @property {string} password - user's password
 */


/**
 * @typedef {object} UserInfos
 * @property {string} firstname
 * @property {string} lastname
 * @property {string} email
 * @property {string} city
 * @property {string} phone_number
 */

/**
 * UserResponse object
 * @typedef {object} UserResponse
 * @property {string} message - Response message
 * @example
 */

/**
 * Error
 * @typedef {object} ErrorResponseJson
 * @property {string} error - error list
 */


/**
 * @typedef {object} AnnouncementsResult
 * @property {integer} id - ID of the announcement
 * @property {string} date_start - Start date of the announcement
 * @property {string} date_end - End date of the announcement
 * @property {boolean} mobility - Mobility status
 * @property {boolean} home - Home status
 * @property {string} description - Description of the announcement
 * @property {string} firstname - User's firstname
 * @property {string} lastname - User's lastname
 * @property {string} city - User's city
 * @property {string} label - Label of the authorized animal
 * @example
 */


/**
 * @typedef {object} AnnouncementPost
 * @property {string} date_start - Start date of the announcement
 * @property {string} date_end - End date of the announcement
 * @property {boolean} mobility - Mobility status
 * @property {boolean} home - Home status
 * @property {string} description - Description of the announcement
 * @property {string[]} animal - type of the authorized animal
 */

/**
 * UserResponse object
 * @typedef {object} AnnouncementResponse
 * @property {string} message - Response message
 * @example
 */

/**
 * @typedef {object} AnnouncesHighlight
 * @property {integer} anouncement_id - ID of the announce
 * @property {string} date_start - Start date of the announcement
 * @property {string} date_end - End date of the announcement
 * @property {boolean} mobility - Mobility status
 * @property {boolean} home - Home status
 * @property {string} description - Description of the announcement
 * @property {integer} user_id - ID of the announcement
 * @property {string} firstname - User's firstname
 * @property {string} lastname - User's lastname
 * @property {string} city - User's city
 * @property {string[]} animals - authorized animal's label
 */

/**
 * AnimalTypesResponse object
 * @typedef {object} AnimalTypesResponse
 * @property {integer} id - Id of animal types
 * @property {string} label - Label of animal types
 */


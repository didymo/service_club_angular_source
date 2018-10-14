/**
 * Configuration file for this app
 */

export const Config = {

  // Whether to display error info
  debug: true,

  // Fake error. Turn on to simulate server error
  error: false,

  // API settings
  api:
  {
    auth:
    {
      base64: 'ZnJvbnRlbmQ6cmVzdDEyMw=='
    },

    // API URLs
    //    questionGet:  'https://www.bluemaxstudios.com/questionnaire/questions?_format=json',
    //    questionPost: 'https://www.bluemaxstudios.com/event/1/questionnaire/submit?_format=json',
    tmpSave:      'http://local.serviceclubs.com.au/event/1/tmp?_format=json',
    addr2coord:   'https://nominatim.openstreetmap.org/search?format=json&limit=1'
  }

};

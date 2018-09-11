// UUID generator

const uuidv1 = require('uuid/v1');
const randomId =  () => {return uuidv1().sliced(26);}

module.exports = randomId;

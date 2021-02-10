const { toJWT, toData } = require('./jwt');
const moment = require('moment')

function getUuid(authorization){
    const auth = authorization  && authorization.split(' ')
    if (auth && auth[0] === 'Bearer' && auth[1]) {
     
          const data = toData(auth[1])
         console.log("User authorized", data)
         let today = moment()
         let expiresAt = moment(data.exp * 1000)
         let difference = expiresAt.diff(today, 'seconds');
         if(difference <= 0){
               return null
         }else{
            return data.uuid
         }
         
      }
      else {
       //do nothing
      }
}

module.exports = getUuid
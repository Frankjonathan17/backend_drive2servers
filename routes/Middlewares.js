const {returnDp,returnCover,returnShowDp,returnShowCover}= require('../controllers/returnThings')

exports.returnDpNow = ('/', returnDp)
exports.returnCoverNow = ('/',returnCover)
exports.returnSDpNow = ('/',returnShowDp)
exports.returnSCoverNow= ('/',returnShowCover)


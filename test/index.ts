import {Message} from "../src/Logger";
import Logger from "../src/Logger";
import LogStorage from "../src/store/LogStorage";
import LocalStorage from "../src/store/LocalStorage";
import Memory from "../src/store/Memory";
import RealmStorage from "../src/store/RealmStorage";


// init logger
let logger:Logger = new Logger();
let memory:Memory = new Memory();
let ay:Array<string> = ["1","2","3"]
logger.init(memory, {logToConsole:true,logToConsoleFunc:false});
// add message

 (async() => {
 await logger.warn("warn",ay)
 const results = await logger.getStorage();
 console.log("resssss")
 console.log(results)
})()
// const bbb = async() => {
//     let a = await logger.log("log");
//     console.log(33333)
//     console.log(a)
// }
// bbb()
// logger.error("error")
// logger.debug("debug")
console.log("-=-----")
    // let aaa = async() =>{ 
    //     let a = await logger.getStorage()
    // console.log(a)
    // }
const aaa = (async() => {
    let ac = await logger.getStorage()
    console.log(33333)
    console.log(ac)
})()


// const MessageSchema = {
//     name: 'RealmStorage',
//     properties: {
//         message: 'string',
//         timestamp: {type: 'date'},
//         lengthAtInsertion: 'int',
//         id: 'string',
//         level: 'string',
//         color: 'string',
//     }
//   };



//   Realm.open({schema: [MessageSchema]})
//   .then(realm => {
//       realm.write(() => {
//           realm.create('RealmStorage', {message: 'Honda', timestamp: new Date(), lengthAtInsertion: 33, id:'1',level:'debug',color:'red'})
//           realm.create('RealmStorage', {message: 'huohuo', timestamp: new Date(), lengthAtInsertion: 33, id:'1',level:'debug',color:'red'})

//       })
//   })

//   Realm.open({schema: [MessageSchema]})
//         .then(realm => {
//             const queryAllResult = realm.objects('RealmStorage').length
//             console.log(realm.objects('RealmStorage').toJSON());
//             console.log(111111)
//             console.log(queryAllResult)
//         //   return JSON.parse(queryAllResult)
//         })


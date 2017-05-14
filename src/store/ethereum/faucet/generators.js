import { Constants } from './constants'
import {initialState} from './reducer'

const initialFaucetState = {
  creator: null,
  name: null,
  balance: 0,
  authorizedAddressReadModel: null,
  eventCount: 0
}

// export const newStateReadModel = (readModel = initialState, events) => {
//   // readModel = readModel.selected == null ?
//   //   Object.assign({}, readModel, {
//   //     selected: initialFaucetState
//   //   }) : readModel
//   console.log('newStateReadModel readModel:', readModel)
//   events.forEach((event) => {
//     if (event.Type === Constants.FAUCET_CREATED) {
//       readModel = Object.assign({}, readModel, {
//         addresses: {
//           ...readModel.addresses.concat(event.ContractAddress)
//         }
//       })
//     }
//   })
//   console.log('readModel 1:', readModel)
//   selectedFaucetReadModel(readModel.selected, events)
//   console.log('readModel 2:', readModel)
//   return readModel
// }

export const selectedFaucetReadModel = (readModel = initialFaucetState, events) => {
  readModel = readModel == null ? Object.assign({}, initialFaucetState) : readModel
  events.forEach((event) => {
    if (event.Type === Constants.FAUCET_ACCESS_REQUESTED) {
      readModel = Object.assign({}, readModel, {
        authorizedAddressReadModel: {
          [event.AddressValue]: 'Pending'
        },
        eventCount: readModel.eventCount += 1
      })
    }
    if (event.Type === Constants.FAUCET_ACCESS_GRANTED) {
      readModel = Object.assign({}, readModel, {
        authorizedAddressReadModel: {
          [event.AddressValue]: 'Granted'
        },
        eventCount: readModel.eventCount += 1
      })
    }
    if (event.Type === Constants.FAUCET_ACCESS_REVOKED) {
      readModel = Object.assign({}, readModel, {
        authorizedAddressReadModel: {
          [event.AddressValue]: 'Revoked'
        },
        eventCount: readModel.eventCount += 1
      })
    }
    if (event.Type === Constants.FAUCET_CREATED) {
      console.log('creaed event')
      readModel = Object.assign({}, readModel, {
        creator: event.AddressValue,
        name: event.StringValue,
        balance: 10,
        eventCount: readModel.eventCount += 1
      })
    }
  })
  return readModel
}

export const authorizedAddressReadModel = (readModel, events) => {

  console.log('events: ', events);

  events.forEach((event) => {
    if (event.Type === 'FAUCET_ADDRESS_ACCESS_REQUESTED') {
      readModel = Object.assign({}, readModel, {
        [event.AddressValue]: 'Pending'
      })
    }
    if (event.Type === 'FAUCET_ADDRESS_ACCESS_GRANTED') {
      readModel = Object.assign({}, readModel, {
        [event.AddressValue]: 'Granted'
      })
    }
    if (event.Type === 'FAUCET_ADDRESS_ACCESS_REVOKED') {
      readModel = Object.assign({}, readModel, {
        [event.AddressValue]: 'Revoked'
      })
    }
  })
  return readModel
}

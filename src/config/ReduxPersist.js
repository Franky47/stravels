import immutablePersistenceTransform from '../services/immutablePersistenceTransform'
import { AsyncStorage } from 'react-native'

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
export default {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    storage: AsyncStorage,
    blacklist: [  // reducer keys that you do NOT want stored to persistence here
      'nav'
    ],
    // whitelist: [], Optionally, just specify the keys you DO want stored to
    // persistence. An empty array means 'don't store any reducers' -> infinitered/ignite#409
    transforms: [
      immutablePersistenceTransform
    ]
  }
}

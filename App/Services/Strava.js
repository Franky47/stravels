import apisauce from 'apisauce'
import axios from 'axios'
import { AsyncStorage } from 'react-native'
import Secrets from 'react-native-config'

export default class StravaAPI {
  constructor () {
    // API Setup

    this.baseUrl = `https://www.strava.com`
    this.oauthRedirectUri = 'stravels://localhost/auth/strava'
    this.api = apisauce.create({
      baseURL: `${this.baseUrl}/api/v3`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${Secrets.STRAVA_ACCESS_TOKEN_RO}`
      }
    })

    // State
    this.userProfile = null
    this.usage = {
      short: null,
      long:  null,
    }
  }

  // Authentication --

  get oauthUri() {
    return `${this.baseUrl}/oauth/authorize?` + [
        `client_id=${Secrets.STRAVA_CLIENT_ID}`,
        `response_type=code`,
        `scope=view_private`,
        `approval_prompt=force`,
        `redirect_uri=${this.oauthRedirectUri}`
      ].join('&')
  }
  set accessToken(token) {
    this.api.setHeaders('Authorization', `Bearer ${token}`)
  }
  handleOauthRedirectUrl(url, callback = () => {}) {
    if (!url.startsWith(this.oauthRedirectUri)) {
      return false
    }
    if (url.indexOf('error=access_denied') > -1) {
      return false
    }
    const regex = /&code=(\w+)/g
    const match = regex.exec(url)
    if (!match) {
      return false
    }
    const code = match[1]

    // Token exchange
    axios.post(`${this.baseUrl}/oauth/token`, {
      client_id:     Secrets.STRAVA_CLIENT_ID,
      client_secret: Secrets.STRAVA_CLIENT_SECRET,
      code,
    }).then((response) => {
      this.accessToken = response.data.access_token
      this.userProfile = response.data.athlete
      AsyncStorage.setItem('@Stravels:stravaApiData', JSON.stringify(this.saveState()))
      callback()
    })
    return true
  }
  logout () {
    const url = `${this.baseUrl}/oauth/deauthorize`
    const response = axios.post(url, null, {
      headers: { ...this.authHeaders }
    })
  }

  // API Consumption --

  async getAthlete (id = null) {
    // null means self
    const path = id === null ? '/athlete' : `/athletes/${id}`
    const response = await this.api.get(path)
    this._analyzeUsage(response)
    return response.data
  }
  async getActivities () {
    const url = `${this.apiRoot}/activities`
    const response = await this.api.get('/activities')
    this._analyzeUsage(response)
    return response.data
  }

  // Persistence --

  saveState() {
    return {
      token: this.token,
      user: this.userProfile
    }
  }
  loadState(state) {
    this.token = state.token
    this.userProfile = state.user
  }

  // Private --

  _analyzeUsage (response) {
    const extract = (header) => response.headers[header].split(',').map((x) => parseInt(x))
    const limits = extract('X-RateLimit-Limit')
    const usages = extract('X-RateLimit-Usage')
    this.usage.short = usages[0] / limits[0]
    this.usage.long  = usages[1] / limits[1]
  }
}

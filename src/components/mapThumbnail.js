// Structure
import React, { Component } from 'react'
import ProgressiveImage from './core/progressiveImage'
import { getPolylineUrl } from '@stravels/services/mapboxStatic'
import { Images } from '@stravels/themes'

export default class MapThumbnail extends Component {
  render () {
    const { width, height } = this.props.style
    const uri = getPolylineUrl(this.props.polyline, {
      width,
      height,
      ...this.props.options
    })
    return (
      <ProgressiveImage
        style={this.props.style}
        source={{ uri: uri }}
        placeholder={Images.placeholder}
      />
    )
  }
}
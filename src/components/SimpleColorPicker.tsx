import React from 'react'
import { CompactPicker, SketchPicker } from 'react-color'
import styled from '@emotion/styled'

function SimpleColorPicker() {
  const [color, setColor] = React.useState('rgba(241, 112, 19, 1)')
  const [displayColorPicker, setDisplayColorPicker] = React.useState(false)

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const handleClose = () => {
    setDisplayColorPicker(false)
  }

  const handleChange = (color: any) => {
    setColor(`rgba(${ color.rgb.r }, ${ color.rgb.g }, ${ color.rgb.b }, ${ color.rgb.a })`)
  }

  return (
    <>
      <Swatch onClick={ handleClick }>
        <StyleColor color={ color } /></Swatch>
      { displayColorPicker ? <StylePopover>
        <StyleCover onClick={ handleClose } />
        <CompactPicker color={ color } onChange={ handleChange } />
      </StylePopover> : null }
    </>
  )
}

const StyleColor = styled.div`
  width: 16px;
  height: 14px;
  border-radius: 2px;
  background: ${ props => props.color };
`

const Swatch = styled.div`
  display: inline-block;
  padding: 1px;
  top: 4px;
  left: 4px;
  position: relative;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);
  cursor: pointer;
`

const StylePopover = styled.div`
  position: absolute;
  z-index: 2;
`

const StyleCover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export default SimpleColorPicker

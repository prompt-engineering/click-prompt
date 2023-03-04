import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
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

  const styles = reactCSS({
    'default': {
      color: {
        width: '16px',
        height: '14px',
        borderRadius: '2px',
        background: color
      },
      swatch: {
        display: 'inline-block',
        padding: '5px',
        top: '4px',
        left: '4px',
        position: 'relative',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        cursor: 'pointer'
      }
    }
  })

  return (
    <>
      {/*@ts-ignore*/}
      <div style={ styles.swatch } onClick={ handleClick }>
        <div style={ styles.color } />
      </div>
      { displayColorPicker ? <StylePopover>
        <StyleCover onClick={ handleClose } />
        <SketchPicker color={ color } onChange={ handleChange } />
      </StylePopover> : null }
    </>
  )
}

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

import React from 'react'
import Calendario from '../../components/Calendario/Calendario'
import Docs from '../../components/Documentos/Docs'
import Meet from '../../components/Reuniao/Meet'
// import GoogleDrivePicker from '../../components/Drive/GoogleDrivePicker'

const Ferramentas = () => {
  return (
    <div className='vivo'>
        <Calendario/>
        <Docs/>
        <Meet/>
        {/* <GoogleDrivePicker/> */}
    </div>
  )
}

export default Ferramentas
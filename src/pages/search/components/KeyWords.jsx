import React from 'react'
import Stack from '@mui/material/Stack'

function KeyWords() {
    const keywords = ['ბუნება', 'ტყე', 'სახლი', 'ცხოველები', 'ადამიანი', 'ნახატი', 'რენდერი', 'მანქანა', 'ტელევიზია', 'მაღაზია', 'ინტერიერი']
    return (
        <>
            <Stack direction={'row'} gap={'10px'}>
                {keywords.map((item) => {
                    return (
                        <>
                            <div className='keyword-item'>{item}</div>
                        </>
                    )
                })}
            </Stack>
        </>
    )
}

export default KeyWords
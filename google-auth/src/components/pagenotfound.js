import React from 'react'
import imageUrl from './../assets/image/page_not_found.svg'
export default function pagenotfound() {
    return (
        <>
            <div style={{paddingTop:"4rem",display:'flex',justifyContent:'center'}} >
                <img src={imageUrl} alt="404image"/>
            </div>
        </>
    )
}

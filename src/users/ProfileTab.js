import React, {Fragment} from 'react'

function ProfileTab({ active, name }) {
  return (
    <Fragment>
        <a className={`profile__tab ${active && 'profile__tab__active'}`}>{name}</a>
    </Fragment>
  )
}

export default ProfileTab
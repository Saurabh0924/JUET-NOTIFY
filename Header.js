import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../store';

function Header() {
  
    const dispatch = useDispatch();
    const isloggedIn = useSelector(state=>state.isloggedIn)
  return (
    <div className='nav'>
        <div className='title'> JUET NOTIFY </div>
          
          {isloggedIn && <div className='switch'>
            <ul>
                <Link to="/blogs" style={{textDecoration:'none'}}> <li className='li'> All Notes</li> </Link>
                <Link to="/myblogs" style={{textDecoration:'none'}}> <li className='li'> My Notes</li> </Link>
                <Link to="/blogs/add" style={{textDecoration:'none'}}> <li className='li'> Add Note</li> </Link>
            </ul>
        </div>}
        <div className='links'>
            
                 { !isloggedIn &&  <> <Link to="/auth" style={{textDecoration:'none'}} > <button> Signup </button> </Link>
                <Link to="/auth" style={{textDecoration:'none'}}> <button> Login </button> </Link></>}

                {isloggedIn && <Link to="/auth" style={{textDecoration:'none'}}><button onClick={()=>dispatch(authActions.logout())}>Logout </button></Link>}
           
        </div>
        
    </div>
  )
}

export default Header
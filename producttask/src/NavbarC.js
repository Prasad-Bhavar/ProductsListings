import React from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
    return ( 
        
            <nav class="navbar navbar-expand-lg bg-body-tertiary px-5">
            <div class="container-fluid">
                <Link class="navbar-brand" to={'/'}><img src='./media/logo.png' style={{height:'5rem'}} alt='logoIMG'></img></Link>
                
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <Link class="nav-link active" aria-current="page" to={'/'}>Products</Link>
                    </li>
                </ul>

                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
            </nav>
          
     );
}

export default Navbar;
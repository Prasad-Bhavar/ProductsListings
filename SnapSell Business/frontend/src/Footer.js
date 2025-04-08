import React from 'react';

function Footer() {
    return ( 
        <div className='container-fluid footer-nav ' style={{backgroundColor:'#d9d7d7', position:'sticky' }}>
            <div className='row px-5 py-5'>
                <div className='col-1'></div>
                <div className='col-4 '>
                    <h5 className='mb-5'>support</h5>
                    <p>Help</p>
                    <p>Advisories</p>
                    <p>Status</p>
                </div>
                <div className='col-3'>
                <h5 className='mb-5 '>Company</h5>
                    <p>About</p>
                    <p>Blog</p>
                    <p>Press</p>
                    </div>
                    <div className='col-4 '>
                    <h5 className='mb-3'>Term's &amp; Policies</h5>
                    <p>Policies</p>
                    <p>Code of Conduct</p>
                    <p>Privacy</p>
                    <br/>
                    </div><hr/>
                    <div className='contact-info text-center mt-5'>
                        <p className='text-muted'><b>E-mail:-</b>abc@gmail.com</p>
                        <p className='text-muted'>street no:121, nashik road,Nahik, pincode-423202</p>
                    </div>
            </div>
        </div>
     );
}

export default Footer;
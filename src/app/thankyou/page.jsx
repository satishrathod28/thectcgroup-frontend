import React from 'react'
import Link from 'next/link'
const page = () => {
  return (
    <section className='thankyou-page section-padding'>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="thank-container text-center sec">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <h1 className='sec-head mt-4'>Thank you for contacting us</h1>
                        <p>We will get back to you soon.</p>
                        <Link href={'/'} className="main-btn center mt-4">
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default page
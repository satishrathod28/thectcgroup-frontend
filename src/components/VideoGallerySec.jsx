import React, { useState, useEffect } from 'react'
import VideoCard from './VideoCard'
import { Tab, Tabs, Modal, Form } from 'react-bootstrap'
import api from '@/axios/api'

const VideoGallerySec = ({document = false}) => {
    const [showModal, setShowModal] = useState(false)
    const [selectedDoc, setSelectedDoc] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        designation: ''
    })
    const [errors, setErrors] = useState({})
    const [galleryData, setGalleryData] = useState({
        videos: [],
        images: {},
        documents: []
    })

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await api.get('/gallery')
                const data = response.data

                // Organize data by type and category
                const organized = {
                    videos: data.filter(item => item.type === 'video') || [],
                    images: data.filter(item => item.type === 'image').reduce((acc, item) => {
                        if (!acc[item.category]) {
                            acc[item.category] = []
                        }
                        acc[item.category].push(item)
                        return acc
                    }, {}) || {},
                    documents: data.filter(item => item.type === 'pdf') || []
                }
                setGalleryData(organized)
            } catch (error) {
                console.error('Error fetching gallery:', error)
            }
        }

        fetchGallery()
    }, [])

    const handleDownload = (doc) => {
        setSelectedDoc(doc)
        setShowModal(true)
    }

    const validateForm = () => {
        const newErrors = {}
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = 'Invalid email address'
        }

        if (!formData.company.trim()) {
            newErrors.company = 'Company name is required'
        }

        if (!formData.designation.trim()) {
            newErrors.designation = 'Designation is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!validateForm()) {
            return
        }

        try {
            // Handle form submission to backend if needed
            await api.post('/download-request', formData)
            
            // Download file
            if(selectedDoc) {
                const link = document.createElement('a')
                link.href = selectedDoc.fileUrl
                link.download = selectedDoc.title
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }

            setShowModal(false)
            setFormData({
                name: '',
                email: '',
                company: '',
                designation: ''
            })
            setErrors({})
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    }

    return (
        <section className='sec video-gallery-sec'>
            <div className='container'>
                <div className='row mt-5'>
                {
                    !document ? (
                    <div className='col-12'>
                        <Tabs defaultActiveKey="videos" className="mb-4 cc-tabs">
                            <Tab eventKey="videos" title="Videos">
                                <div className='row row-gap-25'>
                                    {galleryData.videos.length > 0 ? (
                                        galleryData.videos.map((item, index) => (
                                            <div className='col-lg-3 col-12' key={index}>
                                                <VideoCard data={item} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className='col-12 text-center'>
                                            <p>No videos found</p>
                                        </div>
                                    )}
                                </div>
                            </Tab>

                            <Tab eventKey="photos" title="Photos">
                                <Tabs className="mb-4 cc-tabs">
                                    {Object.keys(galleryData.images).map((category, index) => (
                                        <Tab eventKey={category} title={category} key={index}>
                                            <div className='row row-gap-25'>
                                                {galleryData.images[category].length > 0 ? (
                                                    galleryData.images[category].map((photo, index) => (
                                                        <div className='col-lg-3 col-12' key={index}>
                                                            <div className="gal-img">
                                                                {photo.image && <img src={photo.image} alt={photo.title} className="img-fluid" />}
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className='col-12 text-center'>
                                                        <p>No photos found</p>
                                                    </div>
                                                )}
                                            </div>
                                        </Tab>
                                    ))}
                                </Tabs>
                            </Tab>
                        </Tabs>
                    </div>):
                    (
                        <div className='row row-gap-25'>
                            {galleryData.documents.length > 0 ? (
                                galleryData.documents.map((doc, index) => (
                                    <div className='col-lg-3 col-12' key={index}>
                                        <div className="pdf-card">
                                            <div className='icon'>
                                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M28 4H12C9.79086 4 8 5.79086 8 8V40C8 42.2091 9.79086 44 12 44H36C38.2091 44 40 42.2091 40 40V16L28 4Z" stroke="#0C76D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M28 4V16H40" stroke="#0C76D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M32 26H16" stroke="#0C76D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M32 34H16" stroke="#0C76D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M20 18H16" stroke="#0C76D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                            <h3>{doc.title}</h3>
                                            <button className='main-btn' onClick={() => handleDownload(doc?.image)}>
                                                <span>Download</span>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='col-12 text-center'>
                                    <p>No documents found</p>
                                </div>
                            )}
                        </div>
                    )
                }
                </div>
            </div>

            <Modal show={showModal} className='cc-modal' onHide={() => setShowModal(false)} centered>
                <Modal.Header >
                    <Modal.Title>Download Document</Modal.Title>
                    <button style={{border: '1px solid #0C76D8', borderRadius: '100px', background: 'transparent', padding: '5px', margin: 0, marginLeft: 'auto'}} className='close-btn' onClick={() => setShowModal(false)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="#0C76D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 6L18 18" stroke="#0C76D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 form-group">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3 form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3 form-group">
                            <Form.Label>Company</Form.Label>
                            <Form.Control 
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({...formData, company: e.target.value})}
                                isInvalid={!!errors.company}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.company}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3 form-group">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control 
                                type="text"
                                value={formData.designation}
                                onChange={(e) => setFormData({...formData, designation: e.target.value})}
                                isInvalid={!!errors.designation}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.designation}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <button className='main-btn' type="submit">
                            <span>Submit & Download</span>
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        </section>
    )
}

export default VideoGallerySec
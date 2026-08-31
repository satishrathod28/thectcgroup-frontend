import React from 'react'
import AeroBg from '@/images/aero-bg.jpg'
import { Tab, Nav } from 'react-bootstrap'
import Image from 'next/image'

const TabSection = ({data}) => {
  return (
    <section className="sec cus-tab-sec">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Tab.Container id="industry-tabs" defaultActiveKey={data[0]?.heading}>
                        <div className="row">
                            <div className="col-lg-4 col-12">
                                <div className="aero-tabs">
                                    <Nav variant="pills" className="flex-column">
                                        {
                                            data?.map((item, index) => (
                                                <Nav.Item key={index}>
                                                    <Nav.Link eventKey={item?.heading}>{item?.heading}</Nav.Link>
                                                </Nav.Item>
                                            ))
                                        }
                                    </Nav>
                                </div>
                            </div>
                            <div className="col-lg-8 col-12">           
                                <Tab.Content>
                                        {
                                            data?.map((item, index) => (
                                                <Tab.Pane eventKey={item?.heading} key={index}>
                                                    <div className="wr-wrap">
                                                        {
                                                            item?.image ?
                                                            <Image src={item?.image} width={500} height={500} alt="Aerospace Industry" className="tab-image" />
                                                            : ''
                                                        }
                                                        <div className="con">
                                                            <h3 dangerouslySetInnerHTML={{ __html: item?.heading }} />
                                                            <p className="para" dangerouslySetInnerHTML={{ __html: item?.description }} />
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                            ))
                                        }
                                </Tab.Content>
                            </div>
                        </div>
                    </Tab.Container>
                </div>
            </div>
        </div>
    </section>
  )
}

export default TabSection
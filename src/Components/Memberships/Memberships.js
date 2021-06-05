import { React, Component } from "react";
import { Container, Row, Col} from 'react-bootstrap'
import MembershipOption from "./MembershipOption";

export default class Memberships extends Component {

    vipPackage = ["Unrestricted 24/7 Access", "All Year Long", "No black out dates"]
    theWeekender = ["Live far but want to train at SBSC on the weekend?", "Skip the day pass fee and get access 24/7 from Friday at 4pm", "through Sunday at midnight!!!"]
    teamSBSC = ["TEAM SBSC is a private training group with access to", "TEAM SBSC Facebook group, weekly conjugate training", "programs, special Team SBSC only events, Exclusive", "merch, priority access to meet sign ups, access to", "trainers, and team leaders who will help you achieve your", "goals and guide you along your journey.", ]
    dayPass = ["CAN BE USED 1 TIME WITHIN 24 HOURS OF PURCHASE.", "Email instructions to follow with how to access the facility."]
    oneWeekPass = ["Expires 7 days from activation.", "Unlimited Access during open gym 24/7. Email", "instructions to follow for activation"]
    tenSessions = ["10 sessions to be used at any time!", "Get a $5 discount per session when you buy ahead!", "24/7 Access"]

    render(){
        return(
            <Container className="pb-5">
                <Row className="pt-5">
                    <Col>
                        <h1 className="h1 text-left" style={{color: "white"}}>Memberships</h1>
                        <h1 className="h5 text-left" style={{color: "white"}}>Select the right gym membership for you.</h1>
                    </Col>
                    <Col></Col>
                </Row>
                <Row className="pt-3" xs={1} md={1} lg={2}>
                    <Col className="my-2">
                        <MembershipOption name="V.I.P Package" price="99" link={'https://southbaystrength.gymmasteronline.com/portal/membership/66cfc3db7ef91ddd20a364533073763d'} description={this.vipPackage} />
                    </Col>
                    <Col className="my-2">
                        <MembershipOption name="The Weekender" price="48" link={'https://southbaystrength.gymmasteronline.com/portal/membership/7e9e4826adb7ac7eec84938146f28b1d'} description={this.theWeekender} />
                    </Col>
                </Row>
                <Row xs={1} md={1} lg={2}>
                    <Col className="my-3">
                        <MembershipOption name="Team SBSC" link={'https://app.acuityscheduling.com/catalog.php?owner=20933683&action=addCart&clear=1&id=1009449'} price="50" description={this.teamSBSC} />
                    </Col>
                    <Col className="my-3">
                        <MembershipOption name="Day Pass" link={'https://southbaystrength.gymmasteronline.com/portal/membership/c816d2d08c4211f296fb0a8085386043'} price="20" description={this.dayPass} />
                    </Col>
                </Row>
                <Row xs={1} md={1} lg={2}>
                    <Col className="my-3">
                        <MembershipOption name="1 Week Pass" link={'https://southbaystrength.gymmasteronline.com/portal/membership/f89d7cb01f6eeffa28bfdc573ee8023a'} price="50" description={this.oneWeekPass} />
                    </Col>
                    <Col className="my-3">
                        <MembershipOption name="10 Sessions" price="150" link={'https://southbaystrength.gymmasteronline.com/portal/membership/85c61b44f076b580c15b9d5cb178ed69'} description={this.tenSessions} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

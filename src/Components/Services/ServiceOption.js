import { React, Component } from "react";
import {Jumbotron, Container, Card, Row, Col} from 'react-bootstrap'

export default class ServiceOption extends Component {
    render(){
        return(
            <Container>
                {this.props.name}
            </Container>
        )
    }
}
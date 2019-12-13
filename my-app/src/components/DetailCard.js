import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardImg, CardTitle, CardHeader, CardSubtitle, CardBody, Button, Container, Row, Col, CardText } from 'reactstrap';
import NavigationBar from './NavigationBar';
import { CardsApi } from '../server';
import Loading from './Loading';






class DetailCard extends Component{
    constructor(props){
        super(props);
        this.state = {
          card: [],
          loading: true
        };
        this.cardsApi = new CardsApi();
    }

  componentDidMount(){
    this.cardsApi.cardsCardIdGet(this.props.match.params.cardID).then((response)=>{
      console.log("r", response.card)
      this.setState({card: response.card, loading:false})

    })
  }

  render() {
    if(this.state.loading){
      return(
        <Container>
          <NavigationBar/>
          <Loading/>
        </Container>
      )
    } else {
      return (
        <Container>
            <NavigationBar/>
            <Container className="d-flex justify-content-center">
              <Row>
                <Col xs="auto">
                  <Card style={{ width: '20em', height: '20em'}}>
                    <CardImg src={this.state.card.imageUrlHiRes} alt="Card image cap" />
                  </Card>
                </Col>
                <Col xs="auto">
                  <Card style={{ width: '20em', height: '30em'}}>
                    <CardHeader ><h1>{this.state.card.name}</h1></CardHeader>
                    <CardTitle><h2>Infos</h2></CardTitle>
                    {this.state.card.attacks ? this.state.card.attacks.map((attack, index) =>(
                      <Container key={index}>
                        <h2>{attack.name}</h2>
                        <p style={{}}> {attack.text || "No description found"}</p>
                        <p>Damage: {attack.damage}</p>
                      </Container>
                    )) 
                    : this.state.card.text ? 
                    this.state.card.text.map((text, index) =>(
                      <p key={text}>{text}</p>
                    ))
                    :<p>None</p>}
                  </Card>
                </Col>
              </Row>
            </Container>
        </Container>
      );
    }
  }
}

export default (DetailCard);

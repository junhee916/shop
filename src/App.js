/* eslint-disable */
import React, { useState, lazy, Suspense } from 'react';
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap'
import './App.css';
import shoesData from './data'
let DetailView = lazy( ()=>{ return import('./Detail.js') } );
import { Link, Route, Switch } from 'react-router-dom'
import axios from 'axios';
import Cart from './Cart'
function App() {
  let [shoes, changeShoes] = useState(shoesData)
  let [wait, changeWait] = useState(true)
  let [amount, changeAmount] = useState([10, 11, 12])
  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Shoes Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <div className='Jumbotron'>
            <h1>20% 할인</h1>
            <p>내용 확인</p>
            <p>
              <input type="button" value="button"></input>
            </p>
          </div>
          <div className='container'>
            <div className='row'>
              {
                shoes.map((rstShoes, i) => {
                  return (
                    <Card shoes={shoes[i]} image={i} key={i} />
                  )
                })
              }
            </div>
            <button className='btn btn-primary' onClick={() => {
              {
                wait === true ? <WaitLoading /> : null
              }
              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result) => {
                  changeWait(false)
                  changeShoes([...shoes, ...result["data"]])
                })
                .catch((err) => { console.log(err) })
            }}>더보기</button>
          </div>
        </Route>
        <Route path="/detail/:id">
          <Suspense fallback={<div>로딩중이예요</div>}>
            <DetailView shoes={shoes} amount={amount} changeAmount={changeAmount} />
          </Suspense>
        </Route>
        <Route path="/cart">
          <Cart></Cart>
        </Route>
      </Switch>

    </div>
  );
}

function Card(props) {
  return (
    <div className='col-md-4'>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.image + 1) + '.jpg'} width="100%" />
      <h4>{props.shoes["title"]}</h4>
      <p>{props.shoes["content"]} & {props.shoes["price"]}</p>
    </div>
  )
}

function WaitLoading() {
  return (
    <div>
      <h2>wait loading</h2>
    </div>
  )
}

export default App;

import React, { useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom'
import {connect} from 'react-redux'

function DetailView(props) {

    let [inputValue, changeInputValue] = useState('');
    useEffect(() => {
        let timmer = setTimeout(() => {
            changeModal(false)
        }, 2000);
        return () => { clearTimeout(timmer) }
    }, []);
    let { id } = useParams();
    let history = useHistory();
    let searchShoes = props.shoes.find(function (rstShoes) {
        return rstShoes.id == id
    })
    let [modal, changeModal] = useState(true)

    return (
        <div className="container">
            {inputValue}
            <input onChange={(e) => { changeInputValue(e.target.value) }} />
            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes' + (Number(id) + 1) + '.jpg'} width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{searchShoes["title"]}</h4>
                    <p>{searchShoes["content"]}</p>
                    <p>{searchShoes["price"]}</p>
                    <Info amount={props.amount}></Info>
                    <button className="btn btn-danger" onClick={() => {
                        let newArray = [...props.amount]
                        console.log('data array 확인: ', newArray)
                        newArray[0] = Number(newArray[0]) - 1
                        console.log('첫번째 component 확인: ', newArray[0])
                        props.changeAmount(newArray)
                        props.dispatch({type :'항목추가', payload:{id:2, name:'새로운상품', quan : 1}})
                        history.push('/cart')
                    }}>주문하기</button>
                    <button className="btn btn-danger" onClick={() => { history.goBack(); }}>뒤로가기</button>
                </div>
            </div>
            {
                modal === true ? <Modal /> : null
            }
        </div>
    )
}
function Info(props) {
    return (
        <div>
            <p>재고: {props.amount[0]}</p>
        </div>
    )
}

function Modal() {
    return (
        <div>
            Modal check
        </div>
    )
}

function changePropsState(state){
    console.log(state)
    return {
        state : state.reducer,
        openAlert : state.reducer2
    }
}

export default connect(changePropsState)(DetailView)
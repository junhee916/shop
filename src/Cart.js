import React from "react";
import {Table} from 'react-bootstrap'
import {connect} from 'react-redux'
function Cart(props){

    function closeAlert(){
        props.dispatch({type:"closeAlert"})
    }
    return(
        <div>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.state.map((rstState, i) => {
                            return(
                                <tr>
                                    <td>{rstState["id"]}</td>
                                    <td>{rstState["name"]}</td>
                                    <td>{rstState["quan"]}</td>
                                    <button onClick={() => {props.dispatch({type:'수량증가', payload : {name : 'kim'}})}}>+</button>
                                    <button onClick={() => {props.dispatch({type:'수량감소'})}}>-</button>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            {
                props.openAlert === true?
                <div className="my-alert2">
                    <p>지금 구매하시면 신규할인 20%</p>
                    <button onClick={closeAlert}>닫기</button>
                </div>
                :null
            }
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

export default connect(changePropsState)(Cart)
import axios from 'axios';

const testAxios = axios.get('https://randomuser.me/api/?nat=tw&results=10');

export function testAction(){
    return (dispatch) => {
        testAxios.then(res=>{
            dispatch({
                type    : "TEST_ACTION",
                payload : res['data']['results']
            })
        })
    }
}
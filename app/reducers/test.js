export function test(
    state=[],
    action
){
    switch (action.type) {
        case "TEST_ACTION":
            state = action.payload 
            break;
    
        default:
            state
            break;
    }

    return state;
}
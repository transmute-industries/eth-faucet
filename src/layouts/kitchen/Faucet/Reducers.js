

const initialState = {
    faucets: null
}

const faucetReducer = (state = initialState, action) => {
    const { faucets } = action.payload;
    const handlers = {
        [INCREMENT]: () => state + amount,
        [DECREMENT]: () => state - amount
    };
    return handlers[action.type](amount);
};

export default faucetReducer;

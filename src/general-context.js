function generalContext() {
    return generalContext.context;
}

generalContext.attach = (context) => {
    generalContext.context = context;
}
generalContext.clear = () => {
    delete generalContext.context;
}

module.exports = {
    generalContext,
}
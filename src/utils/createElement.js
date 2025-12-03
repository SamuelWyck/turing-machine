function createElement(elementType, id=null, ...classes) {
    const element = document.createElement(elementType);
    for (let classStr of classes) {
        element.classList.add(classStr);
    }
    if (id) {
        element.id = id;
    }
    return element;
};



module.exports = createElement;
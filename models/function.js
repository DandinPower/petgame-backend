const AddAttributeToList = (list, trait, value) => {
    let temp = {
        "trait_type": trait,
        "value": value
    }
    list.push(temp)
    return list
}

module.exports = { AddAttributeToList }
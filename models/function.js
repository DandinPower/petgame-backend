//將attribute加進list
const AddAttributeToList = (_list, _trait, _value) => {
    let temp = {
        "trait_type": _trait,
        "value": _value
    }
    _list.push(temp)
    return _list
}

//根據給定的itemList來回傳attributeList
const GetAttributeList = (_itemList) => {
    let attributesList = []
    attributesList = AddAttributeToList(attributesList, 'hand', _itemList[5])
    attributesList = AddAttributeToList(attributesList, 'hat', _itemList[4])
    attributesList = AddAttributeToList(attributesList, 'glasses', _itemList[3])
    attributesList = AddAttributeToList(attributesList, 'cloth', _itemList[2])
    attributesList = AddAttributeToList(attributesList, 'pant', _itemList[1])
    attributesList = AddAttributeToList(attributesList, 'pet', _itemList[0])
    return attributesList
}

//delay function
const Wait = (_ms) => {
    return new Promise(resolve => setTimeout(() => resolve(), _ms));
};

//隨機產生一組字串
const GetRandomName = () => {
    var randomString = crypto.randomBytes(32).toString('hex').substr(0, 8)
    return randomString
}

//隨機的從list中挑出一個object
const GetRandomFromList = (_list) => {
    return _list[Math.floor(Math.random() * _list.length)];
}

//隨機的取出一隻寵物的物件配對
const GetRandomItemList = () => {
    var handList = ['hand_0', 'hand_1']
    var hatList = ['hat_0', 'hat_1']
    var glassesList = ['glasses_0', 'glasses_1']
    var clothList = ['cloth_0', 'cloth_1']
    var pantList = ['pant_0', 'pant_1']
    var petList = ['pet_0', 'pet_1']
    return [GetRandomFromList(petList), GetRandomFromList(pantList), GetRandomFromList(clothList), GetRandomFromList(glassesList), GetRandomFromList(hatList), GetRandomFromList(handList)]
}

//隨機的取出一隻寵物的物件配對
const GetRandomItemListWithNone = () => {
    var handList = ['hand_0', 'hand_1', 'none']
    var hatList = ['hat_0', 'hat_1', 'none']
    var glassesList = ['glasses_0', 'glasses_1', 'none']
    var clothList = ['cloth_0', 'cloth_1', 'none']
    var pantList = ['pant_0', 'pant_1', 'none']
    var petList = ['pet_0', 'pet_1']
    return [GetRandomFromList(petList), GetRandomFromList(pantList), GetRandomFromList(clothList), GetRandomFromList(glassesList), GetRandomFromList(hatList), GetRandomFromList(handList)]
}

module.exports = { AddAttributeToList, GetAttributeList, GetRandomName, GetRandomFromList, GetRandomItemList, Wait, GetRandomItemListWithNone }
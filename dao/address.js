const Address = require('../models/address');

const AddressDao = {
    getAllAddress : addressObj => {
        return Address.find(addressObj);
    },
    getAddress : addressObj => {
        return Address.findOne(addressObj);
    },    
    saveAddress : addressObj => {
        const newAddress = new Address(addressObj);
        return newAddress.save();
    },
    updateAddress : addressObj => {
        return addressObj.save();
    },
    deleteAddress : addressObj => {
        return Address.findOneAndDelete(addressObj);
    }
};

module.exports = AddressDao;
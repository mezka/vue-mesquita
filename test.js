const vm = {
    presupuestadorProducts: [{ "productquantity": 1, "productid": 1, "productcategory": "PUERTAS CORTAFUEGO", "productname": "PUERTA RF30 0700X2000MM PL, 0800X2050 MT", "productaccessories": [{ "productid": 73, "productname": "BARRAL ANTIPANICO SIMPLE PUSH", "productprice": 1405, "productquantity": 1 }, { "productid": 74, "productname": "BARRAL ANTIPANICO SIMPLE C/ FALLEBA", "productprice": 3035, "productquantity": 1 }, { "productid": 75, "productname": "BARRAL ANIPANICO SIMPLE PUSH C/ MICRO", "productprice": 2190, "productquantity": 1 }, { "productid": 76, "productname": "BARRAL ANTIPANICO SIMPLE PUSH C/FALLEBA C/MICRO", "productprice": 3635, "productquantity": 1 }, { "productid": 77, "productname": "BARRAL ANTIPANICO TOUCH (TECLA)", "productprice": 2135, "productquantity": 1 }, { "productid": 78, "productname": "POMO EXTERIOR P/ ANTIPANICO C/LLAVE NEGRO", "productprice": 2920, "productquantity": 1 }, { "productid": 79, "productname": "CIERRAPUERTA HIDRAULICO", "productprice": 965, "productquantity": 1 }], "productprice": 6103, "productselectedaccessories": [{ "productid": 73, "productname": "BARRAL ANTIPANICO SIMPLE PUSH", "productprice": 1405, "productquantity": 1, "productdiscount": 0 }], "productdiscount": 0 }],

    presupuestoSubtotal() {
        return this.presupuestadorProducts.reduce((acum, presupuestadorProduct) => {

            return acum + !this.isEmptyObject(presupuestadorProduct) ? this.calculateTotalBundlePrice(presupuestadorProduct) : 0;

        }, 0);
    },

    presupuestoSubtotalNoDiscount() {
        return this.presupuestoSubtotal() - this.presupuestoDiscount();
    },

    presupuestoDiscount() {
        return this.presupuestadorProducts.reduce((acum, presupuestadorProduct) => {
            return acum + !this.isEmptyObject(presupuestadorProduct) ? this.calculateTotalBundleDiscount(presupuestadorProduct) : 0;
        }, 0);
    },

    presupuestoIVA() {
        return this.presupuestoSubtotal() * (this.impuesto / 100);
    },

    presupuestoTotal() {
        return this.presupuestoSubtotal() * (1 + (this.impuesto / 100));
    },

    calculateTotalBundlePrice(product) {
        //  para todas las unidades

        return product.productprice * product.productquantity * (1 - product.productdiscount / 100) + product.productselectedaccessories.reduce((acum, productAccessory) => {

            return acum + !this.isEmptyObject(productAccessory) ? productAccessory.productprice * (1 - productAccessory.productdiscount / 100) * product.productquantity : 0;
        }, 0);
    },

    calculateTotalBundleDiscount(product) {

        return product.productprice * product.productquantity * product.productdiscount +
            product.productselectedaccessories.reduce((acum, productAccessory) => {

                return acum + !this.isEmptyObject(productAccessory) ? productAccessory.productprice * (1 - productAccessory.productdiscount / 100) * product.productquantity : 0;
            }, 0);
    },

    calculateBundlePrice(product) {

        return product.productprice * product.productdiscount + product.productselectedaccessories.reduce((acum, productAccessory) => {

            return acum + !this.isEmptyObject(productAccessory) ? productAccessory.productprice * (1 - productAccessory.productdiscount / 100) : 0;
        }, 0);
    },

    calculateBundleDiscount(product) {

        return product.productprice * product.productdiscount + product.productselectedaccessories.reduce((acum, productAccessory) => {
            return acum + !this.isEmptyObject(productAccessory) ? productAccessory.productprice * productAccessory.productdiscount : 0;
        }, 0);
    },

    calculateProductDiscountedPrice(product) {

        return product.productprice * (1 - (product.productdiscount / 100));
    },

    calculateProductDiscount(product) {
        return product.productprice * ((product.productdiscount / 100));
    },

    isEmptyObject(obj) {
        return Object.keys(obj).length === 0;
    },
};

console.log(vm.presupuestoSubtotal());
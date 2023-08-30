/*eslint-disable*/

export class SuccessResponsePaymentDTO {
    constructor(paymentMethod, billingAddress ) {
        this.paymentMehod = paymentMethod;
        this.billingAddress = billingAddress;
    }

    paymentMehod: string;
    billingAddress: string;
}
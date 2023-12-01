import { isValidMobilePhone } from '@brazilian-utils/brazilian-utils';

export enum ValidatorType {
    MOBILE_PHONE,
    BIRTH_DATE_GRATER_THAN_18,
}

export default function Validator(validator: ValidatorType, value?: string): boolean {
    switch (validator) {
        case ValidatorType.MOBILE_PHONE:
            return (value && isValidMobilePhone(value)) || false;
        default:
            throw Error(`Validator ${validator} not implemented`);
    }
}

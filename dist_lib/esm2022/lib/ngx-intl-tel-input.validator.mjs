import { PhoneNumberUtil } from 'google-libphonenumber';
export const phoneNumberValidator = (ngxIntlTelInputComponent, ngxIntlTelModelAdapter) => {
    return (control) => {
        if (!ngxIntlTelInputComponent.phoneValidation) {
            return null;
        }
        const error = { invalidPhoneNumber: 'Phone number is invalid' };
        const stringPhoneNumber = ngxIntlTelModelAdapter.getValidationValue(control.value);
        let phoneNumber;
        try {
            phoneNumber = PhoneNumberUtil.getInstance().parse(stringPhoneNumber);
        }
        catch (e) { }
        if (stringPhoneNumber) {
            if (phoneNumber) {
                const phoneUtil = PhoneNumberUtil.getInstance();
                if (!phoneUtil.isValidNumberForRegion(phoneNumber, phoneUtil.getRegionCodeForNumber(phoneNumber))) {
                    return error;
                }
            }
            else {
                return error;
            }
        }
        return null;
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1pbnRsLXRlbC1pbnB1dC9zcmMvbGliL25neC1pbnRsLXRlbC1pbnB1dC52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFjLGVBQWUsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBSW5FLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLENBQUMsd0JBQW1ELEVBQ25ELHNCQUF1RCxFQUFFLEVBQUU7SUFDOUYsT0FBTyxDQUFDLE9BQW9CLEVBQUUsRUFBRTtRQUM5QixJQUFJLENBQUMsd0JBQXdCLENBQUMsZUFBZSxFQUFFO1lBQzdDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxNQUFNLEtBQUssR0FBRyxFQUFDLGtCQUFrQixFQUFFLHlCQUF5QixFQUFDLENBQUM7UUFDOUQsTUFBTSxpQkFBaUIsR0FBVyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0YsSUFBSSxXQUF3QixDQUFDO1FBRTdCLElBQUk7WUFDRixXQUFXLEdBQUcsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3RFO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtRQUVkLElBQUksaUJBQWlCLEVBQUU7WUFDckIsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRTtvQkFDakcsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7YUFDRjtpQkFBTTtnQkFDTCxPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Rm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtQaG9uZU51bWJlciwgUGhvbmVOdW1iZXJVdGlsfSBmcm9tICdnb29nbGUtbGlicGhvbmVudW1iZXInO1xyXG5pbXBvcnQge0lOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnR9IGZyb20gJy4vaW50ZXJmYWNlcy9uZ3gtaW50bC10ZWwtaW5wdXQtY29tcG9uZW50LmludGVyZmFjZSc7XHJcbmltcG9ydCB7Tmd4SW50bFRlbE1vZGVsQWRhcHRlcn0gZnJvbSAnLi9zZXJ2aWNlcy9uZ3gtaW50bC10ZWwtbW9kZWwtYWRhcHRlcic7XHJcblxyXG5leHBvcnQgY29uc3QgcGhvbmVOdW1iZXJWYWxpZGF0b3IgPSAobmd4SW50bFRlbElucHV0Q29tcG9uZW50OiBJTmd4SW50bFRlbElucHV0Q29tcG9uZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmd4SW50bFRlbE1vZGVsQWRhcHRlcjogTmd4SW50bFRlbE1vZGVsQWRhcHRlcjx1bmtub3duPikgPT4ge1xyXG4gIHJldHVybiAoY29udHJvbDogRm9ybUNvbnRyb2wpID0+IHtcclxuICAgIGlmICghbmd4SW50bFRlbElucHV0Q29tcG9uZW50LnBob25lVmFsaWRhdGlvbikge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlcnJvciA9IHtpbnZhbGlkUGhvbmVOdW1iZXI6ICdQaG9uZSBudW1iZXIgaXMgaW52YWxpZCd9O1xyXG4gICAgY29uc3Qgc3RyaW5nUGhvbmVOdW1iZXI6IHN0cmluZyA9IG5neEludGxUZWxNb2RlbEFkYXB0ZXIuZ2V0VmFsaWRhdGlvblZhbHVlKGNvbnRyb2wudmFsdWUpO1xyXG4gICAgbGV0IHBob25lTnVtYmVyOiBQaG9uZU51bWJlcjtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBwaG9uZU51bWJlciA9IFBob25lTnVtYmVyVXRpbC5nZXRJbnN0YW5jZSgpLnBhcnNlKHN0cmluZ1Bob25lTnVtYmVyKTtcclxuICAgIH0gY2F0Y2ggKGUpIHt9XHJcblxyXG4gICAgaWYgKHN0cmluZ1Bob25lTnVtYmVyKSB7XHJcbiAgICAgIGlmIChwaG9uZU51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHBob25lVXRpbCA9IFBob25lTnVtYmVyVXRpbC5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmICghcGhvbmVVdGlsLmlzVmFsaWROdW1iZXJGb3JSZWdpb24ocGhvbmVOdW1iZXIsIHBob25lVXRpbC5nZXRSZWdpb25Db2RlRm9yTnVtYmVyKHBob25lTnVtYmVyKSkpIHtcclxuICAgICAgICAgIHJldHVybiBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfTtcclxufTtcclxuIl19
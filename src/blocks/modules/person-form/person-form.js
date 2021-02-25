import $ from 'jquery'
import ComponentBase from '%classes%/ComponentBase'

export default class PersonForm extends ComponentBase {
    constructor(selector = '.js-person-form') {
        super(selector)
    }

    init() {
        this.classLink = `${this.selector}-link`
        this.classPassword = `${this.selector}-password`
        this.classChangePassword = `${this.selector}-change-password`

        $(this.classLink).on('click', () => {
            console.log('test')
            $(this.classPassword).prop('disabled', true)
            $(this.classChangePassword).prop('disabled', false)
        })
    }
}

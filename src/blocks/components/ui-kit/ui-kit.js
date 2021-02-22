import $ from 'jquery'
import ComponentBase from '%classes%/ComponentBase'
import Select from '%components%/select/select'

class UiKit {
    constructor() {
        this.init()
    }
    init() {
        new Field()
        new Dropdown()
        new Select()
        new Select('.js-select-round', 'round', {
            minimumResultsForSearch: Infinity,
            addFooter: false,
            closeOnSelect: true,
            allowClear: false
        })
    }
}

export const selectorField = '.js-field'

class Field extends ComponentBase {
    constructor(selector = selectorField) {
        super(selector)
    }

    init() {
        this.fieldInput = `${this.selector}-input`

        $(document)
            .find(this.selector)
            .each((i, elem) => {
                const fieldInput = $(elem).find(this.fieldInput)
                this.initEvents(fieldInput)
            })
    }

    initEvents(elem) {
        const val = $(elem).val()
        if (val && val.length) {
            $(elem).closest(this.selector).addClass('active')
        }

        $(elem).on('focus', e => {
            const fieldInput = $(e.target)
            const val = fieldInput.val()
            if (!val && fieldInput.is('select')) {
                fieldInput.select2('open')
            }
            fieldInput.closest(this.selector).addClass('active')
        })

        $(elem).on('blur', e => {
            const fieldInput = $(e.target)
            const val = fieldInput.val()
            if (!val) {
                fieldInput.closest(this.selector).removeClass('active')
            }
        })
    }
}

export const selectorDropdown = '.js-dropdown'

class Dropdown extends ComponentBase {
    constructor(selector = selectorDropdown) {
        super(selector)
    }

    init() {
        this.classSelect = `${this.selector}-select`
        this.classBox = `${this.selector}-box`

        $(document)
            .find(this.selector)
            .each((_, elem) => this.initEvents(elem))
    }

    initEvents(elem) {
        const select = $(elem).find(this.classSelect)

        select.on('click', ({ target }) => {
            $(this.selector).removeClass('open')
            const dd = $(target).closest(this.selector)
            dd.toggleClass('open')
        })
        $(document).on('click', ({ target }) => {
            if (!$(target).closest(this.selector).length) {
                $(this.selector).removeClass('open')
            }
        })
    }
}

export default UiKit

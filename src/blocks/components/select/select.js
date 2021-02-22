import $ from 'jquery'
// eslint-disable-next-line no-unused-vars
import select2 from 'select2'
import 'select2/dist/js/i18n/ru'
// Initialise imported function as jQuery function
$.fn.select2.defaults.set('width', '100%')

export default class Select {
    constructor(selector = '.js-select', theme = 'default', options = {}) {
        this.selector = selector
        this.theme = theme

        this.baseOptions = {
            // minimumResultsForSearch: Infinity,
            theme: this.theme,
            width: '100%',
            dropdownAutoWidth: true,
            language: 'ru',
            closeOnSelect: false,
            placeholder: 'Выбрать',
            allowHtml: true,
            allowClear: true,
            tags: false,
            addFooter: true
        }

        this.options = $.extend(this.baseOptions, options)

        this.init()
    }

    init() {
        $(this.selector).each((_, el) => {
            $(el).select2(this.options)

            if (this.options.addFooter) {
                this.addFooterWithButton(el)
            }
        })
    }

    addFooterWithButton(el) {
        $(el).on('select2:open', function () {
            let select = $(this).data('select2')
            if (!$('.select2-link').length) {
                select.$results
                    .parents('.select2-results')
                    .append(
                        '<div class="select2-link select2__footer"><button class="button button--primary" type="submit">Применить</button></div>'
                    )
                    .on('click', function (b) {
                        console.log(b)
                    })
            }
        })
    }
}

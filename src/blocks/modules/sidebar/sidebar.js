import ComponentBase from '%classes%/ComponentBase'

export default class Sidebar extends ComponentBase {
    constructor(selector = '.js-sidebar') {
        super(selector)
    }

    init() {
        const menuClass = `${this.selector}-menu`
        const blockClass = `${this.selector}-block`
        const wrapClass = `${this.selector}-wrap`

        const linkClass = `${this.selector}-link`
        const listClass = `${this.selector}-list`

        $(menuClass).on('click', () => {
            $(wrapClass).toggleClass('open')
        })
        $(document).on('click', ({ target }) => {
            if (
                !$(target).closest(blockClass).length &&
                !$(target).closest(menuClass).length
            ) {
                $(wrapClass).removeClass('open')
            }
        })

        $(linkClass).on('click', ({ target }) => {
            const link = $(target).closest(linkClass)
            link.toggleClass('open')
            link.siblings(listClass).slideToggle()
        })
    }
}

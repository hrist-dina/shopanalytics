import $ from 'jquery'
import noUiSlider from 'nouislider'
import wNumb from 'wnumb'

export default class PriceSlider {
    constructor(selector = '.js-price-slider', options = {}) {
        this.selector = selector
        this.priceSlider = `${this.selector}-drag`
        this.priceMin = `${this.selector}-min`
        this.priceMax = `${this.selector}-max`
        this.suffix = options.suffix ? options.suffix : ''
        this.titles = options.titles ? options.titles : []

        this.init()
    }

    init() {
        if (!this.selector) {
            return
        }
        $(this.selector).each((i, item) => {
            const el = $(item)
            this.create(el)
            this.update(el)
            this.onChange(el)
        })
    }

    create(el) {
        const slider = el.find(this.priceSlider)
        const step = slider.data('step')
        const min = el.find(this.priceMin)
        const max = el.find(this.priceMax)
        noUiSlider.create(slider.get(0), {
            start: [min?.val(), max?.val()],
            step: step ? step : 10,
            behaviour: 'drag',
            connect: true,
            range: {
                min: min?.data('min'),
                max: max?.data('max')
            },
            format: wNumb({
                decimals: 0,
                thousand: ' '
            })
        })
    }

    update(el) {
        const inputs = [el.find(this.priceMin), el.find(this.priceMax)]
        const item = el.find(this.priceSlider).get(0)
        item.noUiSlider.on('update', (values, handle) => {
            inputs[handle].val(this.getValue(values[handle]))
        })
        item.noUiSlider.on('end', () => {
            $('[data-brief-step="2"] [name=min]').trigger('change')
        })
    }

    onChange(el) {
        const item = el.find(this.priceSlider).get(0)

        const min = el.find(this.priceMin)
        min?.on('change', function () {
            item.noUiSlider.set([this.value, null])
        })
        const max = el.find(this.priceMax)
        max?.on('change', function () {
            item.noUiSlider.set([null, this.value])
        })
    }

    getValue(number) {
        return `${number}`
    }
}

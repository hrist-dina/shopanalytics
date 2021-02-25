import $ from 'jquery'
import UiKit from '%components%/ui-kit/ui-kit'
import PriceSlider from '%components%/price-slider/price-slider'
import PersonForm from '%modules%/person-form/person-form'

$(() => {
    new UiKit()
    new PriceSlider()
    new PersonForm()
})

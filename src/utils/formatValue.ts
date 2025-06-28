
const formatValue = Intl.NumberFormat("pt-br", {
    currency:"BRL",
    style:"currency"
})


export function FormatCurrency(value:number){



    return formatValue.format(value)
}
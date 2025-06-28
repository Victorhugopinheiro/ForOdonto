
const formatValue = new Intl.NumberFormat("pt-BR", {
    currency:"BRL",
    style:"currency",
    minimumFractionDigits:0
})


export function FormatCurrency(value:number){



    return formatValue.format(value)
}